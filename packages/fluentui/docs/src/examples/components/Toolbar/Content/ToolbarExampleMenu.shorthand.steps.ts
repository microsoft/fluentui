import { ToolbarItem, ToolbarMenuItem } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(`.${ToolbarItem.className}:nth-child(1)`)
        .snapshot('Shows menu')
        .keys(`.${ToolbarMenuItem.className}`, keys.downArrow)
        .snapshot('Moves focus to second item in menu'),
  ],
};

export default config;
