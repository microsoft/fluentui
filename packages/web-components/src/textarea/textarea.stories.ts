import { html, when } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import { colorNeutralBackground1, colorNeutralBackground3 } from '../theme/design-tokens.js';
import { TextArea as FluentTextArea } from './textarea.js';
import { TextAreaAppearance, TextAreaResize, TextAreaSize } from './textarea.options.js';

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
    ${when(
      x => x.label,
      html`<fluent-label slot="label" ?required="${x => x.required}">${x => x.label}</fluent-label>`,
    )}
    ${x => x.storyContent ?? ''}
  </fluent-textarea>
`;

export default {
  title: 'Components/TextArea',
  argTypes: {
    label: {
      description: 'Label of the control',
      control: 'text',
    },
    storyContent: {
      description: 'Content inside the component',
      control: 'text',
    },
    appearance: {
      description: 'Sets the visual appearance of the control',
      table: {
        defaultValue: { summary: `${TextAreaAppearance.outline}` },
      },
      control: 'select',
      options: Object.values(TextAreaAppearance),
    },
    autocomplete: {
      description: "The element's autocomplete state.",
      control: 'text',
    },
    autofocus: {
      description: 'Whether this element should get focus after the page finishes loading.',
      control: 'boolean',
    },
    autoResize: {
      description: 'Whether the element’s height should be automatically changed based on the content.',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    block: {
      description: 'Whether the element should be a block-level element.',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    dirname: {
      description: 'Sets the directionality of the element to be submitted with form data.',
      control: 'text',
    },
    disabled: {
      description: 'Sets the disabled state',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    displayShadow: {
      description: 'Whether the element displays a visual box shadow',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    form: {
      description: 'The id of a form to associate the element to.',
      control: 'text',
    },
    maxLength: {
      description: 'Sets the maximum number of characters allowed in the input',
      control: 'number',
    },
    minLength: {
      description: 'Sets the minimum number of characters allowed in the input',
      control: 'number',
    },
    name: {
      description: 'Sets the name of the input',
      control: 'text',
    },
    placeholder: {
      description: 'Sets the placeholder text',
      control: 'text',
    },
    readOnly: {
      description: 'Sets the readonly state',
      control: 'boolean',
    },
    required: {
      description: 'Sets the required state',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    resize: {
      description: 'Whether and how a user can resize the element.',
      control: 'select',
      options: Object.values(TextAreaResize),
    },
    size: {
      description: 'Sets the size of the control',
      control: 'select',
      options: Object.values(TextAreaSize),
    },
    spellcheck: {
      description: 'Controls whether to enable spell checking for the content.',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
  },
} as Meta<FluentTextArea>;

export const TextArea: Story<FluentTextArea> = renderComponent(storyTemplate).bind({});
TextArea.args = {
  label: 'Sample textarea',
};

export const Placeholder: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>` ${storyTemplate} `);
Placeholder.args = {
  placeholder: 'This is a placeholder',
};

export const Appearance: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
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
`);

export const Block: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
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
`);

export const Size: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
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
`);

export const AutoResize: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
  <fluent-textarea auto-resize></fluent-textarea>
`);

export const Resize: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
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
`);

export const RTL: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
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
`);

export const Disabled: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>` ${storyTemplate} `);
Disabled.args = {
  disabled: true,
  resize: TextAreaResize.both,
  storyContent: 'This textarea is disabled',
};

export const Required: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
  <form id="required-form" action="#">
    <fluent-textarea slot="input" name="required-input" required>
      <fluent-label slot="label">Required Input</fluent-label>
    </fluent-textarea>
    <div><button type="submit">Submit</button></div>
  </form>
`);

export const ReadOnly: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>` ${storyTemplate} `);
ReadOnly.args = {
  readOnly: true,
  resize: TextAreaResize.both,
  storyContent: 'Some content',
};

export const WithHTMLCode: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
  <fluent-textarea auto-resize resize="both" size="large">
    <p>This text should show up as plain text.</p>
    <img src="logo.svg" alt="" />
    <script>
      alert(1);
    </script>
    <fluent-text>hello</fluent-text>
  </fluent-textarea>
`);
