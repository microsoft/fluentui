import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryWright, Steps } from 'storywright';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Datepicker, buttonClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DatepickerExampleStandaloneCalendarButton from '../../examples/components/Datepicker/Variations/DatepickerExampleStandaloneCalendarButton.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <StoryWright steps={new Steps().click(`.${buttonClassName}`).snapshot('Shows datepicker calendar.').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Datepicker>;

const DatepickerExampleStandaloneCalendarButtonTeams = getThemeStoryVariant(
  DatepickerExampleStandaloneCalendarButton,
  'teamsV2',
);

const DatepickerExampleStandaloneCalendarButtonTeamsDark = getThemeStoryVariant(
  DatepickerExampleStandaloneCalendarButton,
  'teamsDarkV2',
);

const DatepickerExampleStandaloneCalendarButtonTeamsHighContrast = getThemeStoryVariant(
  DatepickerExampleStandaloneCalendarButton,
  'teamsHighContrast',
);

export {
  DatepickerExampleStandaloneCalendarButton,
  DatepickerExampleStandaloneCalendarButtonTeams,
  DatepickerExampleStandaloneCalendarButtonTeamsDark,
  DatepickerExampleStandaloneCalendarButtonTeamsHighContrast,
};
