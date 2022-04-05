import { buttonClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@fluentui/scripts/screener';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.click(`.${buttonClassName}`).snapshot('Shows popup')],
};

export default config;
