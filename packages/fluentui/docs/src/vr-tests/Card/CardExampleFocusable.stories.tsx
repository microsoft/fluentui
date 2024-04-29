import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Card } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import CardExampleFocusable from '../../examples/components/Card/Usage/CardExampleFocusable';

export default {
  component: Card,
  title: 'Card',
  decorators: [
    story => (
      <StoryWright steps={new Steps().keys('body', Keys.tab).snapshot('Focus on a card').end()}>{story()}</StoryWright>
    ),
  ],
} as ComponentMeta<typeof Card>;

const CardExampleFocusableTeams = getThemeStoryVariant(CardExampleFocusable, 'teamsV2');

const CardExampleFocusableTeamsDark = getThemeStoryVariant(CardExampleFocusable, 'teamsDarkV2');

const CardExampleFocusableTeamsHighContrast = getThemeStoryVariant(CardExampleFocusable, 'teamsHighContrast');

export {
  CardExampleFocusable,
  CardExampleFocusableTeams,
  CardExampleFocusableTeamsDark,
  CardExampleFocusableTeamsHighContrast,
};
