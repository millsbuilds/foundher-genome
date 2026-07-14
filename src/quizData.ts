export type Pole =
  | "E" | "P"   // Vision Style: Expansive / Precise
  | "I" | "S"   // Build Mode: Intuitive / Systematic
  | "D" | "X"   // Market Instinct: Deepener / Disruptor
  | "C" | "R"   // Growth Engine: Scale / Relationship
  | "N" | "A";  // Technology: Native / Adaptive

export type Axis = "vision" | "build" | "market" | "growth" | "tech";

export interface ScoreEntry {
  pole: Pole;
  axis: Axis;
  points: number;
}

export interface QuizOption {
  label: string; // "A", "B", "C", "D"
  text: string;
  scores: ScoreEntry[];
}

export interface QuizQuestion {
  id: number;
  type: "scenario" | "image_pick";
  axis: Axis | "cross"; // "cross" for cross-axis questions
  prompt: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  // ─── AXIS 1: Vision Style (E vs P) ───
  {
    id: 1,
    type: "scenario",
    axis: "vision",
    prompt: "A year from now, how is this business naturally wired to grow?",
    options: [
      {
        label: "A",
        text: "It keeps expanding \u2014 new directions, new markets, new possibilities opening up as it builds.",
        scores: [{ pole: "E", axis: "vision", points: 3 }],
      },
      {
        label: "B",
        text: "It\u2019s comfortable in a crowded space \u2014 it knows how it fits and grows confidently within it.",
        scores: [{ pole: "E", axis: "vision", points: 1 }],
      },
      {
        label: "C",
        text: "It\u2019s focused on one strong position and deepening it \u2014 clarity is its edge.",
        scores: [{ pole: "P", axis: "vision", points: 1 }],
      },
      {
        label: "D",
        text: "It does one thing better than anyone else in this space. Precision is its DNA.",
        scores: [{ pole: "P", axis: "vision", points: 3 }],
      },
    ],
  },
  {
    id: 2,
    type: "scenario",
    axis: "vision",
    prompt: "A new market opportunity appears adjacent to where this business operates. How does it respond?",
    options: [
      {
        label: "A",
        text: "It\u2019s already moving toward it. This business is wired to expand into adjacent territory.",
        scores: [{ pole: "E", axis: "vision", points: 3 }],
      },
      {
        label: "B",
        text: "It pauses to understand how the opportunity connects to where it\u2019s already headed before deciding.",
        scores: [{ pole: "E", axis: "vision", points: 1 }],
      },
      {
        label: "C",
        text: "It files it away. This business doesn\u2019t dilute its focus until it owns what\u2019s in front of it.",
        scores: [{ pole: "P", axis: "vision", points: 1 }],
      },
      {
        label: "D",
        text: "Hard pass. This business doesn\u2019t move until its current position is dominant.",
        scores: [{ pole: "P", axis: "vision", points: 3 }],
      },
    ],
  },
  {
    id: 3,
    type: "image_pick",
    axis: "vision",
    prompt: "Pick the image that feels most like how this business sees opportunity.",
    options: [
      {
        label: "A",
        text: "Wide aerial landscape, open horizon, multiple paths visible",
        scores: [{ pole: "E", axis: "vision", points: 3 }],
      },
      {
        label: "B",
        text: "A city being built from above \u2014 structured but expansive",
        scores: [{ pole: "E", axis: "vision", points: 1 }],
      },
      {
        label: "C",
        text: "A single well-worn path through a forest, clear destination ahead",
        scores: [{ pole: "P", axis: "vision", points: 1 }],
      },
      {
        label: "D",
        text: "A single door, perfectly framed, sharp focus",
        scores: [{ pole: "P", axis: "vision", points: 3 }],
      },
    ],
  },

