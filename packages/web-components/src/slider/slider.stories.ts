import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { SliderSize } from './slider.options.js';
import type { Slider as FluentSlider } from './slider.js';
import './define.js';

type SliderStoryArgs = Args & FluentSlider;
type SliderStoryMeta = Meta<SliderStoryArgs>;

const storyTemplate = html<SliderStoryArgs>`
  <fluent-slider min=${x => x.max} max=${x => x.max} current-value=${x => x.currentValue}> </fluent-slider>
`;

export default {
  title: 'Components/Slider',
  args: {
    min: 0,
    max: 100,
    currentValue: '50',
    size: SliderSize.medium,
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: Object.values(SliderSize),
      },
    },
    min: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    max: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    currentValue: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
} as SliderStoryMeta;

export const Slider = renderComponent(storyTemplate).bind({});

export const SliderVertical = renderComponent(html<SliderStoryArgs>`
  <fluent-slider min="0" max="100"></fluent-progress-bar>
`);
