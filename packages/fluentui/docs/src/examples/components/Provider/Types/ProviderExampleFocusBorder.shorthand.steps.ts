import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [
    (builder, keys) =>
      builder.click('#text-focus').keys('#text-focus', keys.tab).snapshot('Show overridden border focused styles'),
  ],
};

export default config;
