import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { Slider as FluentSlider } from './slider.js';
import { SliderMode, SliderSize } from './slider.options.js';
import './define.js';

type SliderStoryArgs = Args & FluentSlider;
type SliderStoryMeta = Meta<SliderStoryArgs>;

const storyTemplate = html<SliderStoryArgs>`
  <fluent-slider
    size=${x => x.size}
		min=${x => x.max}
    max=${x => x.max}
		step=${x => x.step}
    value=${x => x.value}
		disabled=${x => x.disabled}
		mode=${x => x.mode}
  ></fluentslider>
`;

export default {
  title: 'Components/Slider',
  args: {
    size: 'medium',
    min: 0,
    max: 100,
    step: 1,
    value: 15,
    disabled: false,
    mode: 'single-value',
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: Object.values(SliderSize),
      defaultValue: 'medium',
    },
    min: {
      control: 'number',
      defaultValue: 0,
    },
    max: {
      control: 'number',
      defaultValue: 100,
    },
    step: {
      control: 'number',
      defaultValue: 1,
    },
    value: {
      control: 'number',
      defaultValue: 15,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    mode: {
      control: {
        type: 'select',
      },
      options: Object.values(SliderMode),
      defaultValue: 'single-value',
    },
  },
} as SliderStoryMeta;

export const Slider = renderComponent(storyTemplate).bind({});

export const SliderVertical = renderComponent(html<SliderStoryArgs>`
  <fluent-slider vertical min="0" max="100"></fluent-progress-bar>
`);

export const SliderRange = renderComponent(html<SliderStoryArgs>`
  <fluent-slider min="0" max="100" mode="range" value="[20, 35]"></fluent-progress-bar>
`);
