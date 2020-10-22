import getScreenerSteps from '../commonScreenerSteps';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = { steps: getScreenerSteps({ vertical: true }) };

export default config;
