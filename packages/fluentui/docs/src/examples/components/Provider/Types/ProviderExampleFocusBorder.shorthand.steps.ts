import { buttonClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [
    builder => builder.click('#text-focus'),
    (builder, keys) => builder.keys(`.${buttonClassName}`, keys.tab).snapshot('Show overridden border focused styles'),
  ],
};

export default config;
