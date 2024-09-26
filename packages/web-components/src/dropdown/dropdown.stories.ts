import { css, html, render, repeat, when } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import type { Divider as FluentDivider } from '../divider/divider.js';
import type { Option as FluentOption } from '../option/option.js';
import { typographyCaption1Styles } from '../styles/index.js';
import { colorNeutralForeground2, colorNeutralForeground3, fontFamilyBase, fontSizeBase200, fontWeightRegular, lineHeightBase200 } from '../theme/design-tokens.js';
import { DropdownAppearance, DropdownSize } from './dropdown.options.js';
import type { Dropdown as FluentDropdown } from './dropdown.js';

const optionTemplate = html<StoryArgs<FluentOption>>`
  <fluent-option
    value="${x => x.value}"
    label="${x => x.label}"
    ?disabled="${x => x.disabled}"
    ?selected="${x => x.selected}"
  >
    ${x => x.storyContent ?? x.label}
    ${when(x => x.description, html`<div class="description">${x => x.description}</div>`)}
  </fluent-option>
`;

const dividerTemplate = html<StoryArgs<FluentDivider>>`
  <fluent-divider></fluent-divider>
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
      dir="${x => x.rtl ? 'rtl' : null}"
      ?block="${x => x.block}"
      ?multiple="${x => x.multiple}"
      ?disabled="${x => x.disabled}"
      ?display-shadow="${x => x.displayShadow}"
      ?required="${x => x.required}"
    ></fluent-dropdown>
    <fluent-dropdown-list
      slot="${x => x.slot ?? 'input'}"
      id="${listId}"
      dir="${x => x.rtl ? 'rtl' : null}"
    >
      ${repeat(
        x => x.storyOptions ?? storyOptions,
        html`${x => x.divider ? dividerTemplate : optionTemplate}`
      )}
    </fluient-dropdown-list>
  `;
};

const storyFieldTemplate = () => html` <fluent-field style="width: 100%"> ${storyTemplate()} </fluent-field> `;

export default {
  title: 'Components/Dropdown',
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
    rtl: {
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
  rtl: false,
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
    <div>Some text inline with ${render({ label: 'dropdown label', slot: '' }, storyTemplate())} and more text.</div>
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

const storyOptionsWithDividers = structuredClone(storyOptions).flatMap((option, index) => {
  if ([1, 5].includes(index)) {
    return [{ divider: true }, option];
  }
  return option;
});
export const WithDividers: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
    ${render(
      {
        label: 'Fruit',
        storyOptions: storyOptionsWithDividers,
      },
      storyFieldTemplate(),
    )}
    ${render(
      {
        label: 'Fruits',
        storyOptions: storyOptionsWithDividers,
        multiple: true,
      },
      storyFieldTemplate(),
    )}
  </div>
`);

const storyOptionsWithDescriptions = [
  {
    value: 'apple',
    label: 'Apple',
    description: 'An edible fruit produced by an apple tree. Apple trees are the most widely grown species in the genus Malus.',
  },
  {
    value: 'banana',
    label: 'Banana',
    description: 'An elongated, edible fruit produced by several kinds of large herbaceous plants.',
    disabled: true,
  },
  {
    value: 'orange',
    label: 'Orange',
    description: 'The orange is the fruit of various citrus species in the family Rutaceae.',
  },
];
export const WithOptionDescription: Story<FluentDropdown> = renderComponent(html<StoryArgs<FluentDropdown>>`
  <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
    <style>
      @scope {
        fluent-dropdown-list {
          min-inline-size: 324px;
        }

        .description {
          font-family: ${fontFamilyBase};
          font-size: ${fontSizeBase200};
          line-height: ${lineHeightBase200};
          font-weight: ${fontWeightRegular};
        }

        .description:not(:disabled *) {
          color: ${colorNeutralForeground3};
        }
      }
    </style>
    ${render(
      {
        label: 'Fruit',
        storyOptions: storyOptionsWithDescriptions,
      },
      storyFieldTemplate(),
    )}
    ${render(
      {
        label: 'Fruits',
        storyOptions: storyOptionsWithDescriptions,
        multiple: true,
      },
      storyFieldTemplate(),
    )}
  </div>
`);
