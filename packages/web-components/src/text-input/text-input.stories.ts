import { html, ref } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { colorNeutralBackgroundInverted, colorNeutralForegroundInverted2 } from '../theme/design-tokens.js';
import { getStorybookHelpers } from '../../.storybook/wc-toolkit-helpers.js';
import type { TextInput as FluentTextInput } from './text-input.js';
import { TextInputAppearance, TextInputControlSize, TextInputType } from './text-input.options.js';

type Story = StoryObj<FluentTextInput>;
const { argTypes } = getStorybookHelpers<FluentTextInput>('fluent-text-input');

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
    ?autofocus="${story => story.autofocus}"
    appearance="${story => story.appearance}"
    autocomplete="${story => story.autocomplete}"
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
  argTypes,
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

export const InDialog: Story = {
  args: {
    slottedContent: () => 'Input in dialog',
    autofocus: true,
  },
  render: renderComponent(html<StoryArgs<FluentTextInput>>`
    <fluent-button @click="${story => story.dialog.show()}">Open dialog</fluent-button>
    <fluent-dialog ${ref('dialog')}>
      <fluent-dialog-body> ${storyTemplate} </fluent-dialog-body>
    </fluent-dialog>
  `),
};
