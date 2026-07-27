// Sandbox entry point — Foodbridge Modules Products
// Runs this module standalone, wired to the MOCK api-client so it never
// depends on a live backend during development.

import React from "react";
import { createRoot } from "react-dom/client";
import { ModuleRoot } from "../src/components/ModuleRoot";
import { createMockApiClient } from "../src/api-client/mock";

const apiClient = createMockApiClient();

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ModuleRoot apiClient={apiClient} />
  </React.StrictMode>
);
