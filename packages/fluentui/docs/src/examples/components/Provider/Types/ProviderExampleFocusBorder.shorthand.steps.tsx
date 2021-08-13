import { buttonClassName } from '@fluentui/react-northstar';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  steps: [
    (builder, keys) => builder.keys(`.${buttonClassName}`, keys.tab).snapshot('Show overridden border focused styles'),
  ],
};

export default config;
