// React Component layer — Foodbridge Modules Products
// Presentational only. Renders from Frontend Domain Model (SSOT 4) view models.
// No business logic here — that belongs in controllers/.

import React from "react";
import type { ApiClient } from "../api-client/types";
import { useModuleController } from "../controllers/useModuleController";

export interface ModuleRootProps {
  apiClient: ApiClient;
}

export function ModuleRoot({ apiClient }: ModuleRootProps) {
  const { items, isLoading, error } = useModuleController(apiClient);

  if (isLoading) return <p>Loading Foodbridge Modules Products…</p>;
  if (error) return <p role="alert">Something went wrong: {error.message}</p>;

  return (
    <div>
      <h1>Foodbridge Modules Products</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.displayName}</strong> — {item.statusLabel}
          </li>
        ))}
      </ul>
    </div>
  );
}
