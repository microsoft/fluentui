import { ScreenerTestsConfig } from '@uifabric/build/screener';
import { buttonClassName, datepickerCalendarCellClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${buttonClassName}`)
        .snapshot('Shows datepicker popup through button.')
        .click(`.${datepickerCalendarCellClassName}:nth-child(15)`)
        .snapshot('Shows selected date in input.')
        .click(`.${buttonClassName}`)
        .snapshot('Shows selected date in calendar.')
        .hover(`.${datepickerCalendarCellClassName}:nth-child(22)`)
        .snapshot('Shows calendar with hover.'),
  ],
};

export default config;
