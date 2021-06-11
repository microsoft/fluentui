type RemoveIndex<T extends Record<string, unknown>> = Pick<T, KnownKeys<T>>;
type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

type TsOriginalCompilerOptions = import('typescript').CompilerOptions;
interface CompilerOptions extends Omit<RemoveIndex<TsOriginalCompilerOptions>, 'module' | 'target' | 'jsx'> {
  module?: keyof typeof import('typescript').ModuleKind;
  target?: keyof typeof import('typescript').ScriptTarget;
  jsx?: Lowercase<keyof typeof import('typescript').JsxEmit>;
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
  private?: boolean;
  name: string;
  version: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}
