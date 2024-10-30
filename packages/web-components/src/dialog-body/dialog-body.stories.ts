import { html } from '@microsoft/fast-element';
import { type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import type { DialogBody as FluentDialogBody } from './dialog-body.js';

type Story = StoryObj<FluentDialogBody>;

const dismissed20Regular = html<StoryArgs<FluentDialogBody>>`
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

const dismissCircle20Regular = html`<svg
  fill="currentColor"
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 1a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM7.8 7.11l.08.06L10 9.3l2.12-2.12a.5.5 0 0 1 .64-.06l.07.06c.17.18.2.44.06.64l-.06.07L10.7 10l2.12 2.12c.17.17.2.44.06.64l-.06.07a.5.5 0 0 1-.64.06l-.07-.06L10 10.7l-2.12 2.12a.5.5 0 0 1-.64.06l-.07-.06a.5.5 0 0 1-.06-.64l.06-.07L9.3 10 7.17 7.88a.5.5 0 0 1-.06-.64l.06-.07a.5.5 0 0 1 .64-.06Z"
    fill="currentColor"
  ></path>
</svg>`;

const storyTemplate = html<StoryArgs<FluentDialogBody>>`
  <fluent-dialog-body>
      ${x => x.titleSlottedContent?.()}
      ${x => x.titleActionSlottedContent?.()}
      ${x => x.slottedContent?.()}
      ${x => x.actionSlottedContent?.()}
</fluent-dialog>
`;

export default {
  render: renderComponent(storyTemplate),
  title: 'Components/Dialog/Dialog Body',
  argTypes: {
    noTitleAction: {
      control: 'boolean',
      description:
        'Used to opt out of rendering the default title action that is rendered when the dialog `type` is set to `non-modal`.',
      table: {
        category: 'attributes',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    slottedContent: {
      control: false,
      name: '',
      description: 'The default slot, for the dialog content.',
      table: { category: 'slots', type: {} },
    },
    actionSlottedContent: {
      control: false,
      description: 'Slot for the dialog actions, such as buttons.',
      name: 'action',
      table: { category: 'slots', type: {} },
    },
    titleActionSlottedContent: {
      control: false,
      description:
        'Slot for the title action elements (e.g. Close button). When the dialog `type` is set to `non-modal` and no title action is provided, a default title action button is rendered.',
      name: 'title-action',
      table: { category: 'slots', type: {} },
    },
    titleSlottedContent: {
      control: false,
      description: 'Slot for the title element.',
      name: 'title',
      table: { category: 'slots', type: {} },
    },
  },
} as Meta<FluentDialogBody>;

export const Default: Story = {
  args: {
    actionSlottedContent: () =>
      html` <fluent-button slot="action" id="dialog-default-close">Close Dialog</fluent-button> `,

    slottedContent: () => html`
      <p>
        The dialog component is a window overlaid on either the primary window or another dialog window. Windows under a
        modal dialog are inert. That is, users cannot
        <a href="#">interact</a>
        with content outside an active dialog window.
      </p>
    `,

    titleSlottedContent: () => html` <div slot="title">Dialog Body</div> `,
  },
};

export const Basic: Story = {
  args: {
    titleSlottedContent: () => html` <div slot="title">Basic</div> `,
    slottedContent: () => html`
      <p>
        A dialog should have no more than
        <strong>two</strong>
        actions. However, if required, you can populate the action slot with any number of buttons as needed.
      </p>
    `,
    actionSlottedContent: () => html`
      <fluent-button slot="action">Close Dialog</fluent-button>
      <fluent-button appearance="primary" slot="action">Call to Action</fluent-button>
    `,
  },
};

export const Actions: Story = {
  args: {
    actionSlottedContent: () => html`
      <fluent-button slot="action" size="small">Something</fluent-button>
      <fluent-button slot="action" size="small">Something Else</fluent-button>
      <fluent-button slot="action" size="small" appearance="primary"> Close Dialog </fluent-button>
      <fluent-button size="small" slot="action">Something Else Entirely</fluent-button>
    `,
    slottedContent: () => html`
      <p>
        A dialog body should have no more than
        <strong>two</strong>
        footer actions. However, if required, you can populate the action slot with any number of buttons as needed.
      </p>
    `,
    titleActionSlottedContent: () => html`
      <fluent-button appearance="transparent" icon-only slot="title-action"> ${dismissed20Regular} </fluent-button>
    `,
    titleSlottedContent: () => html` <div slot="title">Actions</div> `,
  },
};

export const NoTitleAction: Story = {
  args: {
    noTitleAction: true,
    titleSlottedContent: () => html` <div slot="title">No Title Action</div> `,
    slottedContent: () => html`
      <p>Omitting the title action will prevent the default close button from being rendered in a non-modal dialog.</p>
    `,
  },
};

export const CustomTitleAction: Story = {
  args: {
    slottedContent: () => html`
      <p>This dialog has a custom title action that is rendered in place of the default close button.</p>
    `,
    titleSlottedContent: () => html` <div slot="title">Custom Title Action</div> `,

    titleActionSlottedContent: () => html`
      <fluent-button
        slot="title-action"
        appearance="transparent"
        icon-only
        @click="${() => alert('This is a custom action')}"
      >
        ${dismissCircle20Regular}
      </fluent-button>
    `,
  },
};

export const NoTitleAndNoAction: Story = {
  args: {
    noTitleAction: true,
    slottedContent: () => html`
      <p>Omitting the title action will prevent the default close button from being rendered in a non-modal dialog.</p>
    `,
  },
};
