import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';
import { getFocusScreenerSteps } from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: getFocusScreenerSteps(),
};

export default config;
