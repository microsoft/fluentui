import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { ToggleButton as FluentToggleButton } from './toggle-button.js';
import { ToggleButtonAppearance, ToggleButtonShape, ToggleButtonSize } from './toggle-button.options.js';

type ToggleButtonStoryArgs = Args & FluentToggleButton;
type ToggleButtonStoryMeta = Meta<ToggleButtonStoryArgs>;

const storyTemplate = html<ToggleButtonStoryArgs>`
  <fluent-toggle-button
    appearance="${x => x.appearance}"
    shape="${x => x.shape}"
    size="${x => x.size}"
    ?pressed="${x => x.pressed}"
    ?mixed="${x => x.mixed}"
    ?disabled="${x => x.disabled}"
    ?disabled-focusable="${x => x.disabledFocusable}"
    ?icon-only="${x => x.iconOnly}"
  >
    ${x => x.content}
  </fluent-toggle-button>
`;

export default {
  title: 'Components/Button/Toggle Button',
  args: {
    content: 'Button',
    disabled: false,
    disabledFocusable: false,
  },
  argTypes: {
    appearance: {
      options: Object.values(ToggleButtonAppearance),
      control: {
        type: 'select',
      },
    },
    shape: {
      options: Object.values(ToggleButtonShape),
      control: {
        type: 'select',
      },
    },
    size: {
      options: Object.values(ToggleButtonSize),
      control: {
        type: 'select',
      },
    },
    mixed: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Sets the mixed state of the component',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    pressed: {
      control: 'boolean',
      table: {
        type: {
          summary: 'Sets the pressed state of the component',
        },
        defaultValue: {
          summary: 'false',
        },
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
} as ToggleButtonStoryMeta;

export const Button = renderComponent(storyTemplate).bind({});

export const Appearance = renderComponent(html<ToggleButtonStoryArgs>`
  <fluent-toggle-button>Default</fluent-toggle-button>
  <fluent-toggle-button appearance="primary">Primary</fluent-toggle-button>
  <fluent-toggle-button appearance="outline">Outline</fluent-toggle-button>
  <fluent-toggle-button appearance="subtle">Subtle</fluent-toggle-button>
  <fluent-toggle-button appearance="transparent">Transparent</fluent-toggle-button>
`);

export const Pressed = renderComponent(html<ToggleButtonStoryArgs>`
  <fluent-toggle-button pressed>Default pressed</fluent-toggle-button>
  <fluent-toggle-button pressed appearance="primary">Primary pressed</fluent-toggle-button>
  <fluent-toggle-button pressed appearance="outline">Outline pressed</fluent-toggle-button>
  <fluent-toggle-button pressed appearance="subtle">Subtle pressed</fluent-toggle-button>
  <fluent-toggle-button pressed appearance="transparent">Transparent pressed</fluent-toggle-button>
`);

export const Shape = renderComponent(html<ToggleButtonStoryArgs>`
  <fluent-toggle-button shape="rounded">Rounded</fluent-toggle-button>
  <fluent-toggle-button shape="circular">Circular</fluent-toggle-button>
  <fluent-toggle-button shape="square">Square</fluent-toggle-button>
`);

export const Size = renderComponent(html<ToggleButtonStoryArgs>`
  <fluent-toggle-button size="small">Small</fluent-toggle-button>
  <fluent-toggle-button size="small">
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
  </fluent-toggle-button>
  <fluent-toggle-button size="small" icon-only aria-label="Small icon only button">
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
  </fluent-toggle-button>
  <fluent-toggle-button size="medium">Medium</fluent-toggle-button>
  <fluent-toggle-button size="medium">
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
  </fluent-toggle-button>
  <fluent-toggle-button size="medium" icon-only aria-label="Medium icon only button">
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
  </fluent-toggle-button>
  <fluent-toggle-button size="large">Large</fluent-toggle-button>
  <fluent-toggle-button size="large">
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
  </fluent-toggle-button>
  <fluent-toggle-button size="large" icon-only aria-label="Large icon only button">
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
  </fluent-toggle-button>
`);

export const Disabled = renderComponent(html<ToggleButtonStoryArgs>`
  <fluent-toggle-button>Enabled state</fluent-toggle-button>
  <fluent-toggle-button disabled>Disabled state</fluent-toggle-button>
  <fluent-toggle-button disabled-focusable>Disabled focusable state</fluent-toggle-button>
  <fluent-toggle-button appearance="primary">Enabled state</fluent-toggle-button>
  <fluent-toggle-button appearance="primary" disabled>Disabled state</fluent-toggle-button>
  <fluent-toggle-button appearance="primary" disabled-focusable>Disabled focusable state</fluent-toggle-button>
`);

export const WithLongText = renderComponent(html<ToggleButtonStoryArgs>`
  <style>
    .max-width {
      width: 280px;
    }
  </style>
  <fluent-toggle-button>Short text</fluent-toggle-button>
  <fluent-toggle-button class="max-width">
    Long text wraps after it hits the max width of the component
  </fluent-toggle-button>
`);
