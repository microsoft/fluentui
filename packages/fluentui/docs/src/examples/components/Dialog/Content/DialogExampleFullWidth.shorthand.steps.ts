import { ScreenerTestsConfig } from '@uifabric/build/screener';
import getScreenerSteps from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  themes: ['teams'],
  steps: getScreenerSteps(),
};

export default config;
