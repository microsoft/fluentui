import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Button } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import ButtonExampleDisabled from '../../examples/components/Button/States/ButtonExampleDisabled.shorthand';

export default {
  component: Button,
  title: 'Button',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Button>;

const ButtonExampleDisabledTeams = getThemeStoryVariant(ButtonExampleDisabled, 'teamsV2');

const ButtonExampleDisabledTeamsDark = getThemeStoryVariant(ButtonExampleDisabled, 'teamsDarkV2');

const ButtonExampleDisabledTeamsHighContrast = getThemeStoryVariant(ButtonExampleDisabled, 'teamsHighContrast');

export {
  ButtonExampleDisabled,
  ButtonExampleDisabledTeams,
  ButtonExampleDisabledTeamsDark,
  ButtonExampleDisabledTeamsHighContrast,
};
