import { buttonClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(`.${buttonClassName}`).snapshot('Shows popup')],
};

export default config;
