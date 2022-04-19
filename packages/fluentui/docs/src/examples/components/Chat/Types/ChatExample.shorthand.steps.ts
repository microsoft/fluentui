import { ALL_THEMES, ScreenerTestsConfig } from '@fluentui/scripts/screener';
import { chatMessageClassName } from '@fluentui/react-northstar';

const selectors = {
  message: `.${chatMessageClassName}`,
};

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses last message'),
    (builder, keys) =>
      builder.click(selectors.message).keys(selectors.message, keys.downArrow).snapshot('Focuses second message'),
  ],
};

export default config;
