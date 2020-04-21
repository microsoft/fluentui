import { toolbarItemClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(`.${toolbarItemClassName}:nth-child(1)`)
        .snapshot('Shows menu')
        .keys(`.${toolbarMenuItemClassName}`, keys.downArrow)
        .snapshot('Moves focus to second item in menu'),
  ],
};

export default config;
