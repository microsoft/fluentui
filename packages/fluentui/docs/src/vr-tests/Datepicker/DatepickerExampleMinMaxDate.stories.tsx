import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Datepicker, buttonClassName, datepickerCalendarHeaderActionClassName } from '@fluentui/react-northstar';
import { datepickerCalendarCellSelector } from './utils';
import { getThemeStoryVariant } from '../utilities';
import DatepickerExampleMinMaxDate from '../../examples/components/Datepicker/Types/DatepickerExampleMinMaxDate.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(`.${buttonClassName}`)
          .snapshot('Shows min max dates.')
          .click(datepickerCalendarCellSelector(10))
          .snapshot('Disabled date is not clickable.')
          .click(`.${datepickerCalendarHeaderActionClassName}:nth-of-type(1)`)
          .snapshot('Month icon is not clickable.')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Datepicker>;

const DatepickerExampleMinMaxDateTeams = getThemeStoryVariant(DatepickerExampleMinMaxDate, 'teamsV2');

const DatepickerExampleMinMaxDateTeamsDark = getThemeStoryVariant(DatepickerExampleMinMaxDate, 'teamsDarkV2');

const DatepickerExampleMinMaxDateTeamsHighContrast = getThemeStoryVariant(
  DatepickerExampleMinMaxDate,
  'teamsHighContrast',
);

export {
  DatepickerExampleMinMaxDate,
  DatepickerExampleMinMaxDateTeams,
  DatepickerExampleMinMaxDateTeamsDark,
  DatepickerExampleMinMaxDateTeamsHighContrast,
};
