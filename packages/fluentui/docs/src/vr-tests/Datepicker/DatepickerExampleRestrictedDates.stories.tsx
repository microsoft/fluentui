import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Datepicker, buttonClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DatepickerExampleRestrictedDates from '../../examples/components/Datepicker/Types/DatepickerExampleRestrictedDates.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <StoryWright steps={new Steps().click(`.${buttonClassName}`).snapshot('Shows disabled dates.').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Datepicker>;

const DatepickerExampleRestrictedDatesTeams = getThemeStoryVariant(DatepickerExampleRestrictedDates, 'teamsV2');

const DatepickerExampleRestrictedDatesTeamsDark = getThemeStoryVariant(DatepickerExampleRestrictedDates, 'teamsDarkV2');

const DatepickerExampleRestrictedDatesTeamsHighContrast = getThemeStoryVariant(
  DatepickerExampleRestrictedDates,
  'teamsHighContrast',
);

export {
  DatepickerExampleRestrictedDates,
  DatepickerExampleRestrictedDatesTeams,
  DatepickerExampleRestrictedDatesTeamsDark,
  DatepickerExampleRestrictedDatesTeamsHighContrast,
};
