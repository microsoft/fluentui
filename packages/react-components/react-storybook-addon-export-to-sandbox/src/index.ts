export { withExportToSandboxButton } from './decorators/with-export-to-sandbox-button';

/**
 * Host-agnostic sandbox export.
 *
 * These are pure functions over an example's source and configuration — they do not
 * depend on Storybook's runtime, page structure, or DOM. Any host (for example the
 * Fumadocs documentation site) can scaffold and open a sandbox with them.
 */
export { openCodeSandbox, openStackblitz } from './sandbox-factory';
export type { OpenSandboxOptions } from './sandbox-factory';
export { scaffold } from './sandbox-scaffold';
export { getDependencies } from './getDependencies';

export type {
  CssModuleEntry,
  CssModuleSources,
  Data,
  ParametersExtension as Parameters,
  PresetConfig,
  SandboxContext,
} from './public-types';
