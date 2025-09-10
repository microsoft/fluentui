import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { MenuButton as FluentMenuButton } from './menu-button.js';
import { MenuButtonAppearance, MenuButtonShape, MenuButtonSize } from './menu-button.options.js';

type Story = StoryObj<FluentMenuButton>;

const storyTemplate = html<StoryArgs<FluentMenuButton>>`
  <fluent-menu-button
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
    value="${story => story.value}"
  >
    ${story => story.startSlottedContent?.()} ${story => story.slottedContent?.()}
  </fluent-menu-button>
`;

export default {
  title: 'Components/Button/Menu Button',
  render: renderComponent(storyTemplate),
  args: {
    slottedContent: () => 'Menu Button',
    disabled: false,
    disabledFocusable: false,
  },
  argTypes: {
    appearance: {
      control: 'select',
      description: 'Indicates the styled appearance of the button.',
      mapping: { '': null, ...MenuButtonAppearance },
      options: ['', ...Object.values(MenuButtonAppearance)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(MenuButtonAppearance).join('|') },
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
      mapping: { '': null, ...MenuButtonSize },
      options: ['', ...Object.values(MenuButtonSize)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(MenuButtonSize).join('|') },
      },
    },
    shape: {
      control: 'select',
      description: 'The shape of the button.',
      mapping: { '': null, ...MenuButtonShape },
      options: ['', ...Object.values(MenuButtonShape)],
      table: {
        category: 'attributes',
        type: { summary: Object.values(MenuButtonShape).join('|') },
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
} as Meta<FluentMenuButton>;

export const Default: Story = {};

export const IconOnly: Story = {
  render: renderComponent(html<StoryArgs<FluentMenuButton>>` <fluent-menu-button icon-only></fluent-menu-button> `),
};

export const Appearance: Story = {
  render: renderComponent(html<StoryArgs<FluentMenuButton>>`
    <fluent-menu-button>Default</fluent-menu-button>
    <fluent-menu-button appearance="primary">Primary</fluent-menu-button>
    <fluent-menu-button appearance="outline">Outline</fluent-menu-button>
    <fluent-menu-button appearance="subtle">Subtle</fluent-menu-button>
    <fluent-menu-button appearance="transparent">Transparent</fluent-menu-button>
  `),
};

export const Shape: Story = {
  render: renderComponent(html<StoryArgs<FluentMenuButton>>`
    <fluent-menu-button shape="rounded">Rounded</fluent-menu-button>
    <fluent-menu-button shape="circular">Circular</fluent-menu-button>
    <fluent-menu-button shape="square">Square</fluent-menu-button>
  `),
};

export const Size: Story = {
  render: renderComponent(html<StoryArgs<FluentMenuButton>>`
    <fluent-menu-button size="small">Small</fluent-menu-button>
    <fluent-menu-button size="small" icon
      ><svg
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
    </fluent-menu-button>
    <fluent-menu-button size="small" icon-only aria-label="Small icon only button">
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
    </fluent-menu-button>
    <fluent-menu-button size="medium">Medium</fluent-menu-button>
    <fluent-menu-button size="medium" icon>
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
    </fluent-menu-button>
    <fluent-menu-button size="medium" icon-only aria-label="Medium icon only button">
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
    </fluent-menu-button>
    <fluent-menu-button size="large">Large</fluent-menu-button>
    <fluent-menu-button size="large" icon>
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
    </fluent-menu-button>
    <fluent-menu-button size="large" icon-only aria-label="Large icon only button"
      ><svg
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
    </fluent-menu-button>
  `),
};

export const CustomIcon: Story = {
  render: renderComponent(html<StoryArgs<FluentMenuButton>>`
    <fluent-menu-button size="small">
      Small
      <svg
        slot="end"
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 13h5a.5.5 0 0 1 .09 1H7.5a.5.5 0 0 1-.09-1h5.09-5Zm-2-4h9a.5.5 0 0 1 .09 1H5.5a.5.5 0 0 1-.09-1h9.09-9Zm-2-4h13a.5.5 0 0 1 .09 1H3.5a.5.5 0 0 1-.09-1H16.5h-13Z"
          fill="currentColor"
        ></path>
      </svg>
    </fluent-menu-button>
    <fluent-menu-button size="medium"
      >Medium<svg
        slot="end"
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 13h5a.5.5 0 0 1 .09 1H7.5a.5.5 0 0 1-.09-1h5.09-5Zm-2-4h9a.5.5 0 0 1 .09 1H5.5a.5.5 0 0 1-.09-1h9.09-9Zm-2-4h13a.5.5 0 0 1 .09 1H3.5a.5.5 0 0 1-.09-1H16.5h-13Z"
          fill="currentColor"
        ></path>
      </svg>
    </fluent-menu-button>
    <fluent-menu-button size="large"
      >Large<svg
        slot="end"
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 13h5a.5.5 0 0 1 .09 1H7.5a.5.5 0 0 1-.09-1h5.09-5Zm-2-4h9a.5.5 0 0 1 .09 1H5.5a.5.5 0 0 1-.09-1h9.09-9Zm-2-4h13a.5.5 0 0 1 .09 1H3.5a.5.5 0 0 1-.09-1H16.5h-13Z"
          fill="currentColor"
        ></path>
      </svg>
    </fluent-menu-button>
  `),
};

export const Disabled: Story = {
  render: renderComponent(html<StoryArgs<FluentMenuButton>>`
    <fluent-menu-button>Enabled state</fluent-menu-button>
    <fluent-menu-button disabled>Disabled state</fluent-menu-button>
    <fluent-menu-button disabled-focusable>Disabled focusable state</fluent-menu-button>
    <fluent-menu-button appearance="primary">Enabled state</fluent-menu-button>
    <fluent-menu-button appearance="primary" disabled>Disabled state</fluent-menu-button>
    <fluent-menu-button appearance="primary" disabled-focusable>Disabled focusable state</fluent-menu-button>
  `),
};

export const WithLongText: Story = {
  render: renderComponent(html<StoryArgs<FluentMenuButton>>`
    <style>
      .max-width {
        width: 280px;
      }
    </style>
    <fluent-menu-button>Short text</fluent-menu-button>
    <fluent-menu-button class="max-width"
      >Long text wraps after it hits the max width of the component</fluent-menu-button
    >
  `),
};
