// @ts-check

const path = require('path');

const { registerTsPaths, registerRules, rules, loadWorkspaceAddon } = require('@fluentui/scripts-storybook');
const {
  registerModernComponentImportTransform,
} = require('../../../packages/react-components/react-modern-components-preview/stories/config/modernStorybook');
const tsConfigPath = path.resolve(__dirname, '../../../tsconfig.base.json');

module.exports = /** @type {import('@storybook/react-webpack5').StorybookConfig} */ ({
  addons: [loadWorkspaceAddon('@fluentui/react-storybook-addon', { tsConfigPath })],
  stories: ['../src/**/*.stories.tsx'],
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
    registerModernComponentImportTransform(config, path.resolve(__dirname, '../src/stories'));

    return config;
  },
});
