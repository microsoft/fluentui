// @ts-check

const path = require('path');

const { registerTsPaths, registerRules, rules, loadWorkspaceAddon } = require('@fluentui/scripts-storybook');
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
    /**
     * The CSS-Modules + Tailwind wiring lives in `@fluentui/scripts-storybook` so that this
     * app, the root config and every package storybook resolve `*.module.css` identically —
     * same `getLocalIdent`, same PostCSS chain, same theme entry. See scripts/storybook/src/rules.js.
     *
     * Narrow storybook's own rule first, then add ours.
     */
    rules.excludeTailwindCssFromDefaultCssRule(config);
    // griffelRule stays: only some packages are converted, the rest still need AOT Griffel.
    registerRules({
      config,
      rules: [rules.swcRule, rules.griffelRule, rules.cssModulesRule, rules.tailwindThemeRule],
    });

    return config;
  },
});
