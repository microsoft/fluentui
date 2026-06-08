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
}
