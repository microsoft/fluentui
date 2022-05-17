import { dropdownSlotClassNames } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
};

export const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(selectors.triggerButton).snapshot('Shows header message')],
};

export default config;
