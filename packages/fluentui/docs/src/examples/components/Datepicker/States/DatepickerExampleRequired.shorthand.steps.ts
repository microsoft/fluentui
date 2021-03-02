import { ScreenerTestsConfig } from '@fluentui/scripts/screener';
import { buttonClassName } from '@fluentui/react-northstar';
import { datepickerCalendarCellSelector } from '../datepickerCalendarCellSelector';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    (builder) =>
      builder
        .snapshot('Input shows error.')
        .click(`.${buttonClassName}`)
        .snapshot('Shows datepicker popup through button and error is shown.')
        .click(datepickerCalendarCellSelector(15))
        .snapshot('Shows selected date in input without error.'),
  ],
};

export default config;
