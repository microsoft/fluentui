import getScreenerSteps from '../commonScreenerSteps'

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: getScreenerSteps({ vertical: true }),
}

export default config
