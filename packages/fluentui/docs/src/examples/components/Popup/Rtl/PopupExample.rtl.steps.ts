import { buttonClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [(builder) => builder.click(`.${buttonClassName}`).snapshot('RTL: Shows popup')],
};

export default config;
