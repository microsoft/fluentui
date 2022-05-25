import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';
import { getHoverScreenerSteps } from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: getHoverScreenerSteps(),
};

export default config;