  // ─── AXIS 2: Build Mode (I vs S) ───
  {
    id: 4,
    type: "scenario",
    axis: "build",
    prompt: "When this business starts something new, how does it move?",
    options: [
      {
        label: "A",
        text: "It dives in and figures it out in motion. This business builds best by doing.",
        scores: [{ pole: "I", axis: "build", points: 3 }],
      },
      {
        label: "B",
        text: "It moves with a general sense of direction, adjusting as it learns.",
        scores: [{ pole: "I", axis: "build", points: 1 }],
      },
      {
        label: "C",
        text: "It needs a rough framework before it executes \u2014 not perfect, but a map.",
        scores: [{ pole: "S", axis: "build", points: 1 }],
      },
      {
        label: "D",
        text: "It builds the system first. This business doesn\u2019t execute without structure.",
        scores: [{ pole: "S", axis: "build", points: 3 }],
      },
    ],
  },
  {
    id: 5,
    type: "scenario",
    axis: "build",
    prompt: "This business hits an unexpected obstacle. What happens next?",
    options: [
      {
        label: "A",
        text: "It pivots immediately on instinct. The new direction reveals itself in motion.",
        scores: [{ pole: "I", axis: "build", points: 3 }],
      },
      {
        label: "B",
        text: "It pauses, then moves on instinct \u2014 staying open to what the data shows afterward.",
        scores: [{ pole: "I", axis: "build", points: 1 }],
      },
      {
        label: "C",
        text: "It reads the numbers, builds a revised plan, then moves.",
        scores: [{ pole: "S", axis: "build", points: 1 }],
      },
      {
        label: "D",
        text: "It stops, diagnoses the failure, fixes the process, then moves forward.",
        scores: [{ pole: "S", axis: "build", points: 3 }],
      },
    ],
  },
  {
    id: 6,
    type: "image_pick",
    axis: "build",
    prompt: "Pick the image that feels most like how this business operates.",
    options: [
      {
        label: "A",
        text: "A painter mid-stroke, no sketch underneath, pure expression on canvas",
        scores: [{ pole: "I", axis: "build", points: 3 }],
      },
      {
        label: "B",
        text: "A chef cooking without a recipe, tasting and adjusting as she goes",
        scores: [{ pole: "I", axis: "build", points: 1 }],
      },
      {
        label: "C",
        text: "An architect reviewing blueprints with a few handwritten notes in the margins",
        scores: [{ pole: "S", axis: "build", points: 1 }],
      },
      {
        label: "D",
        text: "A control room \u2014 every screen lit, every system monitored, everything mapped",
        scores: [{ pole: "S", axis: "build", points: 3 }],
      },
    ],
  },

  // ─── AXIS 3: Market Instinct (D vs X) ───
  {
    id: 7,
    type: "scenario",
    axis: "market",
    prompt: "This business is entering a market with established players. How does it compete?",
    options: [
      {
        label: "A",
        text: "It goes deeper than anyone else has gone. There\u2019s always an underserved layer nobody has reached yet.",
        scores: [{ pole: "D", axis: "market", points: 3 }],
      },
      {
        label: "B",
        text: "It finds the gap the others are missing and carves out its own corner quietly.",
        scores: [{ pole: "D", axis: "market", points: 1 }],
      },
      {
        label: "C",
        text: "It takes what exists and turns it sideways \u2014 same market, completely different approach.",
        scores: [{ pole: "X", axis: "market", points: 1 }],
      },
      {
        label: "D",
        text: "The existing model is broken. This business isn\u2019t competing with it \u2014 it\u2019s replacing it.",
        scores: [{ pole: "X", axis: "market", points: 3 }],
      },
    ],
  },
  {
    id: 8,
    type: "scenario",
    axis: "market",
    prompt: "When you look at the industry this business operates in, what does it see?",
    options: [
      {
        label: "A",
        text: "Depth that hasn\u2019t been explored \u2014 customers nobody is truly serving, problems nobody has fully solved.",
        scores: [{ pole: "D", axis: "market", points: 3 }],
      },
      {
        label: "B",
        text: "Underserved pockets \u2014 exactly where the current players are leaving people behind.",
        scores: [{ pole: "D", axis: "market", points: 1 }],
      },
      {
        label: "C",
        text: "Cracks in the existing model \u2014 where it\u2019s starting to break and an opening is forming.",
        scores: [{ pole: "X", axis: "market", points: 1 }],
      },
      {
        label: "D",
        text: "An opportunity to make the whole thing obsolete. This business isn\u2019t here to improve what exists \u2014 it\u2019s here to replace it.",
        scores: [{ pole: "X", axis: "market", points: 3 }],
      },
    ],
  },
  {
    id: 9,
    type: "image_pick",
    axis: "market",
    prompt: "Pick the image that feels most like how this business sees its market.",
    options: [
      {
        label: "A",
        text: "A lone hiker who has gone further down the trail than anyone else \u2014 open sky above, uncharted territory ahead",
        scores: [{ pole: "D", axis: "market", points: 3 }],
      },
      {
        label: "B",
        text: "A woman planting a flag in a quiet, unclaimed field",
        scores: [{ pole: "D", axis: "market", points: 1 }],
      },
      {
        label: "C",
        text: "A wrecking ball mid-swing, existing structure still standing",
        scores: [{ pole: "X", axis: "market", points: 1 }],
      },
      {
        label: "D",
        text: "A controlled demolition \u2014 a building coming down in a perfect planned collapse, something new already drawn in the background",
        scores: [{ pole: "X", axis: "market", points: 3 }],
      },
    ],
  },

