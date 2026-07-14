import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizEntry() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/quiz/questions", { state: { firstName, email } });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      {/* Logo */}
      <div className="fixed top-6 left-6 z-50">
        <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-10" />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-[480px] w-full text-center">
          <h1 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-3xl sm:text-4xl leading-[1.1] mb-4">
            Let's discover your Genome.
          </h1>
          <p className="font-['DM_Sans'] text-[#3B2A22]/70 text-base leading-relaxed mb-10">
            Enter your name and email to begin the test. It takes about 5 minutes.
          </p>

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
              className="w-full py-3 bg-[#C1603A] text-[#FAF7F2] font-['DM_Sans'] font-medium text-base rounded cursor-pointer border-none hover:bg-[#a8512f] transition-colors mt-2"
            >
              Begin the Test
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
