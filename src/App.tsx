import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import QuizEntry from "./QuizEntry";
import Quiz from "./Quiz";
import ResultPage from "./ResultPage";
import DemoResult from "./DemoResult";
import PasswordGate from "./PasswordGate";

export default function App() {
  return (
    <Routes>
      <Route path="/demo" element={<DemoResult />} />
      <Route path="*" element={
        <PasswordGate>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/quiz" element={<QuizEntry />} />
            <Route path="/quiz/questions" element={<Quiz />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </PasswordGate>
      } />
    </Routes>
  );
}