  // ─── AXIS 4: Growth Engine (C vs R) ───
  {
    id: 10,
    type: "scenario",
    axis: "growth",
    prompt: "How is this business wired to grow?",
    options: [
      {
        label: "A",
        text: "It builds systems, infrastructure, and automation that grow without requiring constant involvement.",
        scores: [{ pole: "C", axis: "growth", points: 3 }],
      },
      {
        label: "B",
        text: "It\u2019s building for scale but knows early growth requires showing up \u2014 it will systematize once it has traction.",
        scores: [{ pole: "C", axis: "growth", points: 1 }],
      },
      {
        label: "C",
        text: "It grows by building community \u2014 when the people around it become advocates, growth takes care of itself.",
        scores: [{ pole: "R", axis: "growth", points: 1 }],
      },
      {
        label: "D",
        text: "It grows one relationship at a time. Its most important moments have always come from one person trusting it enough to open a door.",
        scores: [{ pole: "R", axis: "growth", points: 3 }],
      },
    ],
  },
  {
    id: 11,
    type: "scenario",
    axis: "growth",
    prompt: "This business has $5,000 to invest in growth right now. Where does it go?",
    options: [
      {
        label: "A",
        text: "Technology or systems that remove friction and let the business run without constant involvement.",
        scores: [{ pole: "C", axis: "growth", points: 3 }],
      },
      {
        label: "B",
        text: "A tool or platform that delivers better data, better automation, or better reach at scale.",
        scores: [{ pole: "C", axis: "growth", points: 1 }],
      },
      {
        label: "C",
        text: "Building its presence online \u2014 content, visibility, and a following that grows the business by growing its voice.",
        scores: [{ pole: "R", axis: "growth", points: 1 }],
      },
      {
        label: "D",
        text: "A targeted outreach strategy \u2014 deepening relationships with the exact people who can move it forward.",
        scores: [{ pole: "R", axis: "growth", points: 3 }],
      },
    ],
  },
  {
    id: 12,
    type: "image_pick",
    axis: "growth",
    prompt: "Pick the image that feels most like how this business grows.",
    options: [
      {
        label: "A",
        text: "A dashboard lit up with live metrics, graphs climbing, everything automated and running",
        scores: [{ pole: "C", axis: "growth", points: 3 }],
      },
      {
        label: "B",
        text: "An aerial view of a massive, perfectly organized warehouse \u2014 scale you can feel just by looking",
        scores: [{ pole: "C", axis: "growth", points: 1 }],
      },
      {
        label: "C",
        text: "A woman speaking to a crowd, every face turned toward her, community forming in real time",
        scores: [{ pole: "R", axis: "growth", points: 1 }],
      },
      {
        label: "D",
        text: "Two women deep in conversation over coffee, one leaning in, something important being exchanged",
        scores: [{ pole: "R", axis: "growth", points: 3 }],
      },
    ],
  },

  // ─── AXIS 5: Technology (N vs A) ───
  {
    id: 13,
    type: "scenario",
    axis: "tech",
    prompt: "When a new AI tool or technology platform emerges in this industry, how does this business respond?",
    options: [
      {
        label: "A",
        text: "It\u2019s already in it before most people know it exists. Technology is core to how this business thinks and builds.",
        scores: [{ pole: "N", axis: "tech", points: 3 }],
      },
      {
        label: "B",
        text: "It adopts early \u2014 it wants to understand new technology quickly and find where it fits.",
        scores: [{ pole: "N", axis: "tech", points: 1 }],
      },
      {
        label: "C",
        text: "It watches how others use it first, then adopts what makes sense for its specific model.",
        scores: [{ pole: "A", axis: "tech", points: 1 }],
      },
      {
        label: "D",
        text: "It adopts technology when it solves a real problem the business already has. It doesn\u2019t chase tools for the sake of it.",
        scores: [{ pole: "A", axis: "tech", points: 3 }],
      },
    ],
  },
  {
    id: 14,
    type: "scenario",
    axis: "tech",
    prompt: "How would you describe this business\u2019s relationship with AI right now?",
    options: [
      {
        label: "A",
        text: "It\u2019s building with AI, not just using it. AI is embedded in how this business thinks, creates, and operates.",
        scores: [{ pole: "N", axis: "tech", points: 3 }],
      },
      {
        label: "B",
        text: "AI is integrated into most of what this business does \u2014 it\u2019s become a natural part of how it works.",
        scores: [{ pole: "N", axis: "tech", points: 1 }],
      },
      {
        label: "C",
        text: "This business uses AI for specific tasks where it clearly saves time or improves output.",
        scores: [{ pole: "A", axis: "tech", points: 1 }],
      },
      {
        label: "D",
        text: "This business uses AI when it has to. It stays in control of its process and brings in technology on its own terms.",
        scores: [{ pole: "A", axis: "tech", points: 3 }],
      },
    ],
  },
  {
    id: 15,
    type: "image_pick",
    axis: "tech",
    prompt: "Pick the image that feels most like this business\u2019s relationship with technology.",
    options: [
      {
        label: "A",
        text: "A woman\u2019s hands on a keyboard, screen reflecting in her glasses, fully absorbed \u2014 technology is her first language",
        scores: [{ pole: "N", axis: "tech", points: 3 }],
      },
      {
        label: "B",
        text: "A woman at a sleek desk, AI dashboard open, seamlessly moving between tools and ideas",
        scores: [{ pole: "N", axis: "tech", points: 1 }],
      },
      {
        label: "C",
        text: "A woman at a whiteboard, laptop open beside her, using technology to support her thinking",
        scores: [{ pole: "A", axis: "tech", points: 1 }],
      },
      {
        label: "D",
        text: "A woman writing in a notebook, phone face down, technology present but not dominant",
        scores: [{ pole: "A", axis: "tech", points: 3 }],
      },
    ],
  },

