import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { SliderOrientation as SliderSetOrientation, SliderSize as SliderSetSize } from './slider.options.js';
import type { Slider as FluentSlider } from './slider.js';

type SliderStoryArgs = Args & FluentSlider;
type SliderStoryMeta = Meta<SliderStoryArgs>;

const storyTemplate = html<SliderStoryArgs>`
  <fluent-slider
    ?disabled=${x => x.disabled}
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
    size: SliderSetSize.medium,
    orientation: SliderSetOrientation.horizontal,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    min: { control: 'number' },
    max: { control: 'number' },
    value: { control: 'number' },
    step: { control: 'number' },
    size: {
      control: {
        type: 'inline-radio',
        options: Object.values(SliderSetSize),
      },
      table: { defaultValue: { summary: 'medium' } },
    },
    orientation: {
      control: {
        type: 'inline-radio',
        options: Object.values(SliderSetOrientation),
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
  <fluent-slider size="small" value="10" min="0" max="100"></fluent-slider>
  <fluent-slider size="medium" value="10" min="0" max="100"></fluent-slider>
`);

export const SliderSteps = renderComponent(html<SliderStoryArgs>`
  <fluent-slider step="10" value="10" min="0" max="100"></fluent-slider>
`);

export const SliderDisabled = renderComponent(html<SliderStoryArgs>`
  <fluent-slider disabled value="10" min="0" max="100"></fluent-slider>
  <fluent-slider step="25" disabled value="50" min="0" max="100"></fluent-slider>
`);

export const SliderInRTL = renderComponent(html<SliderStoryArgs>`
  <div dir="rtl">
    <fluent-slider orientation="vertical" step="20" value="60" min="0" max="100"></fluent-slider>
    <fluent-slider orientation="horizontal" step="20" value="60" min="0" max="100"></fluent-slider>
  </div>
`);
