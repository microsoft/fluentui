import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.focus('#focus-button').snapshot('Show overridden border focused styles')],
};

export default config;
