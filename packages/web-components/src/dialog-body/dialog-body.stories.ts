import { html } from '@microsoft/fast-element';
import type { Args } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { DialogBody as FluentDialogBody } from './dialog-body.js';

type DialogStoryArgs = Args & FluentDialogBody;

const dismissed20Regular = html<DialogStoryArgs>`
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

const dialogTemplate = html<DialogStoryArgs>`
    <fluent-dialog-body>
      <div slot="title">This is a Dialog title</div>
      <fluent-text weight="regular" block>
        <p>
          The dialog component is a window overlaid on either the primary window or another dialog window. Windows under
          a modal dialog are inert. That is, users cannot <a href="#">interact</a> with content outside an active dialog
          window.
        </p>
      </fluent-text>
      <br />
      <fluent-text block><code>fluent-dialog</code></fluent-text>
      <fluent-button
        slot="actions"
        id="dialog-default-close"
      >
        Close Dialog
      </fluent-button>
  </fluent-dialog>
`;

export default {
  title: 'Components/Dialog/Dialog Body',
  argTypes: {
    noTitleAction: {
      description:
        'Used to opt out of rendering the default title action that is rendered when the dialog <code>type</code>is set to <code>non-modal</code>',
      table: {
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    titleAction: {
      description:
        'Slot for the title action elements (e.g. Close button). When the dialog <code>type</code> is set to <code>non-modal</code> and no title action is provided, a default title action button is rendered.',
    },
    defaultTitleAction: {
      description: 'The default title action button',
    },
  },
};

export const Default = renderComponent(dialogTemplate).bind({});

export const Basic = renderComponent(html<DialogStoryArgs>`
  <fluent-dialog-body>
    <div slot="title">Basic</div>
    <fluent-text block>
      <p>
        A dialog should have no more than <fluent-text weight="bold"><span>two</span></fluent-text>
        actions.
      </p>
    </fluent-text>
    <fluent-text block>
      <p>However, if required, you can populate the action slot with any number of buttons as needed.</p>
    </fluent-text>
    <br />
    <fluent-text block><code>slot="action"</code></fluent-text>
    <fluent-button slot="action">Close Dialog</fluent-button>
    <fluent-button appearance="primary" slot="action">Call to Action</fluent-button>
  </fluent-dialog-body>
`);

export const Actions = renderComponent(html<DialogStoryArgs>`
  <fluent-dialog-body id="dialog-fluidactions">
    <div slot="title">Actions</div>
    <fluent-button appearance="transparent" icon-only slot="title-action"> ${dismissed20Regular} </fluent-button>
    <div>
      <fluent-text block>
        <p>
          A dialog body should have no more than <strong>two</strong> footer actions. However, if required, you can
          populate the action slot with any number of buttons as needed.
        </p>
      </fluent-text>
      <fluent-text block><code>slot="action"</code></fluent-text>
    </div>

    <fluent-button size="small" slot="action">Something</fluent-button>
    <fluent-button size="small" slot="action">Something Else</fluent-button>

    <fluent-button slot="action" size="small" appearance="primary">Close Dialog</fluent-button>
    <fluent-button size="small" slot="action">Something Else Entirely</fluent-button>
  </fluent-dialog-body>
`);

export const NoTitleAction = renderComponent(html<DialogStoryArgs>`
  <fluent-dialog-body no-title-action>
    <div slot="title">No Title Action</div>
    <fluent-text block>
      <p>Removing the title action will prevent the default close button from being rendered in a non-modal dialog.</p>
    </fluent-text>
    <br />
    <fluent-text block><code>no-title-action</code></fluent-text>
  </fluent-dialog-body>
`);

export const CustomTitleAction = renderComponent(html<DialogStoryArgs>`
  <fluent-dialog-body>
    <div slot="title">Custom Title Action</div>
    <fluent-button
      slot="title-action"
      appearance="transparent"
      icon-only
      @click="${(e: Event, c) => alert('This is a custom action')}"
    >
      ${dismissCircle20Regular}
    </fluent-button>
    <fluent-text block>
      <p>
        A dialog should have no more than <fluent-text weight="bold"><span>two</span></fluent-text> actions.
      </p>
    </fluent-text>
    <fluent-text block><code>slot="title-action"</code></fluent-text>
    <fluent-button slot="action">Close Dialog</fluent-button>
  </fluent-dialog-body>
`);

export const NoTitleAndNoAction = renderComponent(html<DialogStoryArgs>`
  <fluent-dialog-body no-title-action>
    <fluent-text block>
      <p>
        A dialog should have no more than <fluent-text weight="bold"><span>two</span></fluent-text> actions.
      </p>
    </fluent-text>
    <br />
    <fluent-text block><code>no-title-action</code></fluent-text>
  </fluent-dialog-body>
`);
