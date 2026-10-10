import type {
  CandidateAction,
  CandidateLane,
  CandidateReadiness,
  FunctionAnalysis,
  MigrationCandidate,
  RiskConfig,
} from './types';
import { compareText } from './ordering';

const LANE_ORDER: CandidateLane[] = ['manual-memo-migration'];
const READINESS_ORDER: CandidateReadiness[] = [
  'reviewable',
  'risk-unassessed',
  'needs-kind-review',
  'blocked-known-risk',
];
const ACTION_ORDER: CandidateAction[] = ['hook-lowering-review', 'default-wrapper-review', 'custom-comparator-retain'];

function readinessFor(
  analysis: FunctionAnalysis,
  riskConfigured: boolean,
): { readiness: CandidateReadiness; blockers: string[] } {
  if ((analysis.risks?.length ?? 0) > 0) {
    return {
      readiness: 'blocked-known-risk',
      blockers: analysis.risks!.map(finding => `${finding.ruleId}: ${finding.symbol}`),
    };
  }
  if (!riskConfigured) {
    return { readiness: 'risk-unassessed', blockers: ['runtime-risk analysis was not configured'] };
  }
  if (analysis.functionKind === 'unknown') {
    return { readiness: 'needs-kind-review', blockers: ['source function kind is unknown'] };
  }
  return { readiness: 'reviewable', blockers: [] };
}

function actionFor(analysis: FunctionAnalysis): CandidateAction {
  const memo = analysis.manualMemo!;
  if (memo.reactMemoHasComparator) {
    return 'custom-comparator-retain';
  }
  if (memo.reactMemo) {
    return 'default-wrapper-review';
  }
  return 'hook-lowering-review';
}

/** Build an unscored candidate record from canonical compiler and source-function state. */
export function candidateFor(analysis: FunctionAnalysis, riskConfigured: boolean): MigrationCandidate | null {
  if (analysis.status !== 'compiled') {
    return null;
  }
  if (analysis.existingDirectives?.useNoMemo) {
    return null;
  }
  if (!analysis.manualMemo) {
    return null;
  }

  const { readiness, blockers } = readinessFor(analysis, riskConfigured);
  return {
    sourceFunctionId:
      analysis.sourceFunctionId ??
      `${analysis.filePath}:${analysis.line}:${analysis.column}:${analysis.functionName ?? ''}`,
    lane: 'manual-memo-migration',
    action: actionFor(analysis),
    readiness,
    blockers,
  };
}

/** Candidate ordering is independent of all memo counters and inferred performance value. */
export function compareCandidates(a: CandidateEntry, b: CandidateEntry): number {
  return (
    LANE_ORDER.indexOf(a.candidate.lane) - LANE_ORDER.indexOf(b.candidate.lane) ||
    READINESS_ORDER.indexOf(a.candidate.readiness) - READINESS_ORDER.indexOf(b.candidate.readiness) ||
    ACTION_ORDER.indexOf(a.candidate.action) - ACTION_ORDER.indexOf(b.candidate.action) ||
    compareText(a.analysis.packageName ?? '', b.analysis.packageName ?? '') ||
    compareText(a.analysis.filePath, b.analysis.filePath) ||
    a.analysis.line - b.analysis.line ||
    a.analysis.column - b.analysis.column ||
    compareText(a.candidate.sourceFunctionId, b.candidate.sourceFunctionId)
  );
}

export interface CandidateEntry {
  candidate: MigrationCandidate;
  analysis: FunctionAnalysis;
}

export function deriveCandidates(analyses: FunctionAnalysis[], riskConfigured: boolean): CandidateEntry[] {
  const candidates: CandidateEntry[] = [];
  for (const analysis of analyses) {
    const candidate = candidateFor(analysis, riskConfigured);
    if (candidate) {
      candidates.push({ analysis, candidate });
    }
  }
  return candidates.sort(compareCandidates);
}

export function isRiskAnalysisConfigured(config: RiskConfig | undefined): boolean {
  return Boolean(
    config?.detectGetStateReads ||
      (config?.storeAccessorPattern?.length ?? 0) > 0 ||
      (config?.selectorHookProperties?.length ?? 0) > 0,
  );
}
