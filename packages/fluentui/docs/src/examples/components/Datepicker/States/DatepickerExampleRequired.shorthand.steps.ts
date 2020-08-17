import { buttonClassName, datepickerCalendarCellClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .snapshot('Input shows error.')
        .click(`.${buttonClassName}`)
        .snapshot('Shows datepicker popup through button and error is shown.')
        .click(`.${datepickerCalendarCellClassName}:nth-child(15)`)
        .snapshot('Shows selected date in input without error'),
  ],
};

export default config;
