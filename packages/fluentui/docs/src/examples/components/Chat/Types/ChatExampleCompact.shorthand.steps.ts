import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import { chatMessageClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast', 'teamsV2', 'teamsDarkV2'],
  steps: [builder => builder.hover(chatMessageClassName).snapshot('Mouse hover on first message')],
};

export default config;
