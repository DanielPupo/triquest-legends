import { getQuestions, type Question } from "./questions";

const KEY = "triquest:state";

export type GameState = {
  playerName: string;
  world: string;
  order: string[];
  index: number;
  score: number;
  correct: number;
  lives: number;
  hintUsed: boolean;
  questionStartedAt: number;
  lastGain: number;
  lastExplanation: string;
  lastCorrectOption: string;
  history: { id: string; correct: boolean }[];
};

export type RankingEntry = {
  playerName: string;
  score: number;
  totalCorrect: number;
  createdAt: number;
};

const empty = (): GameState => ({
  playerName: "",
  world: "all",
  order: [],
  index: 0,
  score: 0,
  correct: 0,
  lives: 3,
  hintUsed: false,
  questionStartedAt: Date.now(),
  lastGain: 0,
  lastExplanation: "",
  lastCorrectOption: "",
  history: [],
});

export function loadState(): GameState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    return { ...empty(), ...(JSON.parse(raw) as GameState) };
  } catch {
    return empty();
  }
}

export function saveState(patch: Partial<GameState>): GameState {
  const next = { ...loadState(), ...patch };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage indisponível: o jogo segue em memória */
  }
  return next;
}

export function setPlayerName(name: string) {
  saveState({ playerName: name.trim() });
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function startRound(world = "all"): GameState {
  const pool = getQuestions(world);
  const order = shuffle(pool).slice(0, 10).map((q) => q.id);
  const current = loadState();
  return saveState({
    world,
    order,
    index: 0,
    score: 0,
    correct: 0,
    lives: 3,
    hintUsed: false,
    questionStartedAt: Date.now(),
    lastGain: 0,
    lastExplanation: "",
    lastCorrectOption: "",
    history: [],
    playerName: current.playerName,
  });
}

export function currentQuestion(state: GameState): Question | null {
  const id = state.order[state.index];
  if (!id) return null;
  return getQuestions("all").find((q) => q.id === id) ?? null;
}

export function answerQuestion(question: Question, optionIndex: number) {
  const state = loadState();
  const isCorrect = optionIndex === question.answerIndex;
  const seconds = (Date.now() - state.questionStartedAt) / 1000;

  let gain = 0;
  if (isCorrect) {
    gain = state.hintUsed ? 50 : 100;
    if (!state.hintUsed && seconds < 45) gain += 20;
  }

  saveState({
    score: state.score + gain,
    correct: state.correct + (isCorrect ? 1 : 0),
    lives: state.lives - (isCorrect ? 0 : 1),
    lastGain: gain,
    lastExplanation: question.explanation,
    lastCorrectOption: question.options[question.answerIndex],
    history: [...state.history, { id: question.id, correct: isCorrect }],
  });

  return { isCorrect, gain };
}

export function nextQuestion(): GameState {
  const state = loadState();
  return saveState({
    index: state.index + 1,
    hintUsed: false,
    questionStartedAt: Date.now(),
  });
}

export function useHint() {
  saveState({ hintUsed: true });
}

const RANK_KEY = "triquest:ranking";

export async function submitScore(): Promise<void> {
  const state = loadState();
  if (!state.playerName) return;
  const entry: RankingEntry = {
    playerName: state.playerName,
    score: state.score,
    totalCorrect: state.correct,
    createdAt: Date.now(),
  };
  try {
    const list = await getTopRanking(100);
    const next = [...list, entry].sort((a, b) => b.score - a.score).slice(0, 50);
    window.localStorage.setItem(RANK_KEY, JSON.stringify(next));
  } catch {
    /* falha ao salvar ranking não interrompe o jogo */
  }
}

export async function getTopRanking(limit = 10): Promise<RankingEntry[]> {
  try {
    const raw = window.localStorage.getItem(RANK_KEY);
    const list: RankingEntry[] = raw ? JSON.parse(raw) : [];
    return list.sort((a, b) => b.score - a.score).slice(0, limit);
  } catch {
    return [];
  }
}
