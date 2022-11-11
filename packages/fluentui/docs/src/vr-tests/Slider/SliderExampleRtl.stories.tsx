import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Slider } from '@fluentui/react-northstar';
import { focusSliderSteps, rightArrowSteps, upArrowSteps } from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities';
import SliderExampleRtl from '../../examples/components/Slider/Rtl/SliderExample.rtl';

export default {
  component: Slider,
  title: 'Slider',
  decorators: [
    story => <Screener steps={focusSliderSteps}>{story()}</Screener>,
    story => <Screener steps={rightArrowSteps}>{story()}</Screener>,
    story => <Screener steps={upArrowSteps}>{story()}</Screener>,
  ],
} as ComponentMeta<typeof Slider>;

const SliderExampleRtlTeams = getThemeStoryVariant(SliderExampleRtl, 'teamsV2');

const SliderExampleRtlTeamsDark = getThemeStoryVariant(SliderExampleRtl, 'teamsDarkV2');

const SliderExampleRtlTeamsHighContrast = getThemeStoryVariant(SliderExampleRtl, 'teamsHighContrast');

export { SliderExampleRtl, SliderExampleRtlTeams, SliderExampleRtlTeamsDark, SliderExampleRtlTeamsHighContrast };
