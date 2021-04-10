import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click('[title="More"').snapshot('Toolbar fits within bounds of the chat message')],
};

export default config;
