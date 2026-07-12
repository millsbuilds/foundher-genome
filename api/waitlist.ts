import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, email } = req.body;
  if (!firstName || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_GENOME_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        unsubscribed: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: "Failed to add contact" });
  }
}
