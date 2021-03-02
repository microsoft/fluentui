import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import { getFocusScreenerSteps } from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: getFocusScreenerSteps(),
};

export default config;
