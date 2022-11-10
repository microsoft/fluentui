import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Input, inputClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import InputExampleClearable from '../../examples/components/Input/Variations/InputExampleClearable.shorthand';

export default {
  component: Input,
  title: 'Input',
  decorators: [
    story => (
      <Screener
        steps={new Steps().setValue(`.${inputClassName} input`, 'Some text...').snapshot('Can be clearable').end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Input>;

const InputExampleClearableTeams = getThemeStoryVariant(InputExampleClearable, 'teamsV2');

const InputExampleClearableTeamsDark = getThemeStoryVariant(InputExampleClearable, 'teamsDarkV2');

const InputExampleClearableTeamsHighContrast = getThemeStoryVariant(InputExampleClearable, 'teamsHighContrast');

export {
  InputExampleClearable,
  InputExampleClearableTeams,
  InputExampleClearableTeamsDark,
  InputExampleClearableTeamsHighContrast,
};
