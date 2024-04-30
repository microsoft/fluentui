import * as path from 'node:path';

import type { Plugin } from 'esbuild';
import { loadConfig } from 'tsconfig-paths';

export function tsConfigPathsPlugin(options: { cwd: string }): Plugin {
  const tsConfig = loadConfig(options.cwd);

  if (tsConfig.resultType === 'failed') {
    throw new Error(tsConfig.message);
  }

  const pathAliases = tsConfig.paths;

  const pluginConfig: Plugin = {
    name: 'tsconfig-paths',
    setup({ onResolve }) {
      onResolve({ filter: /.*/ }, args => {
        const pathMapping = pathAliases[args.path];

        if (!pathMapping) {
          return null;
        }

        for (const dir of pathMapping) {
          const absoluteImportPath = path.join(tsConfig.absoluteBaseUrl, dir);

          if (absoluteImportPath) {
            return { path: absoluteImportPath };
          }
        }

        return { path: args.path };
      });
    },
  };

  return pluginConfig;
}
