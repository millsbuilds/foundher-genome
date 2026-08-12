import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const KIT_API = "https://api.kit.com/v4";
const TAG_NAME = "quiz-complete";

serve(async (req) => {
  const apiSecret = Deno.env.get("KIT_API_SECRET");
  if (!apiSecret) {
    console.error("KIT_API_SECRET is not set");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { record } = body as { record?: Record<string, unknown> };
  if (!record?.email || !record?.name) {
    return new Response(
      JSON.stringify({ error: "Malformed payload: missing record.email or record.name" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const headers = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiSecret,
  };

  // ── Step 1: Create or update subscriber ──
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
      return new Response(JSON.stringify({ ok: false, step: "create_subscriber" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    subscriberId = data.subscriber?.id ?? null;
    console.log(`Subscriber synced: ${record.email} (id: ${subscriberId})`);
  } catch (err) {
    console.error("Kit create subscriber error:", err);
    return new Response(JSON.stringify({ ok: false, step: "create_subscriber" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!subscriberId) {
    console.error("No subscriber ID returned from Kit");
    return new Response(JSON.stringify({ ok: false, step: "no_subscriber_id" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Step 2: Find tag ID by name ──
  let tagId: number | null = null;
  try {
    let cursor: string | null = null;
    do {
      const url = cursor
        ? `${KIT_API}/tags?per_page=100&after=${cursor}`
        : `${KIT_API}/tags?per_page=100`;
      const res = await fetch(url, { headers });
      if (!res.ok) {
        const text = await res.text();
        console.error(`Kit list tags failed (${res.status}): ${text}`);
        break;
      }
      const data = await res.json();
      const match = data.tags?.find(
        (t: { name: string; id: number }) => t.name === TAG_NAME,
      );
      if (match) {
        tagId = match.id;
        break;
      }
      cursor = data.pagination?.has_next_page ? data.pagination.end_cursor : null;
    } while (cursor);
  } catch (err) {
    console.error("Kit list tags error:", err);
  }

  if (!tagId) {
    console.error(`Tag "${TAG_NAME}" not found in Kit`);
    return new Response(JSON.stringify({ ok: false, step: "tag_not_found" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Step 3: Tag the subscriber ──
  try {
    const res = await fetch(
      `${KIT_API}/tags/${tagId}/subscribers/${subscriberId}`,
      { method: "POST", headers, body: JSON.stringify({}) },
    );
    if (!res.ok) {
      const text = await res.text();
      console.error(`Kit tag subscriber failed (${res.status}): ${text}`);
      return new Response(JSON.stringify({ ok: false, step: "tag_subscriber" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log(`Tagged subscriber ${subscriberId} with "${TAG_NAME}"`);
  } catch (err) {
    console.error("Kit tag subscriber error:", err);
    return new Response(JSON.stringify({ ok: false, step: "tag_subscriber" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
