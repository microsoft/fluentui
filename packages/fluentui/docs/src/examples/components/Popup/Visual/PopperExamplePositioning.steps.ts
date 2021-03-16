import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        // A popper can't be opened in visual tests by default as it makes Screener results unstable
        // because of 1px shift on different renders
        .click('#open-popper')
        .snapshot('Opened on Box A (default position)')
        .click('#use-boxB')
        .snapshot('Opened on Box B (default position)')
        .click('#align-end-position-above')
        .snapshot('Opened on Box B (align: end, position: above)')
        .click('#use-boxA')
        .snapshot('Opened on Box A (align: end, position: above)'),
  ],
};

export default config;
