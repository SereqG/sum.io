"use client";

import { INTEGRATIONS_CONFIG } from "@/lib/integrations";
import { useIntegrations } from "@/hooks/useIntegrations";
import IntegrationCard from "@/components/integrations/IntegrationCard";

export default function SettingsPage() {
  const { states, connect, disconnect, switchAccount, clearError } = useIntegrations();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Ustawienia</h1>
      </div>

      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Inte<span className="gradient-text">gracje</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Zarządzaj połączonymi usługami i aplikacjami zewnętrznymi.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {INTEGRATIONS_CONFIG.map((config) => {
            const state = states.get(config.id)!;
            return (
              <IntegrationCard
                key={config.id}
                config={config}
                state={state}
                onConnect={() => connect(config.id)}
                onDisconnect={() => disconnect(config.id)}
                onSwitchAccount={() => switchAccount(config.id)}
                onClearError={() => clearError(config.id)}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
