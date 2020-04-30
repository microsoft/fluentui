import { toolbarItemClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(`.${toolbarItemClassName}:nth-child(2)`)
        .snapshot('Shows menu')
        .keys(`.${toolbarMenuItemClassName}:nth-child(1)`, keys.rightArrow)
        .snapshot('Opens submenu'),
  ],
};

export default config;
