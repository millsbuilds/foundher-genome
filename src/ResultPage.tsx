import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { GenomeResult } from "./genomeTypes";
import type { AxisScores } from "./genomeTypes";

const axisLabels: { key: keyof AxisScores; name: string; poleA: string; codeA: string; poleB: string; codeB: string }[] = [
  { key: "vision", name: "Vision Style", poleA: "Expansive", codeA: "E", poleB: "Precise", codeB: "P" },
  { key: "build", name: "Build Mode", poleA: "Intuitive", codeA: "I", poleB: "Systematic", codeB: "S" },
  { key: "market", name: "Market Instinct", poleA: "Deepener", codeA: "D", poleB: "Disruptor", codeB: "X" },
  { key: "growth", name: "Growth Engine", poleA: "Scale", codeA: "C", poleB: "Relationship", codeB: "R" },
  { key: "tech", name: "Technology", poleA: "Native", codeA: "N", poleB: "Adaptive", codeB: "A" },
];

const axisDescriptions: Record<string, Record<string, string>> = {
  vision: {
    E: "You see opportunity everywhere. Your natural instinct is to expand \u2014 new directions, new markets, new possibilities. This expansive vision is a force multiplier when paired with the right execution strategy.",
    P: "You are built on clarity and focus. You know exactly what you do, who you serve, and where you\u2019re headed. This precision is your competitive edge \u2014 you don\u2019t waste energy chasing what doesn\u2019t fit.",
  },
  build: {
    I: "You build best in motion. You move on instinct, iterate fast, and find your direction through action rather than planning. This intuitive approach lets you capitalize on opportunities others are still analyzing.",
    S: "You build on structure. Every move is planned, every system is intentional, and execution follows a framework. This systematic approach creates operational excellence that compounds over time.",
  },
  market: {
    D: "You go deeper than anyone else in your market. You find the underserved layers, the unmet needs, the customers nobody else is truly reaching. This depth creates loyalty and expertise that surface-level competitors cannot replicate.",
    X: "You see broken models and build replacements. You don\u2019t compete within existing frameworks \u2014 you create new ones. This disruptive instinct positions you to capture markets that don\u2019t yet know they need what you\u2019re building.",
  },
  growth: {
    C: "You are engineered to scale. You build systems, infrastructure, and automation that grow without requiring your constant involvement. This scale-driven engine means you compound in value, not in complexity.",
    R: "You grow through people. Every client, partner, and advocate is chosen deliberately, and growth comes from trust earned one relationship at a time. This creates a moat no competitor can buy or replicate.",
  },
  tech: {
    N: "Technology is embedded in how you think, create, and operate. It\u2019s not a tool you reach for \u2014 it\u2019s the environment you build in. This native fluency gives you a permanent speed and capability advantage.",
    A: "You adopt technology with discipline and intention. You don\u2019t chase tools \u2014 you integrate them when they\u2019ve earned their place. This adaptive approach means every technology investment is fully leveraged.",
  },
};

function getAxisResult(axis: keyof AxisScores, scores: AxisScores) {
  const meta = axisLabels.find((a) => a.key === axis)!;
  const axisScore = scores[axis];
  const values = Object.values(axisScore) as number[];
  const keys = Object.keys(axisScore) as string[];
  const dominantIndex = values[0] >= values[1] ? 0 : 1;
  const dominantCode = keys[dominantIndex];
  const dominantLabel = dominantIndex === 0 ? meta.poleA : meta.poleB;
  const description = axisDescriptions[axis]?.[dominantCode] || "";
  return { name: meta.name, dominantCode, dominantLabel, description };
}

// ─── Skin tone options ───
const skinTones = [
  { id: "ivory", label: "Ivory", image: "/images/FH_wrist-ivory.png" },
  { id: "sienna", label: "Sienna", image: "/images/FH_wrist-sienna.png" },
  { id: "espresso", label: "Espresso", image: "/images/FH_wrist-espresso.png" },
  { id: "amber", label: "Amber", image: "/images/FH_wrist-amber.png" },
  { id: "gold", label: "Gold", image: "/images/FH_wrist-gold.png" },
];

// ─── Platform dimensions ───
const platforms = [
  { id: "ig-story", label: "Instagram Story", w: 1080, h: 1920 },
  { id: "ig-feed", label: "Instagram Feed", w: 1080, h: 1080 },
  { id: "tiktok", label: "TikTok", w: 1080, h: 1920 },
  { id: "facebook", label: "Facebook", w: 1080, h: 1080 },
  { id: "linkedin", label: "LinkedIn", w: 1200, h: 628 },
];

