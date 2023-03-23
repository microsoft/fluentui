import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { TextInput as FluentTextInput } from './text-input.js';
import { TextInputAppearance, TextInputLayout, TextInputSize } from './text-input.options.js';
import { TextFieldType } from '@microsoft/fast-foundation';

import './define.js';

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
  <fluent-text-input
    type=${x => x.type}
    ?disabled=${x => x.disabled}
    ?block=${x => x.block}
    input-size="${x => x.inputSize}"
    appearance="${x => x.appearance}"
    layout=${x => x.layout}
    placeholder=${x => x.placeholder}
  >
    <span slot="start">${Person20Regular}</span>
    <span slot="end">${Person20Regular}${Person20Regular}</span>
    First Name
  </fluent-text-input>
`;

export default {
  title: 'Components/TextInput',
  argTypes: {
    type: {
      options: Object.values(TextFieldType),
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
      options: Object.keys(TextInputAppearance),
      control: {
        type: 'select',
      },
    },
    layout: {
      options: Object.keys(TextInputLayout),
      defaultValue: TextInputLayout.block,
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

// //
// // Attribute stories
// //

// export const Appearance = renderComponent(html<TextInputStoryArgs>`

// `);

// export const Size = renderComponent(html<TextInputStoryArgs>`

// `);

// export const Layout = renderComponent(html<TextInputStoryArgs>`

// `);

// export const Disabled = renderComponent(html<TextInputStoryArgs>`

// `);

// export const Placeholder = renderComponent(html<TextInputStoryArgs>`

// `);
