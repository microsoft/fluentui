const path = require('path');

const rootMain = require('../../../../../.storybook/main');
const { registerCssModuleRules } = require('./css-modules-webpack');

const repoRoot = path.resolve(__dirname, '../../../../..');
const packageRoot = path.resolve(repoRoot, 'packages/react-components/react-headless-components-preview/library');
const addonPresetPattern = /(?:^|\/)react-storybook-addon\/(?:temp\/)?preset\.[jt]s$/;
const exportToSandboxPresetPattern = /(?:^|\/)react-storybook-addon-export-to-sandbox\/(?:temp\/)?preset\.[jt]s$/;

/**
 * @param {string | { name?: string; options?: { stateDataAttributes?: object; cssModules?: object; [key: string]: unknown }; [key: string]: unknown }} addon
 */
function configureStateDataAttributes(addon) {
  const name = typeof addon === 'string' ? addon : addon?.name ?? '';
  const normalizedName = name.replace(/\\/g, '/');
  const options = typeof addon === 'string' ? undefined : addon.options;
  const configuredAddon = typeof addon === 'string' ? { name: addon } : addon;

  if (addonPresetPattern.test(normalizedName)) {
    return {
      ...configuredAddon,
      options: {
        ...options,
        stateDataAttributes: { ...options?.stateDataAttributes, packageRoot },
      },
    };
  }

  if (exportToSandboxPresetPattern.test(normalizedName)) {
    return {
      ...configuredAddon,
      options: {
        ...options,
        cssModules: {
          ...options?.cssModules,
          tokensFilePath: path.resolve(__dirname, 'tokens.css'),
        },
      },
    };
  }

  return addon;
}

module.exports = /** @type {Omit<import('../../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: rootMain.addons.map(configureStateDataAttributes),
  webpackFinal: (config, options) => {
    const localConfig = /** @type {any} */ ({ ...rootMain.webpackFinal(config, options) });

    registerCssModuleRules({ config: localConfig });

    return localConfig;
  },
});
