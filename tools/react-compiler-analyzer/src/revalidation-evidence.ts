import type { CompilerEvidence, FunctionAnalysis, RevalidationEvidence } from './types';

function snapshot(analysis: FunctionAnalysis | undefined): CompilerEvidence {
  return {
    outcome: analysis?.status ?? 'unavailable',
    memoStats: analysis?.memoStats ? { memoSlots: analysis.memoStats.memoSlots } : null,
  };
}

export function compareCompilerEvidence(
  before: FunctionAnalysis | undefined,
  after?: FunctionAnalysis,
): RevalidationEvidence {
  const left = snapshot(before);
  const right = snapshot(after);
  const comparable = typeof left.memoStats?.memoSlots === 'number' && typeof right.memoStats?.memoSlots === 'number';
  return {
    before: left,
    after: right,
    acceptanceEffect:
      left.outcome === 'unavailable' || right.outcome === 'unavailable'
        ? 'unavailable'
        : (left.outcome === 'compiled') !== (right.outcome === 'compiled')
        ? 'changed'
        : 'unchanged',
    statisticsEffect: comparable
      ? left.memoStats!.memoSlots === right.memoStats!.memoSlots
        ? 'unchanged'
        : 'changed'
      : 'unavailable',
    emittedOptimization: 'not-measured',
  };
}
