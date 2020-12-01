import { buttonClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.click(`.${buttonClassName}`).snapshot('Shows localized calendar.')],
};

export default config;
