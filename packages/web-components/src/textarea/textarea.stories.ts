import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { colorNeutralBackground1, colorNeutralBackground3 } from '../theme/design-tokens.js';
import { getStorybookHelpers } from '../../.storybook/wc-toolkit-helpers.js';
import type { TextArea as FluentTextArea } from './textarea.js';
import { TextAreaAppearance, TextAreaResize, TextAreaSize } from './textarea.options.js';

type Story = StoryObj<FluentTextArea>;
const { argTypes } = getStorybookHelpers<FluentTextArea>('fluent-text-area');

const storyTemplate = html<StoryArgs<FluentTextArea>>`
  <fluent-textarea
    appearance="${x => x.appearance}"
    autocomplete="${x => x.autocomplete}"
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
  argTypes,
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
