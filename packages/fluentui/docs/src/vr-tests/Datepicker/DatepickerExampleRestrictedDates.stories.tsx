import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Datepicker, buttonClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DatepickerExampleRestrictedDates from '../../examples/components/Datepicker/Types/DatepickerExampleRestrictedDates.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <Screener steps={new Steps().click(`.${buttonClassName}`).snapshot('Shows disabled dates.').end()}>
        {story()}
      </Screener>
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
