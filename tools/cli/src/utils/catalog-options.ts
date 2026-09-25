import type { Options } from 'yargs';

import type { CatalogSelectionOptions } from './catalog-inventory';

export interface CatalogOptionArgs
  extends Pick<CatalogSelectionOptions, 'config' | 'system' | 'package' | 'metadataMode'> {}

export const CATALOG_SELECTION_OPTIONS = {
  config: {
    type: 'string',
    describe: 'Path to a JSON catalog configuration file',
  },
  system: {
    type: 'string',
    array: true,
    describe: 'Catalog system to select (repeatable)',
  },
  package: {
    type: 'string',
    describe: 'Narrow selection to one npm package',
  },
  metadataMode: {
    alias: 'metadata-mode',
    type: 'string',
    choices: ['prefer', 'required', 'off'] as const,
    default: 'prefer' as const,
    describe: 'Metadata policy: prefer with fallback, require metadata, or disable metadata',
  },
} satisfies Record<keyof CatalogOptionArgs, Options>;
