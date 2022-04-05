import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';
import { inputClassName, datepickerCalendarHeaderCellClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    builder =>
      builder
        .click(`.${inputClassName}`)
        .snapshot('Shows datepicker popup.')
        .hover(`.${datepickerCalendarHeaderCellClassName}:nth-child(1)`)
        .snapshot("Shows tooltip on today's date."),
  ],
};

export default config;
