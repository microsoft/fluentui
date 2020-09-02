import { dropdownSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  trigger: `.${dropdownSlotClassNames.triggerButton}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(selectors.trigger).snapshot('Opens a dropdown')],
};

export default config;
