import { buttonClassName, datepickerCalendarCellClassName } from '@fluentui/react-northstar';

const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [
    builder =>
      builder
        .click(`.${buttonClassName}`)
        .click(`.${datepickerCalendarCellClassName}:nth-child(15)`)
        .snapshot('Shows selected date in input with clear possibility.')
        .click(`.${buttonClassName}__icon`)
        .snapshot('Shows cleared input.')
        .click(`.${buttonClassName}`)
        .snapshot('Shows cleared calendar.'),
  ],
};

export default config;
