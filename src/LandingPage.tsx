import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Fixed logo top left */}
      <div className="fixed top-6 left-6 z-50">
        <img src="/images/FH_mark_cream.png" alt="FoundHer AI" className="w-10" />
      </div>

      {/* HERO */}
      <section className="relative w-full min-h-[90vh] flex items-end justify-center pb-16">
        <img
          src="/images/FH_hero-image-final.png"
          alt="FoundHer DNA"
          className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
        />
        <div className="absolute inset-0 bg-[#3B2A22]/40" />
        <div className="relative z-10 text-center px-6 max-w-3xl pt-72">
          <p className="font-['DM_Sans'] font-medium text-[#FAF7F2] text-sm sm:text-base tracking-wide mb-4">
            For women founders building in the AI era.
          </p>
          <h1 className="font-['Libre_Baskerville'] font-bold text-[#FAF7F2] text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6">
            Finally. A tool that gives you your competitive edge.
          </h1>
          <p className="font-['DM_Sans'] text-[#FAF7F2] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Whether you're building a new business or scaling one you already have — every venture has its own DNA. Discover your business's DNA type.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="py-20 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="font-['DM_Sans'] text-[#3B2A22] text-lg leading-relaxed mb-8">
            Most founders build by guessing — whether they're just starting out or years in. FoundHer DNA changes that.
          </p>
          <p className="font-['DM_Sans'] text-[#3B2A22] text-lg leading-relaxed">
            Answer just 18 multiple choice questions about how you build, how you think, and how this business is wired — and the DNA test will reveal your business's unique DNA type. This is a coded, multi-dimensional profile that tells you exactly how your venture is built to grow, then assesses which specific AI tools will accelerate its progress, where your natural competitive advantages lie, and how to stop spending time and money on strategies that were never right for your business in the first place.
          </p>
          <p className="font-['DM_Sans'] text-[#3B2A22] text-lg leading-relaxed mt-8">
            No guesswork. No wasted time. No errors in judgment.
          </p>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="py-16 px-6">
        <p className="font-['Libre_Baskerville'] italic text-[#C1603A] text-2xl sm:text-3xl md:text-4xl leading-snug text-center max-w-[680px] mx-auto">
          "Think Myers-Briggs — but built exclusively for women founders, the businesses they start and run in the AI era."
        </p>
      </section>

      {/* CTA FORM */}
      <section className="py-20 px-6">
        <div className="max-w-[480px] mx-auto text-center">
          <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-16 mx-auto mb-10" />
          <button
            onClick={() => navigate("/quiz")}
            className="w-full py-3 bg-[#C1603A] text-[#FAF7F2] font-['DM_Sans'] font-medium text-base rounded cursor-pointer border-none hover:bg-[#a8512f] transition-colors"
          >
            Take the Test
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#3B2A22] py-16 px-6 text-center">
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
