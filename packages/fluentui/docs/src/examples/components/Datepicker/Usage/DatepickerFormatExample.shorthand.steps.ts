import { ScreenerTestsConfig } from '@uifabric/build/screener';
import { inputClassName, datepickerCalendarCellClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${inputClassName}`)
        .snapshot('Shows datepicker popup')
        .click(`.${datepickerCalendarCellClassName}:nth-child(20)`)
        .snapshot('Shows selected date'),
  ],
};

export default config;
