// ── Shared types ──

export interface FileEntry {
  filePath: string;
  packageName: string;
}

export interface BaseArgs {
  path: string;
  verbose: boolean;
  fullReasons: boolean;
  concurrency: number;
  exclude: string[];
}

// ── Directive analysis types ──

export type DirectiveStatus = 'redundant' | 'active' | 'skipped';

export interface DirectiveLocation {
  /** 1-based line number in the original source */
  line: number;
  /** The full text of the directive line (for removal) */
  lineText: string;
  /** Whether the directive has a `// justified: <reason>` comment */
  justified: boolean;
  /** The justification reason, if present */
  justification?: string;
}

export interface DirectiveAnalysis {
  filePath: string;
  packageName: string;
  line: number;
  functionName: string | null;
  status: DirectiveStatus;
  compilerEvent: 'CompileError' | 'CompileSuccess' | 'PipelineError' | 'none' | 'skipped';
  reason?: string;
}

export interface AnalyzerOptions {
  concurrency: number;
  verbose: boolean;
}

export interface FixResult {
  filesModified: number;
  directivesRemoved: number;
  directivesJustified: number;
}

export interface DirectiveArgs extends BaseArgs {
  fix: boolean;
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

export interface FunctionAnalysis {
  filePath: string;
  packageName: string;
  line: number;
  column: number;
  functionName: string | null;
  status: FunctionStatus;
  compilerEvent: 'CompileSuccess' | 'CompileError' | 'CompileSkip' | 'PipelineError';
  reason?: string;
  memoStats?: MemoStats;
}

export interface CoverageAnalyzerOptions {
  concurrency: number;
  verbose: boolean;
  compilationMode: CompilationMode;
}

export interface CoverageArgs extends BaseArgs {
  compilationMode: CompilationMode;
}

// ── CLI parsed result ──

export type ParsedCommand =
  | { command: 'directives'; args: DirectiveArgs }
  | { command: 'coverage'; args: CoverageArgs };
