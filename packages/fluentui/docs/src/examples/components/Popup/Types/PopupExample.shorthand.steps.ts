import { buttonClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [builder => builder.click(`.${buttonClassName}`).snapshot('Shows popup')],
};

export default config;
