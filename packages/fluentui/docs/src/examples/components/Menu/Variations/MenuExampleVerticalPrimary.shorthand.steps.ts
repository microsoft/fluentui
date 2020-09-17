import { selectors } from '../commonScreenerSteps';
import { ScreenerTestsConfig } from '@uifabric/build/screener';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .hover(selectors.item(4))
        .snapshot('Hovers 4th item (hover state styles)')
        .click(selectors.item(4))
        .snapshot('Clicks on 4th item (opens submenu)')
        .hover(selectors.item(1))
        .snapshot('Hovers 1st item (hover state styles)'),
  ],
};

export default config;
