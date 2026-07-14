import type { ScoreEntry } from "./quizData";

export interface AxisScores {
  vision: { E: number; P: number };
  build: { I: number; S: number };
  market: { D: number; X: number };
  growth: { C: number; R: number };
  tech: { N: number; A: number };
}

export interface GenomeResult {
  code: string; // e.g. "E · I · D · C · N"
  name: string;
  description: string;
  advantages: string[];
  blindSpots: string[];
  aiAreas: string[];
}

export function calculateScores(answers: ScoreEntry[][]): AxisScores {
  const scores: AxisScores = {
    vision: { E: 0, P: 0 },
    build: { I: 0, S: 0 },
    market: { D: 0, X: 0 },
    growth: { C: 0, R: 0 },
    tech: { N: 0, A: 0 },
  };

  for (const questionScores of answers) {
    for (const entry of questionScores) {
      const axis = scores[entry.axis];
      (axis as Record<string, number>)[entry.pole] += entry.points;
    }
  }

  return scores;
}

export function getGenomeCode(scores: AxisScores): string {
  const vision = scores.vision.E >= scores.vision.P ? "E" : "P";
  const build = scores.build.I >= scores.build.S ? "I" : "S";
  const market = scores.market.D >= scores.market.X ? "D" : "X";
  const growth = scores.growth.C >= scores.growth.R ? "C" : "R";
  const tech = scores.tech.N >= scores.tech.A ? "N" : "A";
  return `${vision} \u00b7 ${build} \u00b7 ${market} \u00b7 ${growth} \u00b7 ${tech}`;
}

export function getRawCode(scores: AxisScores): string {
  const vision = scores.vision.E >= scores.vision.P ? "E" : "P";
  const build = scores.build.I >= scores.build.S ? "I" : "S";
  const market = scores.market.D >= scores.market.X ? "D" : "X";
  const growth = scores.growth.C >= scores.growth.R ? "C" : "R";
  const tech = scores.tech.N >= scores.tech.A ? "N" : "A";
  return `${vision}${build}${market}${growth}${tech}`;
}

interface AnchorType {
  name: string;
  description: string;
  advantages: string[];
  blindSpots: string[];
  aiAreas: string[];
}

