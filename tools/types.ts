export interface TsConfig {
  extends?: string;
  compilerOptions: import('typescript').CompilerOptions;
  include?: Array<string>;
  files?: Array<string>;
  exclude?: Array<string>;
  references?: Array<{ path: string }>;
}
