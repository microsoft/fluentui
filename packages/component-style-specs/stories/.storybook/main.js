const rootMain = require('../../../../.storybook/main');
const { registerCssModuleRules } = require('./css-modules-webpack');

/**
 * @param {string | { name?: string }} addon
 */
function isNotExportToSandboxAddon(addon) {
  const name = typeof addon === 'string' ? addon : addon?.name ?? '';
  return !name.includes('react-storybook-addon-export-to-sandbox');
}

module.exports = {
  ...rootMain,
  stories: [...rootMain.stories, '../src/**/*.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: [...rootMain.addons.filter(isNotExportToSandboxAddon)],
  webpackFinal: (config, options) => {
    const localConfig = { ...rootMain.webpackFinal(config, options) };
    registerCssModuleRules({ config: localConfig });
    return localConfig;
  },
};
