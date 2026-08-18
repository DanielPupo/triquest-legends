import type { ReactNode } from "react";

export function Screen({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background bg-[radial-gradient(circle_at_20%_-10%,var(--glow-1),transparent_55%),radial-gradient(circle_at_90%_0%,var(--glow-2),transparent_45%)] px-5 py-8">
      <div className="mx-auto w-full max-w-2xl">{children}</div>
    </main>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-2xl border border-border bg-card/80 p-6 shadow-[var(--shadow-card)] backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
}

type BtnProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "accent";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
};

export function Btn({
  children,
  onClick,
  variant = "primary",
  disabled,
  className = "",
  type = "button",
}: BtnProps) {
  const styles: Record<string, string> = {
    primary:
      "bg-primary text-primary-foreground hover:brightness-110 shadow-[var(--shadow-glow)]",
    accent: "bg-accent text-accent-foreground hover:brightness-110",
    ghost: "border border-border bg-transparent text-foreground hover:bg-secondary",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-base font-semibold tracking-tight transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Logo({ size = "text-4xl" }: { size?: string }) {
  return (
    <h1 className={`${size} font-black tracking-tight text-foreground`}>
      Tri<span className="text-accent">Quest</span>
    </h1>
  );
}

export function Lives({ lives }: { lives: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${lives} vidas restantes`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={i < lives ? "text-destructive" : "text-muted opacity-40"}>
          ♥
        </span>
      ))}
    </div>
  );
}
