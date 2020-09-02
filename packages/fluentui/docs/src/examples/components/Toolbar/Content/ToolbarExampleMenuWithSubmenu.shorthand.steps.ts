import { toolbarItemWrapperClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(`.${toolbarItemWrapperClassName} button`)
        .snapshot('Shows menu')
        .keys(`.${toolbarMenuItemClassName}:nth-child(1)`, keys.rightArrow)
        .snapshot('Opens submenu'),
  ],
};

export default config;
