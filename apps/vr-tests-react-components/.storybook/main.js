// @ts-check

const path = require('path');
const { getIconStoryPatterns, isolateIconBuildCache } = require('./icon-sizing');
const {
  configureReactIcons,
  registerTsPaths,
  registerRules,
  rules,
  loadWorkspaceAddon,
} = require('@fluentui/scripts-storybook');
const tsConfigPath = path.resolve(__dirname, '../../../tsconfig.base.json');

module.exports = /** @satisfies {import('@storybook/react-webpack5').StorybookConfig} */ ({
  addons: [loadWorkspaceAddon('@fluentui/react-storybook-addon', { tsConfigPath })],
  stories: getIconStoryPatterns(),
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        lazyCompilation: false,
      },
    },
  },
  typescript: {
    // disable react-docgen-typescript (totally not needed here, slows things down a lot)
    reactDocgen: false,
  },
  webpackFinal(config) {
    registerTsPaths({ config, configFile: tsConfigPath });
    registerRules({ config, rules: [rules.swcRule, rules.griffelRule] });
    configureReactIcons({ config });

    isolateIconBuildCache(config);

    return config;
  },
});
