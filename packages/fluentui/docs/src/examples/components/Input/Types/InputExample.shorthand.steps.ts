import { inputClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.focus(`.${inputClassName} input`).snapshot('Can be focused')],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
};

export default config;
