const fs = require('fs');
const path = require('path');

const { workspaceRoot } = require('@nx/devkit');

const cwd = process.cwd();
const rootOffset = path.relative(cwd, workspaceRoot);

/**
 *
 * @param {{tsBaseConfigPath:string}} options
 * @returns
 */
function createModuleResolverAliases(options) {
  const { tsBaseConfigPath } = options;
  const tsBaseConfigPathAbsolute = path.join(workspaceRoot, tsBaseConfigPath);
  const tsConfigBase = JSON.parse(fs.readFileSync(tsBaseConfigPathAbsolute, 'utf-8'));

  /**
   * @type {Record<string,[string]>}
   */
  const allPathAliases = tsConfigBase.compilerOptions.paths;
  return Object.entries(allPathAliases).reduce((acc, [packageName, aliasTuple]) => {
    const tsSourceRoot = aliasTuple[0];
    const jsSourceRoot = tsSourceRoot.replace('src', 'lib').replace('.ts', '.js');
    const aliasRegex = `^${packageName}$`;
    acc[aliasRegex] = path.resolve(rootOffset, jsSourceRoot);
    return acc;
  }, /** @type {Record<string,string>} */ ({}));
}

/** @type {Array<import('./types').BabelPluginItem>} */
const presets = [];

/** @type {Array<import('./types').BabelPluginItem>} */
const plugins = [];

/**
 * @param {import('@babel/core').ConfigAPI} api
 * @param {import('./types').BabelPresetOptions} options
 */
const preset = (api, options) => {
  const moduleResolverAliasMappings = createModuleResolverAliases(options);
  /** @type {Array<import('./types').BabelPluginItem>} */
  const dynamicPresets = [
    [
      '@griffel',
      {
        babelOptions: {
          plugins: [
            [
              'babel-plugin-module-resolver',
              {
                alias: moduleResolverAliasMappings,
              },
            ],
          ],
        },
      },
    ],
  ];

  presets.push(...dynamicPresets);

  return { presets, plugins };
};

module.exports = preset;
