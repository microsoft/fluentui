import { ScreenerTestsConfig } from '@uifabric/build/screener';
import getScreenerSteps from '../commonScreenerSteps';

export const config: ScreenerTestsConfig = {
  steps: getScreenerSteps(),
};

export default config;
