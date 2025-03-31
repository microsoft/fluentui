import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { colorNeutralBackground1, colorNeutralBackground3 } from '../theme/design-tokens.js';
import type { TextArea as FluentTextArea } from './textarea.js';
import { TextAreaAppearance, TextAreaResize, TextAreaSize } from './textarea.options.js';

type Story = StoryObj<FluentTextArea>;

const storyTemplate = html<StoryArgs<FluentTextArea>>`
  <fluent-textarea
    appearance="${x => x.appearance}"
    autocomplete="${x => x.autocomplete}"
    ?autofocus="${x => x.autofocus}"
    ?auto-resize="${x => x.autoResize}"
    ?block="${x => x.block}"
    dirname="${x => x.dirName}"
    ?disabled="${x => x.disabled}"
    ?display-shadow="${x => x.displayShadow}"
    form="${x => x.form}"
    maxlength="${x => x.maxLength}"
    minlength="${x => x.minLength}"
    name="${x => x.name}"
    placeholder="${x => x.placeholder}"
    ?readonly="${x => x.readOnly}"
    ?required="${x => x.required}"
    size="${x => x.size}"
    ?spellcheck="${x => x.spellcheck}"
    resize="${x => x.resize}"
    value="${x => x.value}"
  >
    ${story => story.labelSlottedContent?.()} ${story => story.slottedContent?.()}
  </fluent-textarea>
`;

