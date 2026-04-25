import { Loader2 } from "lucide-react";
import { ConnectionStatus } from "@/lib/integrations";

interface Props {
  status: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
  onSwitchAccount: () => void;
  onClearError: () => void;
}

export default function IntegrationActions({
  status,
  onConnect,
  onDisconnect,
  onSwitchAccount,
  onClearError,
}: Props) {
  if (status === "disconnected") {
    return (
      <button
        type="button"
        onClick={onConnect}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 cursor-pointer"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
      >
        Połącz
      </button>
    );
  }

  if (status === "connecting") {
    return (
      <button
        type="button"
        disabled
        className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-primary-foreground opacity-70 cursor-not-allowed"
        style={{ background: "var(--gradient-primary)" }}
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        Łączenie…
      </button>
    );
  }

  if (status === "connected") {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => {}}
          className="flex-1 rounded-xl border border-border bg-card/40 px-3 py-2 text-sm font-medium transition hover:bg-card/70 cursor-pointer"
        >
          Konfiguruj
        </button>
        <button
          type="button"
          onClick={onSwitchAccount}
          className="flex-1 rounded-xl border border-border bg-card/40 px-3 py-2 text-sm font-medium transition hover:bg-card/70 cursor-pointer"
        >
          Zmień konto
        </button>
        <button
          type="button"
          onClick={onDisconnect}
          className="flex-1 rounded-xl border border-destructive/30 px-3 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10 cursor-pointer"
        >
          Rozłącz
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <button
        type="button"
        onClick={onClearError}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 cursor-pointer"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
      >
        Spróbuj ponownie
      </button>
    );
  }

  return null;
}
