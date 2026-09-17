import type { ResolverStats } from './module-resolver';

export interface FileEntry {
  filePath: string;
  packageName: string | null;
  packageRoot?: string | null;
}

export interface SourcePosition {
  line: number;
  column: number;
  offset: number;
}

export interface SourceSpan {
  start: SourcePosition;
  end: SourcePosition;
}

export type OutputFormat = 'cli' | 'md' | 'html' | 'json';
export type RenderedFormat = Exclude<OutputFormat, 'json'>;

export type DirectiveStatus = 'redundant' | 'active' | 'skipped' | 'broken' | 'conflicting';
export type DirectiveType = 'use-no-memo' | 'use-memo';

export interface DirectiveOccurrence {
  id: string;
  directiveType: DirectiveType;
  functionId: string | null;
  span: SourceSpan;
  line: number;
  column: number;
  lineText: string;
  justified: boolean;
  justification?: string;
}

/** @deprecated Use {@link DirectiveOccurrence}. */
export type DirectiveLocation = DirectiveOccurrence;

export interface DirectiveAnalysis {
  filePath: string;
  packageName: string | null;
  line: number;
  column?: number;
  functionName: string | null;
  sourceFunctionId?: string | null;
  directiveId?: string;
  directiveSpan?: SourceSpan;
  sourceHash?: string;
  status: DirectiveStatus;
  compilerEvent: 'CompileError' | 'CompileSuccess' | 'PipelineError' | 'none' | 'skipped';
  reason?: string;
  fullReason?: string;
  directiveType: DirectiveType;
}

export interface FixResult {
  filesModified: number;
  directivesRemoved: number;
  directivesJustified: number;
}

export type CompilationMode = 'infer' | 'annotation' | 'all';
export type FunctionStatus = 'compiled' | 'skipped' | 'error';

export interface NullableMemoStats {
  memoSlots: number | null;
  memoBlocks: number | null;
  memoValues: number | null;
  prunedMemoBlocks: number | null;
  prunedMemoValues: number | null;
}

/** @deprecated Use {@link NullableMemoStats}. */
export type MemoStats = NullableMemoStats;

export interface ManualMemoization {
  useMemo: number;
  useCallback: number;
  reactMemo: boolean;
  reactMemoHasComparator: boolean;
}

export type SourceFunctionKind = 'component' | 'hook' | 'other' | 'unknown';
export type SourceFunctionSyntax = 'declaration' | 'expression' | 'arrow';

export interface SourceFunction {
  id: string;
  filePath: string;
  packageName: string | null;
  packageRoot: string | null;
  name: string | null;
  kind: SourceFunctionKind;
  syntax: SourceFunctionSyntax;
  declarationSpan: SourceSpan;
  bodySpan: SourceSpan;
  bodyInsertionOffset: number | null;
  bodyInsertionLine: number | null;
  directives: DirectiveOccurrence[];
  manualMemo?: ManualMemoization;
  findings?: RiskFinding[];
}

export type RiskRuleId = 'nonreactive-store-read' | 'hidden-selector-hook';
export type RiskSeverity = 'high' | 'medium';
export interface RiskFinding {
  ruleId: RiskRuleId;
  severity: RiskSeverity;
  line: number;
  column: number;
  symbol: string;
  message: string;
}

export interface CompilerOccurrence {
  ordinal: number;
  kind: string;
  functionId: string | null;
  rawFunctionSpan: SourceSpan | null;
  diagnosticSpan: SourceSpan | null;
  reason?: string;
  fullReason?: string;
  memoStats?: NullableMemoStats;
}

export interface CompilerDiagnostic {
  kind: 'CompileError' | 'PipelineError';
  span: SourceSpan | null;
  reason: string;
  fullReason?: string;
}

/**
 * Compact compatibility view used by human reporters and the v1 projection.
 * Each row is canonical per source function; compiler occurrences never create extra rows.
 */
export interface FunctionAnalysis {
  filePath: string;
  packageName: string | null;
  line: number;
  column: number;
  functionName: string | null;
  sourceFunctionId?: string;
  functionKind?: SourceFunctionKind;
  status: FunctionStatus;
  compilerEvent: 'CompileSuccess' | 'CompileError' | 'CompileSkip' | 'PipelineError';
  diagnostics?: CompilerDiagnostic[];
  reason?: string;
  fullReason?: string;
  errorLine?: number;
  errorColumn?: number;
  memoStats?: NullableMemoStats | null;
  manualMemo?: ManualMemoization;
  bodyInsertionLine?: number;
  bodyInsertionOffset?: number;
  sourceHash?: string;
  existingDirectives?: { useMemo: boolean; useNoMemo: boolean };
  risks?: RiskFinding[];
}

export type AnnotateMode = 'manual-memo' | 'all' | 'all-safe' | 'bailout-only';
export type QuoteStyle = 'single' | 'double';

export interface AnnotateResult {
  filesModified: number;
  functionsAnnotated: number;
  functionsBailedOut: number;
}

