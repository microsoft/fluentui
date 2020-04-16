import { SplitButton } from '@fluentui/react-northstar';

const selectors = {
  triggerButton: `.${SplitButton.Toggle.deprecated_className}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(selectors.triggerButton).snapshot('Open menu')],
};

export default config;
