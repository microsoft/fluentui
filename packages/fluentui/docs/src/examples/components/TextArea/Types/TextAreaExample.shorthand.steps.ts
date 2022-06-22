import { textAreaClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.focus(`.${textAreaClassName}`).snapshot('Can be focused')],
  themes: ALL_THEMES,
};

export default config;
