import type { FunctionAnalysis, ReportedMemoCache } from './types';

export type MemoCacheOutcome = ReportedMemoCache;

/** Classify analysis-only statistics, not actual emitted cache behavior. */
export function memoCacheOutcome(result: Pick<FunctionAnalysis, 'memoStats'>): MemoCacheOutcome {
  const memoSlots = result.memoStats?.memoSlots;
  if (memoSlots === null || memoSlots === undefined) {
    return 'unavailable';
  }
  return memoSlots > 0 ? 'positive' : 'zero';
}
