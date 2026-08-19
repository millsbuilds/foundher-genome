import ResultPage from "./ResultPage";
import type { DNAResult, AxisResult } from "./genomeTypes";

const demoResult: DNAResult = {
  code: "E \u00b7 I \u00b7 D \u00b7 C \u00b7 N",
  name: "The Visionary",
  description:
    "You are the founder who sees what isn\u2019t there yet. Not a gap in the market \u2014 a market that doesn\u2019t exist. Your vision operates ahead of the culture, ahead of the conversation, ahead of the capital. You don\u2019t follow trends; you sense the conditions that will create them. Where others see risk, you see inevitability. Where others need proof, you already know. The challenge isn\u2019t your vision \u2014 it\u2019s finding the world patient enough to catch up to it. When a Visionary Founder gets her timing right, she doesn\u2019t just build a company. She builds a category.",
  advantages: [
    "You see market depth that others miss entirely \u2014 you find the customers, the problems, and the opportunities that no one else is serving.",
    "You build scalable infrastructure instinctively \u2014 you are designed to grow without requiring more of your time.",
    "You adopt and integrate technology faster than your competitors, giving you a permanent speed advantage.",
  ],
  blindSpots: [
    "Your expansive vision can pull you in too many directions at once \u2014 depth without focus becomes dilution.",
    "You move so fast on intuition that you can skip the validation step, building something the market didn\u2019t ask for.",
  ],
  aiAreas: [
    "Market intelligence and opportunity mapping \u2014 AI that surfaces underserved segments before your competitors see them.",
    "Automated scaling systems \u2014 AI that builds, monitors, and optimizes your growth infrastructure while you focus on vision.",
    "Rapid product iteration \u2014 AI that helps you prototype, test, and ship faster than any human team could alone.",
  ],
};

const demoAxisResults: AxisResult[] = [
  {
    name: "Vision Style",
    dominantCode: "E",
    dominantLabel: "Expansive",
    description: "You see opportunity everywhere. Your natural instinct is to expand \u2014 new directions, new markets, new possibilities. This expansive vision is a force multiplier when paired with the right execution strategy.",
  },
  {
    name: "Build Mode",
    dominantCode: "I",
    dominantLabel: "Intuitive",
    description: "You build best in motion. You move on instinct, iterate fast, and find your direction through action rather than planning. This intuitive approach lets you capitalize on opportunities others are still analyzing.",
  },
  {
    name: "Market Instinct",
    dominantCode: "D",
    dominantLabel: "Deepener",
    description: "You go deeper than anyone else in your market. You find the underserved layers, the unmet needs, the customers nobody else is truly reaching. This depth creates loyalty and expertise that surface-level competitors cannot replicate.",
  },
  {
    name: "Growth Engine",
    dominantCode: "C",
    dominantLabel: "Scale",
    description: "You are engineered to scale. You build systems, infrastructure, and automation that grow without requiring your constant involvement. This scale-driven engine means you compound in value, not in complexity.",
  },
  {
    name: "Technology",
    dominantCode: "N",
    dominantLabel: "Native",
    description: "Technology is embedded in how you think, create, and operate. It\u2019s not a tool you reach for \u2014 it\u2019s the environment you build in. This native fluency gives you a permanent speed and capability advantage.",
  },
];

const demoData = {
  result: demoResult,
  axisResults: demoAxisResults,
  firstName: "Founder",
};

export default function DemoResult() {
  return <ResultPage demoData={demoData} />;
}
