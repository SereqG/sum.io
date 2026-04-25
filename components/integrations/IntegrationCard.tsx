import { Mail } from "lucide-react";
import { IntegrationConfig, IntegrationState } from "@/lib/integrations";
import IntegrationIcon from "./IntegrationIcon";
import IntegrationStatusBadge from "./IntegrationStatusBadge";
import IntegrationActions from "./IntegrationActions";

interface Props {
  config: IntegrationConfig;
  state: IntegrationState;
  onConnect: () => void;
  onDisconnect: () => void;
  onSwitchAccount: () => void;
  onClearError: () => void;
}

export default function IntegrationCard({
  config,
  state,
  onConnect,
  onDisconnect,
  onSwitchAccount,
  onClearError,
}: Props) {
  return (
    <div className="glass flex flex-col gap-4 rounded-xl p-5">
      <div className="flex items-center gap-3">
        <IntegrationIcon id={config.id} />
        <span className="font-semibold">{config.name}</span>
        <div className="ml-auto">
          <IntegrationStatusBadge status={state.status} />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{config.description}</p>

      {state.status === "connected" && state.connectedEmail && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{state.connectedEmail}</span>
        </div>
      )}

      {state.status === "error" && state.errorMessage && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {state.errorMessage}
        </div>
      )}

      <IntegrationActions
        status={state.status}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
        onSwitchAccount={onSwitchAccount}
        onClearError={onClearError}
      />
    </div>
  );
}
