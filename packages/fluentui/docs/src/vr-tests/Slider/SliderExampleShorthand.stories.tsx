import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Slider } from '@fluentui/react-northstar';
import { focusSliderSteps, rightArrowSteps, upArrowSteps } from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities';
import SliderExampleShorthand from '../../examples/components/Slider/Types/SliderExample.shorthand';

export default {
  component: Slider,
  title: 'Slider',
  decorators: [
    story => <Screener steps={focusSliderSteps}>{story()}</Screener>,
    story => <Screener steps={rightArrowSteps}>{story()}</Screener>,
    story => <Screener steps={upArrowSteps}>{story()}</Screener>,
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
