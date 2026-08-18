import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Screen, Card, Btn } from "@/game/ui";
import { loadState, startRound, submitScore } from "@/game/state";

export const Route = createFileRoute("/sem-vidas")({
  head: () => ({
    meta: [
      { title: "Sem vidas — TriQuest" },
      { name: "description", content: "Suas vidas acabaram nesta rodada do TriQuest. Tente novamente." },
      { property: "og:title", content: "Sem vidas — TriQuest" },
      { property: "og:description", content: "Recomece a rodada e melhore sua pontuação." },
    ],
  }),
  component: SemVidas,
});

function SemVidas() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => loadState());

  useEffect(() => {
    setState(loadState());
    submitScore();
  }, []);

  function retry() {
    startRound(loadState().world);
    navigate({ to: "/pergunta" });
  }

  return (
    <Screen>
      <div className="flex min-h-[80vh] flex-col justify-center gap-6 text-center">
        <div className="text-6xl">💔</div>
        <h1 className="text-3xl font-bold text-destructive">Suas vidas acabaram</h1>
        <Card className="space-y-2">
          <p className="text-5xl font-black text-primary">{state.score}</p>
          <p className="text-sm text-muted-foreground">pontos conquistados até aqui</p>
        </Card>
        <div className="space-y-3">
          <Btn onClick={retry}>Tentar novamente</Btn>
          <Link to="/home" className="block">
            <Btn variant="ghost">Voltar ao início</Btn>
          </Link>
        </div>
      </div>
    </Screen>
  );
}
