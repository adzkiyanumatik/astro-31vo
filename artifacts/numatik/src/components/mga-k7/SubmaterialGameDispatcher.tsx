import { useNavigate, useParams } from "react-router-dom";
import MeteorShootingGame from "@/components/MeteorShootingGame";
import FlappyRocketPage from "@/pages/math-game-arena/umum/FlappyRocketPage";
import BattleTankPage from "@/pages/math-game-arena/umum/BattleTankPage";
import SpaceImpactPage from "@/pages/math-game-arena/umum/SpaceImpactPage";
import DinoRunGamePage from "@/pages/math-game-arena/umum/DinoRunGamePage";
import TetrisGamePage from "@/pages/math-game-arena/umum/TetrisGamePage";
import SnakeMathPage from "@/pages/math-game-arena/umum/SnakeMathPage";
import BrickBreakerPage from "@/pages/math-game-arena/umum/BrickBreakerPage";
import GalaksiTempurPage from "@/pages/math-game-arena/umum/GalaksiTempurPage";
import ZumaMathPage from "@/pages/math-game-arena/umum/ZumaMathPage";
import PacmanMathPage from "@/pages/math-game-arena/umum/PacmanMathPage";
import NumatikStrikePage from "@/pages/math-game-arena/umum/GamePage";
import NumatikWorldPage from "@/pages/math-game-arena/umum/NumatikWorldPage";
import { getSubmaterial } from "@/data/mga-k7/registry";
import type { GuruQuestion } from "@/hooks/useGuruQuiz";
import { useTranslation } from "react-i18next";

const GAME_OFFSETS: Record<string, number> = {
  "snake-math":      0,
  "galaksi-tempur":  1,
  "tetris":          2,
  "meteor-pantul":   3,
  "zum-math":        4,
  "pac-math":        5,
  "flappy-rocket":   6,
  "tembak-tank":     7,
  "space-impact":    8,
  "turtle-run":      9,
};

function gameSlice(questions: GuruQuestion[], variant: string): GuruQuestion[] {
  if (!questions || questions.length === 0) return questions;
  const offset = GAME_OFFSETS[variant] ?? 0;
  const n = questions.length;
  return questions.map((_, i) => questions[(i + offset) % n]);
}

const SubmaterialGameDispatcher = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { parentSlug, slug, variant } = useParams<{
    parentSlug: string;
    slug: string;
    variant: string;
  }>();

  const entry = parentSlug && slug ? getSubmaterial(parentSlug, slug) : undefined;

  if (!entry || !variant) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-2xl font-black text-white mb-2">{t('gameArena.gameNotFoundTitle')}</h1>
          <p className="text-white/60 text-sm mb-6">{t('gameArena.gameNotFoundDesc')}</p>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-white hover:bg-white/20 transition-colors"
          >
            {t('gameArena.gameVariantBack')}
          </button>
        </div>
      </div>
    );
  }

  const backPath = `/math-game-arena/kelas-7/${entry.parentSlug}/${entry.slug}`;
  const homePath = "/menu";
  const topicLabel = entry.label;
  const q = entry.questions;

  switch (variant) {
    case "numatik-strike":
      return <NumatikStrikePage treasureQuestions={q.meteor} backPath={backPath} />;
    case "numatik-world":
      return <NumatikWorldPage treasureQuestions={q.meteor} backPath={backPath} />;
    case "pesawat-tembak-meteor":
      return (
        <MeteorShootingGame
          questions={q.meteor}
          topicLabel={topicLabel}
          backPath={backPath}
          backLabel="Kembali ke Pilihan Game"
          homePath={homePath}
        />
      );
    case "galaksi-tempur":
      return (
        <GalaksiTempurPage
          topicLabel={topicLabel}
          backPath={backPath}
          homePath={homePath}
          quizQuestions={gameSlice(q.snake, variant)}
        />
      );
    case "flappy-rocket":
      return (
        <FlappyRocketPage
          questions={q.flappyRocket}
          topicLabel={topicLabel}
          backPath={backPath}
          homePath={homePath}
          quizQuestions={gameSlice(q.snake, variant)}
        />
      );
    case "tembak-tank":
      return (
        <BattleTankPage
          questions={q.tembakTank}
          topicLabel={`${topicLabel} · Tembak tank dengan jawaban benar!`}
          backPath={backPath}
          homePath={homePath}
          quizQuestions={gameSlice(q.snake, variant)}
        />
      );
    case "space-impact":
      return (
        <SpaceImpactPage
          questions={q.spaceImpact}
          topicLabel={topicLabel}
          backPath={backPath}
          homePath={homePath}
          quizQuestions={gameSlice(q.snake, variant)}
        />
      );
    case "turtle-run":
      return (
        <DinoRunGamePage
          questions={q.turtleRun}
          topicLabel={topicLabel}
          backPath={backPath}
          homePath={homePath}
          quizQuestions={gameSlice(q.snake, variant)}
        />
      );
    case "tetris":
      return (
        <TetrisGamePage
          topicLabel={topicLabel}
          backPath={backPath}
          homePath={homePath}
          quizQuestions={gameSlice(q.snake, variant)}
        />
      );
    case "snake-math":
      return (
        <SnakeMathPage
          topicLabel={topicLabel}
          backPath={backPath}
          homePath={homePath}
          quizQuestions={gameSlice(q.snake, variant)}
          quizIntervalMs={25_000}
        />
      );
    case "meteor-pantul":
      return (
        <BrickBreakerPage
          topicLabel={topicLabel}
          backPath={backPath}
          homePath={homePath}
          quizQuestions={gameSlice(q.snake, variant)}
        />
      );
    case "zum-math":
      return <ZumaMathPage />;
    case "pac-math":
      return <PacmanMathPage variant="spider" topicLabel={topicLabel} />;
    default:
      return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950">
          <div className="relative z-10 text-center px-6">
            <h1 className="font-display text-2xl font-black text-white mb-2">Game tidak dikenal</h1>
            <p className="text-white/60 text-sm mb-6">{t('gameArena.variantNotFoundDesc', { variant })}</p>
            <button
              onClick={() => navigate(backPath)}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-white hover:bg-white/20 transition-colors"
            >
            {t('gameArena.gameVariantBack')}
          </button>
          </div>
        </div>
      );
  }
};

export default SubmaterialGameDispatcher;
