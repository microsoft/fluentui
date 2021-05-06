import { buttonClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.hover(`.${buttonClassName}`).snapshot('Shows tooltip')],
};

export default config;
