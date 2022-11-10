import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Button } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import ButtonExampleWithTooltip from '../../examples/components/Button/Usage/ButtonExampleWithTooltip.shorthand';

export default {
  component: Button,
  title: 'Button',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Button>;

const ButtonExampleWithTooltipTeams = getThemeStoryVariant(ButtonExampleWithTooltip, 'teamsV2');

const ButtonExampleWithTooltipTeamsDark = getThemeStoryVariant(ButtonExampleWithTooltip, 'teamsDarkV2');

const ButtonExampleWithTooltipTeamsHighContrast = getThemeStoryVariant(ButtonExampleWithTooltip, 'teamsHighContrast');

export {
  ButtonExampleWithTooltip,
  ButtonExampleWithTooltipTeams,
  ButtonExampleWithTooltipTeamsDark,
  ButtonExampleWithTooltipTeamsHighContrast,
};
