import { ScreenerTestsConfig } from '@uifabric/build/screener';

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click('#set-open')
        .snapshot('Default positioning')
        .click('#set-height')
        .snapshot('Updates height to collide with top edge')
        .click('#reposition')
        .snapshot('Repositions properly'),
  ],
};

export default config;
