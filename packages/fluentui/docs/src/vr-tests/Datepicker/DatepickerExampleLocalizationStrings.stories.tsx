import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Datepicker, buttonClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DatepickerExampleLocalizationStrings from '../../examples/components/Datepicker/Types/DatepickerExampleLocalizationStrings.shorthand';

export default {
  component: Datepicker,
  title: 'Datepicker',
  decorators: [
    story => (
      <Screener steps={new Steps().click(`.${buttonClassName}`).snapshot('Shows localized calendar.').end()}>
        {story()}
      </Screener>
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
