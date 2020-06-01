import getScreenerSteps from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  steps: getScreenerSteps(),
  browsers: ['ie11'],
};

export default config;
