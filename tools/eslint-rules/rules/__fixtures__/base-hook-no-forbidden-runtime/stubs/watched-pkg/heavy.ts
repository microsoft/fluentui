import { runHeavy } from 'heavy-runtime';
import type { HeavyOptions } from 'heavy-runtime';

// Coupled to the forbidden runtime through its own shape, not merely through a sibling export.
export type HeavyType = { tag: 'heavy'; options?: HeavyOptions };

// Clean sibling living in the very same file as the forbidden import above.
export type CleanTag = { tag: 'clean' };

export function useHeavy(): { tag: 'heavy' } {
  return runHeavy();
}

// Mirrors the v9 shape: a styled props bag carrying a forbidden-runtime slot, and the base bag
// derived from it by subtracting exactly that member.
export type StyledProps = { tag: 'styled'; motion?: HeavyOptions; label: string };

export type DerivedBaseProps = Omit<StyledProps, 'motion'>;

// Only coupling is the constraint of a type parameter — the parameter itself is declared here,
// not in the forbidden runtime, so the reach is invisible unless constraints are followed.
export type HeavyConstrainedCallback = <T extends HeavyOptions>(value: T) => void;

// Same shape, but with a constraint that stays inside this package.
export type CleanConstrainedCallback = <T extends CleanTag>(value: T) => void;
