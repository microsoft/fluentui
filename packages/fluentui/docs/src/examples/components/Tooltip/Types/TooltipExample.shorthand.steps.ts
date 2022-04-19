import { buttonClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [builder => builder.hover(`.${buttonClassName}`).snapshot('Shows tooltip')],
};

export default config;
