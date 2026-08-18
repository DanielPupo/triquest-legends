import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen, Card, Btn, Logo } from "@/game/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TriQuest — Jogo de Razões Trigonométricas" },
      {
        name: "description",
        content:
          "Jogo educativo de trigonometria: pratique seno, cosseno e tangente no triângulo retângulo em rodadas de 10 desafios.",
      },
      { property: "og:title", content: "TriQuest — Jogo de Razões Trigonométricas" },
      {
        property: "og:description",
        content: "Revise seno, cosseno e tangente com desafios, vidas, dicas e pontuação.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Screen>
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Ensino Médio · SESI
          </p>
          <Logo size="text-6xl" />
          <p className="mt-4 max-w-md text-muted-foreground">
            Uma aventura para dominar seno, cosseno e tangente no triângulo retângulo.
          </p>
        </div>

        <Card className="w-full max-w-sm space-y-3">
          <Link to="/cadastro" className="block">
            <Btn>Começar aventura</Btn>
          </Link>
          <Link to="/regras" className="block">
            <Btn variant="ghost">Como jogar</Btn>
          </Link>
        </Card>
      </div>
    </Screen>
  );
}
