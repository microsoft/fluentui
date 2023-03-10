import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Slider } from '@fluentui/react-northstar';
import { focusSliderSteps, rightArrowSteps, upArrowSteps } from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities';
import SliderExampleRtl from '../../examples/components/Slider/Rtl/SliderExample.rtl';

export default {
  component: Slider,
  title: 'Slider',
  decorators: [
    story => <StoryWright steps={focusSliderSteps}>{story()}</StoryWright>,
    story => <StoryWright steps={rightArrowSteps}>{story()}</StoryWright>,
    story => <StoryWright steps={upArrowSteps}>{story()}</StoryWright>,
  ],
} as ComponentMeta<typeof Slider>;

const SliderExampleRtlTeams = getThemeStoryVariant(SliderExampleRtl, 'teamsV2');

const SliderExampleRtlTeamsDark = getThemeStoryVariant(SliderExampleRtl, 'teamsDarkV2');

const SliderExampleRtlTeamsHighContrast = getThemeStoryVariant(SliderExampleRtl, 'teamsHighContrast');

export { SliderExampleRtl, SliderExampleRtlTeams, SliderExampleRtlTeamsDark, SliderExampleRtlTeamsHighContrast };
