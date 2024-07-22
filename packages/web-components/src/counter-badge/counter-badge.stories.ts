import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { CounterBadge as FluentCounterBadge } from './counter-badge.js';
import {
  CounterBadgeAppearance,
  CounterBadgeColor,
  CounterBadgeShape,
  CounterBadgeSize,
} from './counter-badge.options.js';

type CounterBadgeStoryArgs = Args & FluentCounterBadge;
type CounterBadgeStoryMeta = Meta<CounterBadgeStoryArgs>;

// TODO: Currently cannot show icon or content
// in the counter badge stories because it projects as slotted content
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
  ></fluent-counter-badge>
`;

export default {
  title: 'Components/Badge/Counter Badge',
  args: {
    dot: false,
    showZero: false,
    appearance: CounterBadgeAppearance.filled,
    color: CounterBadgeColor.brand,
    shape: CounterBadgeShape.circular,
    count: 5,
  },
  argTypes: {
    appearance: {
      options: Object.values(CounterBadgeAppearance),
      control: {
        type: 'select',
      },
    },
    color: {
      options: Object.values(CounterBadgeColor),
      control: {
        type: 'select',
      },
    },
    shape: {
      options: Object.values(CounterBadgeShape),
      control: {
        type: 'select',
      },
    },
    size: {
      options: Object.values(CounterBadgeSize),
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
      control: 'boolean',
    },
    showZero: {
      control: 'boolean',
    },
    count: {
      control: 'number',
    },
    overflowCount: {
      control: 'text',
    },
  },
} as CounterBadgeStoryMeta;

export const CounterBadge = renderComponent(storyTemplate).bind({});

export const Appearance = renderComponent(html<CounterBadgeStoryArgs>`
  <fluent-counter-badge count="5" appearance="filled"></fluent-counter-badge>
  <fluent-counter-badge count="5" appearance="ghost"></fluent-counter-badge>
`);

export const Color = renderComponent(html<CounterBadgeStoryArgs>`
  <fluent-counter-badge count="5" color="brand"></fluent-counter-badge>
  <fluent-counter-badge count="5" color="danger"></fluent-counter-badge>
  <fluent-counter-badge count="5" color="important"></fluent-counter-badge>
  <fluent-counter-badge count="5" color="informative"></fluent-counter-badge>
  <fluent-counter-badge count="5" color="severe"></fluent-counter-badge>
  <fluent-counter-badge count="5" color="subtle"></fluent-counter-badge>
  <fluent-counter-badge count="5" color="success"></fluent-counter-badge>
  <fluent-counter-badge count="5" color="warning"></fluent-counter-badge>
`);

export const Shape = renderComponent(html<CounterBadgeStoryArgs>`
  <fluent-counter-badge count="5" shape="circular"></fluent-counter-badge>
  <fluent-counter-badge count="5" shape="rounded"></fluent-counter-badge>
`);

export const Size = renderComponent(html<CounterBadgeStoryArgs>`
  <fluent-counter-badge size="tiny"></fluent-counter-badge>
  <fluent-counter-badge size="extra-small"></fluent-counter-badge>
  <fluent-counter-badge size="small"></fluent-counter-badge>
  <fluent-counter-badge size="medium"></fluent-counter-badge>
  <fluent-counter-badge size="large"></fluent-counter-badge>
  <fluent-counter-badge size="extra-large"></fluent-counter-badge>
`) as CounterBadgeStoryMeta;

export const Dot = renderComponent(html<CounterBadgeStoryArgs>`<fluent-counter-badge dot></fluent-counter-badge>`);

export const ShowZero = renderComponent(
  html<CounterBadgeStoryArgs>`<fluent-counter-badge show-zero></fluent-counter-badge>`,
);
