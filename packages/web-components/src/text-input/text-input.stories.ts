import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { TextInput as FluentTextInput } from './text-input.js';
import { TextInputAppearance, TextInputSize } from './text-input.options.js';
import { TextInputType } from './index.js';
import './define.js';
import { fontFamilyBase, fontSizeBase300, lineHeightBase300 } from '../theme/design-tokens.js';

type TextInputStoryArgs = Args & FluentTextInput;
type TextInputStoryMeta = Meta<TextInputStoryArgs>;

const Person20Regular = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="1em"
  height="1em"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM7 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-2 5a2 2 0 0 0-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0 0 10 18c1.85 0 3.58-.39 4.87-1.2A4.35 4.35 0 0 0 17 13a2 2 0 0 0-2-2H5Zm-1 2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1c0 1.3-.62 2.28-1.67 2.95A8.16 8.16 0 0 1 10 17a8.16 8.16 0 0 1-4.33-1.05A3.36 3.36 0 0 1 4 13Z"
    fill="currentColor"
  ></path>
</svg>`;

const storyTemplate = html<TextInputStoryArgs>`
  <div style="display: flex; flex-direction: column; width: 300px;">
    <fluent-text-input
      type=${x => x.type}
      ?disabled=${x => x.disabled}
      ?block=${x => x.block}
      input-size="${x => x.inputSize}"
      appearance="${x => x.appearance}"
      placeholder="${x => x.placeholder}"
    >
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}</span>
      Sample Input
    </fluent-text-input>
  </div>
`;

export default {
  title: 'Components/TextInput',
  argTypes: {
    type: {
      options: Object.values(TextInputType),
      control: {
        type: 'select',
      },
    },
    inputSize: {
      options: Object.values(TextInputSize),
      control: {
        type: 'select',
      },
    },
    appearance: {
      options: Object.values(TextInputAppearance),
      control: {
        type: 'select',
      },
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} as TextInputStoryMeta;

export const TextInput = renderComponent(storyTemplate).bind({});

export const ContentStartAfter = renderComponent(html<TextInputStoryArgs>`
  <div style="display: flex; flex-direction: column; gap: 30px; width: 300px;">
    <fluent-text-input>
      <span slot="start">${Person20Regular}</span>
      Content Start
    </fluent-text-input>
    <fluent-text-input>
      <span slot="end">${Person20Regular}</span>
      Content After
    </fluent-text-input>
    <fluent-text-input>
      <fluent-text slot="start" size="400"><span>$</span></fluent-text>
      <fluent-text slot="end" size="400"><span>.00</span></fluent-text>
      Content Before + After
    </fluent-text-input>
  </div>
`);

export const Placeholder = renderComponent(html<TextInputStoryArgs>`
  <div style="width: 300px;">
    <fluent-text-input placeholder="This is a placeholder">
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}${Person20Regular}</span>
      Disabled Input
    </fluent-text-input>
  </div>
`);

export const Appearance = renderComponent(html<TextInputStoryArgs>`
  <div style="display: flex; flex-direction: column; gap: 30px; width: 300px;">
    <fluent-text-input>
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}${Person20Regular}</span>
      Outlined Input
    </fluent-text-input>

    <fluent-text-input appearance="underline">
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}${Person20Regular}</span>
      Underlined Input
    </fluent-text-input>

    <fluent-text-input appearance="filled-lighter">
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}${Person20Regular}</span>
      Filled Lighter Input
    </fluent-text-input>

    <fluent-text-input appearance="filled-lighter--shadow">
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}${Person20Regular}</span>
      Filled Lighter with Shadow Input
    </fluent-text-input>

    <fluent-text-input appearance="filled-darker">
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}${Person20Regular}</span>
      Filled Darker Input
    </fluent-text-input>

    <fluent-text-input appearance="filled-darker--shadow">
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}${Person20Regular}</span>
      Filled Darker with Shadow Input
    </fluent-text-input>
  </div>
`);

export const Size = renderComponent(html<TextInputStoryArgs>`
  <div style="display: flex; flex-direction: column; gap: 30px; width: 300px;">
    <fluent-text-input input-size="small">
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}</span>
      Small Input
    </fluent-text-input>

    <fluent-text-input>
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}</span>
      Medium Input
    </fluent-text-input>

    <fluent-text-input input-size="large">
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}</span>
      Large Input
    </fluent-text-input>
  </div>
`);

export const Inline = renderComponent(html<TextInputStoryArgs>`
  <fluent-text-input style="display: inline-flex; align-items: center;">
    <span slot="start">${Person20Regular}</span>
    <span slot="end">${Person20Regular}${Person20Regular}</span>
    Inline Input
  </fluent-text-input>
  <p style="font-family: ${fontFamilyBase}; font-size: ${fontSizeBase300}; line-height: ${lineHeightBase300}">
    This input is
    <fluent-text-input style="display: inline-flex; align-items: center;" placeholder="Inline">
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}${Person20Regular}</span>
    </fluent-text-input>
    with a paragraph of text.
  </p>
`);

export const Disabled = renderComponent(html<TextInputStoryArgs>`
  <div style="width: 300px;">
    <fluent-text-input disabled>
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}${Person20Regular}</span>
      Disabled Input
    </fluent-text-input>
  </div>
`);

export const Required = renderComponent(html<TextInputStoryArgs>`
  <div style="width: 300px;">
    <fluent-text-input required>
      <span slot="start">${Person20Regular}</span>
      <span slot="end">${Person20Regular}${Person20Regular}</span>
      Required Input
    </fluent-text-input>
  </div>
`);
