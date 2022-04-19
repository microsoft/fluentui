import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import getScreenerSteps from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  themes: [{ name: 'teamsV2', testResultName: 'teams' }],
  steps: getScreenerSteps(),
};

export default config;
