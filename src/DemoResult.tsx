import ResultPage from "./ResultPage";
import { getDNAResult } from "./genomeTypes";
import type { AxisScores } from "./genomeTypes";

const demoScores: AxisScores = {
  vision: { E: 12, P: 0 },
  build: { I: 12, S: 0 },
  market: { D: 12, X: 0 },
  growth: { C: 12, R: 0 },
  tech: { N: 12, A: 0 },
};

const demoData = {
  result: getDNAResult(demoScores),
  scores: demoScores,
  firstName: "Founder",
};

export default function DemoResult() {
  return <ResultPage demoData={demoData} />;
}
