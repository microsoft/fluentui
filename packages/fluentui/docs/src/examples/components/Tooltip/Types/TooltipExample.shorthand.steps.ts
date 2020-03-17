import { Button } from '@fluentui/react-future';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.hover(`.${Button.className}`).snapshot('Shows tooltip')]
};

export default config;
