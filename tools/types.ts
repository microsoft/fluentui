type TsOriginalCompilerOptions = import('typescript').CompilerOptions;
interface CompilerOptions
  extends Omit<
    RemoveRecordIndexSignature<TsOriginalCompilerOptions>,
    'module' | 'target' | 'jsx' | 'moduleResolution'
  > {
  module?: keyof typeof import('typescript').ModuleKind;
  target?: keyof typeof import('typescript').ScriptTarget;
  jsx?: 'none' | 'preserve' | 'react' | 'react-native' | 'react-jsx' | 'react-jsxdev';
  moduleResolution?: 'Node' | 'Classic';
}

export interface TsConfig {
  extends?: string;
  compilerOptions: CompilerOptions;
  include?: Array<string>;
  files?: Array<string>;
  exclude?: Array<string>;
  references?: Array<{ path: string }>;
}

export interface PackageJson {
  bin?: string | Record<string, string>;
  types?: string;
  typings?: string;
  private?: boolean;
  name: string;
  version: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

// ===============
//  Type Utilities
// ===============

/**
 * Removes index signature `[key:string]: any` from Dictionary/Record
 *
 * @example
 *
 * ```ts
 * type MapWithIndexType = { one: number; two: string; [k: string]: any; }
 * // $ExpectType { one: number; two: string; }
 * type Test = RemoveRecordIndexSignature<MapWithIndexType>
 * ```
 */
export type RemoveRecordIndexSignature<T extends Record<string, unknown>> = {
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K];
};
