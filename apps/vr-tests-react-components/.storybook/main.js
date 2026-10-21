// @ts-check

const path = require('path');
const {
  configureReactIcons,
  registerTsPaths,
  registerRules,
  rules,
  loadWorkspaceAddon,
} = require('@fluentui/scripts-storybook');
const tsConfigPath = path.resolve(__dirname, '../../../tsconfig.base.json');
const fontSizingOnly = process.env.FLUENTUI_VRT_FONT_SIZING === 'true';

module.exports = /** @satisfies {import('@storybook/react-webpack5').StorybookConfig} */ ({
  addons: [loadWorkspaceAddon('@fluentui/react-storybook-addon', { tsConfigPath })],
  stories: fontSizingOnly ? ['../src/stories/IconSizingFont.stories.tsx'] : ['../src/**/!(IconSizingFont).stories.tsx'],
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

    // Isolate SVG, full-font, and focused font builds so concurrent builds do not write to the same webpack cache.
    if (config.cache && typeof config.cache === 'object' && config.cache.type === 'filesystem') {
      const variant = process.env.FLUENTUI_ICON_VARIANT === 'fonts' ? 'fonts' : 'svg';
      config.cache.name = `${config.cache.name ?? 'default'}-${fontSizingOnly ? 'font-sizing' : variant}`;
    }

    return config;
  },
});
