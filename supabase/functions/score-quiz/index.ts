import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { scoreQuiz } from "./scoring.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const { firstName, email, answers } = body as {
    firstName?: string;
    email?: string;
    answers?: { questionId: number; optionLabel: string }[];
  };

  if (!firstName || !email || !Array.isArray(answers) || answers.length === 0) {
    return json({ error: "Missing required fields: firstName, email, answers" }, 400);
  }

  // Validate answer shape
  for (const a of answers) {
    if (typeof a.questionId !== "number" || typeof a.optionLabel !== "string") {
      return json({ error: "Invalid answer format" }, 400);
    }
  }

  // Score
  const { result, axisResults, genomeCode, genomeName, axisScores } = scoreQuiz(answers);

  // Insert into genome_results
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const genomeRowId = crypto.randomUUID();

  if (supabaseUrl && serviceRoleKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/genome_results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          id: genomeRowId,
          name: firstName,
          email,
          genome_code: genomeCode,
          genome_name: genomeName,
          vision_e: axisScores.vision.E,
          vision_p: axisScores.vision.P,
          build_i: axisScores.build.I,
          build_s: axisScores.build.S,
          market_d: axisScores.market.D,
          market_x: axisScores.market.X,
          growth_c: axisScores.growth.C,
          growth_r: axisScores.growth.R,
          tech_n: axisScores.tech.N,
          tech_a: axisScores.tech.A,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(`genome_results insert failed (${res.status}): ${text}`);
      }
    } catch (err) {
      console.error("genome_results insert error:", err);
    }
  }

  return json({
    result,
    axisResults,
    genomeRowId,
  });
});
