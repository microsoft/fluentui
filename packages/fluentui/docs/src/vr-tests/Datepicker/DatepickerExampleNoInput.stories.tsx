import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Meta } from '@storybook/react';
import { Datepicker, buttonClassName, inputClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DatepickerExampleNoInput from '../../examples/components/Datepicker/Types/DatepickerExampleNoInput.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(`.${buttonClassName}`)
          .snapshot('Shows calendar.')
          .click(`.${inputClassName}`)
          .snapshot('Keeps calendar open.')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as Meta<typeof Datepicker>;

const DatepickerExampleNoInputTeams = getThemeStoryVariant(DatepickerExampleNoInput, 'teamsV2');

const DatepickerExampleNoInputTeamsDark = getThemeStoryVariant(DatepickerExampleNoInput, 'teamsDarkV2');

const DatepickerExampleNoInputTeamsHighContrast = getThemeStoryVariant(DatepickerExampleNoInput, 'teamsHighContrast');

export {
  DatepickerExampleNoInput,
  DatepickerExampleNoInputTeams,
  DatepickerExampleNoInputTeamsDark,
  DatepickerExampleNoInputTeamsHighContrast,
};
