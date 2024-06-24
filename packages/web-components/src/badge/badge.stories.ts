import { html, when } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Badge as FluentBadge } from './badge.js';
import { BadgeAppearance, BadgeColor, BadgeShape, BadgeSize } from './badge.options.js';

type BadgeStoryArgs = Args & FluentBadge;
type BadgeStoryMeta = Meta<BadgeStoryArgs>;

const storyTemplate = html<BadgeStoryArgs>`
  <fluent-badge appearance="${x => x.appearance}" color="${x => x.color}" shape="${x => x.shape}" size="${x => x.size}">
    ${when(
      x => x.iconPosition === 'start',
      html<BadgeStoryArgs>`<svg
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
      html<BadgeStoryArgs>`<svg
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
    )}
  </fluent-badge>
`;

export default {
  title: 'Components/Badge/Badge',
  args: {
    content: null,
    appearance: BadgeAppearance.filled,
    color: BadgeColor.brand,
    shape: BadgeShape.circular,
    size: BadgeSize.medium,
    iconPosition: 'none',
  },
  argTypes: {
    appearance: {
      description: 'Sets the appearance of the badge to one of the predefined styles',
      table: {
        defaultValue: { summary: BadgeAppearance.filled },
      },
      control: {
        type: 'select',
        options: Object.values(BadgeAppearance),
      },
    },
    color: {
      description: 'Sets the color of the badge to one of the predefined colors',
      table: {
        defaultValue: { summary: BadgeColor.brand },
      },
      control: {
        type: 'select',
        options: Object.values(BadgeColor),
      },
    },
    shape: {
      description: 'Sets the shape of the badge to one of the predefined shapes',
      table: {
        defaultValue: { summary: BadgeShape.circular },
      },
      control: {
        type: 'select',
        options: Object.values(BadgeShape),
      },
    },
    size: {
      description: 'Sets the size of the badge to one of the predefined sizes',
      table: {
        defaultValue: { summary: BadgeSize.medium },
      },
      control: {
        type: 'select',
        options: Object.values(BadgeSize),
      },
    },
    iconPosition: {
      description: 'Sets the position of the icon to start or end of the badge content',
      table: {
        defaultValue: { summary: 'none' },
      },
      control: {
        type: 'select',
        options: ['none', 'start', 'end'],
      },
    },
    content: {
      description: 'Sets the content of the badge',
      control: 'text',
    },
  },
} as BadgeStoryMeta;

export const Badge = renderComponent(storyTemplate).bind({});

export const Appearance = renderComponent(html<BadgeStoryArgs>`
  <fluent-badge appearance="filled">filled</fluent-badge>
  <fluent-badge appearance="ghost">ghost</fluent-badge>
  <fluent-badge appearance="outline">outline</fluent-badge>
  <fluent-badge appearance="tint">tint</fluent-badge>
`);

export const Color = renderComponent(html<BadgeStoryArgs>`
  <fluent-badge color="brand">brand</fluent-badge>
  <fluent-badge color="danger">danger</fluent-badge>
  <fluent-badge color="important">important</fluent-badge>
  <fluent-badge color="informative">informative</fluent-badge>
  <fluent-badge color="severe">severe</fluent-badge>
  <fluent-badge color="subtle">subtle</fluent-badge>
  <fluent-badge color="success">success</fluent-badge>
  <fluent-badge color="warning">warning</fluent-badge>
`);

export const Shape = renderComponent(html<BadgeStoryArgs>`
  <fluent-badge shape="circular"></fluent-badge>
  <fluent-badge shape="rounded"></fluent-badge>
  <fluent-badge shape="square"></fluent-badge>
`);

export const Size = renderComponent(html<BadgeStoryArgs>`
  <fluent-badge size="tiny"></fluent-badge>
  <fluent-badge size="extra-small"></fluent-badge>
  <fluent-badge size="small"></fluent-badge>
  <fluent-badge size="medium"></fluent-badge>
  <fluent-badge size="large"></fluent-badge>
  <fluent-badge size="extra-large"></fluent-badge>
`) as BadgeStoryMeta;
