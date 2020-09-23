import { ScreenerTestsConfig } from '@uifabric/build/screener';
import { buttonClassName } from '@fluentui/react-northstar';
import { datepickerCalendarCellSelector } from '../datepickerCalendarCellSelector';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${buttonClassName}`)
        .snapshot('Shows datepicker popup through button.')
        .click(datepickerCalendarCellSelector(15))
        .snapshot('Shows selected date in input.')
        .click(`.${buttonClassName}`)
        .snapshot('Shows selected date in calendar.')
        .hover(datepickerCalendarCellSelector(22))
        .snapshot('Shows calendar with hover.'),
  ],
};

export default config;
