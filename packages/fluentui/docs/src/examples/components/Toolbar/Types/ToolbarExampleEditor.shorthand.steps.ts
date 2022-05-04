import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [(builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses item')],
};

export default config;
