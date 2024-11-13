import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { CounterBadge as FluentCounterBadge } from './counter-badge.js';
import {
  CounterBadgeAppearance,
  CounterBadgeColor,
  CounterBadgeShape,
  CounterBadgeSize,
} from './counter-badge.options.js';

type Story = StoryObj<FluentCounterBadge>;

const storyTemplate = html<StoryArgs<FluentCounterBadge>>`
  <fluent-counter-badge
    appearance="${story => story.appearance}"
    color="${story => story.color}"
    shape="${story => story.shape}"
    size="${story => story.size}"
    count="${story => story.count}"
    overflow-count="${story => story.overflowCount}"
    ?show-zero="${story => story.showZero}"
    ?dot="${story => story.dot}"
  >
    ${story => story.startSlottedContent?.()} ${story => story.endSlottedContent?.()}
  </fluent-counter-badge>
`;

export default {
  title: 'Components/Badge/Counter Badge',
  render: renderComponent(storyTemplate),
  argTypes: {
    appearance: {
      description: 'Sets the appearance of the badge to one of the predefined styles',
      options: ['', ...Object.values(CounterBadgeAppearance)],
      mapping: { '': null, ...CounterBadgeAppearance },
      control: 'select',
      table: {
        category: 'attributes',
        type: { summary: Object.values(CounterBadgeAppearance).join('|') },
      },
    },
    color: {
      description: 'Sets the color of the badge to one of the predefined colors',
      options: ['', ...Object.values(CounterBadgeColor)],
      mapping: { '': null, ...CounterBadgeColor },
      control: 'select',
      table: {
        category: 'attributes',
        type: { summary: Object.values(CounterBadgeColor).join('|') },
      },
    },
    shape: {
      description: 'Sets the shape of the badge to one of the predefined shapes',
      options: ['', ...Object.values(CounterBadgeShape)],
      mapping: { '': null, ...CounterBadgeShape },
      control: 'select',
      table: {
        category: 'attributes',
        type: { summary: Object.values(CounterBadgeShape).join('|') },
      },
    },
    size: {
      description: 'Sets the size of the badge to one of the predefined sizes',
      options: ['', ...Object.values(CounterBadgeSize)],
      mapping: { '': null, ...CounterBadgeSize },
      control: 'select',
      table: {
        category: 'attributes',
        type: { summary: Object.values(CounterBadgeSize).join('|') },
      },
    },
    dot: {
      control: 'boolean',
      description: "Sets the badge's dot state.",
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    showZero: {
      control: 'boolean',
      description: "Sets the badge's show-zero state.",
      table: { category: 'attributes', type: { summary: 'boolean' } },
    },
    count: {
      control: 'number',
      description: "Sets the badge's count attribute",
      name: 'formmethod',
      table: { category: 'attributes', type: { summary: 'number' } },
    },
    overflowCount: {
      control: 'text',
      description: "Sets the badge's overflow count attribute",
      name: 'formmethod',
      table: { category: 'attributes', type: { summary: 'number' } },
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
} as Meta<FluentCounterBadge>;

export const Default: Story = {};

export const Appearance: Story = {
  render: renderComponent(html<StoryArgs<FluentCounterBadge>>`
    <fluent-counter-badge count="5" appearance="filled"></fluent-counter-badge>
    <fluent-counter-badge count="5" appearance="ghost"></fluent-counter-badge>
  `),
};

export const Color: Story = {
  render: renderComponent(html<StoryArgs<FluentCounterBadge>>`
    <fluent-counter-badge count="5" color="brand"></fluent-counter-badge>
    <fluent-counter-badge count="5" color="danger"></fluent-counter-badge>
    <fluent-counter-badge count="5" color="important"></fluent-counter-badge>
    <fluent-counter-badge count="5" color="informative"></fluent-counter-badge>
    <fluent-counter-badge count="5" color="severe"></fluent-counter-badge>
    <fluent-counter-badge count="5" color="subtle"></fluent-counter-badge>
    <fluent-counter-badge count="5" color="success"></fluent-counter-badge>
    <fluent-counter-badge count="5" color="warning"></fluent-counter-badge>
  `),
};

export const Shape: Story = {
  render: renderComponent(html<StoryArgs<FluentCounterBadge>>`
    <fluent-counter-badge count="5" shape="circular"></fluent-counter-badge>
    <fluent-counter-badge count="5" shape="rounded"></fluent-counter-badge>
  `),
};

export const Size: Story = {
  render: renderComponent(html<StoryArgs<FluentCounterBadge>>`
    <fluent-counter-badge size="tiny"></fluent-counter-badge>
    <fluent-counter-badge size="extra-small"></fluent-counter-badge>
    <fluent-counter-badge size="small"></fluent-counter-badge>
    <fluent-counter-badge size="medium"></fluent-counter-badge>
    <fluent-counter-badge size="large"></fluent-counter-badge>
    <fluent-counter-badge size="extra-large"></fluent-counter-badge>
  `),
};

export const Dot: Story = {
  render: renderComponent(html<StoryArgs<FluentCounterBadge>>`<fluent-counter-badge dot></fluent-counter-badge>`),
};

export const ShowZero: Story = {
  render: renderComponent(html<StoryArgs<FluentCounterBadge>>`<fluent-counter-badge show-zero></fluent-counter-badge>`),
};

export const Start: Story = {
  // prettier-ignore
  render: renderComponent(html<StoryArgs<FluentCounterBadge>>`
    <fluent-counter-badge count="5" shape="circular"><svg
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
      </svg></fluent-counter-badge>
  `),
};

export const End: Story = {
  // prettier-ignore
  render: renderComponent(html<StoryArgs<FluentCounterBadge>>`
    <fluent-counter-badge count="5" shape="circular"><svg
        fill="currentColor"
        slot="end"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      ><path
          d="M14.5 3A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9A2.5 2.5 0 015.5 3h9zm0 1h-9C4.67 4 4 4.67 4 5.5v9c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zM7 11a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM7 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        >
      </path>
    </svg></fluent-counter-badge>
  `),
};
