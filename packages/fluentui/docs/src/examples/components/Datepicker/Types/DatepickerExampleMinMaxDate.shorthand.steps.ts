import { buttonClassName, datepickerCalendarCellClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${buttonClassName}`)
        .snapshot('Shows min max dates.')
        .click(`.${datepickerCalendarCellClassName}:nth-child(10)`)
        .snapshot('Disabled date is not clickable.'),
  ],
};

export default config;
