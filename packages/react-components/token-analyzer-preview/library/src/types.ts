// types.ts
export interface TokenReference {
  property: string;
  token: string;
  path: string[];
  isVariableReference?: boolean;
  sourceFile?: string;
}

export interface StyleContent {
  tokens: TokenReference[];
  nested?: StyleTokens;
  isResetStyles?: boolean;
  assignedVariables?: string[];
}

export interface StyleTokens {
  [key: string]: StyleContent;
}

export interface StyleAnalysis {
  [key: string]: StyleTokens;
}

export interface StyleCondition {
  style: string;
  condition?: string;
}

export interface StyleMetadata {
  styleConditions: {
    [styleName: string]: {
      isBase?: boolean;
      conditions?: string[];
      slotName: string;
    };
  };
}

export interface FileAnalysis {
  styles: StyleAnalysis;
  metadata: StyleMetadata;
}

export interface AnalysisResults {
  [filePath: string]: FileAnalysis;
}

// Constants
export const TOKEN_REGEX = /tokens\.[a-zA-Z0-9.]+/g;
export const IGNORED_DIRS = ['node_modules', 'dist', 'build', '.git'];
export const VALID_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs'];

export type TokenMap = Map<string, string>;
