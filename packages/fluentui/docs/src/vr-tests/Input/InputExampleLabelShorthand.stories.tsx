import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Input } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import InputExampleLabelShorthand from '../../examples/components/Input/Slots/InputExampleLabel.shorthand';

export default {
  component: Input,
  title: 'Input',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .snapshot('Input: Labels')
          .setValue(`#inside-label`, 'Some text...')
          .snapshot('Input: Inside Label with Value')
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Input>;

const InputExampleLabelShorthandTeams = getThemeStoryVariant(InputExampleLabelShorthand, 'teamsV2');

const InputExampleLabelShorthandTeamsDark = getThemeStoryVariant(InputExampleLabelShorthand, 'teamsDarkV2');

const InputExampleLabelShorthandTeamsHighContrast = getThemeStoryVariant(
  InputExampleLabelShorthand,
  'teamsHighContrast',
);

export {
  InputExampleLabelShorthand,
  InputExampleLabelShorthandTeams,
  InputExampleLabelShorthandTeamsDark,
  InputExampleLabelShorthandTeamsHighContrast,
};
