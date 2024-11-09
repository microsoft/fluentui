export type TokenMap = Map<string, string>;

export interface TokenReference {
  property: string;
  token: string;
  path: string[];
  isVariableReference?: boolean;
  sourceFile?: string;
}

export interface StyleAnalysis {
  [key: string]: {
    tokens: TokenReference[];
    nested?: StyleAnalysis;
  };
}

export interface AnalysisResults {
  [filePath: string]: StyleAnalysis;
}

// Constants
export const TOKEN_REGEX = /tokens\.[a-zA-Z0-9.]+/g;
export const IGNORED_DIRS = ['node_modules', 'dist', 'build', '.git'];
export const VALID_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs'];
