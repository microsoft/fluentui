import { buttonClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.hover(`.${buttonClassName}`).snapshot('Shows tooltip')],
};

export default config;
