import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Screen, Card, Btn, Lives } from "@/game/ui";
import { loadState, nextQuestion } from "@/game/state";

export const Route = createFileRoute("/erro")({
  head: () => ({
    meta: [
      { title: "Quase lá — TriQuest" },
      {
        name: "description",
        content: "Veja o feedback do desafio de trigonometria e entenda a resolução correta.",
      },
      { property: "og:title", content: "Quase lá — TriQuest" },
      { property: "og:description", content: "Feedback explicativo para aprender com o erro." },
    ],
  }),
  component: Erro,
});

function Erro() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => loadState());

  useEffect(() => {
    const s = loadState();
    setState(s);
    if (s.lives <= 0) navigate({ to: "/sem-vidas" });
  }, [navigate]);

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
        <div className="text-6xl">🧭</div>
        <h1 className="text-3xl font-bold text-destructive">Resposta incorreta</h1>
        <Card className="space-y-3 text-left">
          <p className="text-sm text-muted-foreground">Resposta correta:</p>
          <p className="font-semibold text-accent">{state.lastCorrectOption}</p>
          <p className="text-sm text-muted-foreground">{state.lastExplanation}</p>
          <div className="flex items-center justify-between pt-2 text-sm">
            <span>Você não perde pontos.</span>
            <Lives lives={state.lives} />
          </div>
        </Card>
        <Btn onClick={advance}>Continuar</Btn>
      </div>
    </Screen>
  );
}
