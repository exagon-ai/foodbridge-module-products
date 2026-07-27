// Functional test — verifies UX Component Library interaction contracts (SSOT 3)
// ssotRef: 03-ux-component-library.v0#ComponentName
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ModuleRoot } from "../../src/components/ModuleRoot";
import { createMockApiClient } from "../../src/api-client/mock";

describe("Foodbridge Modules Products — ModuleRoot interactions", () => {
  it("renders items returned by the api client", async () => {
    render(<ModuleRoot apiClient={createMockApiClient()} />);
    expect(await screen.findByText(/Example one/)).toBeInTheDocument();
  });
});
