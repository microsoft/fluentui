import { ScreenerTestsConfig } from '@uifabric/build/screener';
import { inputClassName, datepickerCalendarCellClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${inputClassName}`)
        .snapshot('Shows datepicker popup.')
        .hover(`.${datepickerCalendarCellClassName}:nth-child(19)`)
        .snapshot("Does not show tooltip on not today's date.")
        .hover(`.${datepickerCalendarCellClassName}:nth-child(20)`)
        .snapshot("Shows tooltip on today's date."),
  ],
};

export default config;
