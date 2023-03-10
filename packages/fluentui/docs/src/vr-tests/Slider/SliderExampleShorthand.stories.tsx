import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Slider } from '@fluentui/react-northstar';
import { focusSliderSteps, rightArrowSteps, upArrowSteps } from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import SliderExampleShorthand from '../../examples/components/Slider/Types/SliderExample.shorthand';

export default {
  component: Slider,
  title: 'Slider',
  decorators: [
    story => <StoryWright steps={focusSliderSteps}>{story()}</StoryWright>,
    story => <StoryWright steps={rightArrowSteps}>{story()}</StoryWright>,
    story => <StoryWright steps={upArrowSteps}>{story()}</StoryWright>,
  ],
} as ComponentMeta<typeof Slider>;

const SliderExampleShorthandTeams = getThemeStoryVariant(SliderExampleShorthand, 'teamsV2');

const SliderExampleShorthandTeamsDark = getThemeStoryVariant(SliderExampleShorthand, 'teamsDarkV2');

const SliderExampleShorthandTeamsHighContrast = getThemeStoryVariant(SliderExampleShorthand, 'teamsHighContrast');

export {
  SliderExampleShorthand,
  SliderExampleShorthandTeams,
  SliderExampleShorthandTeamsDark,
  SliderExampleShorthandTeamsHighContrast,
};
