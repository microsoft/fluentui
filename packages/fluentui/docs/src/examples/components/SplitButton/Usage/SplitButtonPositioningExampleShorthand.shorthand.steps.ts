import { splitButtonToggleClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const selectors = {
  triggerButton: `.${splitButtonToggleClassName}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(selectors.triggerButton).snapshot('Open menu')],
};

export default config;
