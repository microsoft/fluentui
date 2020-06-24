import { dropdownSlotClassNames } from '@fluentui/react-northstar';

const selectors = {
  trigger: `.${dropdownSlotClassNames.triggerButton}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(selectors.trigger).snapshot('Opens a dropdown')],
  // browsers: ['ie11'],
};

export default config;
