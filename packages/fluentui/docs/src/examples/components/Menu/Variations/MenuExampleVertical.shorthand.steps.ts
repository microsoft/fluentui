import { default as getScreenerSteps } from '../commonScreenerSteps';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: getScreenerSteps({ vertical: true }),
};

export default config;
