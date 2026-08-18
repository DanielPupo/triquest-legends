import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Screen, Card, Btn, Logo } from "@/game/ui";
import { WORLDS } from "@/game/questions";
import { loadState, startRound, getTopRanking, type RankingEntry } from "@/game/state";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Escolha seu mundo — TriQuest" },
      {
        name: "description",
        content: "Selecione um mundo de trigonometria e inicie uma rodada de 10 desafios.",
      },
      { property: "og:title", content: "Escolha seu mundo — TriQuest" },
      { property: "og:description", content: "Vale dos Identificadores, Templo dos Ângulos Notáveis e Montanha das Aplicações." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [world, setWorld] = useState<string>("all");
  const [ranking, setRanking] = useState<RankingEntry[]>([]);

  useEffect(() => {
    setName(loadState().playerName);
    getTopRanking(5).then(setRanking);
  }, []);

  function start() {
    startRound(world);
    navigate({ to: "/pergunta" });
  }

  return (
    <Screen>
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <Logo size="text-3xl" />
          <Link to="/regras" className="text-sm font-semibold text-accent">
            Regras
          </Link>
        </header>

        <Card>
          <p className="text-sm text-muted-foreground">Bem-vindo(a) de volta,</p>
          <h2 className="text-2xl font-bold">{name || "explorador(a)"}!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cada rodada tem 10 desafios, 3 vidas e meta de 700 pontos.
          </p>
        </Card>

        <div className="space-y-3">
          <h3 className="text-lg font-bold">Temas de estudo</h3>
          <button
            onClick={() => setWorld("all")}
            className={`w-full rounded-2xl border p-4 text-left transition ${
              world === "all" ? "border-primary bg-secondary" : "border-border bg-card/60"
            }`}
          >
            <p className="font-semibold">Jornada completa</p>
            <p className="text-sm text-muted-foreground">Mistura os três mundos.</p>
          </button>
          {WORLDS.map((w) => (
            <button
              key={w.id}
              onClick={() => setWorld(w.id)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                world === w.id ? "border-primary bg-secondary" : "border-border bg-card/60"
              }`}
            >
              <p className="font-semibold">{w.name}</p>
              <p className="text-sm text-muted-foreground">{w.desc}</p>
            </button>
          ))}
        </div>

        <Btn onClick={start}>Iniciar rodada</Btn>

        {ranking.length > 0 && (
          <Card>
            <h3 className="mb-3 text-lg font-bold">Melhores pontuações</h3>
            <ol className="space-y-2 text-sm">
              {ranking.map((r, i) => (
                <li key={`${r.playerName}-${r.createdAt}`} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {i + 1}. {r.playerName}
                  </span>
                  <span className="font-semibold text-accent">{r.score} pts</span>
                </li>
              ))}
            </ol>
          </Card>
        )}
      </div>
    </Screen>
  );
}
