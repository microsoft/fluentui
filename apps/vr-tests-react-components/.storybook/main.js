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
    configureReactIcons({ config, headless: true });

    config.resolve = config.resolve ?? {};
    // Workspace imports resolve to TypeScript source; built packages use explicit .styles.js imports.
    config.resolve.extensions = ['.css.ts', '.styles.css.js', ...(config.resolve.extensions ?? [])];
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      '.styles.js': ['.styles.css.js', '.styles.js'],
    };

    isolateIconBuildCache(config);

    return config;
  },
});