const anchorTypes: Record<string, AnchorType> = {
  EIDCN: {
    name: "Deepscale",
    description:
      "You are the founder who sees everything and builds accordingly. Your vision is wide, your instincts are sharp, and you move before the market knows what hit it. You go deep where others skim the surface, and you build infrastructure that scales without you. Technology isn\u2019t a tool you use \u2014 it\u2019s the air you breathe. You are wired to build something massive, something lasting, something that changes the rules. The risk isn\u2019t that you won\u2019t build it. The risk is that you\u2019ll build so fast and so wide that you outrun your own foundation. But when a Deepscale founder gets her systems right, she doesn\u2019t just win her market \u2014 she redefines it.",
    advantages: [
      "You see market depth that others miss entirely \u2014 you find the customers, the problems, and the opportunities that no one else is serving.",
      "You build scalable infrastructure instinctively \u2014 your business is designed to grow without requiring more of your time.",
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
  },
  PSXRA: {
    name: "Shiftwork",
    description:
      "You are the founder who builds with precision, patience, and a blueprint that would make an engineer jealous. Where others rush in, you plan. Where others guess, you measure. You see the cracks in existing models and you know exactly how to exploit them \u2014 not by blowing things up, but by building something so structurally sound that the old way simply becomes irrelevant. Your relationships are your distribution channel. People trust you because you deliver exactly what you said you would, every single time. Technology serves you on your terms. You are not here to chase trends \u2014 you are here to build something that stands.",
    advantages: [
      "Your systematic approach means every dollar and every hour is deployed with surgical precision \u2014 you waste nothing.",
      "Your relationship-driven growth creates a moat that no competitor can buy or replicate \u2014 trust is your currency.",
      "You see structural weaknesses in existing markets and build alternatives that are impossible to ignore.",
    ],
    blindSpots: [
      "Your need for a complete plan before you move can cost you first-mover advantage in fast-moving markets.",
      "You can over-invest in relationships that feel productive but don\u2019t convert to revenue or growth at the rate your business needs.",
    ],
    aiAreas: [
      "Strategic planning and scenario modeling \u2014 AI that pressure-tests your plans before you invest real resources.",
      "Relationship intelligence \u2014 AI that tracks, nurtures, and optimizes your most valuable business relationships.",
      "Competitive analysis and market positioning \u2014 AI that maps the structural gaps in your market so you can build into them with precision.",
    ],
  },
  PIDCN: {
    name: "Exactcore",
    description:
      "You are the founder who combines laser focus with raw instinct \u2014 and it works. Your vision is precise, your moves are intuitive, and your market strategy is to go deeper than anyone thought possible. You scale through systems and technology, building infrastructure that holds your depth in place while you keep pushing further. You don\u2019t need to see every possibility. You need to see the right one \u2014 and you always do. Where other founders spread thin chasing breadth, you drill down until you own the space entirely. Your competitors don\u2019t lose to you on speed. They lose to you because by the time they arrive, you\u2019ve already built something they can\u2019t replicate.",
    advantages: [
      "Your precise vision paired with intuitive execution means you move decisively into exactly the right opportunities \u2014 no wasted motion.",
      "Your deep market focus creates expertise and customer loyalty that no surface-level competitor can touch.",
      "Your tech-native, scale-driven approach means your business compounds in value without compounding in complexity.",
    ],
    blindSpots: [
      "Your precision can become rigidity \u2014 when the market shifts, your instinct to stay the course may keep you locked on a target that\u2019s moved.",
      "Your depth-first approach can make you invisible to the broader market, letting competitors with less substance but more visibility capture attention you deserve.",
    ],
    aiAreas: [
      "Deep market analysis and customer intelligence \u2014 AI that maps the layers of your market at the depth your strategy demands.",
      "Automated infrastructure and scaling systems \u2014 AI that builds and maintains the operational backbone your focused growth requires.",
      "Precision product development \u2014 AI that helps you refine and iterate on your core offering with speed that matches your instincts.",
    ],
  },
  ESDCN: {
    name: "Coreframe",
    description:
      "You are the founder who builds empires on blueprints. Your vision is expansive, your process is systematic, and your market instinct is to go deep where others go wide. You scale through infrastructure and technology because you understand that lasting growth isn\u2019t built on hustle \u2014 it\u2019s built on systems. You see the full landscape, but you don\u2019t scatter. You map it, you plan it, and you execute it with the kind of operational discipline that turns ambitious visions into inevitable outcomes. You are the founder who makes the complex look simple, because behind every move is a framework you\u2019ve already stress-tested.",
    advantages: [
      "Your expansive vision combined with systematic execution means you can pursue big opportunities without losing operational control.",
      "Your deep market focus ensures you\u2019re building on substance, not hype \u2014 your growth is rooted in real customer value.",
      "Your tech-native, infrastructure-first approach creates a business that scales predictably and efficiently.",
    ],
    blindSpots: [
      "Your need to systematize everything can slow your response to opportunities that reward speed and improvisation over planning.",
      "Your expansive vision paired with systematic process can create over-engineered solutions when simpler approaches would move faster.",
    ],
    aiAreas: [
      "Strategic systems design and workflow automation \u2014 AI that helps you build the operational frameworks your expansive vision requires.",
      "Market depth analysis and opportunity mapping \u2014 AI that surfaces the deep, underserved segments where your systematic approach creates the most value.",
      "Scalable infrastructure optimization \u2014 AI that monitors, stress-tests, and improves your growth systems in real time.",
    ],
  },
  EIXCN: {
    name: "Breakscale",
    description:
      "You are the founder who moves at a speed that terrifies your competition. Your vision is massive, your instincts are razor-sharp, and you don\u2019t wait for permission or a plan \u2014 you build. You see broken markets and you don\u2019t just want to fix them, you want to replace them entirely. You scale through systems, technology, and infrastructure because you know that the only way to capture a market at speed is to remove yourself from the bottleneck. You are a force. The question has never been whether you can build it. The question is whether you can stay disciplined enough to let the foundation catch up to the vision.",
    advantages: [
      "You move faster than any competitor in your space \u2014 your combination of vision, intuition, and tech fluency is a genuine unfair advantage.",
      "You build for disruption and scale simultaneously \u2014 while others are still planning, you\u2019re already in-market and iterating.",
      "Your technology-native approach means you integrate AI and automation from day one, not as an afterthought.",
    ],
    blindSpots: [
      "Speed without systems can create chaos \u2014 your team, your ops, and your customers can struggle to keep up with your pace.",
      "Your disruptive instinct can make you dismiss existing models too quickly, missing opportunities to build on what already works.",
    ],
    aiAreas: [
      "Speed-to-market acceleration \u2014 AI that compresses your build-test-launch cycle from months to weeks.",
      "Operational automation \u2014 AI that handles the systems and processes you don\u2019t have time to manage manually.",
      "Market disruption intelligence \u2014 AI that identifies the exact pressure points in existing models where your approach will hit hardest.",
    ],
  },
  EIDRN: {
    name: "Deeproot",
    description:
      "You are the founder who leads with vision and heart. You see the big picture, you trust your gut, and you grow by bringing people with you. Your market instinct is to go deep \u2014 to find the underserved, the overlooked, the people who have been waiting for someone to finally build something that actually works for them. Your relationships are your superpower. People don\u2019t just buy from you, they believe in you. Technology is your amplifier, and you wield it fluently. You are building a movement as much as a business, and that is exactly what makes you dangerous to every competitor who thinks growth only comes from ad spend and automation.",
    advantages: [
      "Your ability to build genuine community and loyalty around your brand creates organic growth that money cannot buy.",
      "Your intuitive read on underserved markets means you consistently find opportunities before they become obvious.",
      "Your expansive vision paired with relational depth and tech fluency means your customers become your evangelists, scaling your reach through trust and technology together.",
    ],
    blindSpots: [
      "Your reliance on intuition and relationships can make it hard to systematize growth when the business needs to scale beyond your personal reach.",
      "Your depth-first, relationship-driven model can limit your speed to market when opportunities demand infrastructure before community.",
    ],
    aiAreas: [
      "Community building and engagement \u2014 AI that helps you nurture and grow your audience without losing the personal touch that makes you magnetic.",
      "Content and brand amplification \u2014 AI that scales your voice, your message, and your visibility while keeping it authentically you.",
      "Customer insight and market sensing \u2014 AI that translates your intuitive market reads into data-backed strategies you can act on with confidence.",
    ],
  },
  EIDCA: {
    name: "Groundshift",
    description:
      "You are the founder who sees everything, moves on instinct, goes deeper than anyone, and builds to scale \u2014 all while keeping technology in its place. You don\u2019t chase tools. You adopt them when they\u2019ve earned it. Your vision is expansive, your execution is intuitive, and your market strategy is to find the layer nobody else has reached and build infrastructure to own it. Technology serves your business, not the other way around. You are the founder who proves that you don\u2019t need to be tech-obsessed to build something massive \u2014 you just need to be right about what matters. And you usually are.",
    advantages: [
      "Your expansive vision and intuitive speed let you identify and move on deep market opportunities faster than competitors who are still planning.",
      "Your scale-driven growth engine means you build businesses designed to run without you \u2014 your infrastructure does the heavy lifting.",
      "Your disciplined approach to technology means every tool you adopt is fully leveraged \u2014 you don\u2019t waste time or money on what doesn\u2019t serve the mission.",
    ],
    blindSpots: [
      "Your adaptive relationship with technology can leave you under-leveraged in markets where early AI adoption creates a decisive competitive edge.",
      "Your intuitive, expansive approach can outpace your ability to build the systems needed to capture what your vision creates.",
    ],
    aiAreas: [
      "Strategic technology assessment \u2014 AI that evaluates emerging tools against your specific business model so you adopt only what creates real leverage.",
      "Scalable operations and infrastructure \u2014 AI that automates the systems your growth demands without requiring you to become a technology-first operator.",
      "Market intelligence and depth analysis \u2014 AI that maps underserved segments and surfaces opportunities aligned with your deep market instinct.",
    ],
  },
  PSXRN: {
    name: "Shiftmark",
    description:
      "You are the founder who disrupts with discipline. Your vision is precise, your process is systematic, and your market instinct is to break what\u2019s broken \u2014 but on your terms, on your timeline, with a plan. You grow through relationships because you know that the most powerful disruptions aren\u2019t just about better products \u2014 they\u2019re about better trust. Technology is your native language, and you use it to build movements that feel personal even as they scale. You are the founder who makes disruption look inevitable, because by the time the market sees you coming, you\u2019ve already built the infrastructure to stay.",
    advantages: [
      "Your systematic approach to disruption means you don\u2019t just break things \u2014 you replace them with something structurally superior.",
      "Your relationship-driven growth paired with tech fluency lets you build communities around your disruptive vision that become self-sustaining.",
      "Your precise, planned approach means every disruptive move is calculated for maximum impact with minimum waste.",
    ],
    blindSpots: [
      "Your systematic process can slow your disruption timeline \u2014 markets that reward speed may not wait for your plan to be complete.",
      "Your precision and relationship focus can make you over-invest in perfecting the approach before you\u2019ve validated the market\u2019s readiness for disruption.",
    ],
    aiAreas: [
      "Market disruption modeling and timing \u2014 AI that identifies exactly when and where to deploy your disruptive approach for maximum impact.",
      "Relationship intelligence and network mapping \u2014 AI that tracks and nurtures the relationships that will carry your disruption into the market.",
      "Systematic competitive analysis \u2014 AI that maps the structural weaknesses in existing models so your planned disruption hits with precision.",
    ],
  },
};

export function getGenomeResult(scores: AxisScores): GenomeResult {
  const code = getGenomeCode(scores);
  const rawCode = getRawCode(scores);
  const anchor = anchorTypes[rawCode];

  if (anchor) {
    return {
      code,
      name: anchor.name,
      description: anchor.description,
      advantages: anchor.advantages,
      blindSpots: anchor.blindSpots,
      aiAreas: anchor.aiAreas,
    };
  }

  // Non-anchor types: generate a placeholder result
  const poles = rawCode.split("");
  const visionLabel = poles[0] === "E" ? "Expansive" : "Precise";
  const buildLabel = poles[1] === "I" ? "Intuitive" : "Systematic";
  const marketLabel = poles[2] === "D" ? "Deepener" : "Disruptor";
  const growthLabel = poles[3] === "C" ? "Scale-Driven" : "Relationship-Driven";
  const techLabel = poles[4] === "N" ? "Tech-Native" : "Tech-Adaptive";

  return {
    code,
    name: `Genome Type: ${code}`,
    description: `You are a ${visionLabel.toLowerCase()}, ${buildLabel.toLowerCase()} founder with a ${marketLabel.toLowerCase()}\u2019s market instinct. Your growth engine is ${growthLabel.toLowerCase()} and your relationship with technology is ${techLabel.toLowerCase()}. This is a powerful combination \u2014 your Genome reveals a founder who builds with intention and moves with conviction. Your full Genome Report will map exactly how these traits interact, where your biggest leverage points are, and which AI tools are purpose-built for the way you operate.`,
    advantages: [
      `Your ${visionLabel.toLowerCase()} vision gives you the ability to see opportunities that others in your market consistently miss.`,
      `Your ${buildLabel.toLowerCase()} build mode means you execute in a way that feels natural and sustainable \u2014 you don\u2019t fight your own process.`,
      `Your ${marketLabel.toLowerCase()}\u2019s instinct ensures you\u2019re never competing on someone else\u2019s terms \u2014 you set the terms.`,
    ],
    blindSpots: [
      `Your ${visionLabel.toLowerCase()} approach may need deliberate counterbalancing to avoid ${poles[0] === "E" ? "overextension" : "tunnel vision"} as your business grows.`,
      `Your ${growthLabel.toLowerCase()} growth engine is powerful, but your full Genome Report will reveal the specific moments where it can become a bottleneck.`,
    ],
    aiAreas: [
      `Strategic planning and decision support \u2014 AI that matches the way your ${buildLabel.toLowerCase()} mind processes information and makes moves.`,
      `${poles[2] === "D" ? "Deep market intelligence" : "Market disruption analysis"} \u2014 AI that amplifies your natural ${marketLabel.toLowerCase()}\u2019s instinct with data you can act on immediately.`,
      `${poles[3] === "C" ? "Growth automation and scaling systems" : "Relationship management and network intelligence"} \u2014 AI that strengthens your ${growthLabel.toLowerCase()} engine without changing what makes it work.`,
    ],
  };
}
