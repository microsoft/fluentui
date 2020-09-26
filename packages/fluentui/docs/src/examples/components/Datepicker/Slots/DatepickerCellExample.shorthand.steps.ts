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
        .hover(datepickerCalendarCellSelector(19))
        .snapshot("Does not show tooltip on not today's date.")
        .hover(datepickerCalendarCellSelector(20))
        .snapshot("Shows tooltip on today's date."),
  ],
};

export default config;
