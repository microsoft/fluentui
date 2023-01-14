import { html, when } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../__test__/helpers.js';
import type { CounterBadge as FluentCounterBadge } from './counter-badge.js';
import {
  CounterBadgeAppearance,
  CounterBadgeColor,
  CounterBadgeShape,
  CounterBadgeSize,
} from './counter-badge.options';
import './define.js';

type CounterBadgeStoryArgs = Args & FluentCounterBadge;
type CounterBadgeStoryMeta = Meta<CounterBadgeStoryArgs>;

const storyTemplate = html<CounterBadgeStoryArgs>`
  <fluent-counter-badge
    appearance="${x => x.appearance}"
    color="${x => x.color}"
    shape="${x => x.shape}"
    size="${x => x.size}"
    count="${x => x.count}"
    overflow-count="${x => x.overflowCount}"
    ?show-zero="${x => x.showZero}"
    ?dot="${x => x.dot}"
  >
    ${when(
      x => x.iconPosition === 'start',
      html<CounterBadgeStoryArgs>`<svg
        slot="start"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M14.69 11.503c1 0 1.81.81 1.81 1.81v.689h-.005c-.034.78-.248 1.757-1.123 2.555C14.416 17.43 12.765 18 10 18c-2.766 0-4.416-.57-5.372-1.443c-.875-.798-1.089-1.776-1.123-2.555H3.5v-.69c0-.999.81-1.809 1.81-1.809h9.38ZM6.5 3A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h7A1.5 1.5 0 0 0 15 8.5v-4A1.5 1.5 0 0 0 13.5 3h-3v-.5A.48.48 0 0 0 10 2c-.276 0-.5.23-.5.5V3h-3ZM7 6.5a1 1 0 1 1 2 0a1 1 0 0 1-2 0Zm4 0a1 1 0 1 1 2 0a1 1 0 0 1-2 0Z"
        />
      </svg>`,
    )}
    ${x => x.content}
    ${when(
      x => x.iconPosition === 'end',
      html<CounterBadgeStoryArgs>`<svg
        slot="start"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M14.69 11.503c1 0 1.81.81 1.81 1.81v.689h-.005c-.034.78-.248 1.757-1.123 2.555C14.416 17.43 12.765 18 10 18c-2.766 0-4.416-.57-5.372-1.443c-.875-.798-1.089-1.776-1.123-2.555H3.5v-.69c0-.999.81-1.809 1.81-1.809h9.38ZM6.5 3A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h7A1.5 1.5 0 0 0 15 8.5v-4A1.5 1.5 0 0 0 13.5 3h-3v-.5A.48.48 0 0 0 10 2c-.276 0-.5.23-.5.5V3h-3ZM7 6.5a1 1 0 1 1 2 0a1 1 0 0 1-2 0Zm4 0a1 1 0 1 1 2 0a1 1 0 0 1-2 0Z"
        />
      </svg>`,
    )}
  </fluent-counter-badge>
`;

export default {
  title: 'Components/Counter Badge',
  args: {
    content: null,
  },
  argTypes: {
    appearance: {
      options: Object.values(CounterBadgeAppearance),
      control: {
        type: 'select',
      },
    },
    color: {
      options: Object.keys(CounterBadgeColor),
      control: {
        type: 'select',
      },
    },
    shape: {
      options: Object.keys(CounterBadgeShape),
      control: {
        type: 'select',
      },
    },
    size: {
      options: Object.keys(CounterBadgeSize),
      control: {
        type: 'select',
      },
    },
    iconPosition: {
      options: ['none', 'start', 'end'],
      control: {
        type: 'select',
      },
    },
    dot: {
      type: 'boolean',
    },
    showZero: {
      type: 'boolean',
    },
    count: {
      type: 'string',
      defaultValue: '5',
    },
    overflowCount: {
      type: 'string',
    },
    content: {
      type: 'string',
    },
  },
} as CounterBadgeStoryMeta;

export const Badge = renderComponent(storyTemplate).bind({});

export const Appearance = renderComponent(html<CounterBadgeStoryArgs>`
  <fluent-ccounter-badge appearance="filled">filled</fluent-ccounter-badge>
  <fluent-ccounter-badge appearance="ghost">ghost</fluent-ccounter-badge>
`);

export const Color = renderComponent(html<CounterBadgeStoryArgs>`
  <fluent-ccounter-badge color="brand">brand</fluent-ccounter-badge>
  <fluent-ccounter-badge color="danger">danger</fluent-ccounter-badge>
  <fluent-ccounter-badge color="important">important</fluent-ccounter-badge>
  <fluent-ccounter-badge color="informative">informative</fluent-ccounter-badge>
  <fluent-ccounter-badge color="severe">severe</fluent-ccounter-badge>
  <fluent-ccounter-badge color="subtle">subtle</fluent-ccounter-badge>
  <fluent-ccounter-badge color="success">success</fluent-ccounter-badge>
  <fluent-ccounter-badge color="warning">warning</fluent-ccounter-badge>
`);

export const Shape = renderComponent(html<CounterBadgeStoryArgs>`
  <fluent-ccounter-badge shape="circular"></fluent-ccounter-badge>
  <fluent-ccounter-badge shape="rounded"></fluent-ccounter-badge>
`);

export const Size = renderComponent(html<CounterBadgeStoryArgs>`
  <fluent-ccounter-badge size="tiny"></fluent-ccounter-badge>
  <fluent-ccounter-badge size="extra-small"></fluent-ccounter-badge>
  <fluent-ccounter-badge size="small"></fluent-ccounter-badge>
  <fluent-ccounter-badge size="medium"></fluent-ccounter-badge>
  <fluent-ccounter-badge size="large"></fluent-ccounter-badge>
  <fluent-ccounter-badge size="extra-large"></fluent-ccounter-badge>
`) as CounterBadgeStoryMeta;

export const Dot = renderComponent(html<CounterBadgeStoryArgs>` <fluent-ccounter-badge dot></fluent-ccounter-badge> `);
