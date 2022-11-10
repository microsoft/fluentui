import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Datepicker, inputClassName } from '@fluentui/react-northstar';
import { datepickerCalendarCellSelector } from './utils';
import { getThemeStoryVariant } from '../utilities';
import DatepickerCellExample from '../../examples/components/Datepicker/Slots/DatepickerCellExample.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .click(`.${inputClassName}`)
          .snapshot('Shows datepicker popup.')
          .hover(datepickerCalendarCellSelector(19))
          .snapshot("Does not show tooltip on not today's date.")
          .hover(datepickerCalendarCellSelector(20))
          .snapshot("Shows tooltip on today's date.")
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Datepicker>;

const DatepickerCellExampleTeams = getThemeStoryVariant(DatepickerCellExample, 'teamsV2');

const DatepickerCellExampleTeamsDark = getThemeStoryVariant(DatepickerCellExample, 'teamsDarkV2');

const DatepickerCellExampleTeamsHighContrast = getThemeStoryVariant(DatepickerCellExample, 'teamsHighContrast');

export {
  DatepickerCellExample,
  DatepickerCellExampleTeams,
  DatepickerCellExampleTeamsDark,
  DatepickerCellExampleTeamsHighContrast,
};
