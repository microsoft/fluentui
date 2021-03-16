import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .executeScript('document.querySelector(\'[title="more"\').click()')
        .snapshot('Toolbar fits within bounds of the chat message'),
  ],
};

export default config;
