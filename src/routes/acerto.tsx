import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Screen, Card, Btn } from "@/game/ui";
import { loadState, nextQuestion } from "@/game/state";

export const Route = createFileRoute("/acerto")({
  head: () => ({
    meta: [
      { title: "Resposta correta! — TriQuest" },
      { name: "description", content: "Você acertou o desafio de trigonometria. Veja a resolução." },
      { property: "og:title", content: "Resposta correta! — TriQuest" },
      { property: "og:description", content: "Confira a resolução e siga para o próximo desafio." },
    ],
  }),
  component: Acerto,
});

function Acerto() {
  const navigate = useNavigate();
  const [gain, setGain] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const s = loadState();
    setGain(s.lastGain);
    setExplanation(s.lastExplanation);
    setScore(s.score);
  }, []);

  function advance() {
    const s = nextQuestion();
    if (s.index >= s.order.length) {
      navigate({ to: s.score >= 700 ? "/vencedor" : "/perdedor" });
      return;
    }
    navigate({ to: "/pergunta" });
  }

  return (
    <Screen>
      <div className="flex min-h-[80vh] flex-col justify-center gap-6 text-center">
        <div className="text-6xl">🎯</div>
        <h1 className="text-3xl font-bold text-primary">Resposta correta!</h1>
        <Card className="space-y-3 text-left">
          <p className="text-lg font-bold text-accent">+{gain} pontos</p>
          <p className="text-sm text-muted-foreground">{explanation}</p>
          <p className="text-sm">
            Pontuação atual: <strong>{score}</strong>
          </p>
        </Card>
        <Btn onClick={advance}>Próximo desafio</Btn>
      </div>
    </Screen>
  );
}
