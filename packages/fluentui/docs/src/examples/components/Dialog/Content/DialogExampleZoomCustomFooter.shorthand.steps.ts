import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';
import getScreenerSteps from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: getScreenerSteps(),
};

export default config;
