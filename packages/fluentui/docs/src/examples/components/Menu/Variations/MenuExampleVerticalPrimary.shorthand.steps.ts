import { default as getScreenerSteps, selectors } from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    ...getScreenerSteps({ vertical: true }),
    builder =>
      builder
        .hover(selectors.item(3))
        .snapshot('Hovers 2nd item (hover state styles)')
        .click(selectors.item(3))
        .snapshot('Clicks on 2nd item (active state styles)')
  ]
};

export default config;
