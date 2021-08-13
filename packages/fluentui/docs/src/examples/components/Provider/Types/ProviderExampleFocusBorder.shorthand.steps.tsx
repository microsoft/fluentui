import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import { buttonClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.focus(`.${buttonClassName}`).snapshot('Show overridden border focused styles')],
};

export default config;
