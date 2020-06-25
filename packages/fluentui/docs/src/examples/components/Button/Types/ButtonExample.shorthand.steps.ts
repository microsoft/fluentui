import getScreenerSteps from '../commonScreenerSteps';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  // browsers: ['ie11'],
  steps: getScreenerSteps(),
};

export default config;
