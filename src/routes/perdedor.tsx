import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Screen, Card, Btn } from "@/game/ui";
import { loadState, startRound, submitScore } from "@/game/state";

export const Route = createFileRoute("/perdedor")({
  head: () => ({
    meta: [
      { title: "Rodada encerrada — TriQuest" },
      { name: "description", content: "Confira sua pontuação e tente novamente para atingir 700 pontos." },
      { property: "og:title", content: "Rodada encerrada — TriQuest" },
      { property: "og:description", content: "Continue praticando seno, cosseno e tangente." },
    ],
  }),
  component: Perdedor,
});

function Perdedor() {
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
        <div className="text-6xl">📐</div>
        <h1 className="text-3xl font-bold">Rodada encerrada</h1>
        <Card className="space-y-2">
          <p className="text-5xl font-black text-primary">{state.score}</p>
          <p className="text-sm text-muted-foreground">
            pontos — faltaram {Math.max(0, 700 - state.score)} para a vitória
          </p>
          <p className="pt-2 text-sm text-muted-foreground">
            Você acertou {state.correct} de {state.order.length}. Revise a tabela dos ângulos
            notáveis e identifique bem o cateto oposto antes de escolher a razão.
          </p>
        </Card>
        <div className="space-y-3">
          <Btn onClick={retry}>Tentar novamente</Btn>
          <Link to="/regras" className="block">
            <Btn variant="ghost">Revisar conteúdo</Btn>
          </Link>
          <Link to="/home" className="block">
            <Btn variant="ghost">Voltar ao início</Btn>
          </Link>
        </div>
      </div>
    </Screen>
  );
}
