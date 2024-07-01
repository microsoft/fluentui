import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { SliderSize as SliderSetSize } from './slider.options.js';
import type { Slider as FluentSlider } from './slider.js';

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
  ></fluent-slider>
`;

export default {
  title: 'Components/Slider',
  args: {
    disabled: false,
    readOnly: false,
    min: 0,
    max: 100,
    size: SliderSetSize.medium,
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
    value: { control: 'number', defaultValue: 50 },
    size: {
      control: {
        type: 'inline-radio',
        options: Object.values(SliderSetSize),
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

export const SliderOrientation = renderComponent(html<SliderStoryArgs>`
  <fluent-slider orientation="vertical" step="20" value="60" min="0" max="100"></fluent-slider>
  <fluent-slider orientation="horizontal" step="20" value="60" min="0" max="100"></fluent-slider>
`);

export const SliderSize = renderComponent(html<SliderStoryArgs>`
  <fluent-slider size="small" value="10" min="0" max="10"></fluent-slider>
  <fluent-slider size="medium" value="10" min="0" max="10"></fluent-slider>
`);

export const SliderSteps = renderComponent(html<SliderStoryArgs>`
  <fluent-slider step="10" value="10" min="0" max="100"></fluent-slider>
`);

export const SliderDisabled = renderComponent(html<SliderStoryArgs>`
  <fluent-slider disabled value="10" min="0" max="100"></fluent-slider>
  <fluent-slider step="25" disabled value="50" min="0" max="100"></fluent-slider>
`);
