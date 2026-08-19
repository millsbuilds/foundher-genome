export interface QuizOption {
  label: string; // "A", "B", "C", "D"
  text: string;
  image?: string;
}

export interface QuizQuestion {
  id: number;
  type: "scenario" | "image_pick";
  prompt: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  // ─── QUESTIONS 1–3: Vision Style ───
  {
    id: 1,
    type: "scenario",
    prompt: "When you imagine your business one year from now, what comes naturally?",
    options: [
      { label: "A", text: "I see multiple directions already opening up \u2014 the vision keeps expanding the more I build." },
      { label: "B", text: "I see myself in a crowded field and I\u2019m not worried \u2014 there\u2019s room for all of us and I know how I fit." },
      { label: "C", text: "I see one strong, focused position \u2014 I know exactly what I\u2019m building and where it\u2019s headed." },
      { label: "D", text: "I see one thing, done better than anyone else in this space. Precision is my edge." },
    ],
  },
  {
    id: 2,
    type: "scenario",
    prompt: "A new market opportunity appears adjacent to your current focus. Your instinct is:",
    options: [
      { label: "A", text: "I\u2019m already thinking about how to build it in parallel. More territory, more opportunity." },
      { label: "B", text: "Interesting \u2014 let me understand how it connects to where I\u2019m already headed before I decide." },
      { label: "C", text: "I\u2019ll file it away. When I\u2019ve fully captured what\u2019s in front of me, maybe." },
      { label: "D", text: "Hard pass. I don\u2019t move until my current focus is dominant." },
    ],
  },
  {
    id: 3,
    type: "image_pick",
    prompt: "Pick the image that feels like how you think.",
    options: [
      { label: "A", text: "Wide aerial landscape, open horizon, multiple paths visible", image: "/images/FH_quiz-q3-A.jpg" },
      { label: "B", text: "A city being built from above \u2014 structured but expansive", image: "/images/FH_quiz-q3-B.jpg" },
      { label: "C", text: "A single well-worn path through a forest, clear destination ahead", image: "/images/FH_quiz-q3-C.jpg" },
      { label: "D", text: "A single door, perfectly framed, sharp focus", image: "/images/FH_quiz-q3-D.jpg" },
    ],
  },

  // ─── QUESTIONS 4–6: Build Mode ───
  {
    id: 4,
    type: "scenario",
    prompt: "When you start something new in your business, what feels most natural?",
    options: [
      { label: "A", text: "I dive in and figure it out as I go. My best work happens in motion." },
      { label: "B", text: "I have a general sense of direction and start moving, but I\u2019m comfortable adjusting as I learn." },
      { label: "C", text: "I like to have a rough framework before I start \u2014 it doesn\u2019t have to be perfect but I need a map." },
      { label: "D", text: "I build a system first. Execution without structure wastes time and money." },
    ],
  },
  {
    id: 5,
    type: "scenario",
    prompt: "Your business hits an unexpected obstacle. What\u2019s your first move?",
    options: [
      { label: "A", text: "I trust my gut and pivot immediately. I\u2019ll figure out the details as the new direction reveals itself." },
      { label: "B", text: "I pause, take a beat, then move on instinct \u2014 but I stay open to what the data tells me after." },
      { label: "C", text: "I look at what the numbers are telling me and build a revised plan before I move." },
      { label: "D", text: "I stop everything, diagnose the system failure, fix the process, then move forward." },
    ],
  },
  {
    id: 6,
    type: "image_pick",
    prompt: "Pick the image that feels most like how you work.",
    options: [
      { label: "A", text: "A painter mid-stroke, no sketch underneath, pure expression on canvas", image: "/images/FH_quiz-q6-A.png" },
      { label: "B", text: "A chef cooking without a recipe, tasting and adjusting as she goes", image: "/images/FH_quiz-q6-B.png" },
      { label: "C", text: "An architect reviewing blueprints with a few handwritten notes in the margins", image: "/images/FH_quiz-q6-C.png" },
      { label: "D", text: "A control room \u2014 every screen lit, every system monitored, everything mapped", image: "/images/FH_quiz-q6-D.png" },
    ],
  },

