import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen, Card, Btn } from "@/game/ui";
import { TABELA_NOTAVEIS } from "@/game/questions";

export const Route = createFileRoute("/regras")({
  head: () => ({
    meta: [
      { title: "Regras e tabela trigonométrica — TriQuest" },
      {
        name: "description",
        content:
          "Regras do TriQuest: vidas, pontuação, dicas e a tabela dos ângulos notáveis de 30°, 45° e 60°.",
      },
      { property: "og:title", content: "Regras e tabela trigonométrica — TriQuest" },
      { property: "og:description", content: "Entenda vidas, pontos, dicas e medalhas do TriQuest." },
    ],
  }),
  component: Regras,
});

function Regras() {
  return (
    <Screen>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Como jogar</h1>

        <Card className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Rodada:</strong> 10 desafios sorteados, com 3 vidas.
            Errar não tira pontos, mas custa uma vida.
          </p>
          <p>
            <strong className="text-foreground">Pontuação:</strong> acerto de primeira vale 100
            pontos, com bônus de +20 se responder em menos de 45 segundos. Usando a dica do Oráculo,
            o acerto vale 50 pontos.
          </p>
          <p>
            <strong className="text-foreground">Vitória:</strong> alcance no mínimo 700 pontos ao fim
            dos 10 desafios.
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-bold">Razões trigonométricas</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Seno = cateto oposto ÷ hipotenusa</li>
            <li>Cosseno = cateto adjacente ÷ hipotenusa</li>
            <li>Tangente = cateto oposto ÷ cateto adjacente</li>
          </ul>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-bold">Ângulos notáveis</h2>
          <table className="w-full text-left text-sm">
            <thead className="text-muted-foreground">
              <tr>
                <th className="py-2">Ângulo</th>
                <th>sen</th>
                <th>cos</th>
                <th>tg</th>
              </tr>
            </thead>
            <tbody>
              {TABELA_NOTAVEIS.map((l) => (
                <tr key={l.angulo} className="border-t border-border">
                  <td className="py-2 font-semibold">{l.angulo}</td>
                  <td>{l.sen}</td>
                  <td>{l.cos}</td>
                  <td>{l.tan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-bold">Medalhas</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>🥉 Bronze — 700 a 899 pontos</li>
            <li>🥈 Prata — 900 a 1.049 pontos</li>
            <li>🥇 Ouro — 1.050 pontos ou mais</li>
          </ul>
        </Card>

        <Link to="/" className="block">
          <Btn variant="ghost">Voltar ao início</Btn>
        </Link>
      </div>
    </Screen>
  );
}
