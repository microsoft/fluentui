import { default as getScreenerSteps } from '../commonScreenerSteps';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: getScreenerSteps({ vertical: true }),
};

export default config;
