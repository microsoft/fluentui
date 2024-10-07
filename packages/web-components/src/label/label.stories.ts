import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Label as FluentLabel } from './label.js';
import { LabelSize, LabelWeight } from './label.options.js';

type Story = StoryObj<FluentLabel>;

const storyTemplate = html<StoryArgs<FluentLabel>>`
  <fluent-label
    weight="${story => story.weight}"
    size="${story => story.size}"
    ?required="${story => story.required}"
    ?disabled="${story => story.disabled}"
    >${story => story.slottedContent?.()}</fluent-label
  >
`;

export default {
  title: 'Components/Label',
  render: renderComponent(storyTemplate),
  args: {
    required: false,
    size: LabelSize.medium,
    weight: LabelWeight.regular,
    slottedContent: () => 'Label',
  },
  argTypes: {
    required: {
      control: 'boolean',
      description: 'Sets required field styling.',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Sets disabled styling.',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    size: {
      control: 'select',
      description: 'Sets label font size.',
      mapping: { '': null, ...LabelSize },
      options: ['', ...Object.values(LabelSize)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(LabelSize).join('|') },
      },
    },
    weight: {
      control: 'select',
      description: 'Sets label font weight.',
      mapping: { '': null, ...LabelWeight },
      options: ['', ...Object.values(LabelWeight)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(LabelWeight).join('|') },
      },
    },
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentLabel>;

export const Default = {};

export const Size: Story = {
  render: renderComponent(html<StoryArgs<FluentLabel>>`
    <div style="display: flex; flex-direction: row; justify-content: space-around; align-items: center; gap: 10px;">
      <fluent-label size="small">Small Label</fluent-label>
      <fluent-label size="medium">Medium Label</fluent-label>
      <fluent-label size="large">Large Label</fluent-label>
    </div>
  `),
};

export const Weight: Story = {
  render: renderComponent(html<StoryArgs<FluentLabel>>`
    <div style="display: flex; flex-direction: row; justify-content: space-around; align-items: center; gap: 10px;">
      <fluent-label weight="regular">Regular Label</fluent-label>
      <fluent-label weight="semibold">Semibold Label</fluent-label>
    </div>
  `),
};

export const Required: Story = {
  render: renderComponent(html<StoryArgs<FluentLabel>>` <fluent-label required>Required Label</fluent-label> `),
};

export const Disabled: Story = {
  render: renderComponent(html<StoryArgs<FluentLabel>>` <fluent-label disabled>Disabled Label</fluent-label> `),
};
