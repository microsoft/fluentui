/**
 * Test-only read of the data attributes a styles hook stamps onto a root.
 *
 * The styles hooks widen the root with their data attributes internally but return the component's
 * declared state type, so a stamp is read back through this cast.
 */
export const stampsOf = (root: object): Record<string, string | undefined> =>
  root as Record<string, string | undefined>;
