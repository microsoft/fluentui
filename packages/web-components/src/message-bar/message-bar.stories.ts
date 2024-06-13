import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { MessageBar as FluentMessageBar } from './message-bar.js';
import { MessageBarIntent, MessageBarLayout, MessageBarPoliteness, MessageBarShape } from './message-bar.options.js';
import './define';

type MessageBarStoryArgs = Args & FluentMessageBar;
type MessageBarStoryMeta = Meta<MessageBarStoryArgs>;

const dismissed20Regular = html`
  <svg
    fill="currentColor"
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m4.09 4.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 0 1 .63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 0 1-.63.06l-.07-.06a.5.5 0 0 1-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
      fill="currentColor"
    ></path>
  </svg>
`;

const storyTemplate = html<MessageBarStoryArgs>`
  <fluent-message-bar
    shape="${x => x.shape}"
    layout="${x => x.layout}"
    intent="${x => x.intent}"
    politeness="${x => x.politeness}"
  >
    ${x => x.content}
    <div class="actions" slot="actions">
      <fluent-button size="small">Action</fluent-button>
      <fluent-button size="small">Action</fluent-button>
    </div>
    <fluent-button size="small" appearance="transparent" icon-only slot="close"> ${dismissed20Regular} </fluent-button>
  </fluent-message-bar>
`;

export default {
  title: 'Components/MessageBar',
  args: {
    content: 'This is a message bar that provides information to the user.',
    shape: MessageBarShape.rounded,
    layout: MessageBarLayout.singleline,
    intent: MessageBarIntent.info,
    politeness: MessageBarPoliteness.polite,
  },
  argTypes: {
    content: {
      description: 'MessageBar content',
      control: { type: 'text' },
    },
    shape: {
      description: 'MessageBar shape',
      control: { type: 'select' },
      options: Object.values(MessageBarShape),
    },
    layout: {
      description: 'MessageBar layout',
      control: { type: 'select' },
      options: Object.values(MessageBarLayout),
    },
    intent: {
      description: 'MessageBar intent',
      control: { type: 'select' },
      options: Object.values(MessageBarIntent),
    },
    politeness: {
      description: 'MessageBar politeness',
      control: { type: 'select' },
      options: Object.values(MessageBarPoliteness),
    },
  },
} as MessageBarStoryMeta;

export const MessageBar = renderComponent(storyTemplate).bind({}) as any;

export const Shape = renderComponent(html<MessageBarStoryArgs>`
  <fluent-message-bar shape="rounded">
    rounded
    <div class="actions" slot="actions">
      <fluent-button size="small">Action</fluent-button>
      <fluent-button size="small">Action</fluent-button>
    </div>
    <fluent-button size="small" appearance="transparent" icon-only slot="close"> ${dismissed20Regular} </fluent-button>
  </fluent-message-bar>
  <br />
  <fluent-message-bar shape="square">
    square
    <div class="actions" slot="actions">
      <fluent-button size="small">Action</fluent-button>
      <fluent-button size="small">Action</fluent-button>
    </div>
    <fluent-button size="small" appearance="transparent" icon-only slot="close"> ${dismissed20Regular} </fluent-button>
  </fluent-message-bar>
`);

export const Layout = renderComponent(html<MessageBarStoryArgs>`
  <fluent-message-bar layout="singleline">
    singleline
    <div class="actions" slot="actions">
      <fluent-button size="small">Action</fluent-button>
      <fluent-button size="small">Action</fluent-button>
    </div>
    <fluent-button size="small" appearance="transparent" icon-only slot="close"> ${dismissed20Regular} </fluent-button>
  </fluent-message-bar>
  <br />
  <fluent-message-bar layout="multiline">
    multiline
    <div class="actions" slot="actions">
      <fluent-button size="small">Action</fluent-button>
      <fluent-button size="small">Action</fluent-button>
    </div>
    <fluent-button size="small" appearance="transparent" icon-only slot="close"> ${dismissed20Regular} </fluent-button>
  </fluent-message-bar>
`);

export const Intent = renderComponent(html<MessageBarStoryArgs>`
  <fluent-message-bar intent="info">
    info
    <div class="actions" slot="actions">
      <fluent-button size="small">Action</fluent-button>
      <fluent-button size="small">Action</fluent-button>
    </div>
    <fluent-button size="small" appearance="transparent" icon-only slot="close"> ${dismissed20Regular} </fluent-button>
  </fluent-message-bar>
  <br />
  <fluent-message-bar intent="warning">
    warning
    <div class="actions" slot="actions">
      <fluent-button size="small">Action</fluent-button>
      <fluent-button size="small">Action</fluent-button>
    </div>
    <fluent-button size="small" appearance="transparent" icon-only slot="close"> ${dismissed20Regular} </fluent-button>
  </fluent-message-bar>
  <br />
  <fluent-message-bar intent="success">
    success
    <div class="actions" slot="actions">
      <fluent-button size="small">Action</fluent-button>
      <fluent-button size="small">Action</fluent-button>
    </div>
    <fluent-button size="small" appearance="transparent" icon-only slot="close"> ${dismissed20Regular} </fluent-button>
  </fluent-message-bar>
  <br />
  <fluent-message-bar intent="error">
    error
    <div class="actions" slot="actions">
      <fluent-button size="small">Action</fluent-button>
      <fluent-button size="small">Action</fluent-button>
    </div>
    <fluent-button size="small" appearance="transparent" icon-only slot="close"> ${dismissed20Regular} </fluent-button>
  </fluent-message-bar>
`);
