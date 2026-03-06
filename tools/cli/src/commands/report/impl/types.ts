// ============================================================================
// Report command types
// ============================================================================

/**
 * Parsed CLI arguments for the `report info` subcommand.
 * No flags — produces a quick package/environment summary.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InfoArgs {}

/**
 * Parsed CLI arguments for the `report usage` subcommand.
 */
export interface UsageArgs {
  /** Root path for file traversal. Defaults to git root. */
  path?: string;
  /** Output format. Defaults to 'json'. */
  reporter?: 'json' | 'markdown' | 'html';
  /** Glob patterns to include. Only matching files are analyzed. */
  include?: string[];
  /** Glob patterns to exclude. Matching files are skipped. */
  exclude?: string[];
}

/**
 * System information included in the short report.
 */
export interface SystemInfo {
  node: string;
  os: string;
  nativeTarget: string;
  packageManager: string;
}

/**
 * A resolved package with its installed version.
 */
export interface ResolvedPackage {
  name: string;
  version: string;
}

/**
 * A package with multiple installed versions (duplicate).
 */
export interface DuplicatePackage {
  name: string;
  versions: string[];
}

/**
 * Data collected for the short report output.
 */
export interface ShortReportData {
  system: SystemInfo;
  packages: ResolvedPackage[];
  duplicates: DuplicatePackage[];
}

// ============================================================================
// Long report (Metadata) types
// ============================================================================

/**
 * Prop usage information — tracks which values are used and how many times.
 */
export interface PropUsage {
  values: string[];
  count: number;
}

/**
 * Component usage information — tracks props and usage count.
 */
export interface ComponentUsage {
  props: Record<string, PropUsage>;
  count: number;
}

/**
 * Hook usage information — tracks argument props and usage count.
 */
export interface HookUsage {
  props: Record<string, PropUsage>;
  count: number;
}

/**
 * Type/symbol usage — tracks count only.
 */
export interface SymbolUsage {
  count: number;
}

/**
 * Type usage — tracks count, typeof references, and generic type arguments.
 * Richer than SymbolUsage: distinguishes `typeof X` from standard annotations
 * and captures generic type params (e.g., `DataGridProps<{hello: 'world'}>`)
 * similarly to how component/hook props are captured.
 */
export interface TypeUsage {
  count: number;
  /** Number of typeof references (e.g., `typeof Button`). */
  typeofCount: number;
  /** Generic type argument usage — captured like component/hook props. */
  props: Record<string, PropUsage>;
}

/**
 * Function/utility usage — tracks count and call arguments.
 */
export interface FunctionUsage {
  props: Record<string, PropUsage>;
  count: number;
}

/**
 * Unknown symbol usage — symbol whose .d.ts couldn't be resolved.
 * Includes a description hinting at what the symbol might be.
 * If the symbol is callable, props tracks its call arguments.
 */
export interface UnknownSymbolUsage {
  props: Record<string, PropUsage>;
  count: number;
  description: string;
}

/**
 * Usage data for a single package import.
 */
export interface PackageUsageData {
  components: Record<string, ComponentUsage>;
  hooks: Record<string, HookUsage>;
  types: Record<string, TypeUsage>;
  others: Record<string, FunctionUsage>;
  unknowns: Record<string, UnknownSymbolUsage>;
  count: number;
}

/**
 * Full metadata structure produced by the long report.
 * Keys are package import specifiers (e.g. `@fluentui/react-components`).
 */
export type Metadata = Record<string, PackageUsageData>;

/**
 * Describes a single report category in the legend.
 */
export interface CategoryLegendEntry {
  /** Human-readable category name. */
  name: string;
  /** Short description of what the category contains. */
  description: string;
}

/**
 * Complete long report output including the file map and per-package metadata.
 */
export interface LongReportOutput {
  /** Describes each category used in the report. */
  legend: Record<string, CategoryLegendEntry>;
  /** Relative paths of all source files analyzed. */
  fileMap: string[];
  /** Per-package usage metadata. */
  packages: Metadata;
}

// ============================================================================
// AST parser abstraction types
// ============================================================================

/**
 * Represents a single named import from a module.
 */
export interface ImportInfo {
  moduleSpecifier: string;
  namedImports: string[];
  isTypeOnly: boolean;
}

/**
 * Represents a JSX element usage with its props.
 */
export interface JsxUsageInfo {
  componentName: string;
  props: Record<string, string | undefined>;
  moduleSpecifier: string;
}

/**
 * Represents a function call expression usage.
 */
export interface CallUsageInfo {
  functionName: string;
  args: Record<string, string | undefined>;
  moduleSpecifier: string;
}

/**
 * Represents a type reference usage (typeof or generic type params).
 */
export interface TypeRefUsageInfo {
  symbolName: string;
  moduleSpecifier: string;
  kind: 'typeof' | 'generic';
  typeArgs?: string[];
}

/**
 * Classification of an imported symbol based on its type definition.
 */
export type SymbolClassification = 'component' | 'hook' | 'type' | 'other' | 'unknown';

/**
 * Abstract AST parser interface.
 * Implementations can use ts-morph, raw TypeScript compiler API, or any other parser.
 */
export interface AstParser {
  /**
   * Initialize a project from source files.
   */
  createProject(filePaths: string[], tsConfigPath?: string, rootPath?: string): void;

  /**
   * Get all source file paths in the project.
   */
  getSourceFiles(): string[];

  /**
   * Get all import declarations from a source file.
   */
  getImportDeclarations(filePath: string): ImportInfo[];

  /**
   * Get all JSX element usages from a source file.
   */
  getJsxElementUsages(filePath: string): JsxUsageInfo[];

  /**
   * Get all function call expression usages from a source file.
   */
  getCallExpressionUsages(filePath: string): CallUsageInfo[];

  /**
   * Classify an imported symbol by resolving its type definition.
   *
   * @param filePath - Source file containing the import.
   * @param symbolName - The imported symbol name.
   * @param moduleSpecifier - The module specifier of the import.
   * @returns The symbol classification.
   */
  classifySymbol(filePath: string, symbolName: string, moduleSpecifier: string): SymbolClassification;

  /**
   * Generate a description for an unknown symbol based on naming conventions.
   */
  describeUnknownSymbol(symbolName: string): string;

  /**
   * Get type reference usages (typeof and generic type params) from a source file.
   */
  getTypeReferenceUsages(filePath: string): TypeRefUsageInfo[];

  /**
   * Get value reference usages (non-JSX, non-call identifier references) from a source file.
   */
  getValueReferenceUsages(filePath: string): Array<{ symbolName: string; moduleSpecifier: string }>;
}
