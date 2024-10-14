import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Radio as FluentRadio } from './radio.js';

type Story = StoryObj<FluentRadio>;

const storyTemplate = html<StoryArgs<FluentRadio>>`
  <fluent-radio
    id="${story => story.id}"
    ?checked="${story => story.checked}"
    ?disabled="${story => story.disabled}"
    name="${story => story.name}"
    ?required="${story => story.required}"
    value="${story => story.value}"
  ></fluent-radio>
`;

export default {
  title: 'Components/Radio',
  render: renderComponent(storyTemplate),
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Sets checked state on radio',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Sets disabled state on radio',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
  },
} as Meta<FluentRadio>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 'Disabled Radio',
    disabled: true,
  },
};

export const Field: Story = {
  render: renderComponent(html<StoryArgs<FluentRadio>>`
    <fluent-field label-position="after">
      <label slot="label">${story => story.value}</label>
      <fluent-radio
        slot="input"
        id="${story => story.id}"
        ?checked="${story => story.checked}"
        ?disabled="${story => story.disabled}"
        name="${story => story.name}"
        ?required="${story => story.required}"
        value="${story => story.value}"
      ></fluent-radio>
    </fluent-field>
  `),
  args: {
    value: 'Apple',
  },
};
