import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

export const config: ScreenerTestsConfig = {
  steps: [
    (builder, keys) =>
      builder
        .click('#ketchup')
        .snapshot('mixed')
        .click('#all')
        .snapshot('unselect all')
        .click('#all')
        .snapshot('select all'),
  ],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
};

export default config;
