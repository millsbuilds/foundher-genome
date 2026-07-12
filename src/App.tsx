import { useState } from "react";
import type { FormEvent } from "react";

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Fixed logo top left */}
      <div className="fixed top-6 left-6 z-50">
        <img src="/images/FH_mark_cream.png" alt="FoundHer AI" className="w-10" />
      </div>

      {/* ─── HERO ─── */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center">
        <img
          src="/images/FH_hero-image-final.png"
          alt="FoundHer Genome"
          className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
        />
        <div className="absolute inset-0 bg-[#3B2A22]/40" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="font-['Libre_Baskerville'] font-bold text-[#FAF7F2] text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6">
            Finally. A tool that gives you your competitive edge.
          </h1>
          <p className="font-['DM_Sans'] text-[#FAF7F2] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Your project's DNA is a direct expression of how you build. And since no two founders build alike — no two Genomes are alike. Discover your project's Genome type.
          </p>
        </div>
      </section>

      {/* ─── BODY ─── */}
      <section className="py-20 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="font-['DM_Sans'] text-[#3B2A22] text-lg leading-relaxed mb-8">
            Most founders build by guessing. FoundHer Genome changes that.
          </p>
          <p className="font-['DM_Sans'] text-[#3B2A22] text-lg leading-relaxed">
            Answer just 18 multiple choice questions about how you build, how you think, and how your project is wired — and the Genome test will reveal your unique Genome type. A coded, multi-dimensional profile that tells you exactly how your venture is built to grow, and exactly which AI tools will help you scale — without guesswork, without wasted time, without errors in judgment.
          </p>
        </div>
      </section>

      {/* ─── PULL QUOTE ─── */}
      <section className="py-16 px-6">
        <p className="font-['Libre_Baskerville'] italic text-[#C1603A] text-2xl sm:text-3xl md:text-4xl leading-snug text-center max-w-[680px] mx-auto">
          "Think Myers-Briggs — but built exclusively for women founders and the AI era."
        </p>
      </section>

      {/* ─── WAITLIST FORM ─── */}
      <section className="py-20 px-6">
        <div className="max-w-[480px] mx-auto text-center">
          <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-16 mx-auto mb-10" />

          {status === "success" ? (
            <p className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl">
              You're in. We'll be in touch when your Genome is ready.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#3B2A22]/20 bg-white text-[#3B2A22] text-base font-['DM_Sans'] rounded outline-none focus:border-[#C1603A]"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#3B2A22]/20 bg-white text-[#3B2A22] text-base font-['DM_Sans'] rounded outline-none focus:border-[#C1603A]"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 bg-[#C1603A] text-[#FAF7F2] font-['DM_Sans'] font-medium text-base rounded cursor-pointer border-none disabled:opacity-60"
              >
                {status === "loading" ? "Submitting..." : "Join the Waitlist"}
              </button>
              {status === "error" && (
                <p className="text-[#C1603A] text-sm font-['DM_Sans']">Something went wrong. Please try again.</p>
              )}
              <p className="font-['DM_Sans'] italic text-[#3B2A22] text-sm mt-2">
                Founding members get first access to their project's Genome type — free.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
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
