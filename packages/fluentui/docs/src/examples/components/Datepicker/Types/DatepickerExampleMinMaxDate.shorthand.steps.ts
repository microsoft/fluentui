import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';
import { buttonClassName, datepickerCalendarHeaderActionClassName } from '@fluentui/react-northstar';
import { datepickerCalendarCellSelector } from '../datepickerCalendarCellSelector';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    builder =>
      builder
        .click(`.${buttonClassName}`)
        .snapshot('Shows min max dates.')
        .click(datepickerCalendarCellSelector(10))
        .snapshot('Disabled date is not clickable.')
        .click(`.${datepickerCalendarHeaderActionClassName}:nth-of-type(1)`)
        .snapshot('Month icon is not clickable.'),
  ],
};

export default config;
