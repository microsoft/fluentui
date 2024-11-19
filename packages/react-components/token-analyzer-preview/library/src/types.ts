// Base types
export interface TokenReference {
  property: string;
  token: string;
  path: string[];
  isVariableReference?: boolean;
  sourceFile?: string;
}

export interface StyleContent {
  tokens: TokenReference[];
  nested?: StyleAnalysis;
}

export interface StyleAnalysis {
  [key: string]: StyleContent;
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
    };
  };
}

// Separate styles and metadata cleanly
export interface EnhancedStyleAnalysis {
  styles: StyleAnalysis;
  metadata: StyleMetadata;
}

// Constants
export const TOKEN_REGEX = /tokens\.[a-zA-Z0-9.]+/g;
export const IGNORED_DIRS = ['node_modules', 'dist', 'build', '.git'];
export const VALID_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs'];

// Type to track variable to token mappings
export type TokenMap = Map<string, string>;
