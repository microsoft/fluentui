// @ts-check

const path = require('path');

const { registerTsPaths, registerRules, rules, loadWorkspaceAddon } = require('@fluentui/scripts-storybook');
const tsConfigPath = path.resolve(__dirname, '../../../tsconfig.base.json');
const inlineAssetsDir = path.resolve(__dirname, '../src/assets');

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
    inlineAssets(config);

    return config;
  },
});

/**
 * Images under src/assets are inlined as data URIs instead of being emitted as files, so that they are available on the
 * first paint and screenshots don't depend on when a request finishes.
 *
 * @param {import('webpack').Configuration} config
 */
function inlineAssets(config) {
  config.module ??= {};
  const moduleRules = (config.module.rules ??= []);

  // Storybook's default rule emits images as files, keep it away from the inlined ones
  for (const rule of moduleRules) {
    if (rule && typeof rule === 'object' && rule.test instanceof RegExp && rule.test.test('image.jpg')) {
      rule.exclude = inlineAssetsDir;
    }
  }

  moduleRules.push({ test: /\.(jpg|jpeg|png)$/, include: inlineAssetsDir, type: 'asset/inline' });
}
