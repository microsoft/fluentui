import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import getScreenerSteps from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: getScreenerSteps(),
};

export default config;
