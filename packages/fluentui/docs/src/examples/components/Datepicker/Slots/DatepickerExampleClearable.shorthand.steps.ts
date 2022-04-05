import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';
import { inputClassName } from '@fluentui/react-northstar';
import { datepickerCalendarCellSelector } from '../datepickerCalendarCellSelector';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    builder =>
      builder
        .click(`.${inputClassName}`)
        .click(datepickerCalendarCellSelector(16))
        .snapshot('Shows selected date in input with clear possibility.')
        .click(`.${inputClassName}__icon`)
        .snapshot('Shows cleared input.')
        .click(`.${inputClassName}`)
        .snapshot('Shows cleared calendar.'),
  ],
};

export default config;
