import { inputClassName, buttonClassName, datepickerCalendarCellClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${buttonClassName}`)
        .snapshot('Shows datepicker popup through button')
        .click(`.${datepickerCalendarCellClassName}:nth-child(15)`)
        .snapshot('Shows selected date in input')
        .click(`.${buttonClassName}`)
        .snapshot('Shows selected date in calendar')
        .click(`.${inputClassName}`)
        .snapshot('Final state'),
  ],
};

export default config;
