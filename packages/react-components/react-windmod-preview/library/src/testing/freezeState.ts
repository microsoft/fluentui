/**
 * Test-only deep-freeze for a headless hook's return value. A retrofit spec wraps the hook (see
 * SplitButton.test.tsx's `renderSplitButton` spy for the module-mock shape — `jest.mock` the
 * headless subpath, spread `jest.requireActual`, replace the one hook), passes the frozen state
 * through the real component, and asserts the render does not throw. The styles-hook convention is
 * spread-only (never mutate the state the hook returned); a frozen return value turns any
 * violation, anywhere in the pipeline, into a thrown TypeError instead of a silent in-place write.
 *
 * Two shapes are deliberately left unfrozen:
 * - Ref objects (anything exposing a `current` property): React assigns `.current` during commit —
 *   DOM refs, forwarded refs, any ref threaded through state. Freezing one makes that assignment
 *   throw and breaks the render this helper exists only to observe.
 * - Functions: there is nothing on a callback for a mutation guard to protect.
 *
 * React elements ARE frozen — matching React's own development-mode behavior of freezing an
 * element and its props — but recursion stops there; an element's internals belong to React, not
 * this pipeline, so this helper has no business walking into them.
 */
export const deepFreezeState = <T>(value: T): T => {
  freeze(value, new Set());

  return value;
};

const isRefLike = (value: object): boolean => 'current' in value;

const isReactElement = (value: object): boolean => typeof (value as { $$typeof?: unknown }).$$typeof === 'symbol';

const freeze = (value: unknown, seen: Set<object>): void => {
  if (value === null || typeof value !== 'object' || seen.has(value)) {
    return;
  }

  seen.add(value);

  if (isRefLike(value)) {
    return;
  }

  Object.freeze(value);

  if (isReactElement(value)) {
    return;
  }

  for (const key of Reflect.ownKeys(value)) {
    freeze((value as Record<PropertyKey, unknown>)[key], seen);
  }
};
