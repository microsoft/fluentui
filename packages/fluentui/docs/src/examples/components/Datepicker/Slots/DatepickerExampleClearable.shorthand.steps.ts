import { inputClassName, datepickerCalendarCellClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${inputClassName}`)
        .click(`.${datepickerCalendarCellClassName}:nth-child(4)`)
        .snapshot('Shows selected date in input with clear possibility.')
        .click(`.${inputClassName}__icon`)
        .snapshot('Shows cleared input.')
        .click(`.${inputClassName}`)
        .snapshot('Shows cleared calendar.'),
  ],
};

export default config;
