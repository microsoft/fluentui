import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [(builder, keys) => builder.keys('body', keys.tab).snapshot('Focus on a card')],
  themes: ALL_THEMES,
};

export default config;
