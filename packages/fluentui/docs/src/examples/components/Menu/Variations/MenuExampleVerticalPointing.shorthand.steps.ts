import getScreenerSteps from '../commonScreenerSteps';
import { ScreenerTestsConfig } from '@uifabric/build/screener';

const config: ScreenerTestsConfig = { steps: getScreenerSteps({ vertical: true }) };

export default config;
