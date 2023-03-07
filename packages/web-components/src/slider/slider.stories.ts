import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { SliderSize } from './slider.options.js';
import type { Slider as FluentSlider } from './slider.js';
import './define.js';

type SliderStoryArgs = Args & FluentSlider;
type SliderStoryMeta = Meta<SliderStoryArgs>;

const storyTemplate = html<SliderStoryArgs>`
  <fluent-slider
    ?disabled=${x => x.disabled}
    ?readonly=${x => x.readOnly}
    step=${x => x.step}
    size=${x => x.size}
    min=${x => x.min}
    max=${x => x.max}
    orientation=${x => x.orientation}
    value=${x => x.value}
    step=${x => x.step}
  ></fluent-slider>
`;

export default {
  title: 'Components/Slider',
  args: {
    disabled: false,
    readOnly: false,
    min: 0,
    max: 100,
    size: SliderSize.medium,
    orientation: 'horizontal',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
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
    value: { control: 'number', defaultValue: 50 },
    size: {
      control: {
        type: 'inline-radio',
        options: Object.values(SliderSize),
      },
    },
    orientation: {
      control: {
        type: 'inline-radio',
        options: ['horizontal', 'vertical'],
      },
    },
  },
} as SliderStoryMeta;

export const Slider = renderComponent(storyTemplate).bind({});

export const SliderVertical = renderComponent(html<SliderStoryArgs>`
  <fluent-slider step="25" orientation="vertical" current-value="100" min="0" max="100"></fluent-slider>
`);

export const SliderSmall = renderComponent(html<SliderStoryArgs>`
  <fluent-slider size="small" value="10" min="0" max="10"></fluent-slider>
`);

export const SliderSteps = renderComponent(html<SliderStoryArgs>`
  <fluent-slider step="10" value="10" min="0" max="100"></fluent-slider>
`);

export const SliderDisabled = renderComponent(html<SliderStoryArgs>`
  <fluent-slider disabled value="10" min="0" max="100"></fluent-slider>
`);
