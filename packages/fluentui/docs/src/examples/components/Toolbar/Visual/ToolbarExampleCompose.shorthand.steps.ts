import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click('#open-menu').snapshot('Shows a menu')],
};

export default config;
