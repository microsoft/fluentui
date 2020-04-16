import { Button } from '@fluentui/react-northstar';

const selectors = {
  trigger: `.${Button.deprecated_className}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(selectors.trigger).snapshot('Opens a popup')],
};

export default config;
