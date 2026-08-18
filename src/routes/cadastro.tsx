import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Screen, Card, Btn, Logo } from "@/game/ui";
import { setPlayerName } from "@/game/state";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Cadastro do jogador — TriQuest" },
      { name: "description", content: "Informe seu nome para iniciar sua jornada no TriQuest." },
      { property: "og:title", content: "Cadastro do jogador — TriQuest" },
      { property: "og:description", content: "Informe seu nome e comece a praticar trigonometria." },
    ],
  }),
  component: Cadastro,
});

function Cadastro() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function submit() {
    if (!name.trim()) return;
    setPlayerName(name);
    navigate({ to: "/home" });
  }

  return (
    <Screen>
      <div className="flex min-h-[80vh] flex-col justify-center gap-6">
        <Logo />
        <Card className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">Qual é o seu nome?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ele aparecerá no seu perfil e no ranking.
            </p>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Digite seu nome"
            maxLength={24}
            className="w-full rounded-xl border border-input bg-secondary px-4 py-3 text-foreground outline-none transition focus:border-ring"
          />
          <Btn onClick={submit} disabled={!name.trim()}>
            Entrar no jogo
          </Btn>
        </Card>
      </div>
    </Screen>
  );
}
