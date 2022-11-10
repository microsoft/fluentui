import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
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
      <Screener steps={new Steps().click(`.${buttonClassName}`).snapshot('Shows datepicker calendar.').end()}>
        {story()}
      </Screener>
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
