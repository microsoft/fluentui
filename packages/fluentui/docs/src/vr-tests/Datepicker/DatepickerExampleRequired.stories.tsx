import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Datepicker, buttonClassName } from '@fluentui/react-northstar';
import { datepickerCalendarCellSelector } from './utils';
import { getThemeStoryVariant } from '../utilities';
import DatepickerExampleRequired from '../../examples/components/Datepicker/States/DatepickerExampleRequired.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .snapshot('Input shows error.')
          .click(`.${buttonClassName}`)
          .snapshot('Shows datepicker popup through button and error is shown.')
          .click(datepickerCalendarCellSelector(15))
          .snapshot('Shows selected date in input without error.')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Datepicker>;

const DatepickerExampleRequiredTeams = getThemeStoryVariant(DatepickerExampleRequired, 'teamsV2');

const DatepickerExampleRequiredTeamsDark = getThemeStoryVariant(DatepickerExampleRequired, 'teamsDarkV2');

const DatepickerExampleRequiredTeamsHighContrast = getThemeStoryVariant(DatepickerExampleRequired, 'teamsHighContrast');

export {
  DatepickerExampleRequired,
  DatepickerExampleRequiredTeams,
  DatepickerExampleRequiredTeamsDark,
  DatepickerExampleRequiredTeamsHighContrast,
};