// ─── Canvas card generator ───
function generateCard(
  canvas: HTMLCanvasElement,
  typeName: string,
  wristImg: HTMLImageElement,
  w: number,
  h: number,
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = w;
  canvas.height = h;

  const espresso = "#1C1A17";
  const ivory = "#F4F1EA";
  const isWide = w / h > 1.5; // LinkedIn
  const isTall = h / w > 1.2; // Stories / TikTok

  // Layout proportions — top ~1/3, image ~1/2, bottom ~1/6
  const topBarH = isTall ? h * 0.32 : isWide ? h * 0.40 : h * 0.34;
  const bottomBarH = isTall ? h * 0.16 : isWide ? h * 0.26 : h * 0.18;
  const imageH = h - topBarH - bottomBarH;

  // ─── Top bar ───
  ctx.fillStyle = espresso;
  ctx.fillRect(0, 0, w, topBarH);

  ctx.fillStyle = ivory;
  ctx.textAlign = "center";
  const cx = w / 2;

  // Scale factor based on canvas width
  const s = w / 1080;

  // Line 1+2: small italic intro text
  const introSize = Math.round(28 * s);
  ctx.font = `italic 400 ${introSize}px 'Libre Baskerville', serif`;
  const introY = topBarH * 0.12;
  ctx.fillText("I\u2019m very proud to announce", cx, introY + introSize);
  ctx.fillText("that I have been diagnosed as a", cx, introY + introSize * 2.6);

  // Line 3+4: large bold type name
  const typeSize = Math.round((isTall ? 110 : isWide ? 60 : 85) * s);
  ctx.font = `700 ${typeSize}px 'Libre Baskerville', serif`;
  const typeStartY = introY + introSize * 2.6 + typeSize * 0.9;
  const typeWord = typeName.toUpperCase();
  ctx.fillText(typeWord, cx, typeStartY);
  ctx.fillText("FOUNDER", cx, typeStartY + typeSize * 1.0);

  // Line 5: small caps "BY THE FOUNDHER DNA TEST"
  const bySize = Math.round(30 * s);
  ctx.font = `500 ${bySize}px 'DM Sans', sans-serif`;
  const byY = typeStartY + typeSize * 1.0 + bySize * 1.8;
  ctx.fillText("BY THE FOUNDHER", cx, byY);
  ctx.fillText("DNA TEST", cx, byY + bySize * 1.4);

  // ─── Center wrist image (cover fit) ───
  const imgAspect = wristImg.naturalWidth / wristImg.naturalHeight;
  const slotAspect = w / imageH;
  let drawW: number, drawH: number;

  if (imgAspect > slotAspect) {
    drawH = imageH;
    drawW = imageH * imgAspect;
  } else {
    drawW = w;
    drawH = w / imgAspect;
  }

  const drawX = (w - drawW) / 2;
  const drawY = topBarH + (imageH - drawH) / 2;
  ctx.drawImage(wristImg, drawX, drawY, drawW, drawH);

  // ─── Bottom bar ───
  ctx.fillStyle = espresso;
  ctx.fillRect(0, h - bottomBarH, w, bottomBarH);

  ctx.fillStyle = ivory;
  ctx.textAlign = "center";

  const ctaSize = Math.round(26 * s);
  const urlSize = Math.round(30 * s);
  const bottomCenterY = h - bottomBarH / 2;

  ctx.font = `italic 400 ${ctaSize}px 'Libre Baskerville', serif`;
  ctx.fillText("Being a founder is in your DNA.", cx, bottomCenterY - ctaSize * 1.4);
  ctx.fillText("Discover yours. It\u2019s free.", cx, bottomCenterY + ctaSize * 0.1);

  ctx.font = `700 ${urlSize}px 'DM Sans', sans-serif`;
  ctx.fillText("FOUNDHERDNA.COM", cx, bottomCenterY + ctaSize * 0.1 + urlSize * 1.6);
}

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    result: GenomeResult;
    scores: AxisScores;
    firstName: string;
  } | null;

  if (!state) {
    navigate("/", { replace: true });
    return null;
  }

  const { result, scores, firstName } = state;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);

  const typeName = result.name.replace(/^(The |DNA Type: )/, "");

  const [selectedTone, setSelectedTone] = useState(skinTones[0]);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [generating, setGenerating] = useState(false);

  const renderPreview = (tone: typeof skinTones[0], platform: typeof platforms[0]) => {
    const canvas = previewRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Preview always renders at a fixed preview size
      const previewW = 540;
      const previewH = Math.round(previewW * (platform.h / platform.w));
      generateCard(canvas, typeName, img, previewW, previewH);
    };
    img.src = tone.image;
  };

  const handleToneChange = (tone: typeof skinTones[0]) => {
    setSelectedTone(tone);
    renderPreview(tone, selectedPlatform);
  };

  const handlePlatformChange = (platform: typeof platforms[0]) => {
    setSelectedPlatform(platform);
    renderPreview(selectedTone, platform);
  };

  const handleDownloadCard = () => {
    setGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      generateCard(canvas, typeName, img, selectedPlatform.w, selectedPlatform.h);
      const link = document.createElement("a");
      link.download = `foundher-dna-${typeName.toLowerCase()}-${selectedPlatform.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setGenerating(false);
    };
    img.src = selectedTone.image;
  };

  // Render initial preview on mount
  const hasRendered = useRef(false);
  if (!hasRendered.current && typeof window !== "undefined") {
    hasRendered.current = true;
    setTimeout(() => renderPreview(skinTones[0], platforms[0]), 100);
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Logo */}
      <div className="fixed top-6 left-6 z-50 print:hidden">
        <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-10" />
      </div>

      {/* Hero Result */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="font-['DM_Sans'] text-[#C1603A] text-sm font-medium tracking-widest uppercase mb-6">
            Your DNA Result
          </p>
          <p className="font-['DM_Sans'] text-[#3B2A22]/60 text-lg mb-2">
            {firstName}, your DNA type is
          </p>
          <h1 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-4">
            {result.code}
          </h1>
          <h2 className="font-['Libre_Baskerville'] italic text-[#C1603A] text-2xl sm:text-3xl mb-10">
            {result.name}
          </h2>

          <div className="bg-white border border-[#3B2A22]/10 rounded-xl p-8 sm:p-10 text-left">
            <p className="font-['DM_Sans'] text-[#3B2A22] text-base sm:text-lg leading-relaxed">
              {result.description}
            </p>
          </div>
        </div>
      </section>

      {/* Axis-by-Axis Breakdown */}
      <section className="py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <h3 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl sm:text-2xl text-center mb-8">
            Your 5-Axis DNA Breakdown
          </h3>
          <div className="flex flex-col gap-5">
            {axisLabels.map((axis) => {
              const axisResult = getAxisResult(axis.key, scores);
              return (
                <div key={axis.key} className="bg-white border border-[#3B2A22]/10 rounded-xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-['DM_Sans'] font-medium text-[#3B2A22] text-sm tracking-wide uppercase">
                      {axisResult.name}
                    </h4>
                    <span className="font-['DM_Sans'] font-bold text-[#C1603A] text-sm">
                      {axisResult.dominantLabel} ({axisResult.dominantCode})
                    </span>
                  </div>
                  <p className="font-['DM_Sans'] text-[#3B2A22]/80 text-base leading-relaxed">
                    {axisResult.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <h3 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl sm:text-2xl text-center mb-8">
            Your 3 Natural Competitive Advantages
          </h3>
          <div className="flex flex-col gap-4">
            {result.advantages.map((adv, i) => (
              <div key={i} className="bg-white border border-[#3B2A22]/10 rounded-xl p-6 flex gap-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C1603A] text-[#FAF7F2] text-sm font-['DM_Sans'] font-bold shrink-0">
                  {i + 1}
                </span>
                <p className="font-['DM_Sans'] text-[#3B2A22] text-base leading-relaxed">
                  {adv}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blind Spots */}
      <section className="py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <h3 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl sm:text-2xl text-center mb-8">
            Your 2 Biggest Growth Blind Spots
          </h3>
          <div className="flex flex-col gap-4">
            {result.blindSpots.map((spot, i) => (
              <div key={i} className="bg-[#3B2A22]/[0.03] border border-[#3B2A22]/10 rounded-xl p-6 flex gap-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#3B2A22] text-[#FAF7F2] text-sm font-['DM_Sans'] font-bold shrink-0">
                  {i + 1}
                </span>
                <p className="font-['DM_Sans'] text-[#3B2A22] text-base leading-relaxed">
                  {spot}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Preview */}
      <section className="py-16 px-6">
        <div className="max-w-[680px] mx-auto">
          <div className="bg-[#3B2A22] rounded-xl p-8 sm:p-10">
            <p className="font-['DM_Sans'] text-[#FAF7F2]/60 text-sm font-medium tracking-widest uppercase mb-4">
              AI Acceleration Preview
            </p>
            <h3 className="font-['Libre_Baskerville'] font-bold text-[#FAF7F2] text-xl sm:text-2xl leading-snug mb-3">
              Founders with your DNA type are best accelerated by AI in three specific areas.
            </h3>
            <div className="flex flex-col gap-4 mt-8">
              {result.aiAreas.map((area, i) => (
                <div key={i} className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C1603A] text-[#FAF7F2] text-sm font-['DM_Sans'] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="font-['DM_Sans'] text-[#FAF7F2]/90 text-base leading-relaxed">
                    {area}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download PDF */}
      <section className="py-8 px-6 print:hidden">
        <div className="max-w-[480px] mx-auto text-center">
          <button
            onClick={() => window.print()}
            className="w-full py-4 bg-[#3B2A22] text-[#FAF7F2] font-['DM_Sans'] font-medium text-base rounded cursor-pointer border-none hover:bg-[#2a1e18] transition-colors"
          >
            Download Your DNA Profile (PDF)
          </button>
        </div>
      </section>

      {/* ─── Share Your Result ─── */}
      <section className="py-16 px-6 print:hidden">
        <div className="max-w-[540px] mx-auto">
          <h3 className="font-['Libre_Baskerville'] font-bold text-[#3B2A22] text-xl sm:text-2xl text-center mb-8">
            Share Your Result
          </h3>

          {/* Skin tone selector */}
          <p className="font-['DM_Sans'] text-[#3B2A22]/60 text-sm font-medium text-center mb-3">
            Select your skin tone
          </p>
          <div className="flex justify-center gap-3 mb-8">
            {skinTones.map((tone) => (
              <button
                key={tone.id}
                onClick={() => handleToneChange(tone)}
                className={`w-[80px] h-[120px] rounded-lg overflow-hidden border-2 cursor-pointer p-0 transition-all ${
                  selectedTone.id === tone.id
                    ? "border-[#C1603A] scale-105 shadow-md"
                    : "border-transparent hover:border-[#3B2A22]/20"
                }`}
              >
                <img
                  src={tone.image}
                  alt={tone.label}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Platform selector */}
          <p className="font-['DM_Sans'] text-[#3B2A22]/60 text-sm font-medium text-center mb-3">
            Select platform
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformChange(platform)}
                className={`font-['DM_Sans'] text-xs font-medium px-4 py-2 rounded-full border cursor-pointer transition-all ${
                  selectedPlatform.id === platform.id
                    ? "bg-[#3B2A22] text-[#FAF7F2] border-[#3B2A22]"
                    : "bg-transparent text-[#3B2A22]/60 border-[#3B2A22]/15 hover:border-[#3B2A22]/40"
                }`}
              >
                {platform.label}
              </button>
            ))}
          </div>

          {/* Preview canvas */}
          <div className="flex justify-center mb-6">
            <div className="border border-[#3B2A22]/10 rounded-xl overflow-hidden bg-[#1C1A17]" style={{ maxHeight: 640, maxWidth: selectedPlatform.w / selectedPlatform.h > 1 ? 540 : 360 }}>
              <canvas
                ref={previewRef}
                className="w-full h-auto block"
              />
            </div>
          </div>

          {/* Hidden full-res canvas for download */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Download button */}
          <button
            onClick={handleDownloadCard}
            disabled={generating}
            className="w-full py-4 bg-[#C1603A] text-[#FAF7F2] font-['DM_Sans'] font-medium text-base rounded cursor-pointer border-none hover:bg-[#a8512f] transition-colors disabled:opacity-60"
          >
            {generating ? "Generating..." : "Download Card"}
          </button>
          <p className="font-['DM_Sans'] text-[#3B2A22]/50 text-sm mt-4 text-center">
            Save and share on Instagram, TikTok, or anywhere you show up.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 print:hidden">
        <div className="max-w-[480px] mx-auto text-center">
          <img src="/images/FH_mark_official.png" alt="FoundHer AI" className="w-16 mx-auto mb-8" />
          <p className="font-['DM_Sans'] text-[#3B2A22] text-base leading-relaxed mb-8">
            Your full DNA Report — including your matched AI agents and DNA Evolution roadmap — is included free with The Cuff.
          </p>
          <a
            href="https://foundherai.ai"
            className="inline-block w-full py-4 bg-[#C1603A] text-[#FAF7F2] font-['DM_Sans'] font-medium text-base rounded cursor-pointer border-none hover:bg-[#a8512f] transition-colors no-underline text-center"
          >
            Get The Cuff — $297
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3B2A22] py-16 px-6 text-center print:hidden">
        <img src="/images/FH_mark_cream.png" alt="FoundHer AI" className="w-10 mx-auto mb-6" />
        <p className="font-['DM_Sans'] text-[#FAF7F2] text-sm leading-relaxed mb-4">
          FoundHer DNA is a FoundHer AI product. Built for women founders who build to scale.
        </p>
        <a
          href="https://foundherai.ai"
          className="font-['DM_Sans'] text-[#C1603A] text-sm no-underline hover:underline"
        >
          Visit FoundHerAI.ai
        </a>
      </footer>
    </div>
  );
}
