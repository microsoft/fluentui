import { Button } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.hover(`.${Button.deprecated_className}`).snapshot('Shows tooltip')],
};

export default config;
