import { ALL_THEMES, ScreenerTestsConfig } from '@fluentui/scripts/screener';
import { chatMessageClassName } from '@fluentui/react-northstar';

const selectors = {
  message: `.${chatMessageClassName}`,
};

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    builder => builder.hover(selectors.message).snapshot('Hovers the first message'),
    builder => builder.click(selectors.message).snapshot('Focus the first message via mouse click'),
    (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses a message via keyboard'),
  ],
};

export default config;
