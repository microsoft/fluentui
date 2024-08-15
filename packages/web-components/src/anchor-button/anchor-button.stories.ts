import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { AnchorButton as FluentAnchorButton } from './anchor-button.js';
import { AnchorButtonAppearance, AnchorButtonShape, AnchorButtonSize } from './anchor-button.options.js';

type AnchorButtonStoryArgs = Args & FluentAnchorButton;
type AnchorButtonStoryMeta = Meta<AnchorButtonStoryArgs>;

const storyTemplate = html<AnchorButtonStoryArgs>`
  <fluent-anchor-button
    href="${x => x.href}"
    appearance="${x => x.appearance}"
    shape="${x => x.shape}"
    size="${x => x.size}"
    ?icon-only="${x => x.iconOnly}"
  >
    ${x => x.content}
  </fluent-anchor-button>
`;

export default {
  title: 'Components/Button/Anchor',
  args: {
    content: 'Anchor',
    href: '#',
    disabled: false,
    disabledFocusable: false,
  },
  argTypes: {
    appearance: {
      options: Object.values(AnchorButtonAppearance),
      control: {
        type: 'select',
      },
    },
    shape: {
      options: Object.values(AnchorButtonShape),
      control: {
        type: 'select',
      },
    },
    size: {
      options: Object.values(AnchorButtonSize),
      control: {
        type: 'select',
      },
    },
    href: {
      control: 'text',
    },
    content: {
      control: 'Anchor text',
    },
  },
} as AnchorButtonStoryMeta;

export const AnchorButton = renderComponent(storyTemplate).bind({});

export const Appearance = renderComponent(html<AnchorButtonStoryArgs>`
  <fluent-anchor-button href="#">Default</fluent-anchor-button>
  <fluent-anchor-button href="#" appearance="primary">Primary</fluent-anchor-button>
  <fluent-anchor-button href="#" appearance="outline">Outline</fluent-anchor-button>
  <fluent-anchor-button href="#" appearance="subtle">Subtle</fluent-anchor-button>
  <fluent-anchor-button href="#" appearance="transparent">Transparent</fluent-anchor-button>
`);

export const Shape = renderComponent(html<AnchorButtonStoryArgs>`
  <fluent-anchor-button href="#" shape="rounded">Rounded</fluent-anchor-button>
  <fluent-anchor-button href="#" shape="circular">Circular</fluent-anchor-button>
  <fluent-anchor-button href="#" shape="square">Square</fluent-anchor-button>
`);

export const Size = renderComponent(html<AnchorButtonStoryArgs>`
  <fluent-anchor-button href="#" size="small">Small</fluent-anchor-button>
  <fluent-anchor-button href="#" size="small" icon>
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
  </fluent-anchor-button>
  <fluent-anchor-button href="#" size="small" icon-only aria-label="Small icon only button"
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
  </fluent-anchor-button>
  <fluent-anchor-button href="#" size="medium">Medium</fluent-anchor-button>
  <fluent-anchor-button href="#" size="medium" icon>
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
  </fluent-anchor-button>
  <fluent-anchor-button href="#" size="medium" icon-only aria-label="Medium icon only button"
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
  </fluent-anchor-button>
  <fluent-anchor-button href="#" size="large">Large</fluent-anchor-button>
  <fluent-anchor-button href="#" size="large" icon
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
    Large with calendar icon
  </fluent-anchor-button>
  <fluent-anchor-button href="#" size="large" icon-only aria-label="Large icon only button"
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
  </fluent-anchor-button>
`);

export const WithLongText = renderComponent(html<AnchorButtonStoryArgs>`
  <style>
    .max-width {
      width: 280px;
    }
  </style>
  <fluent-anchor-button href="#">Short text</fluent-anchor-button>
  <fluent-anchor-button href="#" class="max-width"
    >Long text wraps after it hits the max width of the component</fluent-anchor-button
  >
`);
