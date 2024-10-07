import { html, ref } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { colorNeutralBackgroundInverted, colorNeutralForegroundInverted2 } from '../theme/design-tokens.js';
import type { TextInput as FluentTextInput } from './text-input.js';
import { TextInputAppearance, TextInputControlSize, TextInputType } from './text-input.options.js';

type Story = StoryObj<FluentTextInput>;

const Person20Regular = html.partial(/* html */ `
    <svg
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="currentColor"
            d="M10 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM7 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-2 5a2 2 0 0 0-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0 0 10 18c1.85 0 3.58-.39 4.87-1.2A4.35 4.35 0 0 0 17 13a2 2 0 0 0-2-2H5Zm-1 2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1c0 1.3-.62 2.28-1.67 2.95A8.16 8.16 0 0 1 10 17a8.16 8.16 0 0 1-4.33-1.05A3.36 3.36 0 0 1 4 13Z"
        />
    </svg>
`);

const storyTemplate = html<StoryArgs<FluentTextInput>>`
  <fluent-text-input
    appearance="${story => story.appearance}"
    autocomplete="${story => story.autocomplete}"
    ?autofocus="${story => story.autofocus}"
    control-size="${story => story.controlSize}"
    dirname="${story => story.dirname}"
    ?disabled="${story => story.disabled}"
    form="${story => story.form}"
    id="${story => story.id}"
    list="${story => story.list}"
    maxlength="${story => story.maxlength}"
    minlength="${story => story.minlength}"
    ?multiple="${story => story.multiple}"
    name="${story => story.name}"
    pattern="${story => story.pattern}"
    placeholder="${story => story.placeholder}"
    ?readonly="${story => story.readOnly}"
    ?required="${story => story.required}"
    size="${story => story.size}"
    spellcheck="${story => story.spellcheck}"
    type="${story => story.type}"
    value="${story => story.value}"
  >
    ${story => story.startSlottedContent?.()} ${story => story.slottedContent?.()}
    ${story => story.endSlottedContent?.()}
  </fluent-text-input>
`;

