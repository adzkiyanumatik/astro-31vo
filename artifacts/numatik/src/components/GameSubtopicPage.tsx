import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Starfield from "@/components/Starfield";
import Snowfall from "@/components/Snowfall";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { Play } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Subtopic {
  name: string;
  path: string;
}

interface GameSubtopicPageProps {
  title: string;
  subtopics: Subtopic[];
  backPath?: string;
  backLabel?: string;
  icon?: string;
  kelasLabel?: string;
}

const LEVEL_COLORS = [
  { from: "#7c3aed", to: "#06b6d4", glow: "rgba(124,58,237,0.4)" },
  { from: "#2563eb", to: "#7c3aed", glow: "rgba(37,99,235,0.4)" },
  { from: "#0891b2", to: "#7c3aed", glow: "rgba(8,145,178,0.4)" },
  { from: "#059669", to: "#06b6d4", glow: "rgba(5,150,105,0.4)" },
  { from: "#d97706", to: "#ef4444", glow: "rgba(217,119,6,0.4)" },
  { from: "#dc2626", to: "#9333ea", glow: "rgba(220,38,38,0.4)" },
  { from: "#7c3aed", to: "#ec4899", glow: "rgba(124,58,237,0.4)" },
  { from: "#0284c7", to: "#10b981", glow: "rgba(2,132,199,0.4)" },
  { from: "#9333ea", to: "#f59e0b", glow: "rgba(147,51,234,0.4)" },
  { from: "#0ea5e9", to: "#8b5cf6", glow: "rgba(14,165,233,0.4)" },
  { from: "#10b981", to: "#3b82f6", glow: "rgba(16,185,129,0.4)" },
  { from: "#f43f5e", to: "#fb923c", glow: "rgba(244,63,94,0.4)" },
];

const getGameChooserPath = (path: string) => {
  const match = path.match(/^\/math-game-arena\/kelas-(7|8|9)\/([^/]+)\/([^/]+)$/);
  if (!match) return path;
  const [, grade, parentSlug, slug] = match;
  return `/math-game-arena/kelas-${grade}/pilih/${parentSlug}/${slug}`;
};

const GameSubtopicPage = ({
  title,
  subtopics,
  backPath = "/math-game-arena/kelas-7",
  backLabel,
  icon = "🚀",
  kelasLabel,
}: GameSubtopicPageProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isLight = theme === "light";
  const allTopicsPath = "/math-game-arena";
  const language = i18n.resolvedLanguage?.split("-")[0] ?? "id";
  const backToAllLabel =
    language === "en" ? "Back to all topics" :
    language === "ja" ? "すべてのトピックに戻る" :
    "Kembali ke semua topik";

  return (
    <div className={`relative min-h-screen flex flex-col items-center overflow-hidden ${isLight ? "gradient-snow" : "gradient-space"}`}>
      {isLight ? <Snowfall /> : <Starfield />}
      <PageNavigation prevPath={allTopicsPath} />

      <div className="relative z-10 max-w-3xl w-full px-4 py-10">
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
            <span className="text-4xl relative z-10">{icon}</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-black text-primary text-glow-cyan mb-1">
            {title}
          </h1>
          <p className="text-cyan-400/60 text-xs font-body tracking-widest uppercase">
            Math Game Arena
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-body" style={{ color: "var(--text-secondary)" }}>
            <span>🎮</span>
            <span>{t('gameArena.chooserTagline', { topic: title.toLowerCase() })}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {subtopics.map((subtopic, i) => {
            const colors = LEVEL_COLORS[i % LEVEL_COLORS.length];
            const levelNum = String(i + 1).padStart(2, "0");
            const isComingSoon = subtopic.path === "/coming-soon";

            return (
              <button
                key={subtopic.name}
                onClick={() => { playPopSound(); navigate(getGameChooserPath(subtopic.path)); }}
                className={`water-btn group relative flex items-stretch overflow-hidden rounded-2xl text-left
                  transition-all duration-300 animate-slide-up
                  ${isComingSoon ? "cursor-default opacity-70" : "cursor-pointer hover:scale-[1.015]"}`}
                style={{
                  animationDelay: `${i * 0.05}s`,
                  background: 'var(--btn-bg)',
                  boxShadow: `0 2px 20px rgba(0,0,0,0.4)`,
                }}
                onMouseEnter={(e) => {
                  if (!isComingSoon) {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      `0 4px 30px ${colors.glow}, 0 2px 10px rgba(0,0,0,0.5)`;
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    `0 2px 20px rgba(0,0,0,0.4)`;
                }}
              >
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: isComingSoon
                      ? "rgba(255,255,255,0.03)"
                      : `linear-gradient(135deg, ${colors.from}14, ${colors.to}14)`,
                    opacity: isComingSoon ? 1 : undefined,
                  }}
                />
                {!isComingSoon && (
                  <div
                    className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.14] transition-opacity duration-300"
                    style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                  />
                )}
                <div
                  className="absolute inset-0 border rounded-2xl transition-colors duration-300"
                  style={{ borderColor: isComingSoon ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.10)" }}
                />

                {!isComingSoon && (
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-40"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${colors.from}, ${colors.to}, transparent)`,
                    }}
                  />
                )}

                {!isComingSoon && (
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  />
                )}

                <div
                  className="relative flex-shrink-0 flex flex-col items-center justify-center w-16 border-r"
                  style={{
                    borderColor: "rgba(255,255,255,0.07)",
                    background: isComingSoon
                      ? "rgba(255,255,255,0.03)"
                      : `linear-gradient(180deg, ${colors.from}22, ${colors.to}22)`,
                  }}
                >
                  <span
                    className="text-[9px] font-black tracking-widest"
                    style={{ color: isComingSoon ? "rgba(255,255,255,0.2)" : colors.from }}
                  >
                    {t('gameArena.lvl')}
                  </span>
                  <span
                    className="text-2xl font-black leading-tight"
                    style={isComingSoon ? { color: "rgba(255,255,255,0.2)" } : {
                      background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {levelNum}
                  </span>
                  <span className="text-[8px] text-white/20 mt-0.5">{t('gameArena.stage')}</span>
                </div>

                <div className="relative flex-1 flex items-center gap-3 px-4 py-3.5 min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-base leading-none">{isComingSoon ? "🔒" : "☄️"}</span>
                      <span className={`font-body text-[11px] text-xs font-bold leading-tight ${isComingSoon ? "text-white/40" : "text-white"}`}>
                        {subtopic.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {isComingSoon ? (
                        <span className="text-[9px] text-white/25">{t('gameArena.comingSoonText')}</span>
                      ) : (
                        <>
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${colors.from}33, ${colors.to}33)`,
                              color: colors.to,
                              border: `1px solid ${colors.to}44`,
                            }}
                          >
                            🎯 {t('gameArena.fiveQuestions')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative flex-shrink-0 flex items-center pr-4">
                  {isComingSoon ? (
                    <div className="flex items-center gap-1 px-3 py-2 rounded-xl font-black text-[10px] text-white/25 border border-white/10">
                      <span>⏳</span>
                      <span>{t('gameArena.soonBadge')}</span>
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-black text-[11px] text-white
                        transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                        boxShadow: `0 2px 12px ${colors.glow}`,
                      }}
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>{t('gameArena.playShort')}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => { playPopSound(); navigate(allTopicsPath); }}
            className="text-sm text-white/40 hover:text-cyan-400 transition-colors cursor-pointer font-body"
          >
            ← {backToAllLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSubtopicPage;
