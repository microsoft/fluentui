import { toolbarMenuItemClassName, toolbarItemSlotClassNames } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${toolbarItemSlotClassNames.wrapper} button`)
        .snapshot('Shows menu')
        .click(`.${toolbarMenuItemClassName}:nth-child(1)`)
        .snapshot('Shows popup'),
  ],
  browsers: ['ie11'],
};

export default config;
