import { CheckCircle2, Loader2 } from "lucide-react";
import { ConnectionStatus } from "@/lib/integrations";

interface Props {
  status: ConnectionStatus;
}

export default function IntegrationStatusBadge({ status }: Props) {
  if (status === "connected") {
    return (
      <span className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
        <CheckCircle2 className="h-3 w-3" />
        Połączono
      </span>
    );
  }

  if (status === "connecting") {
    return (
      <span className="flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-100/60 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
        <Loader2 className="h-3 w-3 animate-spin" />
        Łączenie…
      </span>
    );
  }

  if (status === "error") {
    return (
      <span className="flex items-center gap-1 rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
        Błąd
      </span>
    );
  }

  return (
    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      Nie połączono
    </span>
  );
}
