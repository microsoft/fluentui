import { inputClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.setValue(`.${inputClassName} input`, 'Some text...').snapshot('Can be clearable')],
  themes: ALL_THEMES,
};

export default config;
