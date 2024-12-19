import { html, repeat } from '@microsoft/fast-element';
import type { Dropdown as FluentDropdown } from '../dropdown/dropdown.js';
import type { Meta, StoryArgs, StoryObj } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Option as FluentOption } from '../option/option.js';

type Story = StoryObj<FluentDropdown>;

const optionTemplate = html<StoryArgs<FluentOption>>`
  <fluent-option
    ?disabled="${x => x.disabled}"
    ?freeform="${x => x.freeform}"
    ?selected="${x => x.selected}"
    value="${x => x.value}"
    >${x => x.slottedContent?.()}</fluent-option
  >
`;

const storyTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-field>
    <label slot="label">Fruit</label>
    <fluent-dropdown
      slot="input"
      appearance="${x => x.appearance}"
      placeholder="${x => x.placeholder}"
      ?multiple="${x => x.multiple}"
      size="${x => x.size}"
      id="${x => x.id}"
      type="combobox"
      value="${x => x.value}"
    >
      <fluent-listbox> ${repeat(x => x.storyItems, optionTemplate)} </fluent-listbox>
    </fluent-dropdown>
  </fluent-field>
`;

export default {
  title: 'Components/Combobox',
  render: renderComponent(storyTemplate),
  argTypes: {
    multiple: {
      control: 'boolean',
    },
    storyItems: { table: { disable: true } },
  },
} as Meta<FluentDropdown>;

export const Default: Story = {
  args: {
    placeholder: 'Select a fruit',
    storyItems: [
      { value: 'apple', slottedContent: () => 'Apple' },
      { value: 'banana', slottedContent: () => 'Banana' },
      { value: 'orange', slottedContent: () => 'Orange' },
      { value: 'mango', slottedContent: () => 'Mango' },
      { value: 'kiwi', slottedContent: () => 'Kiwi' },
      { value: 'cherry', slottedContent: () => 'Cherry' },
      { value: 'grapefruit', slottedContent: () => 'Grapefruit' },
      { value: 'papaya', slottedContent: () => 'Papaya' },
      { value: 'lychee', slottedContent: () => 'Lychee' },
    ],
  },
};

export const MultipleSelection: Story = {
  args: {
    ...Default.args,
    multiple: true,
    placeholder: 'Select fruits',
  },
};

export const Freeform: Story = {
  args: {
    ...Default.args,
    storyItems: [
      {
        freeform: true,
        slottedContent: () => html`Search for '<output></output>'`,
      },
      ...Default.args!.storyItems,
    ],
  },
};
