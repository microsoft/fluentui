import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Datepicker, buttonClassName, datepickerCalendarCellClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DatepickerExampleWeek from '../../examples/components/Datepicker/Types/DatepickerExampleWeek.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <StoryWright
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
      </StoryWright>
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
