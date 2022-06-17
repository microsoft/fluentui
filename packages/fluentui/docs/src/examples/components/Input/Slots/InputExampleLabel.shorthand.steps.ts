import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .snapshot('Input: Labels')
        .setValue(`#inside-label`, 'Some text...')
        .snapshot('Input: Inside Label with Value'),
  ],
  themes: ALL_THEMES,
};

export default config;
