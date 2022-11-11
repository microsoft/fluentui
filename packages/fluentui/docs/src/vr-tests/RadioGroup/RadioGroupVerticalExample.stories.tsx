import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { RadioGroup } from '@fluentui/react-northstar';
import { getThemeStoryVariant, keys } from '../utilities';
import RadioGroupVerticalExample from '../../examples/components/RadioGroup/Types/RadioGroupExample.shorthand';

export default {
  component: RadioGroup,
  title: 'RadioGroup',
  decorators: [
    story => <Screener steps={new Steps().keys('body', keys.tab).snapshot('Focuses item').end()}>{story()}</Screener>,
  ],
} as ComponentMeta<typeof RadioGroup>;

const RadioGroupVerticalExampleTeams = getThemeStoryVariant(RadioGroupVerticalExample, 'teamsV2');

const RadioGroupVerticalExampleTeamsDark = getThemeStoryVariant(RadioGroupVerticalExample, 'teamsDarkV2');

const RadioGroupVerticalExampleTeamsHighContrast = getThemeStoryVariant(RadioGroupVerticalExample, 'teamsHighContrast');

export {
  RadioGroupVerticalExample,
  RadioGroupVerticalExampleTeams,
  RadioGroupVerticalExampleTeamsDark,
  RadioGroupVerticalExampleTeamsHighContrast,
};
