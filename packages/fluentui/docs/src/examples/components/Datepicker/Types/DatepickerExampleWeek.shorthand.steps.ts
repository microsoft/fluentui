import { ScreenerTestsConfig, ALL_THEMES } from '@fluentui/scripts/screener';
import { buttonClassName, datepickerCalendarCellClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ALL_THEMES,
  steps: [
    builder =>
      builder
        .click(`.${buttonClassName}`)
        .snapshot('Shows calendar.')
        .hover(`.${datepickerCalendarCellClassName}:nth-child(1)`)
        .snapshot('Calendar is opened with the entire week highlighted on hover.')
        .click(`.${datepickerCalendarCellClassName}:nth-child(1)`)
        .click(`.${buttonClassName}`)
        .snapshot('Calendar is opened with selected week highlighted.'),
  ],
};

export default config;
