import { ToolbarItem, ToolbarMenuItem } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(`.${ToolbarItem.deprecated_className}:nth-child(1)`)
        .snapshot('Shows menu')
        .keys(`.${ToolbarMenuItem.deprecated_className}:nth-child(1)`, keys.rightArrow)
        .snapshot('Opens submenu'),
  ],
};

export default config;
