import type { Argv, Options } from 'yargs';

import { CATALOG_SELECTION_OPTIONS } from './catalog-options';

export interface CommandOptionSpec extends Options {
  describe: string;
}

export interface CliCommandSpec {
  command: string;
  description: string;
  options: Record<string, CommandOptionSpec>;
  responses: readonly string[];
  exits: Readonly<Record<number, string>>;
  subcommands?: readonly CliCommandSpec[];
}

export const catalogSelectionOptions = {
  cwd: {
    type: 'string',
    describe: 'Workspace/import context used to resolve installed packages',
    conflicts: 'path',
  },
  path: {
    type: 'string',
    describe: 'Alias for --cwd; workspace/import context used for package resolution',
    conflicts: 'cwd',
  },
  ...CATALOG_SELECTION_OPTIONS,
} satisfies Record<string, CommandOptionSpec>;

export const machineOutputOptions = {
  json: {
    type: 'boolean',
    default: false,
    describe: 'Emit one versioned JSON response document',
  },
  output: {
    type: 'string',
    describe: 'Write the response to a file instead of stdout',
  },
} satisfies Record<string, CommandOptionSpec>;

export const REPORT_INFO_OPTIONS = {
  output: {
    alias: 'o',
    type: 'string',
    describe: 'Output file path (default: stdout)',
  },
  ...CATALOG_SELECTION_OPTIONS,
} satisfies Record<string, CommandOptionSpec>;

export const REPORT_USAGE_OPTIONS = {
  path: {
    alias: 'p',
    type: 'string',
    describe: 'Root path for file traversal (defaults to git root)',
  },
  reporter: {
    alias: 'r',
    type: 'string',
    choices: ['json', 'markdown', 'html'] as const,
    default: 'json',
    describe: 'Output format',
  },
  include: {
    type: 'string',
    array: true,
    describe: 'Glob patterns to include files',
  },
  exclude: {
    type: 'string',
    array: true,
    describe: 'Glob patterns to exclude files',
  },
  output: {
    alias: 'o',
    type: 'string',
    describe: 'Output file path (default: stdout)',
  },
  ...CATALOG_SELECTION_OPTIONS,
} satisfies Record<string, CommandOptionSpec>;

export const REPORT_INFO_COMMAND_SPEC: CliCommandSpec = {
  command: 'info',
  description: 'Quick package & environment summary for issue reporting',
  options: REPORT_INFO_OPTIONS,
  responses: ['legacy reporter output'],
  exits: { 0: 'Report emitted', 1: 'Report failed' },
};

export const REPORT_USAGE_COMMAND_SPEC: CliCommandSpec = {
  command: 'usage',
  description: 'Deep codebase usage analysis of Fluent UI APIs',
  options: REPORT_USAGE_OPTIONS,
  responses: ['legacy reporter output'],
  exits: { 0: 'Report emitted', 1: 'Report failed' },
};

export const REPORT_COMMAND_SPEC: CliCommandSpec = {
  command: 'report',
  description: 'Generate reports (info for issue reporting, usage for codebase analysis)',
  options: {},
  responses: ['legacy reporter output'],
  exits: { 0: 'Report emitted', 1: 'Report failed' },
  subcommands: [REPORT_INFO_COMMAND_SPEC, REPORT_USAGE_COMMAND_SPEC],
};

export const METADATA_GENERATE_COMMAND_SPEC: CliCommandSpec = {
  command: 'generate',
  description: 'Generate canonical package API metadata from published declarations',
  options: {
    'package-root': {
      type: 'string',
      describe: 'Package root containing package.json; defaults to the current directory',
    },
    'package-name': {
      type: 'string',
      describe: 'Expected package name',
    },
    entrypoint: {
      type: 'string',
      array: true,
      describe: 'Public entrypoint to generate; may be repeated',
    },
    condition: {
      type: 'string',
      array: true,
      describe: 'Declaration export condition in exact order; may be repeated',
    },
    output: {
      type: 'string',
      describe: 'Metadata artifact directory; defaults to <package-root>/dist/metadata',
    },
    json: {
      type: 'boolean',
      default: false,
      describe: 'Emit one versioned JSON summary document',
    },
  },
  responses: ['fluentui.metadata-generate', 'fluentui.error'],
  exits: {
    0: 'Metadata generated and validated',
    1: 'Declaration generation failed',
    2: 'Invalid command input',
  },
};

export const METADATA_VALIDATE_COMMAND_SPEC: CliCommandSpec = {
  command: 'validate [input]',
  description: 'Validate metadata and every advertised API record reference',
  options: {
    input: {
      type: 'string',
      describe: 'Metadata index, API record, metadata directory, or package root',
    },
    json: {
      type: 'boolean',
      default: false,
      describe: 'Emit one versioned JSON response document',
    },
    output: {
      type: 'string',
      describe: 'Write the validation response to a file instead of stdout',
    },
  },
  responses: ['fluentui.metadata-validation', 'fluentui.error'],
  exits: {
    0: 'Metadata is valid',
    1: 'Metadata is invalid or incomplete',
    2: 'Invalid command input',
  },
};

