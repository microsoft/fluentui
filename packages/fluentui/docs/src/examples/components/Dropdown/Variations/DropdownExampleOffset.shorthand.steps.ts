import { Dropdown } from '@fluentui/react-northstar';

const selectors = {
  trigger: `.${Dropdown.slotClassNames.triggerButton}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(selectors.trigger).snapshot('Opens a dropdown')],
};

export default config;
