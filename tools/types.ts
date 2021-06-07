export interface TsConfig {
  extends?: string;
  compilerOptions: import('typescript').CompilerOptions;
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
