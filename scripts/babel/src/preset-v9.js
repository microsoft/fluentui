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
        /**
         * https://github.com/microsoft/griffel/tree/main/packages/babel-preset#importing-griffel-from-custom-packages
         * "By default, preset handles imports from @griffel/react & @fluentui/react-components" - under the hood griffel preset wont merge rather override thus we need to provide the default modules explicitly
         */
        modules: [
          // Why is core needed ?
          // - https://github.com/microsoft/fluentui/blob/8d4bd6428dc2f52948e668f1f1410972b6c5cf62/packages/react-components/react-provider/src/components/FluentProvider/useFluentProviderStyles.styles.ts#L1
          // - https://github.com/microsoft/fluentui/pull/22936
          { moduleSource: '@griffel/core', importName: 'makeStyles' },
          // these are defaults provided by griffel preset
          // https://github.com/microsoft/griffel/blob/7d27e6075f2d0647256fcc489e1e369696347e05/packages/babel-preset/src/transformPlugin.ts#L207-L210
          { moduleSource: '@griffel/react', importName: 'makeStyles' },
          { moduleSource: '@fluentui/react-components', importName: 'makeStyles' },
        ],
      },
    ],
  ];

  presets.push(...dynamicPresets);

  return { presets, plugins };
};

module.exports = preset;