export default {
  title: 'Components/TextInput',
  render: renderComponent(storyTemplate),
  argTypes: {
    appearance: {
      description: 'Indicates the styled appearance of the input.',
      control: 'select',
      options: ['', ...Object.values(TextInputAppearance)],
      mapping: { '': null, ...TextInputAppearance },
      table: {
        category: 'attributes',
        type: {
          summary: Object.values(TextInputAppearance).join('|'),
        },
      },
    },
    autocomplete: {
      control: 'text',
      table: { category: 'attributes' },
      description: "Indicates the element's autocomplete state.",
      type: 'string',
    },
    autofocus: {
      control: 'boolean',
      table: { category: 'attributes' },
      description: 'Indicates that this element should get focus after the page finishes loading.',
      type: 'boolean',
    },
    controlSize: {
      description: 'Indicates the size of the input.',
      control: 'select',
      options: ['', ...Object.values(TextInputControlSize)],
      mapping: { '': null, ...TextInputControlSize },
      table: {
        category: 'attributes',
        type: {
          summary: Object.values(TextInputControlSize).join('|'),
        },
      },
    },
    dirname: {
      control: 'text',
      table: { category: 'attributes' },
      description: 'Sets the directionality of the element to be submitted with form data.',
      type: 'string',
    },
    disabled: {
      description: 'Sets the disabled state',
      table: {
        category: 'attributes',
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
      type: 'boolean',
    },
    form: {
      control: 'text',
      table: { category: 'attributes' },
      description: 'The id of a form to associate the element to.',
      type: 'string',
    },
    list: {
      control: 'text',
      table: { category: 'attributes' },
      description: 'The id of a datalist element that provides a list of suggested values.',
      type: 'string',
    },
    maxlength: {
      control: 'number',
      table: { category: 'attributes' },
      description: 'Sets the maximum number of characters allowed in the input',
      type: 'number',
    },
    minlength: {
      control: 'number',
      table: { category: 'attributes' },
      description: 'Sets the minimum number of characters allowed in the input',
      type: 'number',
    },
    multiple: {
      control: 'boolean',
      table: { category: 'attributes' },
      description: 'Indicates whether the user can enter multiple values.',
      type: 'boolean',
    },
    name: {
      control: 'text',
      table: { category: 'attributes' },
      description: 'Sets the name of the input',
      type: 'string',
    },
    pattern: {
      control: 'text',
      table: { category: 'attributes' },
      description: 'Sets the regular expression pattern that the input’s value is checked against.',
      type: 'string',
    },
    placeholder: {
      control: 'text',
      table: { category: 'attributes' },
      description: 'Sets the placeholder text',
      type: 'string',
    },
    readOnly: {
      control: 'boolean',
      table: { category: 'attributes' },
      description: 'Sets the readonly state',
      type: 'boolean',
    },
    required: {
      control: 'boolean',
      table: {
        category: 'attributes',
        defaultValue: { summary: 'false' },
      },
      description: 'Sets the required state',
      type: 'boolean',
    },
    type: {
      description: 'Sets the input type',
      control: 'select',
      options: ['', ...Object.values(TextInputType)],
      mapping: { '': null, ...TextInputType },
      table: {
        category: 'attributes',
        defaultValue: { summary: `${TextInputType.text}` },
        type: {
          summary: Object.values(TextInputType).join('|'),
        },
      },
    },
    value: {
      control: 'text',
      table: { category: 'attributes' },
      description: 'The initial value of the input.',
      type: 'string',
    },
    slottedContent: {
      name: '',
      description: 'The default slot. Content in this slot is used as the `<label>` for the input.',
      table: { category: 'slots', type: {} },
    },
    startSlottedContent: {
      name: 'start',
      description: 'Content in this slot is placed at the start of the input.',
      table: { category: 'slots', type: {} },
    },
    endSlottedContent: {
      name: 'end',
      description: 'Content in this slot is placed at the end of the input.',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentTextInput>;

export const Default: Story = {
  args: {
    slottedContent: () => 'Input Label',
  },
};

export const WithoutLabel: Story = {};

export const Disabled: Story = {
  args: {
    slottedContent: () => 'Disabled Input',
    disabled: true,
  },
};

export const Placeholder: Story = {
  args: {
    slottedContent: () => 'Input with a placeholder',
    placeholder: 'Placeholder text',
  },
};

export const ReadOnly: Story = {
  args: {
    slottedContent: () => 'Read-only input',
    readOnly: true,
    value: 'Read-only value',
  },
};

export const Required: Story = {
  render: renderComponent(html<StoryArgs<FluentTextInput>>`
    <form
      id="required-form"
      action="#"
      @reset="${story => story.successMessage.toggleAttribute('hidden', true)}"
      @submit="${story => story.successMessage.toggleAttribute('hidden', false)}"
    >
      ${storyTemplate}
      <fluent-button type="submit" appearance="primary">Submit</fluent-button>
      <fluent-button type="reset">Reset</fluent-button>
      <span id="success-message" hidden ${ref('successMessage')}> Form submitted successfully! </span>
    </form>
  `),
  args: {
    id: 'required-input',
    required: true,
    slottedContent: () => 'Required Input',
    endSlottedContent: () => html` <span slot="end">${Person20Regular}</span> `,
  },
};

export const StartSlot: Story = {
  args: {
    slottedContent: () => 'Input with a start slot',
    startSlottedContent: () => html` <span slot="start">${Person20Regular}</span> `,
  },
};

export const EndSlot: Story = {
  args: {
    slottedContent: () => 'Input with an end slot',
    endSlottedContent: () => html` <span slot="end">${Person20Regular}</span> `,
  },
};

export const StartAndEndSlot: Story = {
  args: {
    slottedContent: () => 'Input with Start and End Slots',
    endSlottedContent: () => html` <span slot="end">.00</span> `,
    startSlottedContent: () => html` <span slot="start">$</span> `,
  },
};

export const slottedButtons: Story = {
  args: {
    slottedContent: () => 'Input with slotted end buttons',
    endSlottedContent: () => html` <button slot="end">Button</button> `,
    startSlottedContent: () => html` <button slot="start">Button</button> `,
  },
};

export const Inline: Story = {
  render: renderComponent(html<StoryArgs<FluentTextInput>>`
    <p>
      The quick brown
      <fluent-text-input style="display: inline-flex" placeholder="noun"></fluent-text-input>
      jumped over the
      <fluent-text-input style="display: inline-flex" placeholder="adjective"></fluent-text-input>
      dog.
    </p>
  `),
};
