import { candidateFor, compareCandidates } from '../candidates';
import type { FunctionAnalysis, ManualMemoization } from '../types';

function analysis(id: string, manualMemo?: ManualMemoization): FunctionAnalysis {
  return {
    filePath: `/ws/${id}.tsx`,
    packageName: 'pkg',
    line: 1,
    column: 0,
    functionName: 'Component',
    sourceFunctionId: id,
    functionKind: 'component',
    status: 'compiled',
    compilerEvent: 'CompileSuccess',
    existingDirectives: { useMemo: false, useNoMemo: false },
    ...(manualMemo ? { manualMemo } : {}),
  };
}

describe('candidate derivation', () => {
  it('preserves compiled plus manual memo as the migration predicate', () => {
    const result = analysis('manual', {
      useMemo: 1,
      useCallback: 0,
      reactMemo: false,
      reactMemoHasComparator: false,
    });
    expect(candidateFor(result, true)).toMatchObject({
      lane: 'manual-memo-migration',
      action: 'hook-lowering-review',
    });
  });

  it('retains custom comparators by default', () => {
    const result = analysis('comparator', {
      useMemo: 0,
      useCallback: 0,
      reactMemo: true,
      reactMemoHasComparator: true,
    });
    expect(candidateFor(result, true)?.action).toBe('custom-comparator-retain');
  });

  it('does not create a candidate for accepted functions without manual memo', () => {
    expect(candidateFor(analysis('no-manual-memo'), false)).toBeNull();
  });

  it("excludes functions carrying 'use no memo'", () => {
    const result = analysis('opted-out', {
      useMemo: 1,
      useCallback: 0,
      reactMemo: false,
      reactMemoHasComparator: false,
    });
    result.existingDirectives!.useNoMemo = true;
    expect(candidateFor(result, true)).toBeNull();
  });

  it('emits every supported readiness state through a production path', () => {
    const reviewable = analysis('reviewable', {
      useMemo: 1,
      useCallback: 0,
      reactMemo: false,
      reactMemoHasComparator: false,
    });
    const unassessed = analysis('unassessed', {
      useMemo: 1,
      useCallback: 0,
      reactMemo: false,
      reactMemoHasComparator: false,
    });
    const unknown = analysis('unknown', {
      useMemo: 1,
      useCallback: 0,
      reactMemo: false,
      reactMemoHasComparator: false,
    });
    unknown.functionKind = 'unknown';
    const risky = analysis('risky', {
      useMemo: 1,
      useCallback: 0,
      reactMemo: false,
      reactMemoHasComparator: false,
    });
    risky.risks = [
      {
        ruleId: 'nonreactive-store-read',
        severity: 'high',
        line: 1,
        column: 0,
        symbol: 'store.getState',
        message: 'unsafe snapshot read',
      },
    ];

    expect(
      new Set([
        candidateFor(reviewable, true)?.readiness,
        candidateFor(unassessed, false)?.readiness,
        candidateFor(unknown, true)?.readiness,
        candidateFor(risky, true)?.readiness,
      ]),
    ).toEqual(new Set(['reviewable', 'risk-unassessed', 'needs-kind-review', 'blocked-known-risk']));
  });

  it('does not let manual call counts change ordering', () => {
    const few = analysis('a', {
      useMemo: 1,
      useCallback: 0,
      reactMemo: false,
      reactMemoHasComparator: false,
    });
    const many = analysis('b', {
      useMemo: 100,
      useCallback: 100,
      reactMemo: false,
      reactMemoHasComparator: false,
    });
    const a = candidateFor(few, true)!;
    const b = candidateFor(many, true)!;
    const before = compareCandidates({ analysis: few, candidate: a }, { analysis: many, candidate: b });
    few.manualMemo!.useMemo = 1000;
    many.manualMemo!.useMemo = 0;
    const after = compareCandidates({ analysis: few, candidate: a }, { analysis: many, candidate: b });
    expect(after).toBe(before);
  });
});