  // ─── QUESTIONS 7–9: Market Instinct ───
  {
    id: 7,
    type: "scenario",
    prompt: "You\u2019re entering a market that already has established players. Your instinct is:",
    options: [
      { label: "A", text: "I\u2019ll go deeper than anyone else has gone. There\u2019s always an underserved layer nobody has reached yet." },
      { label: "B", text: "I see the gap they\u2019re all missing. I\u2019ll carve out my own corner and own it quietly." },
      { label: "C", text: "I\u2019ll take what exists and turn it sideways \u2014 same market, completely different approach." },
      { label: "D", text: "The existing model is broken. I\u2019m not competing with it, I\u2019m replacing it." },
    ],
  },
  {
    id: 8,
    type: "scenario",
    prompt: "When you look at your industry, what excites you most?",
    options: [
      { label: "A", text: "The depth that hasn\u2019t been explored yet \u2014 the customers nobody is truly serving, the problem nobody has fully solved." },
      { label: "B", text: "The underserved pockets \u2014 I can see exactly where the current players are leaving people behind." },
      { label: "C", text: "The cracks in the existing model \u2014 I can see where it\u2019s starting to break and I want to be there when it does." },
      { label: "D", text: "The opportunity to make the whole thing obsolete \u2014 I\u2019m not here to improve what exists, I\u2019m here to replace it." },
    ],
  },
  {
    id: 9,
    type: "image_pick",
    prompt: "Pick the image that feels most like how you see your market.",
    options: [
      { label: "A", text: "A lone hiker who has gone further down the trail than anyone else \u2014 open sky above, uncharted territory ahead", image: "/images/FH_quiz-q9-C.png" },
      { label: "B", text: "A woman planting a flag in a quiet, unclaimed field", image: "/images/FH_quiz-q9-D.png" },
      { label: "C", text: "A wrecking ball mid-swing, existing structure still standing", image: "/images/FH_quiz-q9-B.png" },
      { label: "D", text: "A controlled demolition \u2014 a building coming down in a perfect planned collapse, something new already drawn in the background", image: "/images/FH_quiz-q9-A.png" },
    ],
  },

  // ─── QUESTIONS 10–12: Growth Engine ───
  {
    id: 10,
    type: "scenario",
    prompt: "When you think about growing your business, what feels most natural to you?",
    options: [
      { label: "A", text: "I want to build something that scales without me \u2014 systems, infrastructure, and automation that grow while I sleep." },
      { label: "B", text: "I\u2019m building for scale but I know early growth comes from me showing up \u2014 I\u2019ll systematize once I have traction." },
      { label: "C", text: "I grow by building community \u2014 when the people around my brand become advocates, growth takes care of itself." },
      { label: "D", text: "I grow one relationship at a time. My most important business moments have always come from one person trusting me enough to open a door." },
    ],
  },
  {
    id: 11,
    type: "scenario",
    prompt: "You have $5,000 to invest in growth right now. Where does it go?",
    options: [
      { label: "A", text: "Technology or systems that remove me from a process and let the business run without my constant involvement." },
      { label: "B", text: "A tool or platform that gives me better data, better automation, or better reach at scale." },
      { label: "C", text: "Building my personal brand online \u2014 content, visibility, and a following that grows my business by growing my voice." },
      { label: "D", text: "A targeted outreach strategy \u2014 deepening relationships with the exact people who can move my business forward." },
    ],
  },
  {
    id: 12,
    type: "image_pick",
    prompt: "Pick the image that feels most like how your business grows.",
    options: [
      { label: "A", text: "A dashboard lit up with live metrics, graphs climbing, everything automated and running", image: "/images/FH_quiz-q12-A.png" },
      { label: "B", text: "An architecture that keeps working no matter how big it gets", image: "/images/FH_quiz-q12-B.png" },
      { label: "C", text: "A woman speaking to a crowd, every face turned toward her, community forming in real time", image: "/images/FH_quiz-q12-C.png" },
      { label: "D", text: "Two women deep in conversation over coffee, one leaning in, something important being exchanged", image: "/images/FH_quiz-q12-D.png" },
    ],
  },

