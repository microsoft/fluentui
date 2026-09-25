export {
  API_COMMAND_SPEC,
  COMMAND_SPECS,
  DOCTOR_COMMAND_SPEC,
  INIT_COMMAND_SPEC,
  MANIFEST_COMMAND_SPEC,
  METADATA_COMMAND_SPEC,
  METADATA_GENERATE_COMMAND_SPEC,
  METADATA_VALIDATE_COMMAND_SPEC,
  REPORT_COMMAND_SPEC,
  REPORT_INFO_COMMAND_SPEC,
  REPORT_INFO_OPTIONS,
  REPORT_USAGE_COMMAND_SPEC,
  REPORT_USAGE_OPTIONS,
  applyCommandOptions,
  getCommandManifest,
} from './command-spec';
export type { CliCommandSpec, CommandOptionSpec } from './command-spec';
export { CliError, normalizeDiagnostic } from './diagnostics';
export type { CliCoverage, CliDiagnostic, CliDiagnosticSeverity, CliStatus } from './diagnostics';
export { CLI_API_VERSION, createEnvelope, emitOutput, emptyCoverage, formatDiagnostics } from './output';
export type { CliEnvelope, OutputOptions } from './output';
export { loadMetadataGenerator } from './metadata-generator';
export type { CommandHandler } from './types';
export { CatalogConfigError, CATALOG_CONFIG_FILE, loadCatalogConfig, validateCatalogConfig } from './config';
export type { CatalogConfig, CatalogConfigCatalog, CatalogSystemConfig, LoadedCatalogConfig } from './config';
export { CatalogInventoryError, getCatalogInventory } from './catalog-inventory';
export type {
  CatalogDiagnostic,
  CatalogInventory,
  CatalogPackageSelection,
  CatalogRoot,
  CatalogSelectionOptions,
} from './catalog-inventory';
export { CATALOG_SELECTION_OPTIONS } from './catalog-options';
export type { CatalogOptionArgs } from './catalog-options';
export {
  findWorkspaceRoot,
  findSelectedPackageRoot,
  getWorkspacePackageInventory,
  matchesPackagePattern,
  parsePackageSpecifier,
  formatPackageSpecifier,
  resolveInstalledPackage,
} from './package-inventory';
export type { InstalledPackage, ParsedPackageSpecifier, WorkspacePackageInventory } from './package-inventory';
export { CATALOG_SYSTEM_PRESETS, LEGACY_INFO_PACKAGE_PATTERNS, LEGACY_USAGE_PACKAGE_PATTERNS } from './system-presets';
export type { CatalogSystemPreset } from './system-presets';
export { formatApiDetail, formatApiIndex } from './api-format';
export { createDenseApiDetail, createDenseApiIndex } from './api-dense';
export type { DenseApiDetail, DenseApiMember, DenseApiMemberView, DenseApiOptions, DenseApiRoute } from './api-dense';
export { getApiImportIssue, isRouteFromRoot, preferredApiRoots, selectApiImport } from './api-import';
export type { ApiImportSelection, RecommendedImport } from './api-import';
export { markdownCode, markdownCodeBlock, markdownTable, escapeMarkdownTableCell } from './markdown';
