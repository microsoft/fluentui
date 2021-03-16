import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click('[title="more"').snapshot('Toolbar fits within bounds of the chat message')],
};

export default config;
