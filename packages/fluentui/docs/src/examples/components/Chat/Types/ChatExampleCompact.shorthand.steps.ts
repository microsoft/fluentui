import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import { chatMessageClassName } from '@fluentui/react-northstar';

const selectors = {
  message: `.${chatMessageClassName}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast', 'teamsV2', 'teamsDarkV2'],
  steps: [
    builder => builder.hover(selectors.message).snapshot('Mouse hover on first message'),
    (builder, keys) =>
      builder.click(selectors.message).keys(selectors.message, keys.downArrow).snapshot('Focuses second message'),
  ],
};

export default config;
