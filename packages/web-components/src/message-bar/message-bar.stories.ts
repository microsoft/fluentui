import { html, repeat } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { MessageBar as FluentMessageBar } from './message-bar.js';
import { MessageBarIntent, MessageBarLayout, MessageBarShape } from './message-bar.options.js';

type Story = StoryObj<FluentMessageBar>;

const checkmarkCircle20Filled = html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16m3.358 5.646a.5.5 0 0 0-.637-.057l-.07.057L9 11.298L7.354 9.651l-.07-.058a.5.5 0 0 0-.695.696l.057.07l2 2l.07.057a.5.5 0 0 0 .568 0l.07-.058l4.004-4.004l.058-.07a.5.5 0 0 0-.058-.638"
  />
</svg>`;

const dismiss20Regular = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  class="fluent--dismiss-20-regular"
  viewBox="0 0 20 20"
  aria-hidden="true"
  width="20"
  height="20"
>
  <path
    fill="currentColor"
    d="m4.089 4.216l.057-.07a.5.5 0 0 1 .638-.057l.07.057L10 9.293l5.146-5.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L10.707 10l5.147 5.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L10 10.707l-5.146 5.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L9.293 10L4.146 4.854a.5.5 0 0 1-.057-.638l.057-.07z"
  />
</svg>`;

const dismissCircle20Filled = html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16M7.81 7.114a.5.5 0 0 0-.638.058l-.058.069a.5.5 0 0 0 .058.638L9.292 10l-2.12 2.121l-.058.07a.5.5 0 0 0 .058.637l.069.058a.5.5 0 0 0 .638-.058L10 10.708l2.121 2.12l.07.058a.5.5 0 0 0 .637-.058l.058-.069a.5.5 0 0 0-.058-.638L10.708 10l2.12-2.121l.058-.07a.5.5 0 0 0-.058-.637l-.069-.058a.5.5 0 0 0-.638.058L10 9.292l-2.121-2.12z"
  />
</svg>`;

const info20Regular = html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M10.492 8.91A.5.5 0 0 0 9.5 9v4.502l.008.09a.5.5 0 0 0 .992-.09V9zm.307-2.16a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0M18 10a8 8 0 1 0-16 0a8 8 0 0 0 16 0M3 10a7 7 0 1 1 14 0a7 7 0 0 1-14 0"
  />
</svg>`;

const warning20Filled = html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M8.681 2.785c.568-1.047 2.071-1.047 2.638 0l6.5 12.002A1.5 1.5 0 0 1 16.502 17H3.498a1.5 1.5 0 0 1-1.319-2.215zM10.5 7.5a.5.5 0 0 0-1 0v4a.5.5 0 0 0 1 0zm.25 6.25a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0"
  />
</svg>`;

const storyTemplate = html<StoryArgs<FluentMessageBar>>`
  <fluent-message-bar
    shape="${story => story.shape}"
    layout="${story => story.layout}"
    intent="${story => story.intent}"
    aria-live="${story => story.ariaLive}"
    aria-labelledby="${story => story.ariaLabelledby}"
  >
    ${story => story.iconSlottedContent?.()} ${story => story.slottedContent?.()}
    ${story => story.actionsSlottedContent?.()} ${story => story.dismissSlottedContent?.()}
  </fluent-message-bar>
