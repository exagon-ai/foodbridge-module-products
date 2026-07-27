// Controller layer — Foodbridge Modules Products
// Orchestrates API Client calls, applies Workflow/State Machine semantics
// (SSOT 1 / SSOT 5), and owns view-level state. No presentation markup here.

import { useEffect, useState } from "react";
import type { ApiClient } from "../api-client/types";
import { mapEntityNameToViewModel } from "../domain/mapEntityName";
import type { EntityNameViewModel } from "@foodbridge-modules-products/ssot/frontend-domain-model";

export interface ModuleControllerState {
  items: EntityNameViewModel[];
  isLoading: boolean;
  error: Error | null;
}

export function useModuleController(apiClient: ApiClient): ModuleControllerState {
  const [state, setState] = useState<ModuleControllerState>({
    items: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    apiClient
      .listEntities()
      .then((entities) => {
        if (cancelled) return;
        const items = entities.map((e) => mapEntityNameToViewModel(e, "idle"));
        setState({ items, isLoading: false, error: null });
      })
      .catch((error: Error) => {
        if (cancelled) return;
        setState({ items: [], isLoading: false, error });
      });

    return () => {
      cancelled = true;
    };
  }, [apiClient]);

  return state;
}
