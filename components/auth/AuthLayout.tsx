"use client";

import Link from "next/link";
import { Flame } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  const words = title.split(" ");
  const titleStart = words.slice(0, -1).join(" ");
  const titleEnd = words.slice(-1)[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex flex-col">
      {/* Decorative orbs */}
      <div className="orb absolute -top-32 -right-32 h-[28rem] w-[28rem]" />
      <div className="orb absolute -bottom-40 -left-32 h-[26rem] w-[26rem] opacity-80" />

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Header */}
      <header className="relative flex items-center px-6 py-5 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="relative flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <Flame className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight">sum.io</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="relative flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="glass rounded-3xl p-8 md:p-10">
            <div className="mb-7 space-y-1.5">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {titleStart}{" "}
                <span className="gradient-text">{titleEnd}</span>
              </h1>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