export const METADATA_COMMAND_SPEC: CliCommandSpec = {
  command: 'metadata',
  description: 'Generate or validate canonical package API metadata',
  options: {},
  responses: ['fluentui.metadata-generate', 'fluentui.metadata-validation', 'fluentui.error'],
  exits: { 0: 'Metadata operation completed', 1: 'Metadata operation failed', 2: 'Invalid command input' },
  subcommands: [METADATA_GENERATE_COMMAND_SPEC, METADATA_VALIDATE_COMMAND_SPEC],
};

export const API_COMMAND_SPEC: CliCommandSpec = {
  command: 'api [symbol]',
  description: 'Show installed component, hook, and type APIs',
  options: {
    ...catalogSelectionOptions,
    from: {
      type: 'string',
      describe:
        'Public npm import path, for example @fluentui/react-components or @fluentui/react-headless-components-preview/button',
      conflicts: ['package', 'entrypoint'],
    },
    package: {
      ...catalogSelectionOptions.package,
      hidden: true,
      conflicts: 'from',
      describe: 'Advanced: select all public subpaths of one npm package; prefer --from for an import path',
    },
    entrypoint: {
      type: 'string',
      hidden: true,
      conflicts: 'from',
      describe: 'Advanced: exact public subpath, for example . or ./button; prefer --from',
    },
    namespace: {
      type: 'string',
      choices: ['type', 'value'] as const,
      hidden: true,
      describe: 'Advanced: restrict type/value bindings only when needed; normally inferred',
    },
    ...machineOutputOptions,
    dense: {
      type: 'boolean',
      default: false,
      describe: 'Agent-focused API view: compact structured data with --json; Markdown is already compact',
    },
    verbose: {
      type: 'boolean',
      default: false,
      describe: 'Show export conditions, record identity, and diagnostics in Markdown or dense JSON',
    },
    'include-inherited': {
      type: 'boolean',
      default: false,
      describe: 'Expand inherited React/DOM members after control-defined members in Markdown or dense JSON',
    },
    'expand-types': {
      type: 'boolean',
      default: false,
      describe: 'Show full effective member types instead of slot summaries in Markdown or dense JSON',
    },
  },
  responses: [
    'fluentui.api-index',
    'fluentui.api-detail',
    'fluentui.api-index.dense',
    'fluentui.api-detail.dense',
    'fluentui.error',
  ],
  exits: {
    0: 'Complete or explicitly partial result',
    1: 'Catalog unavailable or invalid',
    2: 'Invalid selection, ambiguous symbol, or symbol not found',
  },
};

export const DOCTOR_COMMAND_SPEC: CliCommandSpec = {
  command: 'doctor',
  description: 'Diagnose Fluent UI API catalog discovery, provenance, and integrity',
  options: {
    ...catalogSelectionOptions,
    deep: {
      type: 'boolean',
      default: false,
      describe: 'Load and validate every selected advertised API record',
    },
    ...machineOutputOptions,
  },
  responses: ['fluentui.doctor', 'fluentui.error'],
  exits: {
    0: 'Selected roots are usable',
    1: 'One or more selected roots are unavailable or invalid',
    2: 'Invalid command selection',
  },
};

export const MANIFEST_COMMAND_SPEC: CliCommandSpec = {
  command: 'manifest',
  description: 'Describe the registered Fluent UI CLI commands, flags, responses, and exits',
  options: machineOutputOptions,
  responses: ['fluentui.command-manifest', 'fluentui.error'],
  exits: {
    0: 'Manifest emitted',
    2: 'Invalid output options',
  },
};

export const INIT_COMMAND_SPEC: CliCommandSpec = {
  command: 'init',
  description: 'Set up Fluent UI agent guidance for a project',
  options: {
    cwd: {
      type: 'string',
      describe: 'Project or application directory to initialize',
    },
    system: {
      type: 'string',
      array: true,
      describe: 'Fluent UI system to configure; may be repeated',
    },
    'dry-run': {
      type: 'boolean',
      default: false,
      describe: 'Preflight and report changes without writing files',
    },
    json: {
      type: 'boolean',
      default: false,
      describe: 'Emit one versioned JSON initialization receipt',
    },
  },
  responses: ['fluentui.init'],
  exits: {
    0: 'Setup is consistent or the dry-run plan has no conflicts',
    1: 'Prerequisites, conflicts, or writes prevented setup',
    2: 'Invalid command input',
  },
};
export const COMMAND_SPECS: readonly CliCommandSpec[] = [
  REPORT_COMMAND_SPEC,
  METADATA_COMMAND_SPEC,
  API_COMMAND_SPEC,
  DOCTOR_COMMAND_SPEC,
  MANIFEST_COMMAND_SPEC,
  INIT_COMMAND_SPEC,
];

export function applyCommandOptions<T>(argv: Argv<T>, spec: CliCommandSpec): Argv<T> {
  return argv.options(spec.options as Record<string, Options>) as Argv<T>;
}

export function getCommandManifest(): { commands: readonly CliCommandSpec[] } {
  return { commands: COMMAND_SPECS };
}
