import { dropdownSlotClassNames, dropdownSearchInputSlotClassNames } from '@fluentui/react-northstar';
import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.toggleIndicator}`,
  input: `.${dropdownSearchInputSlotClassNames.input}`,
};

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    builder => builder.click(selectors.triggerButton).snapshot('List with loading state'),
    (builder, keys) => builder.keys(selectors.input, keys.upArrow).snapshot('showing loading in the bottom'),
  ],
};

export default config;
