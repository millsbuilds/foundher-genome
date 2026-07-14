import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import QuizEntry from "./QuizEntry";
import Quiz from "./Quiz";
import ResultPage from "./ResultPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/quiz" element={<QuizEntry />} />
      <Route path="/quiz/questions" element={<Quiz />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}
