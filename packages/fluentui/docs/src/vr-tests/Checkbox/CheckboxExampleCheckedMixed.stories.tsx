import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Checkbox } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities';
import CheckboxExampleCheckedMixed from '../../examples/components/Checkbox/States/CheckboxExampleCheckedMixed';

export default {
  component: Checkbox,
  title: 'Checkbox',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Checkbox>;

const CheckboxExampleCheckedMixedTeams = getThemeStoryVariant(CheckboxExampleCheckedMixed, 'teamsV2');

const CheckboxExampleCheckedMixedTeamsDark = getThemeStoryVariant(CheckboxExampleCheckedMixed, 'teamsDarkV2');

const CheckboxExampleCheckedMixedTeamsHighContrast = getThemeStoryVariant(
  CheckboxExampleCheckedMixed,
  'teamsHighContrast',
);

export {
  CheckboxExampleCheckedMixed,
  CheckboxExampleCheckedMixedTeams,
  CheckboxExampleCheckedMixedTeamsDark,
  CheckboxExampleCheckedMixedTeamsHighContrast,
};
