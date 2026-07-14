import { useLocation, useNavigate } from "react-router-dom";
import type { GenomeResult } from "./genomeTypes";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    result: GenomeResult;
    firstName: string;
  } | null;

  if (!state) {
    navigate("/", { replace: true });
    return null;
  }

  const { result, firstName } = state;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Logo */}
      <div className="fixed top-6 left-6 z-50">
        <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-10" />
      </div>

      {/* Hero Result */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="font-['DM_Sans'] text-[#C1603A] text-sm font-medium tracking-widest uppercase mb-6">
            Your Genome Result
          </p>
          <p className="font-['DM_Sans'] text-[#3B2A22]/60 text-lg mb-2">
            {firstName}, your Genome type is
          </p>
          <h1 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-4">
            {result.code}
          </h1>
          <h2 className="font-['Libre_Baskerville'] italic text-[#C1603A] text-2xl sm:text-3xl mb-10">
            {result.name}
          </h2>

          {/* Genome Description */}
          <div className="bg-white border border-[#3B2A22]/10 rounded-xl p-8 sm:p-10 text-left">
            <p className="font-['DM_Sans'] text-[#3B2A22] text-base sm:text-lg leading-relaxed">
              {result.description}
            </p>
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
          <div className="bg-[#3B2A22] rounded-xl p-8 sm:p-10">
            <p className="font-['DM_Sans'] text-[#FAF7F2]/60 text-sm font-medium tracking-widest uppercase mb-4">
              AI Acceleration Preview
            </p>
            <h3 className="font-['Libre_Baskerville'] font-bold text-[#FAF7F2] text-xl sm:text-2xl leading-snug mb-3">
              Founders with your Genome type are best accelerated by AI in three specific areas.
            </h3>
            <div className="flex flex-col gap-4 mt-8">
              {result.aiAreas.map((area, i) => (
                <div key={i} className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C1603A] text-[#FAF7F2] text-sm font-['DM_Sans'] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="font-['DM_Sans'] text-[#FAF7F2]/90 text-base leading-relaxed">
                    {area}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-[480px] mx-auto text-center">
          <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-16 mx-auto mb-8" />
          <p className="font-['DM_Sans'] text-[#3B2A22] text-base leading-relaxed mb-8">
            Your full Genome Report — including your matched AI agents and Genome Evolution roadmap — is included free with The Cuff.
          </p>
          <a
            href="https://foundherai.ai"
            className="inline-block w-full py-4 bg-[#C1603A] text-[#FAF7F2] font-['DM_Sans'] font-medium text-base rounded cursor-pointer border-none hover:bg-[#a8512f] transition-colors no-underline text-center"
          >
            Get The Cuff — $297
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3B2A22] py-16 px-6 text-center">
        <img src="/images/FH_mark_cream.png" alt="FoundHer AI" className="w-10 mx-auto mb-6" />
        <p className="font-['DM_Sans'] text-[#FAF7F2] text-sm leading-relaxed mb-4">
          FoundHer Genome is a FoundHer AI.ai product. Built for women founders who build to scale.
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
