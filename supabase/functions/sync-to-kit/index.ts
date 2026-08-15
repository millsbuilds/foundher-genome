import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const KIT_API = "https://api.kit.com/v4";

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

async function findTagId(
  tagName: string,
  headers: Record<string, string>,
): Promise<number | null> {
  let cursor: string | null = null;
  do {
    const url = cursor
      ? `${KIT_API}/tags?per_page=100&after=${cursor}`
      : `${KIT_API}/tags?per_page=100`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const text = await res.text();
      console.error(`Kit list tags failed (${res.status}): ${text}`);
      return null;
    }
    const data = await res.json();
    const match = data.tags?.find(
      (t: { name: string; id: number }) => t.name === tagName,
    );
    if (match) return match.id;
    cursor = data.pagination?.has_next_page ? data.pagination.end_cursor : null;
  } while (cursor);
  return null;
}

async function findSubscriberByEmail(
  email: string,
  headers: Record<string, string>,
): Promise<number | null> {
  const res = await fetch(
    `${KIT_API}/subscribers?email_address=${encodeURIComponent(email)}`,
    { headers },
  );
  if (!res.ok) {
    const text = await res.text();
    console.error(`Kit find subscriber failed (${res.status}): ${text}`);
    return null;
  }
  const data = await res.json();
  return data.subscribers?.[0]?.id ?? null;
}

async function tagSubscriber(
  tagId: number,
  subscriberId: number,
  tagName: string,
  headers: Record<string, string>,
): Promise<boolean> {
  const res = await fetch(
    `${KIT_API}/tags/${tagId}/subscribers/${subscriberId}`,
    { method: "POST", headers, body: JSON.stringify({}) },
  );
  if (!res.ok) {
    const text = await res.text();
    console.error(`Kit tag subscriber failed (${res.status}): ${text}`);
    return false;
  }
  console.log(`Tagged subscriber ${subscriberId} with "${tagName}"`);
  return true;
}

// ── TAG handler: find-or-create subscriber, apply arbitrary tag ──
async function handleTagRequest(
  record: Record<string, unknown>,
  tagName: string,
  headers: Record<string, string>,
): Promise<Response> {
  const email = record.email as string;
  if (!email) {
    return json({ ok: false, step: "missing_email" }, 400);
  }

  let subscriberId = await findSubscriberByEmail(email, headers);
  if (!subscriberId) {
    const res = await fetch(`${KIT_API}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email_address: email,
        first_name: (record.name as string) ?? "",
        state: "active",
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error(`Kit create subscriber failed (${res.status}): ${text}`);
      return json({ ok: false, step: "create_subscriber" });
    }
    const data = await res.json();
    subscriberId = data.subscriber?.id ?? null;
  }

  if (!subscriberId) {
    return json({ ok: false, step: "no_subscriber_id" });
  }

  const tagId = await findTagId(tagName, headers);
  if (!tagId) {
    console.error(`Tag "${tagName}" not found in Kit`);
    return json({ ok: false, step: "tag_not_found" });
  }

  const tagged = await tagSubscriber(tagId, subscriberId, tagName, headers);
  if (!tagged) return json({ ok: false, step: "tag_subscriber" });

  return json({ ok: true });
}

// ── INSERT handler: create subscriber, set fields, tag quiz-complete ──
async function handleInsert(
  record: Record<string, unknown>,
  headers: Record<string, string>,
): Promise<Response> {
  let subscriberId: number | null = null;
  try {
    const res = await fetch(`${KIT_API}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email_address: record.email,
        first_name: record.name,
        state: "active",
        fields: {
          genome_code: record.genome_code ?? "",
          genome_name: record.genome_name ?? "",
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Kit create subscriber failed (${res.status}): ${text}`);
      return json({ ok: false, step: "create_subscriber" });
    }

    const data = await res.json();
    subscriberId = data.subscriber?.id ?? null;
    console.log(`Subscriber synced: ${record.email} (id: ${subscriberId})`);
  } catch (err) {
    console.error("Kit create subscriber error:", err);
    return json({ ok: false, step: "create_subscriber" });
  }

  if (!subscriberId) {
    console.error("No subscriber ID returned from Kit");
    return json({ ok: false, step: "no_subscriber_id" });
  }

  const tagId = await findTagId("quiz-complete", headers);
  if (!tagId) {
    console.error('Tag "quiz-complete" not found in Kit');
    return json({ ok: false, step: "tag_not_found" });
  }

  const tagged = await tagSubscriber(tagId, subscriberId, "quiz-complete", headers);
  if (!tagged) return json({ ok: false, step: "tag_subscriber" });

  return json({ ok: true });
}

// ── UPDATE handler: tag early-adopter when flag flips to true ──
async function handleUpdate(
  record: Record<string, unknown>,
  oldRecord: Record<string, unknown>,
  headers: Record<string, string>,
): Promise<Response> {
  if (record.early_adopter !== true || oldRecord.early_adopter === true) {
    return json({ ok: true, skipped: "early_adopter not changed to true" });
  }

  const email = record.email as string;
  if (!email) {
    console.error("UPDATE payload missing record.email");
    return json({ ok: false, step: "missing_email" });
  }

  const subscriberId = await findSubscriberByEmail(email, headers);
  if (!subscriberId) {
    console.error(`Subscriber not found in Kit for ${email}`);
    return json({ ok: false, step: "subscriber_not_found" });
  }

  const tagId = await findTagId("early-adopter", headers);
  if (!tagId) {
    console.error('Tag "early-adopter" not found in Kit');
    return json({ ok: false, step: "tag_not_found" });
  }

  const tagged = await tagSubscriber(tagId, subscriberId, "early-adopter", headers);
  if (!tagged) return json({ ok: false, step: "tag_subscriber" });

  return json({ ok: true });
}

serve(async (req) => {
  const apiSecret = Deno.env.get("KIT_API_SECRET");
  if (!apiSecret) {
    console.error("KIT_API_SECRET is not set");
    return json({ error: "Server misconfigured" });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const { type, record, old_record, tag } = body as {
    type?: string;
    record?: Record<string, unknown>;
    old_record?: Record<string, unknown>;
    tag?: string;
  };

  if (!record?.email || (type !== "TAG" && !record?.name)) {
    return json({ error: "Malformed payload: missing record.email or record.name" }, 400);
  }

  const headers = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiSecret,
  };

  if (type === "TAG" && tag) {
    return handleTagRequest(record, tag, headers);
  }

  if (type === "UPDATE" && old_record) {
    return handleUpdate(record, old_record, headers);
  }

  return handleInsert(record, headers);
});
