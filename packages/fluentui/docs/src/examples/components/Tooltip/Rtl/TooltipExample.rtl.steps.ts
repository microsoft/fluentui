import { buttonClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [(builder) => builder.hover(`.${buttonClassName}`).snapshot('RTL: Shows tooltip')],
};

export default config;
