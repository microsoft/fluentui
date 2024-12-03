import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Option as FluentOption } from '../option/option.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';

type Story = StoryObj<FluentDropdown>;

const optionTemplate = html<StoryArgs<FluentOption>>` <fluent-option
  ?disabled="${x => x.disabled}"
  ?selected="${x => x.selected}"
  :value="${x => x.value}"
  placeholder="${x => x.placeholder}"
  >${x => x.slottedContent?.()}</fluent-option
>`;

const dropdownTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-dropdown
    slot="input"
    appearance="${x => x.appearance}"
    ?multiple="${x => x.multiple}"
    size="${x => x.size}"
    id="${x => x.id}"
    placeholder="${x => x.placeholder}"
    type="${x => x.type}"
  >
    <fluent-listbox>${repeat(x => x.storyItems, optionTemplate)}</fluent-listbox>
  </fluent-dropdown>
`;

const storyTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-field>
    <label slot="label">Fruit</label>
    ${dropdownTemplate}
  </fluent-field>
`;

export default {
  title: 'Components/Dropdown',
  render: renderComponent(storyTemplate),
  argTypes: {
    type: {
      control: 'radio',
      options: Object.values(DropdownType),
      table: { category: 'attributes' },
    },
    placeholder: {
      control: 'text',
      table: { category: 'attributes' },
    },
    multiple: {
      control: 'boolean',
      table: { category: 'attributes' },
    },
    storyItems: { table: { disable: true } },
  },
} as Meta<FluentDropdown>;

export const Dropdown: Story = {
  args: {
    placeholder: 'Select a fruit',
    type: DropdownType.dropdown,
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
    ...Dropdown.args,
    multiple: true,
    placeholder: 'Select fruits',
  },
};
