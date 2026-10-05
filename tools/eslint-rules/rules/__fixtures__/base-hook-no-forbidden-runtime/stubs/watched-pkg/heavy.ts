import { runHeavy } from 'heavy-runtime';
import type { HeavyOptions } from 'heavy-runtime';

// Coupled to the forbidden runtime through its own shape, not merely through a sibling export.
export type HeavyType = { tag: 'heavy'; options?: HeavyOptions };

// Clean sibling living in the very same file as the forbidden import above.
export type CleanTag = { tag: 'clean' };

export function useHeavy(): { tag: 'heavy' } {
  return runHeavy();
}
