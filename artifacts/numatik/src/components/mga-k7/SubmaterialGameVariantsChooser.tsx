import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { Play } from "lucide-react";
import { getSubmaterial } from "@/data/mga-k7/registry";

interface GameVariant {
  name: string;
  emoji: string;
  description: string;
  variantSlug: string;
  from: string;
  to: string;
  glow: string;
}

const VARIANTS: GameVariant[] = [
  {
    name: "NUMATIK STRIKE",
    emoji: "🎖️",
    description: "Taklukkan misi tempur dengan 5 soal mudah dari sub-materi ini.",
    variantSlug: "numatik-strike",
    from: "#f59e0b",
    to: "#ef4444",
    glow: "rgba(245,158,11,0.8)",
  },
  {
    name: "NUMATIK WORLD",
    emoji: "🏝️",
    description: "Jelajahi pulau dan buka 5 peti dengan soal dari sub-materi ini.",
    variantSlug: "numatik-world",
    from: "#22d3ee",
    to: "#22c55e",
    glow: "rgba(34,211,238,0.8)",
  },
  {
    name: "Pesawat Tembak Meteor",
    emoji: "☄️",
    description: "Tembak meteor berisi jawaban yang benar dari pesawat luar angkasamu.",
    variantSlug: "pesawat-tembak-meteor",
    from: "#06b6d4",
    to: "#7c3aed",
    glow: "rgba(124,58,237,0.4)",
  },
  {
    name: "Galaksi Tempur",
    emoji: "🌌",
    description: "Tembak musuh alien & jawab soal materi setiap 25 detik untuk poin bonus!",
    variantSlug: "galaksi-tempur",
    from: "#06b6d4",
    to: "#7c3aed",
    glow: "rgba(124,58,237,0.5)",
  },
  {
    name: "Flappy Rocket",
    emoji: "🚀",
    description: "Terbangkan roket lewati gerbang. Tiap gerbang khusus = soal!",
    variantSlug: "flappy-rocket",
    from: "#f59e0b",
    to: "#ef4444",
    glow: "rgba(239,68,68,0.4)",
  },
  {
    name: "Shoot Tank",
    emoji: "💥",
    description: "Bertempur lawan tank musuh! Jawab soal bonus untuk hadiah waktu & poin.",
    variantSlug: "tembak-tank",
    from: "#dc2626",
    to: "#9333ea",
    glow: "rgba(147,51,234,0.4)",
  },
  {
    name: "Space Impact Math",
    emoji: "🛸",
    description: "Tembak hanya pesawat musuh berlabel jawaban yang BENAR!",
    variantSlug: "space-impact",
    from: "#0ea5e9",
    to: "#8b5cf6",
    glow: "rgba(14,165,233,0.4)",
  },
  {
    name: "Turtle Run Math",
    emoji: "🐢",
    description: "Lari, lompat, dan tiarap! Jawab soal bonus untuk skor tambahan.",
    variantSlug: "turtle-run",
    from: "#10b981",
    to: "#06b6d4",
    glow: "rgba(16,185,129,0.4)",
  },
  {
    name: "Tetris Numatik",
    emoji: "🧩",
    description: "Susun blok agar tidak menumpuk! Jawab soal bonus untuk skor tambahan.",
    variantSlug: "tetris",
    from: "#06b6d4",
    to: "#a855f7",
    glow: "rgba(168,85,247,0.4)",
  },
  {
    name: "Snake Matematika",
    emoji: "🐍",
    description: "Makan jawaban yang benar dan hindari jawaban salah!",
    variantSlug: "snake-math",
    from: "#22c55e",
    to: "#0ea5e9",
    glow: "rgba(34,197,94,0.4)",
  },
  {
    name: "Meteor Pantul NUMATIK",
    emoji: "☄️",
    description: "Pantulkan meteor dengan pesawatmu dan hancurkan kristal asteroid! Jawab soal bonus untuk skor besar.",
    variantSlug: "meteor-pantul",
    from: "#f97316",
    to: "#a855f7",
    glow: "rgba(249,115,22,0.4)",
  },
  {
    name: "Zum Math",
    emoji: "🔮",
    description: "Klik gelembung jawaban yang benar sebelum jatuh! Soal materi muncul setiap 25 detik.",
    variantSlug: "zum-math",
    from: "#7c3aed",
    to: "#ec4899",
    glow: "rgba(124,58,237,0.5)",
  },
  {
    name: "Spider Math",
    emoji: "👾",
    description: "Makan semua titik dan hindari hantu! Jawab soal materi setiap 25 detik untuk poin bonus.",
    variantSlug: "pac-math",
    from: "#f59e0b",
    to: "#ef4444",
    glow: "rgba(245,158,11,0.5)",
  },
];

