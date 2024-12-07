import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Option as FluentOption } from '../option/option.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';
import { DropdownAppearance, DropdownSize, DropdownType } from './dropdown.options.js';

type Story = StoryObj<FluentDropdown>;

const optionTemplate = html<StoryArgs<FluentOption>>` <fluent-option
  ?disabled="${x => x.disabled}"
  ?selected="${x => x.selected}"
  value="${x => x.value}"
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
    <fluent-listbox>${repeat(x => x.slottedOptions, optionTemplate)}</fluent-listbox>
  </fluent-dropdown>
`;

const storyTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-field><label slot="label">Fruit</label>${dropdownTemplate}</fluent-field>
`;

export default {
  title: 'Components/Dropdown',
  render: renderComponent(storyTemplate),
  argTypes: {
    appearance: {
      control: 'select',
      options: ['', ...Object.values(DropdownAppearance)],
      table: { category: 'attributes' },
    },
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
    size: {
      control: 'select',
      options: ['', ...Object.values(DropdownSize)],
      table: { category: 'attributes' },
    },
    slottedOptions: { table: { disable: true } },
  },
} as Meta<FluentDropdown>;

export const Default: Story = {
  args: {
    placeholder: 'Select a fruit',
    type: DropdownType.dropdown,
    slottedOptions: [
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

export const Small: Story = {
  args: {
    ...Default.args,
    size: DropdownSize.small,
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: DropdownSize.large,
  },
};

export const FilledLighter: Story = {
  args: {
    ...Default.args,
    appearance: DropdownAppearance.filledLighter,
  },
};

export const FilledDarker: Story = {
  args: {
    ...Default.args,
    appearance: DropdownAppearance.filledDarker,
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    appearance: DropdownAppearance.outline,
  },
};

export const Transparent: Story = {
  args: {
    ...Default.args,
    appearance: DropdownAppearance.transparent,
  },
};