export default {
  title: 'Components/TextArea',
  render: renderComponent(storyTemplate),
  argTypes: {
    appearance: {
      description: 'Indicates the styled appearance of the input.',
      control: 'select',
      options: ['', ...Object.values(TextAreaAppearance)],
      mapping: { '': null, ...TextAreaAppearance },
      table: {
        category: 'attributes',
        type: {
          summary: Object.values(TextAreaAppearance).join('|'),
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
    autoResize: {
      control: 'boolean',
      table: { category: 'attributes' },
      description: 'Whether the element’s height should be automatically changed based on the content.',
      type: 'boolean',
    },
    block: {
      control: 'boolean',
      table: { category: 'attributes' },
      description: 'Whether the element should be a block-level element.',
      type: 'boolean',
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
    displayShadow: {
      description: 'Whether the element displays a visual box shadow',
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
    name: {
      control: 'text',
      table: { category: 'attributes' },
      description: 'Sets the name of the input',
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
    resize: {
      description: 'Whether and how a user can resize the element.',
      control: 'select',
      options: ['', ...Object.values(TextAreaResize)],
      mapping: { '': null, ...TextAreaResize },
      table: {
        category: 'attributes',
        type: {
          summary: Object.values(TextAreaResize).join('|'),
        },
      },
    },
    size: {
      description: 'Sets the size of the control.',
      control: 'select',
      options: ['', ...Object.values(TextAreaSize)],
      mapping: { '': null, ...TextAreaSize },
      table: {
        category: 'attributes',
        type: {
          summary: Object.values(TextAreaSize).join('|'),
        },
      },
    },
    spellcheck: {
      control: 'boolean',
      table: {
        category: 'attributes',
        defaultValue: { summary: 'false' },
      },
      description: 'Controls whether to enable spell checking for the content.',
      type: 'boolean',
    },
    slottedContent: {
      name: '',
      description: 'The default slot. Content in this slot is used as the `<label>` for the input.',
      table: { category: 'slots', type: {} },
    },
    labelSlottedContent: {
      name: '',
      description: 'The label slot. Content in this slot is used as the `<label>` for the input.',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentTextArea>;

export const Default: Story = {};

export const TextArea: Story = {
  args: {
    labelSlottedContent: () =>
      html`<fluent-label slot="label" ?required="${x => x.required}">Sample textarea</fluent-label>`,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'This is a placeholder',
  },
};

export const Appearance: Story = {
  render: renderComponent(html<StoryArgs<FluentTextArea>>`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: start;">
      <div style="padding: 1rem;">
        <fluent-textarea>
          <fluent-label slot="label">Outlined (default)</fluent-label>
        </fluent-textarea>
      </div>
      <div style="padding: 1rem; background-color: ${colorNeutralBackground1};">
        <fluent-textarea appearance="filled-darker">
          <fluent-label slot="label">Filled darker</fluent-label>
        </fluent-textarea>
      </div>
      <div style="padding: 1rem; background-color: ${colorNeutralBackground1};">
        <fluent-textarea appearance="filled-darker" display-shadow>
          <fluent-label slot="label">Filled darker with shadow</fluent-label>
        </fluent-textarea>
      </div>
      <div style="padding: 1rem; background-color: ${colorNeutralBackground3};">
        <fluent-textarea appearance="filled-lighter">
          <fluent-label slot="label">Filled lighter</fluent-label>
        </fluent-textarea>
      </div>
      <div style="padding: 1rem; background-color: ${colorNeutralBackground3};">
        <fluent-textarea appearance="filled-lighter" display-shadow>
          <fluent-label slot="label">Filled lighter with shadow</fluent-label>
        </fluent-textarea>
      </div>
    </div>
  `),
};

export const Block: Story = {
  render: renderComponent(html<StoryArgs<FluentTextArea>>`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <fluent-textarea>
          <fluent-label slot="label">Inline (default)</fluent-label>
        </fluent-textarea>
      </div>
      <div>
        <fluent-textarea block>
          <fluent-label slot="label">Block</fluent-label>
        </fluent-textarea>
      </div>
    </div>
  `),
};

export const Size: Story = {
  render: renderComponent(html<StoryArgs<FluentTextArea>>`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <fluent-textarea>
          <fluent-label slot="label">Medium (default)</fluent-label>
        </fluent-textarea>
      </div>
      <div>
        <fluent-textarea size="small">
          <fluent-label slot="label">Small</fluent-label>
        </fluent-textarea>
      </div>
      <div>
        <fluent-textarea size="large">
          <fluent-label slot="label">Large</fluent-label>
        </fluent-textarea>
      </div>
    </div>
  `),
};

export const AutoResize: Story = {
  args: {
    autoResize: true,
  },
};

export const Resize: Story = {
  render: renderComponent(html<StoryArgs<FluentTextArea>>`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <fluent-textarea resize="none">
          <fluent-label slot="label">None (default)</fluent-label>
        </fluent-textarea>
      </div>
      <div>
        <fluent-textarea resize="horizontal">
          <fluent-label slot="label">Horizontal</fluent-label>
        </fluent-textarea>
      </div>
      <div>
        <fluent-textarea resize="vertical">
          <fluent-label slot="label">Vertical</fluent-label>
        </fluent-textarea>
      </div>
      <div>
        <fluent-textarea resize="both">
          <fluent-label slot="label">Both</fluent-label>
        </fluent-textarea>
      </div>
    </div>
  `),
};

export const RTL: Story = {
  render: renderComponent(html<StoryArgs<FluentTextArea>>`
    <div style="display: flex; flex-direction: column; gap: 1rem;" dir="rtl">
      <div>
        <fluent-textarea resize="none">
          <fluent-label slot="label">None (default)</fluent-label>
        </fluent-textarea>
      </div>
      <div>
        <fluent-textarea resize="horizontal">
          <fluent-label slot="label">Horizontal</fluent-label>
        </fluent-textarea>
      </div>
      <div>
        <fluent-textarea resize="vertical">
          <fluent-label slot="label">Vertical</fluent-label>
        </fluent-textarea>
      </div>
      <div>
        <fluent-textarea resize="both">
          <fluent-label slot="label">Both</fluent-label>
        </fluent-textarea>
      </div>
    </div>
  `),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    resize: TextAreaResize.both,
    slottedContent: () => 'This textarea is disabled',
  },
};

export const Required: Story = {
  render: renderComponent(html<StoryArgs<FluentTextArea>>`
    <form id="required-form" action="#">
      <fluent-textarea slot="input" name="required-input" required>
        <fluent-label slot="label">Required Input</fluent-label>
      </fluent-textarea>
      <div><button type="submit">Submit</button></div>
    </form>
  `),
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    resize: TextAreaResize.both,
    slottedContent: () => 'Some content',
  },
};

export const WithHTMLCode: Story = {
  render: renderComponent(html<StoryArgs<FluentTextArea>>`
    <fluent-textarea auto-resize resize="both" size="large">
      <p>This text should show up as plain text.</p>
      <img src="logo.svg" alt="" />
      <script>
        alert(1);
      </script>
      <fluent-text>hello</fluent-text>
    </fluent-textarea>
  `),
};
