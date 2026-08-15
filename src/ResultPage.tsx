import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { DNAResult } from "./genomeTypes";
import type { AxisScores } from "./genomeTypes";
import { supabase } from "./supabaseClient";
import { track } from "./lib/analytics";

const MERCH_URL = "";

const axisLabels: { key: keyof AxisScores; name: string; poleA: string; codeA: string; poleB: string; codeB: string }[] = [
  { key: "vision", name: "Vision Style", poleA: "Expansive", codeA: "E", poleB: "Precise", codeB: "P" },
  { key: "build", name: "Build Mode", poleA: "Intuitive", codeA: "I", poleB: "Systematic", codeB: "S" },
  { key: "market", name: "Market Instinct", poleA: "Deepener", codeA: "D", poleB: "Disruptor", codeB: "X" },
  { key: "growth", name: "Growth Engine", poleA: "Scale", codeA: "C", poleB: "Relationship", codeB: "R" },
  { key: "tech", name: "Technology", poleA: "Native", codeA: "N", poleB: "Adaptive", codeB: "A" },
];

const axisDescriptions: Record<string, Record<string, string>> = {
  vision: {
    E: "You see opportunity everywhere. Your natural instinct is to expand \u2014 new directions, new markets, new possibilities. This expansive vision is a force multiplier when paired with the right execution strategy.",
    P: "You are built on clarity and focus. You know exactly what you do, who you serve, and where you\u2019re headed. This precision is your competitive edge \u2014 you don\u2019t waste energy chasing what doesn\u2019t fit.",
  },
  build: {
    I: "You build best in motion. You move on instinct, iterate fast, and find your direction through action rather than planning. This intuitive approach lets you capitalize on opportunities others are still analyzing.",
    S: "You build on structure. Every move is planned, every system is intentional, and execution follows a framework. This systematic approach creates operational excellence that compounds over time.",
  },
  market: {
    D: "You go deeper than anyone else in your market. You find the underserved layers, the unmet needs, the customers nobody else is truly reaching. This depth creates loyalty and expertise that surface-level competitors cannot replicate.",
    X: "You see broken models and build replacements. You don\u2019t compete within existing frameworks \u2014 you create new ones. This disruptive instinct positions you to capture markets that don\u2019t yet know they need what you\u2019re building.",
  },
  growth: {
    C: "You are engineered to scale. You build systems, infrastructure, and automation that grow without requiring your constant involvement. This scale-driven engine means you compound in value, not in complexity.",
    R: "You grow through people. Every client, partner, and advocate is chosen deliberately, and growth comes from trust earned one relationship at a time. This creates a moat no competitor can buy or replicate.",
  },
  tech: {
    N: "Technology is embedded in how you think, create, and operate. It\u2019s not a tool you reach for \u2014 it\u2019s the environment you build in. This native fluency gives you a permanent speed and capability advantage.",
    A: "You adopt technology with discipline and intention. You don\u2019t chase tools \u2014 you integrate them when they\u2019ve earned their place. This adaptive approach means every technology investment is fully leveraged.",
  },
};

function getAxisResult(axis: keyof AxisScores, scores: AxisScores) {
  const meta = axisLabels.find((a) => a.key === axis)!;
  const axisScore = scores[axis];
  const values = Object.values(axisScore) as number[];
  const keys = Object.keys(axisScore) as string[];
  const dominantIndex = values[0] >= values[1] ? 0 : 1;
  const dominantCode = keys[dominantIndex];
  const dominantLabel = dominantIndex === 0 ? meta.poleA : meta.poleB;
  const description = axisDescriptions[axis]?.[dominantCode] || "";
  return { name: meta.name, dominantCode, dominantLabel, description };
}

interface ResultPageProps {
  demoData?: { result: DNAResult; scores: AxisScores; firstName: string; email?: string; genomeRowId?: string };
}

