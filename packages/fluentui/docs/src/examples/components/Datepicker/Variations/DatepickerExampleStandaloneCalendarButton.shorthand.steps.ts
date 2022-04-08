import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';
import { buttonClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [builder => builder.click(`.${buttonClassName}`).snapshot('Shows datepicker calendar.')],
};

export default config;
