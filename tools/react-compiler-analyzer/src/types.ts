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
 * A heuristic risk rule. Flags a pattern the React Compiler reports as `CompileSuccess`
 * but which misbehaves at runtime once the function is memoized:
 * - `nonreactive-store-read` — an imperative store snapshot read (`store.getState()`
 *   or `getXStore().field`) that takes no tracked inputs. The compiler memoizes it behind
 *   a compute-once cache slot, so it is read on the first render and never again — freezing
 *   the value across store transitions.
 * - `hidden-selector-hook` — a selector accessed via property chain (`store.use.field()`)
 *   that calls a real hook internally but isn't `useXxx()`-named at the call site. The
 *   compiler doesn't recognize it as a hook and may memoize around it, moving the hidden hook
 *   into a cache branch and causing a hook-order crash (`areHookInputsEqual`).
 */
export type RiskRuleId = 'nonreactive-store-read' | 'hidden-selector-hook';

/**
 * Confidence that a finding is a real runtime hazard:
 * - `high` — a `.getState()` snapshot read.
 * - `medium` — a `getXStore().field` read matching a configured store-accessor pattern.
 */
export type RiskSeverity = 'high' | 'medium';

export interface RiskFinding {
  ruleId: RiskRuleId;
  severity: RiskSeverity;
  /** 1-based line of the offending call/expression. */
  line: number;
  /** 0-based column of the offending call/expression. */
  column: number;
  /** Accessor involved, e.g. `getAppStore` or `getAppStore.getState`. */
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

export type AnnotateMode = 'manual-memo' | 'all' | 'all-safe';

export interface AnnotateResult {
  filesModified: number;
  functionsAnnotated: number;
  /** Functions given a justified `'use no memo'` bailout instead of `'use memo'` (mode `all-safe`). */
  functionsBailedOut: number;
}

export interface CompileFilesOptions {
  concurrency: number;
  verbose: boolean;
  compilationMode: CompilationMode;
  /** Optional risk-detection configuration. When omitted, no risk rules run. */
  riskConfig?: RiskConfig;
}

/**
 * Configuration for the runtime-risk rules. Every rule is OFF unless opted into — their
 * `.getState()` / `getXStore()` / `.use.field()` conventions are app-specific, not universal.
 */
export interface RiskConfig {
  /**
   * Regex source matching store-accessor function names (e.g. `Store$` for `getAppStore`).
   * When set, enables `getXStore().field` snapshot detection (`nonreactive-store-read`). Omit to disable.
   */
  storeAccessorPattern?: string;
  /** Enable detection of imperative `.getState()` snapshot reads (`nonreactive-store-read`). Default `false`. */
  detectGetStateReads?: boolean;
  /**
   * Marker property names that identify a hidden selector hook accessed via property chain,
   * e.g. `["use"]` matches `store.use.field()` (`hidden-selector-hook`). Empty/omitted disables it.
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
