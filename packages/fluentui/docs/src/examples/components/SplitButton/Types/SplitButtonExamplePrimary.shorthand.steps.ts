import { splitButtonToggleClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@uifabric/build/screener';

const selectors = {
  triggerButton: `.${splitButtonToggleClassName}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.hover(selectors.triggerButton).snapshot('Hover primary trigger')],
};

export default config;
