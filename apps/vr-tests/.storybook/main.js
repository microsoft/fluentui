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
        useSWC: true,
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
    registerRules({ config, rules: [rules.scssRule] });

    return config;
  },
  swc() {
    return {
      jsc: {
        target: 'es2019',
        parser: {
          syntax: 'typescript',
          tsx: true,
          decorators: true,
          dynamicImport: true,
        },
        transform: {
          decoratorMetadata: true,
          legacyDecorator: true,
        },
        keepClassNames: true,
        externalHelpers: true,
        loose: true,
        minify: {
          mangle: false,
        },
      },
    };
  },
  // 💡 NOTE: this is necessary for StoryWright. without this the current version "0.0.27-storybook7.9" wont take screenshots for Steps
  features: {
    storyStoreV7: false,
  },
});
