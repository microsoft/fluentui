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

/**
 * SSR shim for `*.module.css` imports. Returns a Proxy that echoes the requested
 * property name (so `styles.foo === 'foo'`), which keeps className strings stable
 * for SSR rendering without needing the actual CSS-Modules transform.
 */
export function cssModulesShimPlugin(): Plugin {
  return {
    name: 'css-modules-shim',
    setup({ onResolve, onLoad }) {
      onResolve({ filter: /\.module\.css$/ }, args => {
        const absolute = path.isAbsolute(args.path) ? args.path : path.resolve(args.resolveDir, args.path);
        return { path: absolute, namespace: 'css-modules-shim' };
      });
      onLoad({ filter: /.*/, namespace: 'css-modules-shim' }, () => ({
        contents: [
          `const styles = new Proxy({}, { get: (_, key) => typeof key === 'string' ? key : '' });`,
          `export default styles;`,
        ].join('\n'),
        loader: 'js',
      }));
    },
  };
}
