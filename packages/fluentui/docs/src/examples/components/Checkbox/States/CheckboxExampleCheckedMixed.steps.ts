import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

export const config: ScreenerTestsConfig = {
  steps: [
    (builder, keys) =>
      builder
        .click('#ketchup')
        .snapshot('mixed')
        .click('#all')
        .snapshot('unselect all')
        .click('#all')
        .snapshot('select all'),
  ],
  themes: ALL_THEMES,
};

export default config;
