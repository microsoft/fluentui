const path = require('path');

const rootMain = require('../../../../../.storybook/main');
const {
  loadWorkspaceAddon,
  getImportMappingsForExportToSandboxAddon,
  processBabelLoaderOptions,
} = require('@fluentui/scripts-storybook');
const { registerCssModuleRules } = require('./css-modules-webpack');

const repoRoot = path.resolve(__dirname, '../../../../..');
const tsConfigPath = path.resolve(repoRoot, 'tsconfig.base.json');

/**
 * @param {string | { name?: string }} addon
 */
function isNotExportToSandboxAddon(addon) {
  const name = typeof addon === 'string' ? addon : addon?.name ?? '';
  return !name.includes('react-storybook-addon-export-to-sandbox');
}

module.exports = /** @type {Omit<import('../../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: [
    ...rootMain.addons.filter(isNotExportToSandboxAddon),
    loadWorkspaceAddon('@fluentui/react-storybook-addon-export-to-sandbox', {
      tsConfigPath,
      /** @type {import('../../../react-storybook-addon-export-to-sandbox/src/index').PresetConfig} */
      options: {
        importMappings: getImportMappingsForExportToSandboxAddon(),
        babelLoaderOptionsUpdater: processBabelLoaderOptions,
        cssModules: { tokensFilePath: path.resolve(__dirname, 'tokens.css') },
        webpackRule: {
          test: /\.stories\.tsx$/,
          include: /stories/,
        },
      },
    }),
  ],
  webpackFinal: (config, options) => {
    const localConfig = /** @type {any} */ ({ ...rootMain.webpackFinal(config, options) });

    registerCssModuleRules({ config: localConfig });

    return localConfig;
  },
});
