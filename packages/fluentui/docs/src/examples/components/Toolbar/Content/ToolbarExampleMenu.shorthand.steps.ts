import { toolbarItemWrapperClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@uifabric/build/screener';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder, keys) =>
      builder
        .click(`.${toolbarItemWrapperClassName} button`)
        .snapshot('Shows menu')
        .keys(`.${toolbarMenuItemClassName}`, keys.downArrow)
        .snapshot('Moves focus to second item in menu'),
  ],
};

export default config;
