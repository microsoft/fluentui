// @ts-check
const path = require('node:path');

const { loadConfig } = require('tsconfig-paths');

exports.tsConfigPathsPlugin = tsConfigPathsPlugin;

/**
 *
 * @param {{cwd:string}} options
 * @returns {import('esbuild').Plugin}
 */
function tsConfigPathsPlugin(options) {
  const tsConfig = loadConfig(options.cwd);

  if (tsConfig.resultType === 'failed') {
    throw new Error(tsConfig.message);
  }

  const pathAliases = tsConfig.paths;

  /** @type {import('esbuild').Plugin} */
  const pluginConfig = {
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
