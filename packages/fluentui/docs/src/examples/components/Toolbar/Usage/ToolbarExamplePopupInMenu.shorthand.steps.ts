import { toolbarItemClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    builder =>
      builder
        .click(`.${toolbarItemClassName}:nth-child(1)`)
        .snapshot('Shows menu')
        .click(`.${toolbarMenuItemClassName}:nth-child(1)`)
        .snapshot('Shows popup'),
  ],
};

export default config;
