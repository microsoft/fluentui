import { buttonClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const selectors = {
  trigger: `.${buttonClassName}`,
};

const config: ScreenerTestsConfig = {
  steps: [(builder) => builder.click(selectors.trigger).snapshot('Opens a popup')],
};

export default config;
