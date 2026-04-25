"use client";

import { useState, useCallback } from "react";
import {
  IntegrationId,
  IntegrationState,
  ConnectionStatus,
  INTEGRATIONS_CONFIG,
  MOCK_ACCOUNTS,
} from "@/lib/integrations";

type IntegrationMap = Map<IntegrationId, IntegrationState>;

const initialState = (): IntegrationMap => {
  const map: IntegrationMap = new Map();
  for (const config of INTEGRATIONS_CONFIG) {
    map.set(config.id, { status: "disconnected", connectedEmail: null, errorMessage: null });
  }
  return map;
};

function patch(
  prev: IntegrationMap,
  id: IntegrationId,
  update: Partial<IntegrationState>
): IntegrationMap {
  const next = new Map(prev);
  next.set(id, { ...next.get(id)!, ...update });
  return next;
}

function setStatus(
  prev: IntegrationMap,
  id: IntegrationId,
  status: ConnectionStatus
): IntegrationMap {
  return patch(prev, id, { status });
}

export function useIntegrations() {
  const [states, setStates] = useState<IntegrationMap>(initialState);

  const connect = useCallback(async (id: IntegrationId) => {
    setStates((prev) => setStatus(prev, id, "connecting"));
    await new Promise((r) => setTimeout(r, 1500));
    if (Math.random() < 0.15) {
      setStates((prev) =>
        patch(prev, id, {
          status: "error",
          errorMessage: "Nie udało się połączyć. Spróbuj ponownie.",
        })
      );
    } else {
      setStates((prev) =>
        patch(prev, id, {
          status: "connected",
          connectedEmail: MOCK_ACCOUNTS[id],
          errorMessage: null,
        })
      );
    }
  }, []);

  const disconnect = useCallback((id: IntegrationId) => {
    setStates((prev) =>
      patch(prev, id, { status: "disconnected", connectedEmail: null, errorMessage: null })
    );
  }, []);

  const switchAccount = useCallback(
    async (id: IntegrationId) => {
      disconnect(id);
      await connect(id);
    },
    [connect, disconnect]
  );

  const clearError = useCallback((id: IntegrationId) => {
    setStates((prev) =>
      patch(prev, id, { status: "disconnected", errorMessage: null })
    );
  }, []);

  return { states, connect, disconnect, switchAccount, clearError };
}
