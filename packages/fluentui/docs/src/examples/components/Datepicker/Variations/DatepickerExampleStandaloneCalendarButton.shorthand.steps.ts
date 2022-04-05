import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import { buttonClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.click(`.${buttonClassName}`).snapshot('Shows datepicker calendar.')],
};

export default config;
