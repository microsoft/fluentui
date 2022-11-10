import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Button } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import ButtonExampleTextShorthand from '../../examples/components/Button/Types/ButtonExampleText.shorthand';

export default {
  component: Button,
  title: 'Button',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Button>;

const ButtonExampleTextShorthandTeams = getThemeStoryVariant(ButtonExampleTextShorthand, 'teamsV2');

const ButtonExampleTextShorthandTeamsDark = getThemeStoryVariant(ButtonExampleTextShorthand, 'teamsDarkV2');

const ButtonExampleTextShorthandTeamsHighContrast = getThemeStoryVariant(
  ButtonExampleTextShorthand,
  'teamsHighContrast',
);

export {
  ButtonExampleTextShorthand,
  ButtonExampleTextShorthandTeams,
  ButtonExampleTextShorthandTeamsDark,
  ButtonExampleTextShorthandTeamsHighContrast,
};
