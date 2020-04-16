import { cardClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.focus(`.${cardClassName}`).snapshot('Focus on a card')],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
};

export default config;
