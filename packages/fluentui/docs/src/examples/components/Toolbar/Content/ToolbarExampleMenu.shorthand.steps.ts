import { toolbarItemWrapperClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
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
