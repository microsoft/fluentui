import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [(builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses item')],
};

export default config;
