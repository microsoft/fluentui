import { toolbarItemClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${toolbarItemClassName}:nth-child(1)`)
        .snapshot('Shows menu')
        .click(`.${toolbarMenuItemClassName}:nth-child(1)`)
        .snapshot('Shows popup'),
  ],
};

export default config;
