import { ScreenerTestsConfig } from '@uifabric/build/screener';
import {
  buttonClassName,
  datepickerCalendarCellClassName,
  datepickerCalendarHeaderActionClassName,
} from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${buttonClassName}`)
        .snapshot('Shows min max dates.')
        .click(`.${datepickerCalendarCellClassName}:nth-child(10)`)
        .snapshot('Disabled date is not clickable.')
        .click(`.${datepickerCalendarHeaderActionClassName}:nth-of-type(1)`)
        .snapshot('Month icon is not clickable.'),
  ],
};

export default config;
