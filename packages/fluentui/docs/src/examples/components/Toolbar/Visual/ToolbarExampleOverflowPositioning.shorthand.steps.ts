import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .executeScript("document.querySelector('iframe').contentDocument.querySelector('#overflow-item').click()")
        .snapshot('Overflow item is properly positioned'),
  ],
};

export default config;
