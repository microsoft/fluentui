// ── Shared types ──

export interface FileEntry {
  filePath: string;
  packageName: string;
}

/**
 * Output rendering format.
 * - `cli` — terminal-friendly plain text (default)
 * - `md` — GitHub-flavored markdown
 * - `html` — self-contained styled HTML document
 */
export type OutputFormat = 'cli' | 'md' | 'html';

// ── Directive analysis types ──

export type DirectiveStatus = 'redundant' | 'active' | 'skipped' | 'broken' | 'conflicting';

export type DirectiveType = 'use-no-memo' | 'use-memo';

export interface DirectiveLocation {
  /** 1-based line number in the original source */
  line: number;
  /** The full text of the directive line (for removal) */
  lineText: string;
  /** Whether the directive has a `// justified: <reason>` comment */
  justified: boolean;
  /** The justification reason, if present */
  justification?: string;
  /** Which directive type this location represents */
  directiveType: DirectiveType;
}

export interface DirectiveAnalysis {
  filePath: string;
  packageName: string;
  line: number;
  functionName: string | null;
  status: DirectiveStatus;
  compilerEvent: 'CompileError' | 'CompileSuccess' | 'PipelineError' | 'none' | 'skipped';
  /** Concise one-line summary, suitable for a table cell. */
  reason?: string;
  /** Full code-framed compiler diagnostic (multi-line), shown only in the detailed output. */
  fullReason?: string;
  directiveType: DirectiveType;
}

export interface FixResult {
  filesModified: number;
  directivesRemoved: number;
  directivesJustified: number;
}

// ── Coverage analysis types ──

export type CompilationMode = 'infer' | 'annotation' | 'all';

export type FunctionStatus = 'compiled' | 'skipped' | 'error';

export interface MemoStats {
  memoSlots: number;
  memoBlocks: number;
  memoValues: number;
  prunedMemoBlocks: number;
  prunedMemoValues: number;
}

export interface ManualMemoization {
  useMemo: number;
  useCallback: number;
  reactMemo: boolean;
  reactMemoHasComparator: boolean;
}

// ── Runtime-risk analysis types ──

/**
 * A heuristic risk rule. These flag patterns the React Compiler reports as
 * `CompileSuccess` but which break at runtime once the function is memoized:
 * - `unstable-hook-arg` — a fresh inline object/array/function passed to a selector
 *   hook each render, destabilizing `useSyncExternalStoreWithSelector` dependency
 *   slots and crashing in `areHookInputsEqual`.
 * - `nonreactive-store-read` — an imperative store snapshot read (`store.getState()`
 *   or `getXStore().field`) that takes no tracked inputs, so memoization caches a
 *   stale value across store transitions.
 */
export type RiskRuleId = 'unstable-hook-arg' | 'nonreactive-store-read';

/**
 * Confidence that a finding is a real runtime hazard:
 * - `high` — matches a configured selector hook, or a `.getState()` snapshot read.
 * - `medium` — matches a configured store-accessor pattern (`getXStore().field`).
 * - `low` — generic structural heuristic (inline object/array to an unknown `use*` hook).
 */
export type RiskSeverity = 'high' | 'medium' | 'low';

export interface RiskFinding {
  ruleId: RiskRuleId;
  severity: RiskSeverity;
  /** 1-based line of the offending call/expression. */
  line: number;
  /** 0-based column of the offending call/expression. */
  column: number;
  /** Hook or accessor involved, e.g. `useFilteredItems` or `getAppStore`. */
  symbol: string;
  /** Human-readable explanation of why memoization is unsafe here. */
  message: string;
}

export interface FunctionAnalysis {
  filePath: string;
  packageName: string;
  line: number;
  column: number;
  functionName: string | null;
  status: FunctionStatus;
  compilerEvent: 'CompileSuccess' | 'CompileError' | 'CompileSkip' | 'PipelineError';
  /** Concise one-line summary, suitable for a table cell. */
  reason?: string;
  /** Full code-framed compiler diagnostic (multi-line), shown only in the detailed output. */
  fullReason?: string;
  /**
   * For `CompileError` results, the source line where this specific error occurred
   * (inside the function). Distinguishes multiple errors reported for one function.
   */
  errorLine?: number;
  /** For `CompileError` results, the source column of this specific error. */
  errorColumn?: number;
  memoStats?: MemoStats;
  manualMemo?: ManualMemoization;
  bodyInsertionLine?: number;
  /**
   * Heuristic runtime-risk findings for `CompileSuccess` functions — patterns that
   * compile cleanly but are unsafe to memoize. Empty/undefined when none were found.
   */
  risks?: RiskFinding[];
}

export type AnnotateMode = 'manual-memo' | 'all';

export interface AnnotateResult {
  filesModified: number;
  functionsAnnotated: number;
}

export interface CompileFilesOptions {
  concurrency: number;
  verbose: boolean;
  compilationMode: CompilationMode;
  /** Optional risk-detection configuration. When omitted, generic defaults are used. */
  riskConfig?: RiskConfig;
}

/**
 * Configuration for the runtime-risk heuristics.
 *
 * - **Pattern 2 (`unstable-hook-arg`)** is generic and on by default; the optional
 *   `selectorHooks` / `selectorHookSources` allowlists raise matching hooks to high
 *   confidence. Set `generic: false` to flag only the configured hooks.
 * - **Pattern 1 (`nonreactive-store-read`)** is OFF by default — its `.getState()` /
 *   `getXStore()` conventions are app-specific. Opt in via `detectGetStateReads`
 *   and/or `storeAccessorPattern`.
 */
export interface RiskConfig {
  /** Hook names treated as high-confidence external selector hooks (e.g. `useFilteredItems`). */
  selectorHooks?: string[];
  /** Import sources whose exported `use*` hooks are high-confidence selector hooks. */
  selectorHookSources?: string[];
  /**
   * Regex source matching store-accessor function names (e.g. `Store$` for `getAppStore`).
   * When set, enables `getXStore().field` snapshot detection. Omit to disable.
   */
  storeAccessorPattern?: string;
  /** Enable detection of imperative `.getState()` snapshot reads. Default `false`. */
  detectGetStateReads?: boolean;
  /** Disable the generic `unstable-hook-arg` heuristic, flagging only configured hooks. Default `true` (generic on). */
  generic?: boolean;
}
