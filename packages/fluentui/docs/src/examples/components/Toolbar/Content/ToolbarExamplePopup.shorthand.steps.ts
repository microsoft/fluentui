import { toolbarItemClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${toolbarItemClassName}:nth-child(1)`)
        .snapshot('Shows first popup')
        .click(`.${toolbarItemClassName}:nth-child(2)`)
        .snapshot('Shows second popup'),
  ],
};

export default config;
