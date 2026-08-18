import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Screen, Card, Btn } from "@/game/ui";
import { loadState, startRound, submitScore } from "@/game/state";

export const Route = createFileRoute("/vencedor")({
  head: () => ({
    meta: [
      { title: "Vitória! — TriQuest" },
      { name: "description", content: "Você concluiu a rodada do TriQuest com a pontuação necessária." },
      { property: "og:title", content: "Vitória! — TriQuest" },
      { property: "og:description", content: "Veja sua pontuação final e jogue novamente." },
    ],
  }),
  component: Vencedor,
});

function medal(score: number) {
  if (score >= 1050) return "🥇 Medalha de Ouro";
  if (score >= 900) return "🥈 Medalha de Prata";
  return "🥉 Medalha de Bronze";
}

function Vencedor() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => loadState());

  useEffect(() => {
    setState(loadState());
    submitScore();
  }, []);

  function playAgain() {
    startRound(loadState().world);
    navigate({ to: "/pergunta" });
  }

  return (
    <Screen>
      <div className="flex min-h-[80vh] flex-col justify-center gap-6 text-center">
        <div className="animate-bounce text-6xl">🏆</div>
        <h1 className="text-3xl font-bold text-accent">Parabéns, {state.playerName}!</h1>
        <Card className="space-y-2">
          <p className="text-5xl font-black text-primary">{state.score}</p>
          <p className="text-sm text-muted-foreground">pontos nesta rodada</p>
          <p className="pt-2 font-semibold">{medal(state.score)}</p>
          <p className="text-sm text-muted-foreground">
            {state.correct} de {state.order.length} desafios corretos
          </p>
        </Card>
        <div className="space-y-3">
          <Btn onClick={playAgain}>Jogar novamente</Btn>
          <Link to="/home" className="block">
            <Btn variant="ghost">Voltar ao início</Btn>
          </Link>
        </div>
      </div>
    </Screen>
  );
}
