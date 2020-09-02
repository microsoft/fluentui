import { buttonClassName } from '@fluentui/react-northstar';

const selectors = {
  trigger: `.${buttonClassName}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(selectors.trigger).snapshot('Opens a popup')],
};

export default config;
