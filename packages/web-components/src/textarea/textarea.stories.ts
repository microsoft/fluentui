import { html } from '@microsoft/fast-element';
import type { Meta, Story, StoryArgs } from '../helpers.stories.js';
import { renderComponent } from '../helpers.stories.js';
import { colorNeutralBackgroundInverted, colorNeutralForegroundInverted2 } from '../theme/design-tokens.js';
import { TextArea as FluentTextArea } from './textarea.js';
import { TextAreaAppearance, TextAreaResize } from './textarea.options.js';

const storyTemplate = html<StoryArgs<FluentTextArea>>`
  <fluent-textarea
    appearance="${x => x.appearance}"
    autocomplete="${x => x.autocomplete}"
    ?autofocus="${x => x.autofocus}"
    ?auto-resize="${x => x.autoResize}"
    ?block="${x => x.block}"
    dirname="${x => x.dirname}"
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
    spellcheck="${x => x.spellcheck}"
    resize="${x => x.resize}"
    value="${x => x.value}"
  ></fluent-textarea>
`;

export default {
  title: 'Components/TextArea',
  argTypes: {
    appearance: {
      description: 'Sets the visual appearance of the control',
      table: {
        defaultValue: { summary: `${TextAreaAppearance.outline}` },
      },
      control: 'select',
      options: Object.values(TextAreaAppearance),
    },
    autocomplete: {
      description: "Indicates the element's autocomplete state.",
      control: 'text',
    },
    autofocus: {
      description: 'Indicates that this element should get focus after the page finishes loading.',
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
    resize: {
      description: 'Whether a user can resize the element.',
      control: 'select',
      options: Object.values(TextAreaResize),
    },
  },
} as Meta<FluentTextArea>;

export const TextArea: Story<FluentTextArea> = renderComponent(storyTemplate).bind({});
TextArea.args = {
  resize: 'both',
};

export const Placeholder: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
  <fluent-textarea placeholder="This is a placeholder"> </fluent-textarea>
`);

export const Appearance: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
  <div style="display: flex; flex-direction: column; gap: 30px; width: 400px;">
    <div style="padding: 10px;">
      <fluent-textarea> </fluent-textarea>
    </div>
    <div style="padding: 10px;">
      <fluent-textarea appearance="underline"> </fluent-textarea>
    </div>
    <fluent-field style="padding: 10px; background: ${colorNeutralBackgroundInverted}">
      <label slot="label" style="color: ${colorNeutralForegroundInverted2}">Filled Lighter Input</label>
      <fluent-textarea slot="input" appearance="filled-lighter"> </fluent-textarea>
    </fluent-field>
    <fluent-field style="padding: 10px; background: ${colorNeutralBackgroundInverted}">
      <label slot="label" style="color: ${colorNeutralForegroundInverted2}">Filled Darker Input</label>
      <fluent-textarea slot="input" appearance="filled-darker"></fluent-textarea>
    </fluent-field>
  </div>
`);

export const Size: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
  <div style="display: flex; flex-direction: column; gap: 30px;">
    <fluent-textarea size="small"> </fluent-textarea>
    <fluent-textarea></fluent-textarea>
    <fluent-field size="large">
      <label slot="label">Large Input</label>
      <fluent-textarea slot="input" size="large"></fluent-textarea>
    </fluent-field>
  </div>
`);

export const Disabled: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
  <fluent-textarea disabled> </fluent-textarea>
`);

export const Required: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
  <form id="required-form" action="#">
    <fluent-field>
      <label slot="label">Required Input</label>
      <fluent-textarea slot="input" name="required-input" required></fluent-textarea>
    </fluent-field>
    <button type="submit">Submit</button>
  </form>
`);

export const ReadOnly: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
  <form id="readonly-form" action="#">
    <fluent-textarea readonly> </fluent-textarea>
    <button type="submit">Submit</button>
  </form>
`);

export const WithoutLabel: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
  <fluent-textarea> </fluent-textarea>
`);

export const WithHTMLCode: Story<FluentTextArea> = renderComponent(html<StoryArgs<FluentTextArea>>`
  <fluent-textarea>
    <p>This text should show up as plain text.</p>
    <img src="logo.svg" alt="" />
    <script>
      alert(1);
    </script>
    <fluent-text>hello</fluent-text>
  </fluent-textarea>
`);
