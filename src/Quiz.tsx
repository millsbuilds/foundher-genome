import { useState, useMemo, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { quizQuestions } from "./quizData";
import { supabase } from "./supabaseClient";
import { track } from "./lib/analytics";

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
  useEffect(() => {
    if (!firstName || !email) {
      navigate("/quiz", { replace: true });
    }
  }, [firstName, email, navigate]);

  if (!firstName || !email) return null;

  // Shuffle question order and shuffle each question's options independently
  const randomizedQuestions = useMemo(() => {
    return shuffleArray(quizQuestions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
  }, []);

  const [showIntro, setShowIntro] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<({ questionId: number; optionLabel: string } | null)[]>(
    () => new Array(randomizedQuestions.length).fill(null)
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const trackedQuestions = useRef<Set<number>>(new Set());

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
    newAnswers[currentIndex] = {
      questionId: question.id,
      optionLabel: question.options[selectedOption].label,
    };
    setAnswers(newAnswers);

    if (!trackedQuestions.current.has(question.id)) {
      trackedQuestions.current.add(question.id);
      track("question_answered", {
        question_id: question.id,
        question_type: question.type,
        question_index: currentIndex + 1,
      });
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      // Restore previous answer selection for next question, or reset
      const nextAnswer = newAnswers[currentIndex + 1];
      if (nextAnswer) {
        const nextQuestion = randomizedQuestions[currentIndex + 1];
        const prevIndex = nextQuestion.options.findIndex(
          (opt) => opt.label === nextAnswer.optionLabel
        );
        setSelectedOption(prevIndex >= 0 ? prevIndex : null);
      } else {
        setSelectedOption(null);
      }
    } else {
      // Quiz complete — send answers to server for scoring
      setSubmitting(true);
      setSubmitError(false);

      const finalAnswers = newAnswers.filter(
        (a): a is { questionId: number; optionLabel: string } => a !== null
      );

      try {
        if (!supabase) throw new Error("Client not configured");

        const { data, error } = await supabase.functions.invoke("score-quiz", {
          body: { firstName, email, answers: finalAnswers },
        });

        if (error || !data?.result) {
          throw new Error("Scoring failed");
        }

        track("quiz_completed", { genome_name: data.result.name });

        navigate("/result", {
          state: {
            result: data.result,
            axisResults: data.axisResults,
            firstName,
            email,
            genomeRowId: data.genomeRowId,
          },
          replace: true,
        });
      } catch (err) {
        console.error("Failed to score quiz:", err);
        setSubmitting(false);
        setSubmitError(true);
      }
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
          (opt) => opt.label === prevAnswer.optionLabel
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
              This is about you, not your venture. If you're building more than one thing, hold one in mind as you answer — it keeps things concrete so we can see how your mind builds.
            </p>
            <button
              onClick={() => { track("quiz_started"); setShowIntro(false); }}
              className="px-10 py-3 bg-[#C1603A] text-[#FAF7F2] font-['DM_Sans'] font-medium text-base rounded cursor-pointer border-none hover:bg-[#a8512f] transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state while scoring
  if (submitting) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <div className="fixed top-6 left-6 z-50">
          <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-10" />
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-[520px] text-center">
            <h2 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-2xl sm:text-3xl leading-snug mb-6">
              Analyzing your DNA…
            </h2>
            <p className="font-['DM_Sans'] text-[#3B2A22]/60 text-base leading-relaxed">
              We're reading your answers across five dimensions to reveal your founder type.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state with retry
  if (submitError) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
        <div className="fixed top-6 left-6 z-50">
          <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-10" />
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-[520px] text-center">
            <h2 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-2xl sm:text-3xl leading-snug mb-6">
              Something went wrong.
            </h2>
            <p className="font-['DM_Sans'] text-[#3B2A22]/60 text-base leading-relaxed mb-10">
              We couldn't process your results. Your answers are saved — try again.
            </p>
            <button
              onClick={() => handleNext()}
              className="px-10 py-3 bg-[#C1603A] text-[#FAF7F2] font-['DM_Sans'] font-medium text-base rounded cursor-pointer border-none hover:bg-[#a8512f] transition-colors"
            >
              Try Again
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
                    {option.image ? (
                      <img
                        src={option.image}
                        alt={option.text}
                        className="w-full aspect-[4/3] object-cover rounded-md mb-4"
                      />
                    ) : (
                      <div className="w-full aspect-[4/3] bg-[#3B2A22]/5 rounded-md mb-4 flex items-center justify-center">
                        <p className="font-['DM_Sans'] text-[#3B2A22]/40 text-sm text-center px-4 leading-relaxed">
                          {option.text}
                        </p>
                      </div>
                    )}
                    <div>
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
                  className={`p-5 pl-6 rounded-lg border-2 text-left transition-all cursor-pointer bg-white ${
                    isSelected
                      ? "border-[#C1603A] bg-[#C1603A]/5 shadow-md"
                      : "border-[#3B2A22]/10 hover:border-[#3B2A22]/30"
                  }`}
                >
                  <p className="font-['DM_Sans'] text-[#3B2A22] text-base leading-relaxed">
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
              disabled={selectedOption === null}
              className={`font-['DM_Sans'] text-sm font-medium px-8 py-3 rounded border-none cursor-pointer transition-colors ${
                selectedOption === null
                  ? "bg-[#3B2A22]/10 text-[#3B2A22]/30 cursor-default"
                  : "bg-[#C1603A] text-[#FAF7F2] hover:bg-[#a8512f]"
              }`}
            >
              {currentIndex === totalQuestions - 1 ? "See My Results" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
