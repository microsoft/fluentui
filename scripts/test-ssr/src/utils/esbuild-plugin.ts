import * as path from 'node:path';

import type { Plugin } from 'esbuild';
import { loadConfig } from 'tsconfig-paths';

function assertPathAliasesSetup(paths: Record<string, string[]>): never | void {
  for (const [key, mapping] of Object.entries(paths)) {
    if (mapping.length > 1) {
      throw new Error(
        `Multiple TS path mappings are not supported. Please adjust your config. "${key}": [ ${mapping.join()} ]"`,
      );
    }
  }
}

export function tsConfigPathsPlugin(options: { cwd: string }): Plugin {
  const tsConfig = loadConfig(options.cwd);

  if (tsConfig.resultType === 'failed') {
    throw new Error(tsConfig.message);
  }

  const pathAliases = tsConfig.paths;

  assertPathAliasesSetup(pathAliases);

  const pluginConfig: Plugin = {
    name: 'tsconfig-paths',
    setup({ onResolve }) {
      onResolve({ filter: /.*/ }, args => {
        const pathMapping = pathAliases[args.path];

        if (!pathMapping) {
          return null;
        }

        const absoluteImportPath = path.join(tsConfig.absoluteBaseUrl, pathMapping[0]);

        return { path: absoluteImportPath };
      });
    },
  };

  return pluginConfig;
}
