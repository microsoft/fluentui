import { dropdownSlotClassNames, dropdownSearchInputSlotClassNames } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
  input: `.${dropdownSearchInputSlotClassNames.input}`,
};

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    builder => builder.hover(selectors.triggerButton).snapshot('Mouse hover on trigger'),
    builder => builder.hover(selectors.input).snapshot('Mouse hover on input'),
  ],
};

export default config;
