import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import { buttonClassName } from '@fluentui/react-northstar';

const button = `.${buttonClassName}`;

const config: ScreenerTestsConfig = {
  steps: [
    (builder, keys) =>
      builder.click(button).keys(button, keys.downArrow).snapshot('Show overridden border focused styles'),
  ],
};

export default config;
