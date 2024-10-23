import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Button as FluentButton } from './button.js';
import { ButtonAppearance, ButtonShape, ButtonSize, ButtonType } from './button.options.js';

type Story = StoryObj<FluentButton>;

const storyTemplate = html<StoryArgs<FluentButton>>`
  <fluent-button
    ?autofocus="${story => story.autofocus}"
    ?disabled-focusable="${story => story.disabledFocusable}"
    ?disabled="${story => story.disabled}"
    ?formnovalidate="${story => story.formnovalidate}"
    ?icon-only="${story => story.iconOnly}"
    appearance="${story => story.appearance}"
    form="${story => story.form}"
    formaction="${story => story.formaction}"
    formenctype="${story => story.formenctype}"
    formmethod="${story => story.formmethod}"
    formtarget="${story => story.formtarget}"
    name="${story => story.name}"
    shape="${story => story.shape}"
    size="${story => story.size}"
    type="${story => story.type}"
    value="${story => story.value}"
  >
    ${story => story.startSlottedContent?.()} ${story => story.slottedContent?.()}
    ${story => story.endSlottedContent?.()}
  </fluent-button>
`;

export default {
  title: 'Components/Button/Button',
  render: renderComponent(storyTemplate),
  args: {
    disabled: false,
    disabledFocusable: false,
    slottedContent: () => 'Button',
  },
  argTypes: {
    appearance: {
      control: 'select',
      description: 'Indicates the styled appearance of the button.',
      options: ['', ...Object.values(ButtonAppearance)],
      mapping: { '': null, ...ButtonAppearance },
      table: {
        category: 'attributes',
        type: { summary: Object.values(ButtonAppearance).join('|') },
      },
    },
    disabled: {
      control: 'boolean',
      description: "Sets the button's disabled state.",
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    disabledFocusable: {
      control: 'boolean',
      description: 'Indicates the button is focusable while disabled.',
      name: 'disabled-focusable',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    formAction: {
      control: 'text',
      description: 'The URL that processes the form submission.',
      name: 'formaction',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    formAttribute: {
      control: 'text',
      description: 'The id of a form to associate the element to.',
      name: 'form',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    formEnctype: {
      control: 'text',
      description: 'The encoding type for the form submission.',
      name: 'formenctype',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    formMethod: {
      control: 'text',
      description: 'The HTTP method that the browser uses to submit the form.',
      name: 'formmethod',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    formNoValidate: {
      control: 'boolean',
      description: 'Indicates that the form will not be validated when submitted.',
      name: 'formnovalidate',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    formTarget: {
      control: 'text',
      description: 'The target frame or window to open the form submission in.',
      name: 'formtarget',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Indicates the button should only display as an icon.',
      name: 'icon-only',
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    name: {
      control: 'text',
      description:
        "The name of the element. This element's value will be surfaced during form submission under the provided name.",
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    size: {
      control: 'select',
      description: 'The size of the button.',
      options: ['', ...Object.values(ButtonSize)],
      mapping: { '': null, ...ButtonSize },
      table: {
        category: 'attributes',
        type: { summary: Object.values(ButtonSize).join('|') },
      },
    },
    shape: {
      control: 'select',
      description: 'The shape of the button.',
      options: ['', ...Object.values(ButtonShape)],
      mapping: { '': null, ...ButtonShape },
      table: {
        category: 'attributes',
        type: { summary: Object.values(ButtonShape).join('|') },
      },
    },
    type: {
      control: 'select',
      description: 'The type of the button.',
      options: ['', ...Object.values(ButtonType)],
      mapping: { '': null, ...ButtonType },
      table: {
        category: 'attributes',
        type: { summary: Object.values(ButtonType).join('|') },
      },
    },
    value: {
      control: 'text',
      description: 'The initial value of the button.',
      table: { category: 'attributes', type: { summary: 'string' } },
    },
    slottedContent: {
      control: false,
      description: 'The default slot',
      name: '',
      table: { category: 'slots', type: {} },
    },
    startSlottedContent: {
      control: false,
      description: 'Slot for start icons',
      name: 'start',
      table: { category: 'slots', type: {} },
    },
    endSlottedContent: {
      control: false,
      description: 'Slot for end icons',
      name: 'end',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentButton>;

export const Default: Story = {};

export const Appearance: Story = {
  render: renderComponent(html<StoryArgs<FluentButton>>`
    <fluent-button>Default</fluent-button>
    <fluent-button appearance="primary">Primary</fluent-button>
    <fluent-button appearance="outline">Outline</fluent-button>
    <fluent-button appearance="subtle">Subtle</fluent-button>
    <fluent-button appearance="transparent">Transparent</fluent-button>
  `),
};

export const Shape: Story = {
  render: renderComponent(html<StoryArgs<FluentButton>>`
    <fluent-button shape="rounded">Rounded</fluent-button>
    <fluent-button shape="circular">Circular</fluent-button>
    <fluent-button shape="square">Square</fluent-button>
  `),
};

export const Size: Story = {
  render: renderComponent(html<StoryArgs<FluentButton>>`
    <fluent-button size="small">Small</fluent-button>
    <fluent-button size="small" icon>
      <svg
        fill="currentColor"
        slot="start"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
      Small with calendar icon
    </fluent-button>
    <fluent-button size="small" icon-only aria-label="Small icon only button">
      <svg
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
    </fluent-button>
    <fluent-button size="medium">Medium</fluent-button>
    <fluent-button size="medium" icon>
      <svg
        fill="currentColor"
        slot="start"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
      Medium with calendar icon
    </fluent-button>
    <fluent-button size="medium" icon-only aria-label="Medium icon only button">
      <svg
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
    </fluent-button>
    <fluent-button size="large">Large</fluent-button>
    <fluent-button size="large" icon>
      <svg
        fill="currentColor"
        slot="start"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
      Large with calendar icon
    </fluent-button>
    <fluent-button size="large" icon-only aria-label="Large icon only button">
      <svg
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        ></path>
      </svg>
    </fluent-button>
  `),
};

export const Disabled: Story = {
  render: renderComponent(html<StoryArgs<FluentButton>>`
    <fluent-button>Enabled state</fluent-button>
    <fluent-button disabled>Disabled state</fluent-button>
    <fluent-button disabled-focusable>Disabled focusable state</fluent-button>
    <fluent-button appearance="primary">Enabled state</fluent-button>
    <fluent-button appearance="primary" disabled>Disabled state</fluent-button>
    <fluent-button appearance="primary" disabled-focusable>Disabled focusable state</fluent-button>
  `),
};

export const WithLongText: Story = {
  render: renderComponent(html<StoryArgs<FluentButton>>`
    <style>
      .max-width {
        width: 280px;
      }
    </style>
    <fluent-button>Short text</fluent-button>
    <fluent-button class="max-width">Long text wraps after it hits the max width of the component</fluent-button>
  `),
};

export const ResetAndSubmitButtonsInForm: Story = {
  render: renderComponent(html<StoryArgs<FluentButton>>`
    <form action="/asdf" id="myform" onreset="output.textContent = ''">
      <label>Email: <input id="input-field" name="input-field" type="email" /></label>
      <button type="submit" value="submitted" name="normalsubmit">Button Submit</button>
      <button type="reset">Button Reset</button>
      <fluent-button type="reset">Fluent Button Reset</fluent-button>
    </form>
    <fluent-button name="fluentsubmit" type="submit" value="submitted" form="myform"
      >Fluent Button Submit</fluent-button
    >
    <div id="something">Div Label</div>
    <output id="output"></output>
  `),
};
