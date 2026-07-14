import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { quizQuestions } from "./quizData";
import type { ScoreEntry } from "./quizData";
import { calculateScores, getGenomeResult, getRawCode, getGenomeCode } from "./genomeTypes";
import type { AxisScores } from "./genomeTypes";
import { supabase } from "./supabaseClient";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { firstName, email } = (location.state as { firstName: string; email: string }) || {};

  // Redirect if no name/email
  if (!firstName || !email) {
    navigate("/quiz", { replace: true });
    return null;
  }

  const randomizedQuestions = useMemo(() => shuffleArray(quizQuestions), []);

  const [showIntro, setShowIntro] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(ScoreEntry[] | null)[]>(
    () => new Array(randomizedQuestions.length).fill(null)
  );
  const [submitting, setSubmitting] = useState(false);

  const question = randomizedQuestions[currentIndex];
  const isImagePick = question.type === "image_pick";
  const totalQuestions = randomizedQuestions.length;

  // Restore previous selection when navigating back
  const handleSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = async () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = question.options[selectedOption].scores;
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      // Restore previous answer selection for next question, or reset
      const nextAnswer = newAnswers[currentIndex + 1];
      if (nextAnswer) {
        // Find which option was previously selected
        const nextQuestion = randomizedQuestions[currentIndex + 1];
        const prevIndex = nextQuestion.options.findIndex(
          (opt) => JSON.stringify(opt.scores) === JSON.stringify(nextAnswer)
        );
        setSelectedOption(prevIndex >= 0 ? prevIndex : null);
      } else {
        setSelectedOption(null);
      }
    } else {
      // Quiz complete — calculate and save results
      setSubmitting(true);
      const finalAnswers = newAnswers as ScoreEntry[][];
      const scores: AxisScores = calculateScores(finalAnswers);
      const result = getGenomeResult(scores);
      const rawCode = getRawCode(scores);
      const genomeCode = getGenomeCode(scores);

      // Save to Supabase
      try {
        if (supabase) {
          await supabase.from("genome_results").insert({
            name: firstName,
            email,
            genome_code: genomeCode,
            genome_name: result.name,
          });
        }
      } catch {
        // Continue to results even if save fails
      }

      navigate("/result", {
        state: {
          result,
          scores,
          rawCode,
          firstName,
        },
        replace: true,
      });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      // Restore previous selection
      const prevAnswer = answers[prevIndex];
      if (prevAnswer) {
        const prevQuestion = randomizedQuestions[prevIndex];
        const optIdx = prevQuestion.options.findIndex(
          (opt) => JSON.stringify(opt.scores) === JSON.stringify(prevAnswer)
        );
        setSelectedOption(optIdx >= 0 ? optIdx : null);
      } else {
        setSelectedOption(null);
      }
    }
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <div className="fixed top-6 left-6 z-50">
          <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-10" />
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-[520px] text-center">
            <h2 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-2xl sm:text-3xl leading-snug mb-6">
              Before we begin
            </h2>
            <p className="font-['DM_Sans'] text-[#3B2A22] text-base sm:text-lg leading-relaxed mb-10">
              For this assessment, focus on one venture. If you're building more than one, you can retake the Genome test for each.
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="px-10 py-3 bg-[#C1603A] text-[#FAF7F2] font-['DM_Sans'] font-medium text-base rounded cursor-pointer border-none hover:bg-[#a8512f] transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      {/* Logo */}
      <div className="fixed top-6 left-6 z-50">
        <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-10" />
      </div>

      {/* Progress */}
      <div className="pt-20 pb-4 px-6">
        <div className="max-w-[680px] mx-auto">
          <p className="font-['DM_Sans'] text-[#3B2A22]/50 text-sm font-medium tracking-wide text-center mb-3">
            Question {currentIndex + 1} of {totalQuestions}
          </p>
          <div className="w-full h-1 bg-[#3B2A22]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C1603A] rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center px-6 py-8">
        <div className="max-w-[680px] w-full">
          {isImagePick && (
            <p className="font-['DM_Sans'] text-[#C1603A] text-xs font-medium tracking-widest uppercase mb-3 text-center">
              Image Pick
            </p>
          )}
          <h2 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl sm:text-2xl md:text-3xl leading-snug text-center mb-10">
            {question.prompt}
          </h2>

          <div className={`grid gap-4 ${isImagePick ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;

              if (isImagePick) {
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`relative p-6 rounded-lg border-2 text-left transition-all cursor-pointer bg-white ${
                      isSelected
                        ? "border-[#C1603A] bg-[#C1603A]/5 shadow-md"
                        : "border-[#3B2A22]/10 hover:border-[#3B2A22]/30"
                    }`}
                  >
                    {/* Placeholder image area */}
                    <div className="w-full aspect-[4/3] bg-[#3B2A22]/5 rounded-md mb-4 flex items-center justify-center">
                      <p className="font-['DM_Sans'] text-[#3B2A22]/40 text-sm text-center px-4 leading-relaxed">
                        {option.text}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-['DM_Sans'] font-medium shrink-0 ${
                        isSelected
                          ? "bg-[#C1603A] text-[#FAF7F2]"
                          : "bg-[#3B2A22]/10 text-[#3B2A22]"
                      }`}>
                        {option.label}
                      </span>
                      <p className="font-['DM_Sans'] text-[#3B2A22] text-sm leading-relaxed">
                        {option.text}
                      </p>
                    </div>
                  </button>
                );
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`flex items-start gap-4 p-5 rounded-lg border-2 text-left transition-all cursor-pointer bg-white ${
                    isSelected
                      ? "border-[#C1603A] bg-[#C1603A]/5 shadow-md"
                      : "border-[#3B2A22]/10 hover:border-[#3B2A22]/30"
                  }`}
                >
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-['DM_Sans'] font-medium shrink-0 ${
                    isSelected
                      ? "bg-[#C1603A] text-[#FAF7F2]"
                      : "bg-[#3B2A22]/10 text-[#3B2A22]"
                  }`}>
                    {option.label}
                  </span>
                  <p className="font-['DM_Sans'] text-[#3B2A22] text-base leading-relaxed pt-1">
                    {option.text}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 mb-8">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className={`font-['DM_Sans'] text-sm font-medium px-6 py-3 rounded border-none cursor-pointer transition-colors ${
                currentIndex === 0
                  ? "text-[#3B2A22]/20 cursor-default"
                  : "text-[#3B2A22]/60 hover:text-[#3B2A22] bg-transparent"
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null || submitting}
              className={`font-['DM_Sans'] text-sm font-medium px-8 py-3 rounded border-none cursor-pointer transition-colors ${
                selectedOption === null
                  ? "bg-[#3B2A22]/10 text-[#3B2A22]/30 cursor-default"
                  : "bg-[#C1603A] text-[#FAF7F2] hover:bg-[#a8512f]"
              }`}
            >
              {submitting
                ? "Calculating..."
                : currentIndex === totalQuestions - 1
                  ? "See My Results"
                  : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
