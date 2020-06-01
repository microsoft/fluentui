import { textAreaClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.focus(`.${textAreaClassName}`).snapshot('Can be focused')],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  browsers: ['ie11'],
};

export default config;
