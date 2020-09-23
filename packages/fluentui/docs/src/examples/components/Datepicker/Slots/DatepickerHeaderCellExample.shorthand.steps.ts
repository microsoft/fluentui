import { ScreenerTestsConfig } from '@uifabric/build/screener';
import { inputClassName } from '@fluentui/react-northstar';
import { datepickerCalendarCellSelector } from '../datepickerCalendarCellSelector';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${inputClassName}`)
        .snapshot('Shows datepicker popup.')
        .hover(datepickerCalendarCellSelector(1))
        .snapshot("Shows tooltip on today's date."),
  ],
};

export default config;
