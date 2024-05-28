// @ts-check

const path = require('path');
const { registerRules, registerTsPaths, rules } = require('@fluentui/scripts-storybook');

const tsConfigPath = path.resolve(__dirname, '../../../tsconfig.base.v8.json');
module.exports = /** @type {import('../../../.storybook/main').StorybookBaseConfig} */ ({
  addons: [
    {
      name: 'storybook-addon-swc',
      options: /** @type {import('storybook-addon-swc').StoryBookAddonSwcOptions} */ ({
        swcLoaderOptions: {
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
          },
        },
        swcMinifyOptions: { mangle: false },
      }),
    },
    '@storybook/addon-actions',
  ],
  stories: ['../src/**/*.stories.tsx'],
  core: {
    builder: 'webpack5',
    disableTelemetry: true,
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
});
