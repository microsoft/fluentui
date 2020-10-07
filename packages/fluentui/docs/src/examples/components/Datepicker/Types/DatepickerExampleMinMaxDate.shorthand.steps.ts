import { ScreenerTestsConfig } from '@uifabric/build/screener';
import { buttonClassName, datepickerCalendarHeaderActionClassName } from '@fluentui/react-northstar';
import { datepickerCalendarCellSelector } from '../datepickerCalendarCellSelector';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
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
