import { FASTBadge } from ".";

describe("The fast-badge component", () => {
    it("adds its appearance as a host class", () => {
        const badge = new FASTBadge();
        badge.classList.contains("lightweight");
    });
});
