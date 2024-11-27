import { html, repeat } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Option as FluentOption } from '../option/option.js';
import type { Dropdown as FluentDropdown } from '../dropdown/dropdown.js';

const optionTemplate = html<StoryArgs<FluentOption>>`
  <fluent-option ?disabled="${x => x.disabled}" ?selected="${x => x.selected}" value="${x => x.value}"
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
    >
      <fluent-listbox> ${repeat(x => x.storyItems, optionTemplate)} </fluent-listbox>
    </fluent-dropdown>
  </fluent-field>
`;

export default {
  title: 'Components/Combobox',
  argTypes: {
    multiple: {
      control: 'boolean',
    },
    storyItems: { table: { disable: true } },
  },
} as Meta<FluentDropdown>;

export const Default: Story<FluentDropdown> = renderComponent(storyTemplate);
Default.args = {
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
};

export const MultipleSelection: Story<FluentDropdown> = renderComponent(storyTemplate);
MultipleSelection.args = {
  ...Default.args,
  multiple: true,
  placeholder: 'Select fruits',
};