export interface CompileFilesOptions {
  concurrency: number;
  verbose: boolean;
  compilationMode: CompilationMode;
  riskConfig?: RiskConfig;
  parserPlugins?: string[];
  workspaceRoot?: string;
  onResolverStats?: (stats: ResolverStats | undefined) => void;
}

export interface RiskConfig {
  /**
   * Regex source matching store-accessor function names (e.g. `Store$` for `getAppStore`).
   * When set, enables `getXStore().field` snapshot detection (`nonreactive-store-read`), including
   * one level of local binding (`const s = getAppStore(); … s.field`). `useXxx`-named callees are
   * never matched, since a hook result is recomputed every render. Omit to disable.
   */
  storeAccessorPattern?: string;
  /**
   * Enable detection of imperative `.getState()` snapshot reads (`nonreactive-store-read`),
   * including one level of local binding. Default `false`.
   */
  detectGetStateReads?: boolean;
  /**
   * Marker property names that identify a hidden selector hook accessed via property chain,
   * e.g. `["use"]` matches `store.use.field()` (`hidden-selector-hook`). The receiver may be any
   * expression, and optional-chained forms (`store?.use.field()`) match too. Empty/omitted
   * disables it.
   */
  selectorHookProperties?: string[];
  /**
   * Follow first-party wrapper calls and re-export barrels to flag risks reached *indirectly*
   * (e.g. a component calling a plain `readActiveId()` helper that does `getStore().getState()`).
   * Off by default. Resolution is syntactic and first-party only — it stops at `node_modules`,
   * dynamic dispatch, and method calls on inferred receivers. Requires at least one leaf rule.
   */
  resolveWrappers?: boolean;
  /**
   * tsconfig-style path aliases used by wrapper resolution to follow workspace imports
   * (e.g. `@app/foo`). `baseUrl` is the absolute dir the `paths` targets are relative to.
   */
  pathAliases?: {
    baseUrl: string;
    paths: Record<string, string[]>;
  };
}

/** Stable command defaults read from `rca.config.json`. */
export interface RcaConfig {
  $schema?: string;
  mode?: CompilationMode;
  verbose?: boolean;
  concurrency?: number;
  exclude?: string[];
  format?: OutputFormat;
  strictPaths?: boolean;
  parserPlugins?: string[];
  analyze?: {
    quote?: QuoteStyle;
    risks?: RiskConfig;
  };
}

export type CandidateLane = 'manual-memo-migration';
export type CandidateAction = 'hook-lowering-review' | 'default-wrapper-review' | 'custom-comparator-retain';
export type CandidateReadiness = 'reviewable' | 'risk-unassessed' | 'needs-kind-review' | 'blocked-known-risk';

export interface MigrationCandidate {
  sourceFunctionId: string;
  lane: CandidateLane;
  action: CandidateAction;
  readiness: CandidateReadiness;
  blockers: string[];
}

interface DocumentEnvelope {
  schemaVersion: 2;
  tool: 'react-compiler-analyzer';
  command: 'analyze' | 'lint';
  mode: CompilationMode;
}

export interface JsonFunction {
  file: string;
  package: string | null;
  line: number;
  column: number;
  function: string | null;
  status: FunctionStatus;
  compilerEvent: FunctionAnalysis['compilerEvent'];
  reason?: string;
  errorLine?: number;
  errorColumn?: number;
  memoStats?: NullableMemoStats | null;
  manualMemo?: Pick<ManualMemoization, 'useMemo' | 'useCallback' | 'reactMemo' | 'reactMemoHasComparator'>;
}

export interface JsonFinding {
  file: string;
  package: string | null;
  line: number;
  column: number;
  function: string | null;
  ruleId: RiskRuleId;
  severity: RiskSeverity;
  symbol: string;
  message: string;
  compiled: boolean;
  suppressed?: boolean;
}

export interface AnalysisDocument extends DocumentEnvelope {
  schemaVersion: 2;
  command: 'analyze';
  summary: {
    functions: number;
    compiled: number;
    memoCacheEmitted: number;
    skipped: number;
    errors: number;
    findings: number;
    findingsOnCompiled: number;
    findingsSuppressed: number;
    unparseableFiles: number;
  };
  functions: JsonFunction[];
  findings: JsonFinding[];
  unparseable: { file: string; error: string }[];
  annotate?: AnnotateResult & { mode: AnnotateMode };
}

export interface JsonDirective {
  file: string;
  package: string | null;
  line: number;
  column: number;
  directive: DirectiveType;
  status: DirectiveStatus;
  compilerEvent: DirectiveAnalysis['compilerEvent'];
  function: string | null;
  reason?: string;
}

export interface LintDocument extends DocumentEnvelope {
  schemaVersion: 2;
  command: 'lint';
  summary: {
    directives: number;
    active: number;
    redundant: number;
    broken: number;
    conflicting: number;
    skipped: number;
  };
  directives: JsonDirective[];
}
