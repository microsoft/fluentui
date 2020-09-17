import { dropdownSlotClassNames } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@uifabric/build/screener';

const selectors = {
  trigger: `.${dropdownSlotClassNames.triggerButton}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(selectors.trigger).snapshot('Opens a dropdown')],
};

export default config;
