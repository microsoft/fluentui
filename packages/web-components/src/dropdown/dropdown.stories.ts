import { html, repeat } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Option as FluentOption } from '../option/option.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';
import { DropdownAppearance, DropdownSize } from './dropdown.options.js';

//prettier-ignore
const optionTemplate = html<StoryArgs<FluentOption>>`
  <fluent-option value="${x => x.value}">${x => x.storyContent}</fluent-option>
`;

//prettier-ignore
const storyTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-dropdown
    appearance="${x => x.appearance}"
    ?multiple="${x => x.multiple}"
    placeholder="${x => x.placeholder}"
    size="${x => x.size}"
    slot="${x => x.slot}"
    id="${x => x.id}"
  >
    ${repeat(x => x.storyItems, optionTemplate)}
  </fluent-dropdown>
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
    storyItems: { table: { disable: true } },
  },
} as Meta<FluentDropdown>;

export const Dropdown: Story<FluentDropdown> = renderComponent(storyTemplate);
Dropdown.args = {
  placeholder: 'Select a fruit',
  storyItems: [
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

export const MultipleSelection: Story<FluentDropdown> = renderComponent(storyTemplate);
MultipleSelection.args = {
  ...Dropdown.args,
  multiple: true,
  placeholder: 'Select fruits',
};

export const Sizes: Story<FluentDropdown> = renderComponent(
  html`
    ${repeat(
      x => x.storyItems,
      html`
        <fluent-field>
          <label slot="label" for="dropdown-${x => x.size}">${x => x.size}</label>
          ${storyTemplate}
        </fluent-field>
        <br />
      `,
    )}
  `,
);
Sizes.args = {
  storyItems: [{ size: DropdownSize.small }, { size: DropdownSize.medium }, { size: DropdownSize.large }].map(item => ({
    ...Dropdown.args,
    ...item,
    slot: 'input',
    id: `dropdown-${item.size}`,
  })),
};

export const LargeSize: Story<FluentDropdown> = renderComponent(storyTemplate);
LargeSize.args = {
  ...Dropdown.args,
  size: DropdownSize.large,
};
