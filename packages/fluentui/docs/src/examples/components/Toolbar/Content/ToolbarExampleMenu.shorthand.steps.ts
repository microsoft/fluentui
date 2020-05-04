import { toolbarItemSlotClassNames, toolbarMenuItemClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(`.${toolbarItemSlotClassNames.wrapper} button`)
        .snapshot('Shows menu')
        .keys(`.${toolbarMenuItemClassName}`, keys.downArrow)
        .snapshot('Moves focus to second item in menu'),
  ],
};

export default config;
