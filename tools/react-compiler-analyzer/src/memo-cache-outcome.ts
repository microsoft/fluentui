import type { FunctionAnalysis } from './types';

export type MemoCacheOutcome = 'emitted' | 'not-emitted' | 'unknown';

/** Classify retained compiler caching without treating compiler acceptance as memoization. */
export function memoCacheOutcome(result: Pick<FunctionAnalysis, 'memoStats'>): MemoCacheOutcome {
  const memoSlots = result.memoStats?.memoSlots;
  if (memoSlots === null || memoSlots === undefined) {
    return 'unknown';
  }
  return memoSlots > 0 ? 'emitted' : 'not-emitted';
}
