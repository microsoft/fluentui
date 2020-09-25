import { ScreenerTestsConfig } from '@uifabric/build/screener';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click('#set-open')
        .snapshot('Default positioning')
        .click('#above')
        .snapshot('Sets positions to above')
        .click('#before')
        .snapshot('Sets positions to before'),
  ],
};

export default config;