  // ─── CROSS-AXIS QUESTIONS ───
  {
    id: 16,
    type: "scenario",
    axis: "cross",
    prompt: "This business has a big new idea. What happens next?",
    options: [
      {
        label: "A",
        text: "It starts building immediately \u2014 the idea gets clearer in motion. Planning slows this business down.",
        scores: [
          { pole: "E", axis: "vision", points: 3 },
          { pole: "I", axis: "build", points: 3 },
        ],
      },
      {
        label: "B",
        text: "It sketches the broad strokes and starts moving \u2014 no full plan needed, just enough to begin.",
        scores: [
          { pole: "E", axis: "vision", points: 1 },
          { pole: "I", axis: "build", points: 1 },
        ],
      },
      {
        label: "C",
        text: "It maps carefully before touching it \u2014 a big idea deserves a solid foundation before execution.",
        scores: [
          { pole: "P", axis: "vision", points: 1 },
          { pole: "S", axis: "build", points: 1 },
        ],
      },
      {
        label: "D",
        text: "It pressure tests first. This business wants to know exactly what it\u2019s building and how before investing a single hour.",
        scores: [
          { pole: "P", axis: "vision", points: 3 },
          { pole: "S", axis: "build", points: 3 },
        ],
      },
    ],
  },
  {
    id: 17,
    type: "scenario",
    axis: "cross",
    prompt: "This business has found its place in the market. How does it own it?",
    options: [
      {
        label: "A",
        text: "It goes deeper than anyone else and builds the infrastructure to hold that position permanently.",
        scores: [
          { pole: "D", axis: "market", points: 3 },
          { pole: "C", axis: "growth", points: 3 },
        ],
      },
      {
        label: "B",
        text: "It establishes depth in the market and grows a community around what it knows better than anyone.",
        scores: [
          { pole: "D", axis: "market", points: 1 },
          { pole: "R", axis: "growth", points: 1 },
        ],
      },
      {
        label: "C",
        text: "It disrupts the existing model and scales fast before anyone can catch up.",
        scores: [
          { pole: "X", axis: "market", points: 1 },
          { pole: "C", axis: "growth", points: 1 },
        ],
      },
      {
        label: "D",
        text: "It blows up the old way of doing things and brings people along \u2014 its movement becomes its market.",
        scores: [
          { pole: "X", axis: "market", points: 3 },
          { pole: "R", axis: "growth", points: 3 },
        ],
      },
    ],
  },
  {
    id: 18,
    type: "scenario",
    axis: "cross",
    prompt: "A powerful new AI capability lands in this industry. How does this business respond?",
    options: [
      {
        label: "A",
        text: "It immediately sees ten directions it could take it \u2014 and starts building before it\u2019s finished deciding which one.",
        scores: [
          { pole: "N", axis: "tech", points: 3 },
          { pole: "E", axis: "vision", points: 3 },
        ],
      },
      {
        label: "B",
        text: "It jumps in and experiments \u2014 the possibilities are exciting and it wants to explore all of them.",
        scores: [
          { pole: "N", axis: "tech", points: 1 },
          { pole: "E", axis: "vision", points: 1 },
        ],
      },
      {
        label: "C",
        text: "It looks carefully and identifies the one specific way this capability could sharpen what it\u2019s already doing.",
        scores: [
          { pole: "A", axis: "tech", points: 1 },
          { pole: "P", axis: "vision", points: 1 },
        ],
      },
      {
        label: "D",
        text: "It watches, assesses, and adopts only when it knows exactly how this serves its precise vision \u2014 not before.",
        scores: [
          { pole: "A", axis: "tech", points: 3 },
          { pole: "P", axis: "vision", points: 3 },
        ],
      },
    ],
  },
];
