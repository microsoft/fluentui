// @ts-check

const path = require('path');
const { registerRules, registerTsPaths, rules } = require('@fluentui/scripts-storybook');

const tsConfigPath = path.resolve(__dirname, '../../../tsconfig.base.v8.json');
module.exports = /** @type {import('@storybook/react-webpack5').StorybookConfig} */ ({
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
  webpackFinal: config => {
    registerTsPaths({ config, configFile: tsConfigPath });
    registerRules({ config, rules: [rules.swcRule, rules.scssRule] });

    return config;
  },
});
