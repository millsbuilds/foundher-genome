import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { DNAResult, AxisResult } from "./genomeTypes";
import { supabase } from "./supabaseClient";
import { track } from "./lib/analytics";

const MERCH_URL = "";

interface ResultPageProps {
  demoData?: { result: DNAResult; axisResults: AxisResult[]; firstName: string; email?: string; genomeRowId?: string };
}

export default function ResultPage({ demoData }: ResultPageProps = {}) {
  const location = useLocation();
  const navigate = useNavigate();
  const routerState = location.state as {
    result: DNAResult;
    axisResults: AxisResult[];
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

  const { result, axisResults, firstName } = state;
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
            {axisResults.map((axisResult, i) => (
              <div key={i} className="bg-white border border-[#3B2A22]/10 rounded-xl p-6 sm:p-8">
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
            ))}
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
            You just found out how you're wired to build. That makes you a FoundHer — and it makes you a member. The FoundHers Club is free, and you're already in. Right now, that means occasional letters from the build, and early access to what's coming next. Find us on Facebook — <a href="https://www.facebook.com/profile.php?id=61593253061155" target="_blank" rel="noopener noreferrer" className="text-[#C1603A] underline hover:no-underline">FoundHers Club</a> — and be one of the first ones there.
          </p>
        </div>
      </section>

      {/* ─── The Cuff ─── */}
      <section className="py-16 px-6 print:hidden">
        <div className="max-w-[680px] mx-auto">
          <img
            src="/images/FH_social-with-orange-cuff.jpg"
            alt="The Cuff"
            className="w-full rounded-xl mb-10"
          />
          <h3 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl sm:text-2xl text-center mb-8">
            The uniform of the unstoppable.
          </h3>
          <p className="font-['DM_Sans'] text-[#3B2A22]/80 text-base leading-relaxed text-center mb-4">
            There's one more thing. The FoundHer Cuff is the physical mark of a FoundHer — a way for founders to recognize each other across a room. Gold-plated brass, hard enamel. Worn by women who are building something.
          </p>
          <p className="font-['DM_Sans'] text-[#3B2A22]/80 text-base leading-relaxed text-center mb-8">
            It isn't ready yet. We're still in production. Put your name down and we'll tell you more when we know more.
          </p>
          <p className="font-['Libre_Baskerville'] italic text-[#3B2A22] text-lg sm:text-xl text-center mt-4 mb-10">
            Everyone who knows, knows.
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
