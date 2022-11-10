import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Datepicker, buttonClassName, datepickerCalendarCellClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DatepickerExampleWeek from '../../examples/components/Datepicker/Types/DatepickerExampleWeek.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .click(`.${buttonClassName}`)
          .snapshot('Shows calendar.')
          .hover(`.${datepickerCalendarCellClassName}:nth-child(1)`)
          .snapshot('Calendar is opened with the entire week highlighted on hover.')
          .click(`.${datepickerCalendarCellClassName}:nth-child(1)`)
          .click(`.${buttonClassName}`)
          .snapshot('Calendar is opened with selected week highlighted.')
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Datepicker>;

const DatepickerExampleWeekTeams = getThemeStoryVariant(DatepickerExampleWeek, 'teamsV2');

const DatepickerExampleWeekTeamsDark = getThemeStoryVariant(DatepickerExampleWeek, 'teamsDarkV2');

const DatepickerExampleWeekTeamsHighContrast = getThemeStoryVariant(DatepickerExampleWeek, 'teamsHighContrast');

export {
  DatepickerExampleWeek,
  DatepickerExampleWeekTeams,
  DatepickerExampleWeekTeamsDark,
  DatepickerExampleWeekTeamsHighContrast,
};
