import { toolbarItemClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    builder =>
      builder
        .click(`.${toolbarItemClassName}:nth-child(1)`)
        .snapshot('Shows first popup')
        .click(`.${toolbarItemClassName}:nth-child(2)`)
        .snapshot('Shows second popup'),
  ],
};

export default config;
