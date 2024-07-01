import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import { MessageBar as FluentMessageBar } from './message-bar.js';
import { MessageBarIntent, MessageBarLayout, MessageBarShape } from './message-bar.options.js';
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

const infoIcon = html`
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10ZM9.50806 8.91012C9.55039 8.67687 9.75454 8.49999 10 8.49999C10.2455 8.49999 10.4496 8.67687 10.4919 8.91012L10.5 8.99999V13.5021L10.4919 13.592C10.4496 13.8253 10.2455 14.0021 10 14.0021C9.75454 14.0021 9.55039 13.8253 9.50806 13.592L9.5 13.5021V8.99999L9.50806 8.91012ZM9.25 6.74999C9.25 6.33578 9.58579 5.99999 10 5.99999C10.4142 5.99999 10.75 6.33578 10.75 6.74999C10.75 7.16421 10.4142 7.49999 10 7.49999C9.58579 7.49999 9.25 7.16421 9.25 6.74999Z"
      fill="#616161"
    />
  </svg>
`;

const warningIcon = html`
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.68149 2.78544C9.24892 1.73813 10.752 1.73821 11.3193 2.78557L17.8198 14.7865C18.3612 15.786 17.6375 17.0009 16.5009 17.0009H3.4982C2.36147 17.0009 1.63783 15.7858 2.17934 14.7864L8.68149 2.78544ZM10.5 7.5C10.5 7.22386 10.2761 7 10 7C9.72386 7 9.5 7.22386 9.5 7.5V11.5C9.5 11.7761 9.72386 12 10 12C10.2761 12 10.5 11.7761 10.5 11.5V7.5ZM10.75 13.75C10.75 13.3358 10.4142 13 10 13C9.58579 13 9.25 13.3358 9.25 13.75C9.25 14.1642 9.58579 14.5 10 14.5C10.4142 14.5 10.75 14.1642 10.75 13.75Z"
      fill="#DA3B01"
    />
  </svg>
`;

const successIcon = html`
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM13.3584 7.64645C13.1849 7.47288 12.9154 7.4536 12.7206 7.58859L12.6513 7.64645L9 11.298L7.35355 9.65131L7.28431 9.59346C7.08944 9.45846 6.82001 9.47775 6.64645 9.65131C6.47288 9.82488 6.4536 10.0943 6.58859 10.2892L6.64645 10.3584L8.64645 12.3584L8.71569 12.4163C8.8862 12.5344 9.1138 12.5344 9.28431 12.4163L9.35355 12.3584L13.3584 8.35355L13.4163 8.28431C13.5513 8.08944 13.532 7.82001 13.3584 7.64645Z"
      fill="#0E700E"
    />
  </svg>
`;

const errorIcon = html`
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM7.80943 7.11372C7.61456 6.97872 7.34514 6.99801 7.17157 7.17157L7.11372 7.24082C6.97872 7.43569 6.99801 7.70511 7.17157 7.87868L9.29289 10L7.17157 12.1213L7.11372 12.1906C6.97872 12.3854 6.99801 12.6549 7.17157 12.8284L7.24082 12.8863C7.43569 13.0213 7.70511 13.002 7.87868 12.8284L10 10.7071L12.1213 12.8284L12.1906 12.8863C12.3854 13.0213 12.6549 13.002 12.8284 12.8284L12.8863 12.7592C13.0213 12.5643 13.002 12.2949 12.8284 12.1213L10.7071 10L12.8284 7.87868L12.8863 7.80943C13.0213 7.61456 13.002 7.34514 12.8284 7.17157L12.7592 7.11372C12.5643 6.97872 12.2949 6.99801 12.1213 7.17157L10 9.29289L7.87868 7.17157L7.80943 7.11372Z"
      fill="#B10E1C"
    />
  </svg>
`;

const storyTemplate = html<MessageBarStoryArgs>`
  <fluent-message-bar shape="${x => x.shape}" layout="${x => x.layout}" intent="${x => x.intent}">
    <span slot="icon">${infoIcon}</span>
    ${x => x.content}
    <fluent-button size="small" slot="actions">Action</fluent-button>
    <fluent-button size="small" appearance="transparent" icon-only slot="dismiss">
      ${dismissed20Regular}
    </fluent-button>
  </fluent-message-bar>
`;

