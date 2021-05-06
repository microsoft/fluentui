import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import getScreenerSteps from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  themes: ['teams'],
  steps: getScreenerSteps(),
};

export default config;
