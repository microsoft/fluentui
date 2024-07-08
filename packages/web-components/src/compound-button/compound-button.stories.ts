import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { CompoundButton as FluentCompoundButton } from './compound-button.js';
import { CompoundButtonAppearance, CompoundButtonShape, CompoundButtonSize } from './compound-button.options.js';

type CompoundButtonStoryArgs = Args & FluentCompoundButton;
type CompoundButtonStoryMeta = Meta<CompoundButtonStoryArgs>;

const storyTemplate = html<CompoundButtonStoryArgs>`
  <fluent-compound-button
    appearance="${x => x.appearance}"
    shape="${x => x.shape}"
    size="${x => x.size}"
    ?disabled="${x => x.disabled}"
    ?disabled-focusable="${x => x.disabledFocusable}"
    ?icon-only="${x => x.iconOnly}"
  >
    ${x => x.content}

    <span slot="description">${x => x.description}</span>
  </fluent-compound-button>
`;

export default {
  title: 'Components/Button/Compound Button',
  args: {
    content: 'Button',
    description: 'Secondary content',
    disabled: false,
    disabledFocusable: false,
  },
  argTypes: {
    appearance: {
      options: Object.values(CompoundButtonAppearance),
      control: {
        type: 'select',
      },
    },
    shape: {
      options: Object.values(CompoundButtonShape),
      control: {
        type: 'select',
      },
    },
    size: {
      options: Object.values(CompoundButtonSize),
      control: {
        type: 'select',
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Sets the disabled state of the component',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabledFocusable: {
      control: 'boolean',
      table: {
        type: {
          summary: 'The component is disabled but still focusable',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    content: {
      control: 'Button text',
    },
  },
} as CompoundButtonStoryMeta;

export const Button = renderComponent(storyTemplate).bind({});

export const Appearance = renderComponent(html<CompoundButtonStoryArgs>`
  <fluent-compound-button>Default <span slot="description">Description content</span></fluent-compound-button>
  <fluent-compound-button appearance="primary">
    Primary
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button appearance="outline">
    Outline
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button appearance="subtle">
    Subtle
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button appearance="transparent">
    Transparent
    <span slot="description">Description content</span>
  </fluent-compound-button>
`);

export const Shape = renderComponent(html<CompoundButtonStoryArgs>`
  <fluent-compound-button shape="rounded">
    Rounded
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button shape="circular">
    Circular
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button shape="square">
    Square
    <span slot="description">Description content</span>
  </fluent-compound-button>
`);

export const Size = renderComponent(html<CompoundButtonStoryArgs>`
  <fluent-compound-button size="small">Small<span slot="description">Description content</span></fluent-compound-button>
  <fluent-compound-button size="small">
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
    Small with calendar icon<span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button size="small" icon-only aria-label="Small icon only button">
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
  </fluent-compound-button>
  <fluent-compound-button size="medium">
    Medium
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button size="medium">
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
  </fluent-compound-button>
  <fluent-compound-button size="medium" icon-only aria-label="Medium icon only button">
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
  </fluent-compound-button>
  <fluent-compound-button size="large">
    Large
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button size="large">
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
    Large with calendar icon<span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button size="large" icon-only aria-label="Large icon only button">
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
  </fluent-compound-button>
`);

export const Disabled = renderComponent(html<CompoundButtonStoryArgs>`
  <fluent-compound-button>Enabled state<span slot="description">Description content</span></fluent-compound-button>
  <fluent-compound-button disabled>
    Disabled state
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button disabled-focusable>
    Disabled focusable state
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button appearance="primary">
    Enabled state
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button appearance="primary" disabled>
    Disabled state
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button appearance="primary" disabled-focusable>
    Disabled focusable state
    <span slot="description">Description content</span>
  </fluent-compound-button>
`);

export const WithLongText = renderComponent(html<CompoundButtonStoryArgs>`
  <style>
    .max-width {
      width: 280px;
    }
  </style>
  <fluent-compound-button>
    Short text
    <span slot="description">Description content</span>
  </fluent-compound-button>
  <fluent-compound-button class="max-width">
    Long text wraps after it hits the max width of the component
    <span slot="description">Description content</span>
  </fluent-compound-button>
`);
