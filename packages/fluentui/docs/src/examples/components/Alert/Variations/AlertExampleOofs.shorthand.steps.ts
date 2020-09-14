import { ScreenerTestsConfig } from '@uifabric/build/screener';
import { getHoverScreenerSteps } from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: getHoverScreenerSteps(),
};

export default config;
