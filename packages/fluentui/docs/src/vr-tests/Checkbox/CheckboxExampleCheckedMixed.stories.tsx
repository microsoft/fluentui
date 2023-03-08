import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Checkbox } from '@fluentui/react-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import CheckboxExampleCheckedMixed from '../../examples/components/Checkbox/States/CheckboxExampleCheckedMixed';

export default {
  component: Checkbox,
  title: 'Checkbox',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
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
