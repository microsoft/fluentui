import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Dialog, Dialog as FluentDialog } from './dialog.js';
import './define.js';
import '../button/define.js';
import '../text/define.js';

type DialogStoryArgs = Args & FluentDialog;
type DialogStoryMeta = Meta<DialogStoryArgs>;

const dismissed16Regular = html`
  <svg
    fill="currentColor"
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m2.59 2.72.06-.07a.5.5 0 0 1 .63-.06l.07.06L8 7.29l4.65-4.64a.5.5 0 0 1 .7.7L8.71 8l4.64 4.65c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L8 8.71l-4.65 4.64a.5.5 0 0 1-.7-.7L7.29 8 2.65 3.35a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
      fill="currentColor"
    ></path>
  </svg>
`;

const subtract20Filled = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="3" y="9.25" width="14" height="1.5" rx="0.75" fill="#212121" />
</svg>`;

const closeDialog = () => {
  const dialog = document.getElementById('dialog-default') as Dialog;
  dialog.hide();
};

const openDialog = () => {
  const dialog = document.getElementById('dialog-default') as Dialog;
  dialog.show();
};

const dialogTemplate = html<DialogStoryArgs>`
  <div>
    <style>
      .storybook-root {
        height: 100%;
      }
      div.docs-story > div:first-child {
        height: 36em;
        padding: 0;
      }
      .sbdocs-content {
        max-width: 1200px;
      }
      ::part(positioning-region),
      ::part(overlay) {
        position: absolute;
      }
    </style>
    <div
      style="display: flex; justify-content: center; align-items: center; height: 500px; margin-top: auto; margin-bottom: auto;"
    >
      <fluent-button @click="${() => openDialog()}">Open Dialog</fluent-button>
      <fluent-dialog id="dialog-default" ?modal=${x => x.modal} ?alert=${x => x.alert} hidden>
        <div slot="header">Dialog Header</div>
        <div>Dialog content</div>
        <div slot="actions">
          <fluent-button appearance="primary" @click="${() => closeDialog()}">Close Drawer</fluent-button>
          <fluent-button>Do something</fluent-button>
        </div>
      </fluent-dialog>
    </div>
  </div>
`;

export default {
  title: 'Components/Dialog',
  args: {
    modal: false,
    alert: false,
    hidden: false,
  },
  argTypes: {
    hidden: {
      description: 'Renders dialog as a modal',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      control: 'boolean',
    },
    modal: {
      description: 'Renders dialog as an modal',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      control: 'boolean',
    },
    alert: {
      description: 'Renders dialog as an alert',
      table: {
        defaultValue: {
          summary: false,
        },
      },
      control: 'boolean',
    },
  },
} as DialogStoryMeta;

export const Default = renderComponent(dialogTemplate).bind({});
