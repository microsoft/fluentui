import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Option as FluentOption } from '../option/option.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';
import { DropdownAppearance, DropdownSize, DropdownType } from './dropdown.options.js';

type Story = StoryObj<FluentDropdown>;

const optionTemplate = html<StoryArgs<FluentOption>>` <fluent-option
  ?disabled="${story => story.disabled}"
  ?selected="${story => story.selected}"
  value="${story => story.value}"
  placeholder="${story => story.placeholder}"
  >${story => story.slottedContent?.()}</fluent-option
>`;

const dropdownTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-dropdown
    appearance="${story => story.appearance}"
    ?disabled="${story => story.disabled}"
    ?multiple="${story => story.multiple}"
    size="${story => story.size}"
    id="${story => story.id}"
    placeholder="${story => story.placeholder}"
    slot="${story => story.slot}"
    type="${story => story.type}"
  >
    <fluent-listbox>${repeat(story => story.slottedOptions, optionTemplate)}</fluent-listbox>
  </fluent-dropdown>
`;

const storyTemplate = html<StoryArgs<FluentDropdown>>`
  <fluent-field ?disabled="${story => story.disabled}"
    ><label slot="label">Fruit</label>${dropdownTemplate}</fluent-field
  >
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
    slot: { table: { disable: true } },
  },
} as Meta<FluentDropdown>;

export const Default: Story = {
  args: {
    placeholder: 'Select a fruit',
    slot: 'input',
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

export const Inline: Story = {
  render: renderComponent(html<StoryArgs<FluentDropdown>>`
    <p>Some text inline with the ${dropdownTemplate} and more text.</p>
  `),
  args: {
    ...Default.args,
    slot: null,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const DisabledOptions: Story = {
  args: {
    ...Default.args,
    slottedOptions: [
      { disabled: true, value: 'apple', slottedContent: () => 'Apple' },
      { value: 'banana', slottedContent: () => 'Banana' },
      { value: 'orange', slottedContent: () => 'Orange' },
      { disabled: true, value: 'mango', slottedContent: () => 'Mango' },
      { disabled: true, value: 'kiwi', slottedContent: () => 'Kiwi' },
      { value: 'cherry', slottedContent: () => 'Cherry' },
      { value: 'grapefruit', slottedContent: () => 'Grapefruit' },
      { disabled: true, value: 'papaya', slottedContent: () => 'Papaya' },
      { value: 'lychee', slottedContent: () => 'Lychee' },
    ],
  },
};
