import { Button } from '@fluentui/react-northstar';

const selectors = {
  trigger: `.${Button.className}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(selectors.trigger).snapshot('Opens a popup')],
};

export default config;
