import { html, repeat } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Option as FluentOption } from '../option/option.js';
import { DropdownAppearance, DropdownSize } from './dropdown.options.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';

const optionTemplate = html<StoryArgs<FluentOption>>`
  <fluent-option value="${x => x.value}">${x => x.storyContent}</fluent-option>
`;

const storyTemplate = html<StoryArgs<FluentDropdown>>`
  <form>
    <fluent-dropdown
      appearance="${x => x.appearance}"
      size="${x => x.size}"
      ?multiple="${x => x.multiple}"
      placeholder="${x => x.placeholder}"
      list="options"
    ></fluent-dropdown>
    <fluent-dropdown-list id="options">
      ${repeat(x => x.storyOptions, optionTemplate)}
    </fluient-dropdown-list>
  </form>
`;

export default {
  title: 'Components/Dropdown',
  argTypes: {
    appearance: {
      control: 'select',
      options: Object.values(DropdownAppearance),
      table: { defaultValue: { summary: DropdownAppearance.outline } },
    },
    multiple: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: Object.values(DropdownSize),
      table: { defaultValue: { summary: DropdownSize.medium } },
    },
    storyOptions: { table: { disable: true } },
  },
} as Meta<FluentDropdown>;

export const Dropdown: Story<FluentDropdown> = renderComponent(storyTemplate).bind({});
Dropdown.args = {
  placeholder: 'Select a fruit',
  multiple: false,
  storyOptions: [
    { value: 'apple', storyContent: 'Apple' },
    { value: 'banana', storyContent: 'Banana' },
    { value: 'orange', storyContent: 'Orange' },
    { value: 'mango', storyContent: 'Mango' },
    { value: 'kiwi', storyContent: 'Kiwi' },
    { value: 'cherry', storyContent: 'Cherry' },
    { value: 'grapefruit', storyContent: 'Grapefruit' },
    { value: 'papaya', storyContent: 'Papaya' },
    { value: 'lychee', storyContent: 'Lychee' },
  ],
};
