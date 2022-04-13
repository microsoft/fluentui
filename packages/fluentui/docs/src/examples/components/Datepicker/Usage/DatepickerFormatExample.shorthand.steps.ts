import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';
import { inputClassName } from '@fluentui/react-northstar';
import { datepickerCalendarCellSelector } from '../datepickerCalendarCellSelector';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    builder =>
      builder
        .click(`.${inputClassName}`)
        .snapshot('Shows datepicker popup')
        .click(datepickerCalendarCellSelector(20))
        .snapshot('Shows selected date'),
  ],
};

export default config;