export default function ResultPage({ demoData }: ResultPageProps = {}) {
  const location = useLocation();
  const navigate = useNavigate();
  const routerState = location.state as {
    result: DNAResult;
    scores: AxisScores;
    firstName: string;
    email?: string;
    genomeRowId?: string;
  } | null;

  const state = demoData || routerState;

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    } else {
      track("result_view", { genome_name: state.result.name });
    }
  }, [state, navigate]);

  if (!state) return null;

  const { result, scores, firstName } = state;
  const [cuffEmail, setCuffEmail] = useState("");
  const [cuffSubmitted, setCuffSubmitted] = useState(false);
  const [cuffError, setCuffError] = useState("");

  const handleCuffSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase || !cuffEmail) return;
    setCuffError("");
    try {
      const { data, error } = await supabase.functions.invoke("sync-to-kit", {
        body: { type: "TAG", record: { email: cuffEmail, name: firstName }, tag: "cuff-interest" },
      });
      if (error || data?.ok === false) {
        setCuffError("Something went wrong. Please try again.");
        return;
      }
      setCuffSubmitted(true);
      track("cuff_waitlist_submitted");
    } catch {
      setCuffError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Logo */}
      <div className="fixed top-6 left-6 z-50 print:hidden">
        <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-10" />
      </div>

      {/* Hero Result */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="font-['DM_Sans'] text-[#C1603A] text-sm font-medium tracking-widest uppercase mb-6">
            Your DNA Result
          </p>
          <p className="font-['DM_Sans'] text-[#3B2A22]/60 text-lg mb-2">
            {firstName}, your DNA type is
          </p>
          <h1 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-4">
            {result.code}
          </h1>
          <h2 className="font-['Libre_Baskerville'] italic text-[#C1603A] text-2xl sm:text-3xl mb-10">
            {result.name}
          </h2>

          <div className="bg-white border border-[#3B2A22]/10 rounded-xl p-8 sm:p-10 text-left">
            <p className="font-['DM_Sans'] text-[#3B2A22] text-base sm:text-lg leading-relaxed">
              {result.description}
            </p>
          </div>
        </div>
      </section>

      {/* Axis-by-Axis Breakdown */}
      <section className="py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <h3 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl sm:text-2xl text-center mb-8">
            Your 5-Axis DNA Breakdown
          </h3>
          <div className="flex flex-col gap-5">
            {axisLabels.map((axis) => {
              const axisResult = getAxisResult(axis.key, scores);
              return (
                <div key={axis.key} className="bg-white border border-[#3B2A22]/10 rounded-xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-['DM_Sans'] font-medium text-[#3B2A22] text-sm tracking-wide uppercase">
                      {axisResult.name}
                    </h4>
                    <span className="font-['DM_Sans'] font-bold text-[#C1603A] text-sm">
                      {axisResult.dominantLabel} ({axisResult.dominantCode})
                    </span>
                  </div>
                  <p className="font-['DM_Sans'] text-[#3B2A22]/80 text-base leading-relaxed">
                    {axisResult.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <h3 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl sm:text-2xl text-center mb-8">
            Your 3 Natural Competitive Advantages
          </h3>
          <div className="flex flex-col gap-4">
            {result.advantages.map((adv, i) => (
              <div key={i} className="bg-white border border-[#3B2A22]/10 rounded-xl p-6 flex gap-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C1603A] text-[#FAF7F2] text-sm font-['DM_Sans'] font-bold shrink-0">
                  {i + 1}
                </span>
                <p className="font-['DM_Sans'] text-[#3B2A22] text-base leading-relaxed">
                  {adv}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blind Spots */}
      <section className="py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <h3 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl sm:text-2xl text-center mb-8">
            Your 2 Biggest Growth Blind Spots
          </h3>
          <div className="flex flex-col gap-4">
            {result.blindSpots.map((spot, i) => (
              <div key={i} className="bg-[#3B2A22]/[0.03] border border-[#3B2A22]/10 rounded-xl p-6 flex gap-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#3B2A22] text-[#FAF7F2] text-sm font-['DM_Sans'] font-bold shrink-0">
                  {i + 1}
                </span>
                <p className="font-['DM_Sans'] text-[#3B2A22] text-base leading-relaxed">
                  {spot}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Preview */}
      <section className="py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <div className="bg-[#F4F1EA] border border-[#3B2A22]/10 rounded-xl p-8 sm:p-10">
            <p className="font-['DM_Sans'] text-[#1C1A17]/50 text-sm font-medium tracking-widest uppercase mb-4">
              AI Acceleration Preview
            </p>
            <h3 className="font-['Libre_Baskerville'] font-bold text-[#1C1A17] text-xl sm:text-2xl leading-snug mb-3">
              Founders with your DNA type are best accelerated by AI in three specific areas.
            </h3>
            <div className="flex flex-col gap-4 mt-8">
              {result.aiAreas.map((area, i) => (
                <div key={i} className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C1603A] text-[#FAF7F2] text-sm font-['DM_Sans'] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="font-['DM_Sans'] text-[#1C1A17]/80 text-base leading-relaxed">
                    {area}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Download PDF */}
          <div className="flex justify-end mt-6 print:hidden">
            <button
              onClick={() => window.print()}
              className="px-6 py-2.5 bg-[#C1603A] text-[#FAF7F2] font-['DM_Sans'] font-medium text-sm rounded cursor-pointer border-none hover:bg-[#a8512f] transition-colors"
            >
              Download Your DNA Profile (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* ─── The Club ─── */}
      <section className="py-16 px-6 print:hidden">
        <div className="max-w-[680px] mx-auto">
          <h3 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl sm:text-2xl text-center mb-8">
            Welcome to the Club.
          </h3>
          <p className="font-['DM_Sans'] text-[#3B2A22]/80 text-base leading-relaxed text-center">
            You just found out how you're wired to build. That makes you a FoundHer — and it makes you a member. The FoundHers Club is free, and you're already in. Letter from the Build, events, and the women building alongside you.
          </p>
        </div>
      </section>

      {/* ─── The Cuff ─── */}
      <section className="py-16 px-6 print:hidden">
        <div className="max-w-[680px] mx-auto">
          <img
            src="/images/FH_social-with-orange-cuff.png"
            alt="The Cuff"
            className="w-full rounded-xl mb-10"
          />
          <h3 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl sm:text-2xl text-center mb-8">
            The uniform of the unstoppable.
          </h3>
          <p className="font-['DM_Sans'] text-[#3B2A22]/80 text-base leading-relaxed text-center mb-4">
            There's one more thing. The Cuff is the physical mark of a FoundHer — gold-plated brass, hard enamel, engraved on the inside. Worn by women who are building something. Everyone who knows, knows.
          </p>
          <p className="font-['DM_Sans'] text-[#3B2A22]/80 text-base leading-relaxed text-center mb-8">
            It isn't ready yet. We're still in production. Put your name down and we'll tell you more when we know more.
          </p>
          {cuffSubmitted ? (
            <p className="font-['DM_Sans'] text-[#1C1A17] text-base leading-relaxed font-bold text-center">
              You're on the list.
            </p>
          ) : (
            <form onSubmit={handleCuffSubmit} className="flex flex-col items-center gap-4 max-w-[480px] mx-auto">
              <input
                type="email"
                placeholder="Email Address"
                value={cuffEmail}
                onChange={(e) => setCuffEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#3B2A22]/20 bg-white text-[#3B2A22] text-base font-['DM_Sans'] rounded outline-none focus:border-[#C1603A]"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#C1603A] text-[#FAF7F2] font-['DM_Sans'] font-medium text-base rounded cursor-pointer border-none hover:bg-[#a8512f] transition-colors"
              >
                Put me on the waitlist
              </button>
              <p className="font-['DM_Sans'] text-[#3B2A22]/50 text-sm">
                No card. No deposit. No obligation.
              </p>
            </form>
          )}
          {cuffError && (
            <p className="font-['DM_Sans'] text-red-600 text-base mt-2 text-center">
              {cuffError}
            </p>
          )}
        </div>
      </section>

      {/* ─── More Coming ─── */}
      <section className="py-16 px-6 print:hidden">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="font-['DM_Sans'] text-[#3B2A22]/80 text-base leading-relaxed">
            More is coming for founders with your DNA.
          </p>
          {MERCH_URL && (
            <a
              href={MERCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['DM_Sans'] text-[#C1603A] text-base no-underline hover:underline mt-4 inline-block"
            >
              Shop FoundHer
            </a>
          )}
        </div>
      </section>

      {/* Logo mark */}
      <section className="py-20 px-6 print:hidden">
        <div className="max-w-[480px] mx-auto text-center">
          <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-16 mx-auto" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3B2A22] py-16 px-6 text-center print:hidden">
        <img src="/images/FH_mark_cream.png" alt="FoundHer AI" className="w-10 mx-auto mb-6" />
        <p className="font-['DM_Sans'] text-[#FAF7F2] text-sm leading-relaxed mb-4">
          FoundHer DNA is a FoundHer AI product. Built for women founders who build to scale.
        </p>
        <a
          href="https://foundherai.ai"
          className="font-['DM_Sans'] text-[#C1603A] text-sm no-underline hover:underline"
        >
          Visit FoundHerAI.ai
        </a>
      </footer>
    </div>
  );
}
