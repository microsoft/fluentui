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

export interface FileEntry {
  filePath: string;
  packageName: string;
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

export interface Args {
  path: string;
  fix: boolean;
  verbose: boolean;
  fullReasons: boolean;
  concurrency: number;
  exclude: string[];
}