export default {
  title: 'Components/MessageBar',
  args: {
    content: 'This is a message bar that provides information to the user.',
    shape: MessageBarShape.rounded,
    layout: MessageBarLayout.singleline,
    intent: MessageBarIntent.info,
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
  },
} as MessageBarStoryMeta;

export const MessageBar = renderComponent(storyTemplate).bind({}) as any;

export const Shape = renderComponent(html<MessageBarStoryArgs>`
  <fluent-message-bar shape="rounded">
    <span slot="icon">${infoIcon}</span>
    rounded
    <fluent-button size="small" slot="actions">Action</fluent-button>
    <fluent-button size="small" slot="actions">Action 2</fluent-button>
    <fluent-button size="small" appearance="transparent" icon-only slot="dismiss">
      ${dismissed20Regular}
    </fluent-button>
  </fluent-message-bar>
  <br />
  <fluent-message-bar shape="square">
    <span slot="icon">${infoIcon}</span>
    square
    <fluent-button size="small" slot="actions">Action</fluent-button>
    <fluent-button size="small" appearance="transparent" icon-only slot="dismiss">
      ${dismissed20Regular}
    </fluent-button>
  </fluent-message-bar>
`);

export const Layout = renderComponent(html<MessageBarStoryArgs>`
  <fluent-message-bar>
    <span slot="icon">${infoIcon}</span>
    singleline
    <fluent-button size="small" slot="actions">Action</fluent-button>
    <fluent-button size="small" appearance="transparent" icon-only slot="dismiss">
      ${dismissed20Regular}
    </fluent-button>
  </fluent-message-bar>
  <br />
  <fluent-message-bar layout="multiline">
    <span slot="icon">${infoIcon}</span>
    This is a message bar that provides information to the user. This is a message bar that provides information to the
    user.
    <fluent-button size="small" slot="actions">Action</fluent-button>
    <fluent-button size="small" appearance="transparent" icon-only slot="dismiss">
      ${dismissed20Regular}
    </fluent-button>
  </fluent-message-bar>
`);

export const Intent = renderComponent(html<MessageBarStoryArgs>`
  <fluent-message-bar>
    <span slot="icon">${infoIcon}</span>
    info
    <fluent-button size="small" slot="actions">Action</fluent-button>
    <fluent-button size="small" appearance="transparent" icon-only slot="dismiss">
      ${dismissed20Regular}
    </fluent-button>
  </fluent-message-bar>
  <br />
  <fluent-message-bar intent="warning">
    <span slot="icon">${warningIcon}</span>
    warning
    <fluent-button size="small" slot="actions">Action</fluent-button>
    <fluent-button size="small" appearance="transparent" icon-only slot="dismiss">
      ${dismissed20Regular}
    </fluent-button>
  </fluent-message-bar>
  <br />
  <fluent-message-bar intent="success">
    <span slot="icon">${successIcon}</span>
    success
    <fluent-button size="small" slot="actions">Action</fluent-button>
    <fluent-button size="small" appearance="transparent" icon-only slot="dismiss">
      ${dismissed20Regular}
    </fluent-button>
  </fluent-message-bar>
  <br />
  <fluent-message-bar intent="error">
    <span slot="icon">${errorIcon}</span>
    error
    <fluent-button size="small" slot="actions">Action</fluent-button>
    <fluent-button size="small" appearance="transparent" icon-only slot="dismiss">
      ${dismissed20Regular}
    </fluent-button>
  </fluent-message-bar>
`);

export const Assertive = renderComponent(html<MessageBarStoryArgs>`
  <fluent-message-bar aria-live="assertive">
    <span slot="icon">${infoIcon}</span>
    info
    <fluent-button size="small" slot="actions">Action</fluent-button>
    <fluent-button size="small" appearance="transparent" icon-only slot="dismiss">
      ${dismissed20Regular}
    </fluent-button>
  </fluent-message-bar>
`);

export const LabelledBy = renderComponent(html<MessageBarStoryArgs>`
  <fluent-label id="message-bar-label">This is a message bar that provides information to the user.</fluent-label>
  <fluent-message-bar id="message-bar-with-label" aria-labelledby="message-bar-label">
    <span slot="icon">${infoIcon}</span>
    info
    <fluent-button size="small" slot="actions">Action</fluent-button>
    <fluent-button size="small" appearance="transparent" icon-only slot="dismiss">
      ${dismissed20Regular}
    </fluent-button>
  </fluent-message-bar>
`);
