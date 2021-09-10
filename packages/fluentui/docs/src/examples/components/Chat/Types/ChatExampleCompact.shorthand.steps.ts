import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import { chatMessageClassName } from '@fluentui/react-northstar';

const selectors = {
  message: `.${chatMessageClassName}`,
};

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast', 'teamsV2', 'teamsDarkV2'],
  steps: [builder => builder.hover(selectors.message).snapshot('Mouse hover on first message')],
};

export default config;
