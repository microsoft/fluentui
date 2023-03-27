import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Datepicker, datepickerCalendarHeaderCellClassName, inputClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DatepickerHeaderCellExample from '../../examples/components/Datepicker/Slots/DatepickerHeaderCellExample.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(`.${inputClassName}`)
          .snapshot('Shows datepicker popup.')
          .hover(`.${datepickerCalendarHeaderCellClassName}:nth-child(1)`)
          .snapshot("Shows tooltip on today's date.")
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Datepicker>;

const DatepickerHeaderCellExampleTeams = getThemeStoryVariant(DatepickerHeaderCellExample, 'teamsV2');

const DatepickerHeaderCellExampleTeamsDark = getThemeStoryVariant(DatepickerHeaderCellExample, 'teamsDarkV2');

const DatepickerHeaderCellExampleTeamsHighContrast = getThemeStoryVariant(
  DatepickerHeaderCellExample,
  'teamsHighContrast',
);

export {
  DatepickerHeaderCellExample,
  DatepickerHeaderCellExampleTeams,
  DatepickerHeaderCellExampleTeamsDark,
  DatepickerHeaderCellExampleTeamsHighContrast,
};
