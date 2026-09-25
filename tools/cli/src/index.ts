export { handleFatalError, main } from './cli';
export { getRegisteredCommandManifest, REGISTERED_COMMANDS } from './commands/registry';
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
  REPORT_USAGE_COMMAND_SPEC,
  getCommandManifest,
} from './utils/command-spec';
export type { CliCommandSpec, CommandOptionSpec } from './utils/command-spec';
export type { CliCoverage, CliDiagnostic, CliStatus } from './utils/diagnostics';
export type { CliEnvelope } from './utils/output';
export type {
  DenseApiDetail,
  DenseApiMember,
  DenseApiMemberView,
  DenseApiOptions,
  DenseApiRoute,
} from './utils/api-dense';
export type { InitConflict, InitFilesReceipt, InitReceipt, ProjectSetupReport } from './commands/init/setup';
export type { ApprovedExtension, ExtensionDescriptor } from './commands/init/extensions';
