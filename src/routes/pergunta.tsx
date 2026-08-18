import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Screen, Card, Btn, Lives } from "@/game/ui";
import { TriangleFigure } from "@/game/TriangleFigure";
import { TABELA_NOTAVEIS, type Question } from "@/game/questions";
import { answerQuestion, currentQuestion, loadState, useHint } from "@/game/state";

export const Route = createFileRoute("/pergunta")({
  head: () => ({
    meta: [
      { title: "Desafio em andamento — TriQuest" },
      {
        name: "description",
        content: "Analise o triângulo, escolha a razão trigonométrica e responda ao desafio.",
      },
      { property: "og:title", content: "Desafio em andamento — TriQuest" },
      { property: "og:description", content: "Resolva desafios de seno, cosseno e tangente." },
    ],
  }),
  component: Pergunta,
});

function Pergunta() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [index, setIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [hint, setHint] = useState(false);
  const [oracle, setOracle] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const state = loadState();
    if (!state.order.length) {
      navigate({ to: "/home" });
      return;
    }
    const q = currentQuestion(state);
    if (!q) {
      navigate({ to: state.score >= 700 ? "/vencedor" : "/perdedor" });
      return;
    }
    setQuestion(q);
    setIndex(state.index);
    setLives(state.lives);
    setScore(state.score);
    setHint(state.hintUsed);
  }, [navigate]);

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds(Math.floor((Date.now() - loadState().questionStartedAt) / 1000));
    }, 1000);
    return () => clearInterval(t);
  }, [question]);

  if (!question) return null;

  function openHint() {
    useHint();
    setHint(true);
    setOracle(true);
  }

  function confirm() {
    if (selected === null || !question) return;
    const { isCorrect } = answerQuestion(question, selected);
    navigate({ to: isCorrect ? "/acerto" : "/erro" });
  }

  return (
    <Screen>
      <div className="space-y-5">
        <header className="flex items-center justify-between text-sm">
          <span className="font-semibold text-muted-foreground">
            Desafio {index + 1}/10
          </span>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">⏱ {seconds}s</span>
            <span className="font-bold text-accent">{score} pts</span>
            <Lives lives={lives} />
          </div>
        </header>

        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(index / 10) * 100}%` }}
          />
        </div>

        <Card className="space-y-4">
          <p className="text-base font-medium leading-relaxed">{question.prompt}</p>
          <div className="flex justify-center">
            <TriangleFigure figure={question.figure} />
          </div>
        </Card>

        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <button
              key={opt}
              onClick={() => setSelected(i)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selected === i
                  ? "border-primary bg-secondary"
                  : "border-border bg-card/60 hover:border-muted-foreground"
              }`}
            >
              <span className="mr-2 font-bold text-accent">
                {String.fromCharCode(65 + i)})
              </span>
              {opt}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Btn variant="ghost" onClick={openHint} disabled={hint}>
            {hint ? "Dica usada" : "🔮 Oráculo"}
          </Btn>
          <Btn onClick={confirm} disabled={selected === null}>
            Confirmar
          </Btn>
        </div>

        {oracle && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
            <Card className="w-full max-w-md space-y-4">
              <h2 className="text-lg font-bold">🔮 Oráculo Trigonométrico</h2>
              <p className="text-sm text-muted-foreground">{question.hint}</p>
              <table className="w-full text-left text-sm">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="py-1">Ângulo</th>
                    <th>sen</th>
                    <th>cos</th>
                    <th>tg</th>
                  </tr>
                </thead>
                <tbody>
                  {TABELA_NOTAVEIS.map((l) => (
                    <tr key={l.angulo} className="border-t border-border">
                      <td className="py-1 font-semibold">{l.angulo}</td>
                      <td>{l.sen}</td>
                      <td>{l.cos}</td>
                      <td>{l.tan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-muted-foreground">
                Acertando com dica, o desafio vale 50 pontos.
              </p>
              <Btn onClick={() => setOracle(false)}>Voltar ao desafio</Btn>
            </Card>
          </div>
        )}
      </div>
    </Screen>
  );
}