const SubmaterialGameVariantsChooser = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { parentSlug, slug } = useParams<{ parentSlug: string; slug: string }>();

  const entry = parentSlug && slug ? getSubmaterial(parentSlug, slug) : undefined;

  if (!entry) {
    return (
      <div className={`relative min-h-screen flex flex-col items-center justify-center ${isLight ? "gradient-snow" : "gradient-space"}`}>
        {isLight ? <Snowfall /> : <Starfield />}
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>Sub-materi tidak ditemukan</h1>
          <p className="text-sm mb-6 font-body" style={{ color: "var(--text-secondary)" }}>Sub-materi ini belum tersedia di Math Game Arena.</p>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full px-5 py-2 text-sm font-bold transition-colors" style={{ border: "1px solid var(--border)", background: "var(--btn-bg)", color: "var(--text-primary)" }}
          >
            ← Kembali
          </button>
        </div>
      </div>
    );
  }

  const parentPath = `/math-game-arena/kelas-7/${entry.parentSlug}`;

  return (
    <div className={`relative min-h-screen flex flex-col items-center overflow-hidden ${isLight ? "gradient-snow" : "gradient-space"}`}>
      {isLight ? <Snowfall /> : <Starfield />}
      <PageNavigation prevPath={parentPath} />

      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
            <span className="text-4xl relative z-10">{entry.emoji}</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-black text-primary text-glow-cyan mb-1">
            {entry.label}
          </h1>
          <p className="text-cyan-400/60 text-xs font-body tracking-widest uppercase">
            Kelas 7 · Math Game Arena
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-body" style={{ color: "var(--text-secondary)" }}>
            <span>🎮</span>
            <span>Pilih game favoritmu untuk berlatih {entry.label.toLowerCase()}!</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {VARIANTS.map((v, i) => {
            const path = `/math-game-arena/kelas-7/${entry.parentSlug}/${entry.slug}/${v.variantSlug}`;
            const isStrike = v.variantSlug === "numatik-strike";
            const isWorld = v.variantSlug === "numatik-world";
            const is3dGame = isStrike || isWorld;
            return (
              <button
                key={v.name}
                onClick={() => { playPopSound(); navigate(path); }}
                className={`group relative flex items-stretch overflow-hidden rounded-2xl text-left
                  transition-all duration-300 animate-slide-up cursor-pointer hover:scale-[1.015]
                  ${isStrike ? "border-2 border-amber-300/80 ring-1 ring-red-400/50" : ""}
                  ${isWorld ? "border-2 border-cyan-300/80 ring-1 ring-emerald-300/50" : ""}`}
                style={{
                  animationDelay: `${i * 0.05}s`,
                  boxShadow: is3dGame
                    ? `0 5px 0 ${isStrike ? "rgba(127,29,29,0.85)" : "rgba(6,95,70,0.85)"}, 0 8px 26px ${v.glow}`
                    : `0 2px 20px rgba(0,0,0,0.4)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    is3dGame
                      ? `0 6px 0 ${isStrike ? "rgba(127,29,29,0.85)" : "rgba(6,95,70,0.85)"}, 0 12px 34px ${v.glow}`
                      : `0 4px 30px ${v.glow}, 0 2px 10px rgba(0,0,0,0.5)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    is3dGame
                      ? `0 5px 0 ${isStrike ? "rgba(127,29,29,0.85)" : "rgba(6,95,70,0.85)"}, 0 8px 26px ${v.glow}`
                      : `0 2px 20px rgba(0,0,0,0.4)`;
                }}
              >
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${v.from}14, ${v.to}14)` }}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    is3dGame ? "opacity-[0.24] group-hover:opacity-[0.36]" : "opacity-[0.10] group-hover:opacity-[0.18]"
                  }`}
                  style={{ background: `linear-gradient(135deg, ${v.from}, ${v.to})` }}
                />
                <div className="absolute inset-0 border border-white/10 rounded-2xl" />
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-50"
                  style={{ background: `linear-gradient(90deg, transparent, ${v.from}, ${v.to}, transparent)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                <div
                  className="relative flex-shrink-0 flex items-center justify-center w-20 border-r border-white/10"
                  style={{ background: `linear-gradient(180deg, ${v.from}22, ${v.to}22)` }}
                >
                  {v.variantSlug === "pesawat-tembak-meteor" ? (
                    <img
                      src="/pesawat.png"
                      alt="Pesawat"
                      className="w-10 h-12 drop-shadow-[0_0_12px_rgba(0,200,255,0.6)]"
                    />
                  ) : v.variantSlug === "galaksi-tempur" ? (
                    <img
                      src="/raja.png"
                      alt="Raja Musuh"
                      className="w-11 h-12 drop-shadow-[0_0_14px_rgba(236,72,153,0.8)]"
                    />
                  ) : v.variantSlug === "pac-math" ? (
                    <svg viewBox="0 0 92 72" style={{ width: 50, height: 46, filter: "drop-shadow(0 0 10px #22d3ee) drop-shadow(0 0 22px #0e7490)" }} aria-label="Spider Math">
                      <g fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round">
                        <path d="M31 27 14 16 7 19M29 34 10 31 4 36M30 42 13 50 7 57M34 48 24 63 17 66" />
                        <path d="M58 27 75 16 83 19M60 34 80 31 87 36M59 42 76 50 83 57M55 48 65 63 73 66" />
                      </g>
                      <ellipse cx="43" cy="43" rx="16" ry="22" fill="#06b6d4" stroke="#cffafe" strokeWidth="3" />
                      <ellipse cx="53" cy="25" rx="15" ry="13" fill="#0e7490" stroke="#cffafe" strokeWidth="3" />
                      <circle cx="48" cy="22" r="3.5" fill="#f0fdfa" /><circle cx="59" cy="24" r="3.5" fill="#f0fdfa" />
                      <circle cx="49" cy="22" r="1.5" fill="#083344" /><circle cx="60" cy="24" r="1.5" fill="#083344" />
                      <path d="M61 29Q75 33 62 39Q58 35 61 29Z" fill="#240b36" stroke="#fda4af" strokeWidth="1.5">
                        <animate attributeName="d" dur="0.5s" repeatCount="indefinite"
                          values="M61 29Q75 33 62 39Q58 35 61 29Z;M61 27Q78 34 62 42Q57 35 61 27Z;M61 29Q75 33 62 39Q58 35 61 29Z" />
                      </path>
                      <path d="M63 30 66 34 63 35M70 32 72 35 69 36" fill="#fff1f2" stroke="#fff1f2" strokeWidth="1" />
                      <path d="M43 49h8M47 45v8" stroke="#083344" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <span className="text-4xl">{v.emoji}</span>
                  )}
                </div>

                <div className="relative flex-1 flex items-center gap-3 px-4 py-4 min-w-0">
                  <div className="min-w-0 flex-1">
                    {is3dGame && (
                      <div
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 mb-1.5 font-display text-[10px] font-black tracking-[0.12em] text-white shadow-[0_3px_0_rgba(0,0,0,0.55),0_0_14px_rgba(255,255,255,0.2)] ${
                          isStrike
                            ? "border-amber-200/80 bg-gradient-to-b from-amber-300 via-orange-500 to-red-600"
                            : "border-cyan-100/80 bg-gradient-to-b from-cyan-300 via-teal-500 to-emerald-600"
                        }`}
                      >
                        <span className="text-sm leading-none">3D</span>
                        <span>GAME {isStrike ? "· STRIKE" : "· WORLD"}</span>
                      </div>
                    )}
                    <div className="font-display text-sm font-bold text-white leading-tight mb-1">
                      {v.name}
                    </div>
                    <div className="text-[11px] text-white/50 font-body leading-snug">
                      {v.description}
                    </div>
                  </div>
                </div>

                <div className="relative flex-shrink-0 flex items-center pr-4">
                  <div
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-[11px] text-white transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${v.from}, ${v.to})`,
                      boxShadow: `0 2px 12px ${v.glow}`,
                    }}
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>MAIN!</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => { playPopSound(); navigate(parentPath); }}
            className="text-sm hover:text-cyan-400 transition-colors cursor-pointer font-body" style={{ color: "var(--text-secondary)" }}
          >
            ← Kembali ke {entry.parentLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmaterialGameVariantsChooser;
