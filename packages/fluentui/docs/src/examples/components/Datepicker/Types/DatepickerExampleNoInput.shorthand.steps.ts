import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import { inputClassName, buttonClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${buttonClassName}`)
        .snapshot('Shows calendar.')
        .click(`.${inputClassName}`)
        .snapshot('Keeps calendar open.'),
  ],
};

export default config;
