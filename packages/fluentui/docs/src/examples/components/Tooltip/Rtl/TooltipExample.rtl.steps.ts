import { buttonClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@uifabric/build/screener';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.hover(`.${buttonClassName}`).snapshot('RTL: Shows tooltip')],
};

export default config;
