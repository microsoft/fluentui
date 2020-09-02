import { buttonClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.hover(`.${buttonClassName}`).snapshot('Custom target: Shows tooltip')],
};

export default config;
