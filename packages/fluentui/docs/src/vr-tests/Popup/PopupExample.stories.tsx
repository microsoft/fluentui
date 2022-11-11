import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Popup, buttonClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import PopupExample from '../../examples/components/Popup/Types/PopupExample.shorthand';

export default {
  component: Popup,
  title: 'Popup',
  decorators: [
    story => (
      <Screener steps={new Steps().click(`.${buttonClassName}`).snapshot('Shows popup').end()}>{story()}</Screener>
    ),
  ],
} as ComponentMeta<typeof Popup>;

const PopupExampleTeams = getThemeStoryVariant(PopupExample, 'teamsV2');

const PopupExampleTeamsDark = getThemeStoryVariant(PopupExample, 'teamsDarkV2');

const PopupExampleTeamsHighContrast = getThemeStoryVariant(PopupExample, 'teamsHighContrast');

export { PopupExample, PopupExampleTeams, PopupExampleTeamsDark, PopupExampleTeamsHighContrast };
