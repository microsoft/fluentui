import { html, when } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { Badge as FluentBadge } from './badge.js';
import { BadgeAppearance, BadgeColor, BadgeShape, BadgeSize } from './badge.options.js';

type Story = StoryObj<FluentBadge>;

const storyTemplate = html<StoryArgs<FluentBadge>>`
  <fluent-badge
    appearance="${story => story.appearance}"
    color="${story => story.color}"
    shape="${story => story.shape}"
    size="${story => story.size}"
  >
    ${story => story.startSlottedContent?.()} ${story => story.slottedContent?.()}
    ${story => story.endSlottedContent?.()}
  </fluent-badge>
`;

export default {
  title: 'Components/Badge/Badge',
  render: renderComponent(storyTemplate),
  args: {
    appearance: BadgeAppearance.filled,
    color: BadgeColor.brand,
    shape: BadgeShape.circular,
    size: BadgeSize.medium,
  },
  argTypes: {
    appearance: {
      description: 'Sets the appearance of the badge to one of the predefined styles',
      options: Object.values(BadgeAppearance),
      mapping: { '': null, ...BadgeAppearance },
      control: 'select',
      table: {
        category: 'attributes',
        type: { summary: Object.values(BadgeAppearance).join('|') },
      },
    },
    color: {
      description: 'Sets the color of the badge to one of the predefined colors',
      options: Object.values(BadgeColor),
      mapping: { '': null, ...BadgeColor },
      control: 'select',
      table: {
        category: 'attributes',
        type: { summary: Object.values(BadgeColor).join('|') },
      },
    },
    shape: {
      description: 'Sets the shape of the badge to one of the predefined shapes',
      options: Object.values(BadgeShape),
      mapping: { '': null, ...BadgeShape },
      control: 'select',
      table: {
        category: 'attributes',
        type: { summary: Object.values(BadgeShape).join('|') },
      },
    },
    size: {
      description: 'Sets the size of the badge to one of the predefined sizes',
      options: Object.values(BadgeSize),
      mapping: { '': null, ...BadgeSize },
      control: 'select',
      table: {
        category: 'attributes',
        type: { summary: Object.values(BadgeSize).join('|') },
      },
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
} as Meta<FluentBadge>;

export const Default: Story = {};

export const SlottedContent: Story = {
  args: {
    slottedContent: () => 'Badge',
  },
};

export const IconStart: Story = {
  args: {
    startSlottedContent: () => html`<svg
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
    slottedContent: () => 'Badge',
  },
};

export const IconEnd: Story = {
  args: {
    startSlottedContent: () => html`<svg
      slot="end"
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
    slottedContent: () => 'Badge',
  },
};

export const Appearance: Story = {
  render: renderComponent(html<StoryArgs<FluentBadge>>`
    <fluent-badge appearance="filled">filled</fluent-badge>
    <fluent-badge appearance="ghost">ghost</fluent-badge>
    <fluent-badge appearance="outline">outline</fluent-badge>
    <fluent-badge appearance="tint">tint</fluent-badge>
  `),
};

export const Color: Story = {
  render: renderComponent(html<StoryArgs<FluentBadge>>`
    <fluent-badge color="brand">brand</fluent-badge>
    <fluent-badge color="danger">danger</fluent-badge>
    <fluent-badge color="important">important</fluent-badge>
    <fluent-badge color="informative">informative</fluent-badge>
    <fluent-badge color="severe">severe</fluent-badge>
    <fluent-badge color="subtle">subtle</fluent-badge>
    <fluent-badge color="success">success</fluent-badge>
    <fluent-badge color="warning">warning</fluent-badge>
  `),
};

export const Shape: Story = {
  render: renderComponent(html<StoryArgs<FluentBadge>>`
    <fluent-badge shape="circular"></fluent-badge>
    <fluent-badge shape="rounded"></fluent-badge>
    <fluent-badge shape="square"></fluent-badge>
  `),
};

export const Size = {
  render: renderComponent(html<StoryArgs<FluentBadge>>`
    <fluent-badge size="tiny"></fluent-badge>
    <fluent-badge size="extra-small"></fluent-badge>
    <fluent-badge size="small"></fluent-badge>
    <fluent-badge size="medium"></fluent-badge>
    <fluent-badge size="large"></fluent-badge>
    <fluent-badge size="extra-large"></fluent-badge>
  `),
};
