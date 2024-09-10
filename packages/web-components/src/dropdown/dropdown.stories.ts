import { html, render, repeat, when } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Option as FluentOption } from '../option/option.js';
import { DropdownAppearance, DropdownSize } from './dropdown.options.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';

const optionTemplate = html<StoryArgs<FluentOption>>`
  <fluent-option value="${x => x.value}" ?disabled="${x => x.disabled}" ?selected="${x => x.selected}">
    ${x => x.storyContent}
  </fluent-option>
`;

interface StoryOption {
  value: string;
  storyContent: string;
  selected?: boolean;
  disabled?: boolean;
}

const storyOptions: StoryOption[] = [
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
    ${when(x => x.label, html`<label slot="label" for="${id}">${x => x.label}</label>`)}
    <fluent-dropdown
      slot="${x => x.slot ?? 'input'}"
      id="${id}"
      appearance="${x => x.appearance}"
      size="${x => x.size}"
      placeholder="${x => x.placeholder ?? 'Select a fruit'}"
      list="${listId}"
      name="fruit"
      ?block="${x => x.block}"
      ?multiple="${x => x.multiple}"
      ?disabled="${x => x.disabled}"
      ?display-shadow="${x => x.displayShadow}"
      ?required="${x => x.required}"
    ></fluent-dropdown>
    <fluent-dropdown-list slot="${x => x.slot ?? 'input'}" id="${listId}">
      ${repeat(x => x.storyOptions ?? storyOptions, optionTemplate)}
    </fluient-dropdown-list>
  `;
};

const storyFieldTemplate = () => html` <fluent-field style="width: 100%"> ${storyTemplate()} </fluent-field> `;

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
    displayShadow: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: Object.values(DropdownSize),
      table: { defaultValue: { summary: DropdownSize.medium } },
    },
    storyOptions: {
      table: { disable: true },
    },
    slot: {
      table: { disable: true },
    },
  },
} as Meta<FluentDropdown>;

// Creates a closure to avoid ID conflicts.
export const Dropdown: Story<FluentDropdown> = args => {
  return renderComponent(html`${render(args, storyTemplate)}`)(args);
};
Dropdown.args = {
  block: false,
  disabled: false,
  displayShadow: false,
  multiple: false,
  required: false,
  placeholder: 'Select a fruit',
  slot: '',
};

export const SelectionMode: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
    ${render({ label: 'Single (default)' }, storyFieldTemplate())}
    ${render({ label: 'Multiple', multiple: true }, storyFieldTemplate())}
  </div>
`);

export const Sizes: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
    ${render({ label: 'Medium (default)' }, storyFieldTemplate())}
    ${render({ label: 'Small', size: 'small' }, storyFieldTemplate())}
    ${render({ label: 'Large', large: 'large' }, storyFieldTemplate())}
  </div>
`);

export const Appearances: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
    ${render({ label: 'Outlined (default)' }, storyFieldTemplate())}
    ${render({ label: 'Transparent', appearance: 'transparent' }, storyFieldTemplate())}
    ${render({ label: 'Filled darker', appearance: 'filled-darker' }, storyFieldTemplate())}
    ${render(
      { label: 'Filled darker with shadow', appearance: 'filled-darker', displayShadow: true },
      storyFieldTemplate(),
    )}
    ${render({ label: 'Filled lighter', appearance: 'filled-lighter' }, storyFieldTemplate())}
    ${render(
      { label: 'Filled lighter with shadow', appearance: 'filled-lighter', displayShadow: true },
      storyFieldTemplate(),
    )}
  </div>
`);

export const Layouts: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
    ${render({ label: 'Inline (default)' }, storyFieldTemplate())}
    ${render({ label: 'Block', block: true }, storyFieldTemplate())}
  </div>
`);

export const Required: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <form>
    ${render({ label: 'Required', required: true }, storyFieldTemplate())}
    <button>Submit</button>
  </form>
`);

export const WithInitiallySelectedOptions: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
    ${render(
      {
        label: 'Fruit',
        storyOptions: structuredClone(storyOptions).map((option, index) => {
          if (index === 8) {
            option.selected = true;
          }
          return option;
        }),
      },
      storyFieldTemplate(),
    )}
    ${render(
      {
        label: 'Fruits',
        storyOptions: structuredClone(storyOptions).map((option, index) => {
          if ([1, 8].includes(index)) {
            option.selected = true;
          }
          return option;
        }),
        multiple: true,
      },
      storyFieldTemplate(),
    )}
  </div>
`);
