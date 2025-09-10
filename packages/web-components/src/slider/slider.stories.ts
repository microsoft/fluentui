import { html, ref } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { SliderOrientation as SliderSetOrientation, SliderSize as SliderSetSize } from './slider.options.js';
import type { Slider as FluentSlider } from './slider.js';

type Story = StoryObj<FluentSlider>;

const storyTemplate = html<StoryArgs<FluentSlider>>`
  <fluent-slider
    ?disabled="${story => story.disabled}"
    id="${story => story.id}"
    step="${story => story.step}"
    size="${story => story.size}"
    min="${story => story.min}"
    max="${story => story.max}"
    orientation="${story => story.orientation}"
    value="${story => story.value}"
    slot="${story => story.slot}"
  ></fluent-slider>
`;

export default {
  title: 'Components/Slider',
  render: renderComponent(storyTemplate),
  argTypes: {
    disabled: {
      control: 'boolean',
      description: "The element's disabled state.",
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    min: {
      control: 'number',
      description: 'The minimum value of the slider.',
      table: { category: 'attributes', type: { summary: 'number' } },
    },
    max: {
      control: 'number',
      description: 'The maximum value of the slider.',
      table: { category: 'attributes', type: { summary: 'number' } },
    },
    value: {
      control: 'number',
      description: 'The value of the slider.',
      table: { category: 'attributes', type: { summary: 'number' } },
    },
    step: {
      control: 'number',
      description: 'The step value of the slider.',
      table: { category: 'attributes', type: { summary: 'number' } },
    },
    size: {
      control: 'select',
      description: 'The size of the slider.',
      options: ['', ...Object.values(SliderSetSize)],
      mapping: { '': null, ...SliderSetSize },
      table: {
        category: 'attributes',
        type: Object.values(SliderSetSize).join('|'),
      },
    },
    orientation: {
      control: 'select',
      description: 'The orientation of the slider',
      options: ['', ...Object.values(SliderSetOrientation)],
      mapping: { '': null, ...SliderSetOrientation },
      table: {
        category: 'attributes',
        type: Object.values(SliderSetOrientation).join('|'),
      },
    },
  },
} as Meta<FluentSlider>;

export const Default: Story = {};

export const SliderInField: Story = {
  render: renderComponent(html`
    <fluent-field label-position="before">
      <label slot="label" for="slider-in-field">Slider</label>
      <fluent-slider slot="input" id="slider-in-field"></fluent-slider>
    </fluent-field>
  `),
};

export const VerticalOrientation: Story = {
  args: {
    orientation: SliderSetOrientation.vertical,
  },
};

export const SmallSize: Story = {
  args: {
    size: SliderSetSize.small,
  },
};

export const MediumSize: Story = {
  args: {
    size: SliderSetSize.medium,
  },
};

export const SliderWithValue: Story = {
  render: renderComponent(html`
    <fluent-field label-position="above">
      <label slot="label" for="slider-in-field">Slider value</label>
      <fluent-slider slot="input" id="slider-in-field" ${ref('slider')}></fluent-slider>
      <fluent-text slot="message" size="200">
        Current value: <output :value="${x => x.slider.value}"></output>
      </fluent-text>
    </fluent-field>
  `),
};

export const MinMax: Story = {
  args: {
    // @ts-expect-error Slider attrs are typed as strings??
    min: 0,
    // @ts-expect-error Slider attrs are typed as strings??
    max: 100,
  },
};

export const SliderSteps: Story = {
  args: {
    // @ts-expect-error Slider attrs are typed as strings??
    step: 10,
  },
};

export const SliderDisabled = {
  args: {
    disabled: true,
  },
};
