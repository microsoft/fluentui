import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Datepicker, inputClassName } from '@fluentui/react-northstar';
import { datepickerCalendarCellSelector } from './utils';
import { getThemeStoryVariant } from '../utilities';
import DatepickerExampleClearable from '../../examples/components/Datepicker/Slots/DatepickerExampleClearable.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(`.${inputClassName}`)
          .click(datepickerCalendarCellSelector(16))
          .snapshot('Shows selected date in input with clear possibility.')
          .click(`.${inputClassName}__icon`)
          .snapshot('Shows cleared input.')
          .click(`.${inputClassName}`)
          .snapshot('Shows cleared calendar.')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Datepicker>;

const DatepickerExampleClearableTeams = getThemeStoryVariant(DatepickerExampleClearable, 'teamsV2');

const DatepickerExampleClearableTeamsDark = getThemeStoryVariant(DatepickerExampleClearable, 'teamsDarkV2');

const DatepickerExampleClearableTeamsHighContrast = getThemeStoryVariant(
  DatepickerExampleClearable,
  'teamsHighContrast',
);

export {
  DatepickerExampleClearable,
  DatepickerExampleClearableTeams,
  DatepickerExampleClearableTeamsDark,
  DatepickerExampleClearableTeamsHighContrast,
};
