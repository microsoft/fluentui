import { html, render, repeat, when } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Option as FluentOption } from '../option/option.js';
import { DropdownAppearance, DropdownSize } from './dropdown.options.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';

const optionTemplate = html<StoryArgs<FluentOption>>`
  <fluent-option value="${x => x.value}" ?disabled="${x => x.disabled}"> ${x => x.storyContent} </fluent-option>
`;

const storyOptions = [
  { value: 'apple', storyContent: 'Apple' },
  { value: 'banana', storyContent: 'Banana' },
  { value: 'durian', storyContent: 'Durian', disabled: true },
  { value: 'orange', storyContent: 'Orange' },
  { value: 'mango', storyContent: 'Mango' },
  { value: 'kiwi', storyContent: 'Kiwi' },
  { value: 'cherry', storyContent: 'Cherry', disabled: true },
  { value: 'grapefruit', storyContent: 'Grapefruit', disabled: true },
  { value: 'papaya', storyContent: 'Papaya' },
  { value: 'lychee', storyContent: 'Lychee' },
];

const storyTemplate = () => {
  const id = uniqueId('dropdown-');
  const listId = uniqueId('dropdown-list-');

  return html<StoryArgs<FluentDropdown>>`
    <fluent-field>
      ${when(x => x.label, html`<label slot="label" for="${id}">${x => x.label}</label>`)}
      <fluent-dropdown
        slot="input"
        id="${id}"
        appearance="${x => x.appearance}"
        size="${x => x.size}"
        placeholder="${x => x.placeholder ?? 'Select a fruit'}"
        list="${listId}"
        ?block="${x => x.block}"
        ?multiple="${x => x.multiple}"
        ?disabled="${x => x.disabled}"
      ></fluent-dropdown>
      <fluent-dropdown-list id="${listId}" slot="input">
        ${repeat(storyOptions, optionTemplate)}
      </fluient-dropdown-list>
    </fluent-field>
  `;
};

export default {
  title: 'Components/Dropdown',
  parameters: {
    docs: {
      source: renderComponent(storyTemplate()),
    },
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: Object.values(DropdownAppearance),
      table: { defaultValue: { summary: DropdownAppearance.outline } },
    },
    block: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
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
  },
} as Meta<FluentDropdown>;

// Creates a closure to avoid ID conflicts.
export const Dropdown: Story<FluentDropdown> = (args) => {
  return (renderComponent(html`${render(args, storyTemplate)}`))(args);
};
Dropdown.args = {
  block: false,
  disabled: false,
  multiple: false,
  placeholder: 'Select a fruit',
};

export const SelectionMode: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
    ${render(
      {
        label: 'Single (default)',
      },
      storyTemplate(),
    )}
    ${render(
      {
        label: 'Multiple',
        multiple: true,
      },
      storyTemplate(),
    )}
  </div>
`);

export const Sizes: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
    ${render(
      {
        label: 'Medium (default)',
      },
      storyTemplate(),
    )}
    ${render(
      {
        label: 'Small',
        size: 'small',
      },
      storyTemplate(),
    )}
    ${render(
      {
        label: 'Large',
        large: 'large',
      },
      storyTemplate(),
    )}
  </div>
`);

export const Appearances: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
    ${render(
      {
        label: 'Outlined (default)',
      },
      storyTemplate(),
    )}
    ${render(
      {
        label: 'Transparent',
        appearance: 'transparent',
      },
      storyTemplate(),
    )}
    ${render(
      {
        label: 'Filled darker',
        appearance: 'filled-darker',
      },
      storyTemplate(),
    )}
    ${render(
      {
        label: 'Filled darker',
        appearance: 'filled-lighter',
      },
      storyTemplate(),
    )}
  </div>
`);

export const Layouts: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
    ${render(
      {
        label: 'Inline (default)',
      },
      storyTemplate(),
    )}
    ${render(
      {
        label: 'Block',
        block: true,
      },
      storyTemplate(),
    )}
  </div>
`);
