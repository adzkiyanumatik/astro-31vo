import type { SubmaterialEntry } from "./types";

type BasicQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

const createEntry = (slug: string, label: string, emoji: string, questions: BasicQuestion[]): SubmaterialEntry => ({
  slug,
  label,
  emoji,
  parentSlug: "bilangan-bulat",
  parentLabel: "BILANGAN BULAT",
  questions: {
    meteor: questions,
    flappyRocket: questions.map(({ question, options, correctIndex }) => ({ q: question, opts: options, ans: correctIndex })),
    tembakTank: questions.map(({ question, options, correctIndex }) => ({ q: question, opts: options, ans: correctIndex })),
    spaceImpact: questions.map(({ question, options, correctIndex }) => ({
      q: question,
      ans: Number(options[correctIndex]?.replace("−", "-")) || 0,
    })),
    turtleRun: questions.map(({ question, options, correctIndex }, index) => ({
      q: question,
      opts: options,
      correctIndex,
      bonus: 25 + (index % 3) * 5,
    })),
    snake: questions.map(({ question, options, correctIndex }) => ({
      question,
      options,
      correctIdx: correctIndex,
    })),
  },
});

export const BILANGAN_BULAT: SubmaterialEntry[] = [
  createEntry("penjumlahan", "PENJUMLAHAN BILANGAN BULAT", "➕", [
    { question: "5 + 3 = ...", options: ["7", "8", "9", "10"], correctIndex: 1 },
    { question: "−4 + 7 = ...", options: ["−3", "3", "11", "−11"], correctIndex: 1 },
    { question: "12 + (−5) = ...", options: ["7", "−7", "17", "−17"], correctIndex: 0 },
    { question: "0 + (−6) = ...", options: ["6", "0", "−6", "−1"], correctIndex: 2 },
    { question: "−3 + (−4) = ...", options: ["−7", "7", "−1", "1"], correctIndex: 0 },
  ]),
  createEntry("pengurangan", "PENGURANGAN BILANGAN BULAT", "➖", [
    { question: "9 − 4 = ...", options: ["4", "5", "6", "13"], correctIndex: 1 },
    { question: "3 − 8 = ...", options: ["5", "−5", "11", "−11"], correctIndex: 1 },
    { question: "−2 − 5 = ...", options: ["3", "−3", "−7", "7"], correctIndex: 2 },
    { question: "−6 − (−2) = ...", options: ["−8", "−4", "4", "8"], correctIndex: 1 },
    { question: "0 − (−7) = ...", options: ["−7", "0", "7", "−1"], correctIndex: 2 },
  ]),
  createEntry("perkalian", "PERKALIAN BILANGAN BULAT", "✖️", [
    { question: "4 × 3 = ...", options: ["7", "12", "9", "1"], correctIndex: 1 },
    { question: "−5 × 2 = ...", options: ["10", "−10", "−7", "7"], correctIndex: 1 },
    { question: "−3 × (−4) = ...", options: ["−12", "12", "7", "−7"], correctIndex: 1 },
    { question: "0 × 8 = ...", options: ["0", "8", "−8", "1"], correctIndex: 0 },
    { question: "6 × (−2) = ...", options: ["12", "−12", "4", "−4"], correctIndex: 1 },
  ]),
  createEntry("pembagian", "PEMBAGIAN BILANGAN BULAT", "➗", [
    { question: "20 ÷ 4 = ...", options: ["4", "5", "6", "16"], correctIndex: 1 },
    { question: "−18 ÷ 3 = ...", options: ["6", "−6", "−15", "15"], correctIndex: 1 },
    { question: "−24 ÷ (−6) = ...", options: ["−4", "4", "18", "−18"], correctIndex: 1 },
    { question: "0 ÷ 5 = ...", options: ["0", "5", "1", "Tidak terdefinisi"], correctIndex: 0 },
    { question: "35 ÷ (−7) = ...", options: ["5", "−5", "28", "−28"], correctIndex: 1 },
  ]),
  createEntry("operasi-campuran", "OPERASI HITUNG CAMPURAN BILANGAN BULAT", "🔢", [
    { question: "3 + 2 × 4 = ...", options: ["20", "11", "14", "9"], correctIndex: 1 },
    { question: "(3 + 2) × 4 = ...", options: ["11", "20", "14", "9"], correctIndex: 1 },
    { question: "18 − 6 ÷ 2 = ...", options: ["6", "15", "12", "9"], correctIndex: 1 },
    { question: "−2 + 3 × 2 = ...", options: ["2", "−10", "4", "10"], correctIndex: 0 },
    { question: "10 + (−4) × 2 = ...", options: ["12", "2", "−2", "28"], correctIndex: 1 },
  ]),
  createEntry("kpk-fpb", "KPK DAN FPB", "🌐", [
    { question: "FPB dari 8 dan 12 adalah ...", options: ["2", "4", "6", "8"], correctIndex: 1 },
    { question: "KPK dari 3 dan 4 adalah ...", options: ["7", "12", "6", "24"], correctIndex: 1 },
    { question: "FPB dari 10 dan 15 adalah ...", options: ["2", "3", "5", "10"], correctIndex: 2 },
    { question: "KPK dari 2 dan 5 adalah ...", options: ["7", "10", "15", "20"], correctIndex: 1 },
    { question: "FPB dari 6 dan 9 adalah ...", options: ["2", "3", "6", "9"], correctIndex: 1 },
  ]),
];
