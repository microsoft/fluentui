// @ts-check

const path = require('path');
const { registerRules, registerTsPaths, rules } = require('@fluentui/scripts-storybook');
const { option } = require('yargs');

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
    const swcRule = {
      test: /\.(([cm])?([jt])sx?)$/,
      exclude: ['/node_modules/'],
      use: [
        {
          loader: 'swc-loader',
          options: {
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
          },
        },
      ],
    };

    registerTsPaths({ config, configFile: tsConfigPath });
    registerRules({ config, rules: [swcRule, rules.scssRule] });

    return config;
  },
});
