import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { MenuButton as FluentMenuButton } from './menu-button.js';
import { MenuButtonAppearance, MenuButtonShape, MenuButtonSize } from './menu-button.options.js';

type MenuButtonStoryArgs = Args & FluentMenuButton;
type MenuButtonStoryMeta = Meta<MenuButtonStoryArgs>;

const storyTemplate = html<MenuButtonStoryArgs>`
  <fluent-menu-button
    appearance="${x => x.appearance}"
    shape="${x => x.shape}"
    size="${x => x.size}"
    ?disabled="${x => x.disabled}"
    ?disabled-focusable="${x => x.disabledFocusable}"
    ?icon-only="${x => x.iconOnly}"
  >
    ${x => x.content}
  </fluent-menu-button>
`;

export default {
  title: 'Components/Button/Menu Button',
  args: {
    content: 'Menu Button',
    disabled: false,
    disabledFocusable: false,
  },
  argTypes: {
    appearance: {
      options: Object.values(MenuButtonAppearance),
      control: {
        type: 'select',
      },
    },
    shape: {
      options: Object.values(MenuButtonShape),
      control: {
        type: 'select',
      },
    },
    size: {
      options: Object.values(MenuButtonSize),
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
} as MenuButtonStoryMeta;

export const Button = renderComponent(storyTemplate).bind({});

export const Appearance = renderComponent(html<MenuButtonStoryArgs>`
  <fluent-menu-button>Default</fluent-menu-button>
  <fluent-menu-button appearance="primary">Primary</fluent-menu-button>
  <fluent-menu-button appearance="outline">Outline</fluent-menu-button>
  <fluent-menu-button appearance="subtle">Subtle</fluent-menu-button>
  <fluent-menu-button appearance="transparent">Transparent</fluent-menu-button>
`);

export const Shape = renderComponent(html<MenuButtonStoryArgs>`
  <fluent-menu-button shape="rounded">Rounded</fluent-menu-button>
  <fluent-menu-button shape="circular">Circular</fluent-menu-button>
  <fluent-menu-button shape="square">Square</fluent-menu-button>
`);

export const Size = renderComponent(html<MenuButtonStoryArgs>`
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
      ></path></svg
    >Small with calendar icon</fluent-menu-button
  >
  <fluent-menu-button size="small" icon-only aria-label="Small icon only button"
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
      ></path></svg
  ></fluent-menu-button>
  <fluent-menu-button size="medium">Medium</fluent-menu-button>
  <fluent-menu-button size="medium" icon
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
      ></path></svg
    >Medium with calendar icon</fluent-menu-button
  >
  <fluent-menu-button size="medium" icon-only aria-label="Medium icon only button"
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
      ></path></svg
  ></fluent-menu-button>
  <fluent-menu-button size="large">Large</fluent-menu-button>
  <fluent-menu-button size="large" icon
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
      ></path></svg
    >Large with calendar icon</fluent-menu-button
  >
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
      ></path></svg
  ></fluent-menu-button>
`);

export const CustomIcon = renderComponent(html<MenuButtonStoryArgs>`
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
`);

export const Disabled = renderComponent(html<MenuButtonStoryArgs>`
  <fluent-menu-button>Enabled state</fluent-menu-button>
  <fluent-menu-button disabled>Disabled state</fluent-menu-button>
  <fluent-menu-button disabled-focusable>Disabled focusable state</fluent-menu-button>
  <fluent-menu-button appearance="primary">Enabled state</fluent-menu-button>
  <fluent-menu-button appearance="primary" disabled>Disabled state</fluent-menu-button>
  <fluent-menu-button appearance="primary" disabled-focusable>Disabled focusable state</fluent-menu-button>
`);

export const WithLongText = renderComponent(html<MenuButtonStoryArgs>`
  <style>
    .max-width {
      width: 280px;
    }
  </style>
  <fluent-menu-button>Short text</fluent-menu-button>
  <fluent-menu-button class="max-width"
    >Long text wraps after it hits the max width of the component</fluent-menu-button
  >
`);
