import { toolbarItemWrapperClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    (builder, keys) =>
      builder
        .click(`.${toolbarItemWrapperClassName} button`)
        .snapshot('Shows menu')
        .keys(`.${toolbarMenuItemClassName}#ToolbarExampleMenuWithSubmenu_Play`, keys.rightArrow)
        .snapshot('Opens first submenu')
        .click(`.${toolbarMenuItemClassName}#ToolbarExampleMenuWithSubmenu_Appearance`)
        .snapshot('Opens second submenu'),
  ],
};

export default config;
