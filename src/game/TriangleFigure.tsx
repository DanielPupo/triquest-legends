import type { Figure } from "./questions";

export function TriangleFigure({ figure }: { figure: Figure }) {
  const { angle, hyp, opp, adj } = figure;

  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full max-w-md rounded-xl bg-card/60 p-2"
      role="img"
      aria-label={`Triângulo retângulo com ângulo de ${angle}`}
    >
      <defs>
        <linearGradient id="triFill" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <polygon
        points="40,165 280,165 280,45"
        fill="url(#triFill)"
        stroke="var(--color-primary)"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* ângulo reto */}
      <polyline
        points="258,165 258,143 280,143"
        fill="none"
        stroke="var(--color-muted-foreground)"
        strokeWidth="2"
      />

      {/* arco do ângulo de referência */}
      <path
        d="M 78 165 A 38 38 0 0 0 71 146"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="3"
      />
      <text x="84" y="152" className="fill-accent" fontSize="15" fontWeight="700">
        {angle}
      </text>

      {adj && (
        <text x="160" y="186" textAnchor="middle" className="fill-foreground" fontSize="14">
          {adj}
        </text>
      )}
      {opp && (
        <text x="288" y="110" className="fill-foreground" fontSize="14">
          {opp}
        </text>
      )}
      {hyp && (
        <text
          x="150"
          y="94"
          textAnchor="middle"
          className="fill-foreground"
          fontSize="14"
          transform="rotate(-26 150 94)"
        >
          {hyp}
        </text>
      )}
    </svg>
  );
}
