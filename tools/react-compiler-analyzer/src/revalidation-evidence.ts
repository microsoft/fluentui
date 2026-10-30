import type { CompilerEvidence, FunctionAnalysis, RevalidationEvidence } from './types';

function snapshot(analysis: FunctionAnalysis | undefined): CompilerEvidence {
  return {
    outcome: analysis?.status ?? 'unavailable',
    memoStats: analysis?.memoStats ?? null,
  };
}

export function compareCompilerEvidence(
  before: FunctionAnalysis | undefined,
  after?: FunctionAnalysis,
): RevalidationEvidence {
  const left = snapshot(before);
  const right = snapshot(after);
  const keys = ['memoSlots', 'memoBlocks', 'memoValues', 'prunedMemoBlocks', 'prunedMemoValues'] as const;
  const comparable = keys.filter(
    key => typeof left.memoStats?.[key] === 'number' && typeof right.memoStats?.[key] === 'number',
  );
  const changed = comparable.some(key => left.memoStats?.[key] !== right.memoStats?.[key]);
  const complete = keys.every(
    key => (typeof left.memoStats?.[key] === 'number') === (typeof right.memoStats?.[key] === 'number'),
  );
  return {
    before: left,
    after: right,
    acceptanceEffect:
      left.outcome === 'unavailable' || right.outcome === 'unavailable'
        ? 'unavailable'
        : (left.outcome === 'compiled') !== (right.outcome === 'compiled')
        ? 'changed'
        : 'unchanged',
    statisticsEffect: changed ? 'changed' : comparable.length > 0 && complete ? 'unchanged' : 'unavailable',
    emittedOptimization: 'not-measured',
  };
}