  // ─── QUESTIONS 13–15: Technology ───
  {
    id: 13,
    type: "scenario",
    prompt: "When a new AI tool or technology platform emerges in your industry, what\u2019s your honest reaction?",
    options: [
      { label: "A", text: "I\u2019m already in it before most people know it exists. Technology is where I think and where I build." },
      { label: "B", text: "I\u2019m an early adopter \u2014 I want to understand it quickly and figure out how it fits into what I\u2019m building." },
      { label: "C", text: "I\u2019ll watch how others use it first, then adopt what makes sense for my specific business." },
      { label: "D", text: "I adopt technology when it solves a real problem I already have. I don\u2019t chase tools for the sake of it." },
    ],
  },
  {
    id: 14,
    type: "scenario",
    prompt: "How would you describe your relationship with the AI tools you use in your business right now?",
    options: [
      { label: "A", text: "I\u2019m building with AI, not just using it. It\u2019s embedded in how I think, create, and operate every day." },
      { label: "B", text: "I\u2019ve integrated AI into most of what I do \u2014 it\u2019s become a natural part of how I work." },
      { label: "C", text: "I use AI for specific tasks where it clearly saves me time or improves my output." },
      { label: "D", text: "I use AI when I have to. I prefer to stay in control of my process and bring in technology on my terms." },
    ],
  },
  {
    id: 15,
    type: "image_pick",
    prompt: "Pick the image that feels most like your relationship with technology.",
    options: [
      { label: "A", text: "A woman\u2019s hands on a keyboard, screen reflecting in her glasses, fully absorbed \u2014 technology is her first language", image: "/images/FH_quiz-q15-A.png" },
      { label: "B", text: "A woman at a sleek desk, AI dashboard open, seamlessly moving between tools and ideas", image: "/images/FH_quiz-q15-B.png" },
      { label: "C", text: "A woman at a whiteboard, laptop open beside her, using technology to support her thinking", image: "/images/FH_quiz-q15-C.png" },
      { label: "D", text: "A woman writing in a notebook, phone face down, technology present but not dominant", image: "/images/FH_quiz-q15-D.png" },
    ],
  },

  // ─── QUESTIONS 16–18: Cross-Axis ───
  {
    id: 16,
    type: "scenario",
    prompt: "You have a big idea that excites you. What happens next?",
    options: [
      { label: "A", text: "I start building immediately \u2014 the idea gets clearer as I move. Planning slows me down." },
      { label: "B", text: "I sketch the broad strokes and start moving \u2014 I don\u2019t need a full plan, just enough to get going." },
      { label: "C", text: "I map it out carefully before I touch it \u2014 a big idea deserves a solid foundation before execution." },
      { label: "D", text: "I pressure test it first. I want to know exactly what I\u2019m building and exactly how before I invest a single hour." },
    ],
  },
  {
    id: 17,
    type: "scenario",
    prompt: "You\u2019ve found your place in the market. How do you own it?",
    options: [
      { label: "A", text: "I go deeper than anyone else and build the infrastructure to hold that position permanently." },
      { label: "B", text: "I establish my depth in the market and then grow my community around what I know better than anyone." },
      { label: "C", text: "I disrupt the existing model and scale fast before anyone can catch up." },
      { label: "D", text: "I blow up the old way of doing things and bring people with me \u2014 my movement becomes my market." },
    ],
  },
  {
    id: 18,
    type: "scenario",
    prompt: "A powerful new AI capability lands in your industry. What\u2019s your instinct?",
    options: [
      { label: "A", text: "I immediately see ten directions I could take it \u2014 and I start building before I\u2019ve finished deciding which one." },
      { label: "B", text: "I jump in and start experimenting \u2014 the possibilities are exciting and I want to explore all of them." },
      { label: "C", text: "I look at it carefully and identify the one specific way it could sharpen what I\u2019m already doing." },
      { label: "D", text: "I watch, I assess, and when I know exactly how it serves my precise vision I adopt it \u2014 not before." },
    ],
  },
];
