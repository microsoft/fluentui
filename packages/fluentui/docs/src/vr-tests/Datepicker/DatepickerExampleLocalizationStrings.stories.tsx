import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Datepicker, buttonClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DatepickerExampleLocalizationStrings from '../../examples/components/Datepicker/Types/DatepickerExampleLocalizationStrings.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <StoryWright steps={new Steps().click(`.${buttonClassName}`).snapshot('Shows localized calendar.').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Datepicker>;

const DatepickerExampleLocalizationStringsTeams = getThemeStoryVariant(DatepickerExampleLocalizationStrings, 'teamsV2');

const DatepickerExampleLocalizationStringsTeamsDark = getThemeStoryVariant(
  DatepickerExampleLocalizationStrings,
  'teamsDarkV2',
);

const DatepickerExampleLocalizationStringsTeamsHighContrast = getThemeStoryVariant(
  DatepickerExampleLocalizationStrings,
  'teamsHighContrast',
);

export {
  DatepickerExampleLocalizationStrings,
  DatepickerExampleLocalizationStringsTeams,
  DatepickerExampleLocalizationStringsTeamsDark,
  DatepickerExampleLocalizationStringsTeamsHighContrast,
};