`;

export default {
  title: 'Components/MessageBar',
  render: renderComponent(storyTemplate),
  args: {
    slottedContent: () => 'This is a message bar that provides information to the user.',

    iconSlottedContent: () => html` <span slot="icon">${info20Regular}</span> `,

    actionsSlottedContent: () => html` <fluent-button slot="actions" size="small">Action</fluent-button> `,

    dismissSlottedContent: () => html`
      <fluent-button slot="dismiss" size="small" appearance="transparent" icon-only>
        ${dismiss20Regular}
      </fluent-button>
    `,
  },
  argTypes: {
    ariaLabelledby: { table: { disable: true } },
    ariaLive: { table: { disable: true } },
    intent: {
      control: 'select',
      description: 'MessageBar intent',
      options: ['', ...Object.values(MessageBarIntent)],
      mapping: { '': null, ...MessageBarIntent },
      table: {
        category: 'attributes',
        type: { summary: Object.values(MessageBarIntent).join('|') },
      },
    },
    layout: {
      control: 'select',
      description: 'MessageBar layout',
      options: ['', ...Object.values(MessageBarLayout)],
      mapping: { '': null, ...MessageBarLayout },
      table: {
        category: 'attributes',
        type: { summary: Object.values(MessageBarLayout).join('|') },
      },
    },
    shape: {
      control: 'select',
      description: 'MessageBar shape',
      options: ['', ...Object.values(MessageBarShape)],
      mapping: { '': null, ...MessageBarShape },
      table: {
        category: 'attributes',
        type: { summary: Object.values(MessageBarShape).join('|') },
      },
    },
    slottedContent: {
      control: false,
      description: 'The default slot, for the main content',
      name: '',
      table: { category: 'slots', type: {} },
    },
    iconSlottedContent: {
      control: false,
      description: 'Slot for icons, to be displayed inline before the main content.',
      name: 'icon',
      table: { category: 'slots', type: {} },
    },
    actionsSlottedContent: {
      control: false,
      description: 'Slot for actions, to be displayed inline after the main content.',
      name: 'actions',
      table: { category: 'slots', type: {} },
    },
    dismissSlottedContent: {
      control: false,
      description: 'Slot for dismiss button, to be displayed inline at the end of the message bar.',
      name: 'dismiss',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentMessageBar>;

export const Default: Story = {};

export const Layout: Story = {
  render: renderComponent(html`
    ${repeat(
      [
        {
          iconSlottedContent: () => html` <span slot="icon">${info20Regular}</span> `,

          slottedContent: () => 'This is a message bar that provides information to the user.',
        },
        {
          layout: MessageBarLayout.multiline,
          iconSlottedContent: () => html` <span slot="icon">${info20Regular}</span> `,

          slottedContent: () =>
            'The content of this message bar is multiline. That means it can span multiple lines. This is useful for longer messages. Hopefully this message is long enough to wrap to the next few lines.',
        },
      ].map(x => ({ ...Default.args, ...x })),
      storyTemplate,
    )}
  `),
};

export const Intent = {
  render: renderComponent(html`
    ${repeat(
      [
        {
          intent: MessageBarIntent.info,
          iconSlottedContent: () => html` <span slot="icon">${info20Regular}</span> `,

          slottedContent: () => 'info',
        },
        {
          intent: MessageBarIntent.warning,
          iconSlottedContent: () => html` <span slot="icon" style="color: #DA3B01">${warning20Filled}</span> `,

          slottedContent: () => 'warning',

          actionsSlottedContent: () => html` <fluent-button size="small" slot="actions">Action</fluent-button> `,
        },
        {
          intent: MessageBarIntent.success,
          iconSlottedContent: () => html`
            <span slot="icon" style="color: #0E700E"> ${checkmarkCircle20Filled} </span>
          `,

          slottedContent: () => 'success',

          actionsSlottedContent: () => html` <fluent-button size="small" slot="actions">Action</fluent-button> `,
        },
        {
          intent: MessageBarIntent.error,
          iconSlottedContent: () => html` <span slot="icon" style="color: #B10E1C"> ${dismissCircle20Filled} </span> `,

          slottedContent: () => 'error',

          actionsSlottedContent: () => html` <fluent-button size="small" slot="actions">Action</fluent-button> `,
        },
      ].map(x => ({ ...Default.args, ...x })),
      storyTemplate,
    )}
  `),
};

export const AriaLiveAssertive = {
  name: 'aria-live="assertive"',
  args: {
    ...Default.args,
    ariaLive: 'assertive',
    slottedContent: () => 'This is a message bar that provides information to the user.',
  },
};

export const LabelledBy = {
  name: 'aria-labelledby',
  render: renderComponent(html`
    <div id="message-bar-label">This is a label that describes the message bar.</div>
    ${storyTemplate}
  `),
  args: {
    ...Default.args,
    ariaLabelledby: 'message-bar-label',
    slottedContent: () => 'This is a message bar that provides information to the user.',
  },
};
