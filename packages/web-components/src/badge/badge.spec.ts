import { FluentBadge } from ".";

describe("The fluent-badge component", () => {
  it("adds its appearance as a host class", () => {
    const badge = new FluentBadge();
    badge.classList.contains("lightweight");
  });
});
