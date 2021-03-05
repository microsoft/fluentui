import { splitButtonToggleClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const selectors = {
  triggerButton: `.${splitButtonToggleClassName}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.hover(selectors.triggerButton).snapshot('Hover primary trigger')],
};

export default config;
