import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Dialog as FluentDialog } from './dialog.js';
import { DialogType } from './dialog.options.js';

type DialogStoryArgs = Args & FluentDialog;
type DialogStoryMeta = Meta<DialogStoryArgs>;

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

const closeDialog = (e: Event, id: string, dismissed: boolean = false) => {
  const dialog = document.getElementById(id) as FluentDialog;
  dialog.hide();
};

const openDialog = (e: Event, id: string) => {
  const dialog = document.getElementById(id) as FluentDialog;
  dialog.show();
};

const dialogTemplate = html<DialogStoryArgs>`
  <style>
    .css-t5lsh6 {
      display: none;
    }
  </style>
  <div>
    <fluent-button @click=${(e: Event, c) => openDialog(e, 'dialog-default')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-default" type="${x => x.type}" ?no-title-action="${x => x.noTitleAction}">
      <fluent-dialog-body>
        <fluent-text slot="title">Dialog</fluent-text>
        <fluent-text weight="regular" block>
          <p>
            The dialog component is a window overlaid on either the primary window or another dialog window. Windows
            under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window.
          </p>
        </fluent-text>
        <br />
        <fluent-text block><code>fluent-dialog</code></fluent-text>
        <fluent-button
          id="dialog-default-close"
          slot="action"
          appearance="primary"
          @click="${(e: Event, c) => closeDialog(e, 'dialog-default')}"
          >Close Dialog</fluent-button
        >
        <fluent-button id="dialog-default-dosomething" slot="action" tabindex="0">Do Something</fluent-button>
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`;

export default {
  title: 'Components/Dialog/Dialog',
  args: {
    type: DialogType.modal,
  },
  argTypes: {
    type: {
      description:
        '<code>modal</code>: When this type of dialog is open, the rest of the page is dimmed out and cannot be interacted with. The tab sequence is kept within the dialog and moving the focus outside the dialog will imply closing it. This is the default type of the component.<br /><br /><code>non-modal</code>: When a non-modal dialog is open, the rest of the page is not dimmed out and users can interact with the rest of the page. This also implies that the tab focus can move outside the dialog when it reaches the last focusable element.<br /><br /><code>alert</code>: A special type of modal dialog that interrupts the users workflow to communicate an important message or ask for a decision. Unlike a typical modal dialog, the user must take an action through the options given to dismiss the dialog, and it cannot be dismissed through the dimmed background.',
      table: {
        defaultValue: { summary: DialogType.modal },
      },
      control: {
        type: 'select',
        options: Object.values(DialogType),
      },
      defaultValue: DialogType.modal,
    },
    beforetoggle: {
      description: `A CustomEvent emitted before the open state changes.<br /><br /> <code>detail</code>: An object containing the <code>oldState</code> and <code>newState</code> of the dialog with the string value of either <code>'open'</code> or <code>'closed'</code>'`,
    },
    toggle: {
      description: `A CustomEvent emitted after the open state changes.<br /><br /> <code>detail</code>: An object containing the <code>oldState</code> and <code>newState</code> of the dialog with the string value of either <code>'open'</code> or <code>'closed'</code>'`,
    },
  },
} as DialogStoryMeta;

export const Default = renderComponent(dialogTemplate).bind({});

export const Modal = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block>
      <p>
        A modal is a type of dialog that temporarily halts the main workflow to convey a significant message or require
        user interaction. By default, interactions such as clicking outside the dialog or pressing the Escape key will
        close the modal-dialog, resuming the user's interaction with the main content.
      </p>
    </fluent-text>
    <br />
    <fluent-text block><code>type="modal"</code></fluent-text>
    <br />
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-modal')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-modal" type="${DialogType.modal}">
      <fluent-dialog-body>
        <div slot="title">Modal</div>
        <div>
          A modal is a type of dialog that temporarily halts the main workflow to convey a significant message or
          require user interaction. By default, interactions such as clicking outside the dialog or pressing the Escape
          key will close the modal-dialog, resuming the user's interaction with the main content.
        </div>
        <br />
        <fluent-text><code>type="modal"</code></fluent-text>
        <fluent-button slot="action" appearance="primary" @click="${(e: Event, c) => closeDialog(e, 'dialog-modal')}"
          >Close Dialog</fluent-button
        >
        <fluent-button slot="action">Do Something</fluent-button>
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);

export const NonModal = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block>
      <span>
        A non-modal dialog by default presents no backdrop, allowing elements outside of the dialog to be interacted with.
        A non-modal dialog will present by default a close button.
      </span>
    </fluent-text>
    <br />
    <fluent-text size="300" block><p><b>Note:</b> if an element outside of the dialog is focused then it will not be possible to close the dialog with the Escape key.</p></fluent-text>
    <br />
    <fluent-text block><code>type="non-modal"</code></fluent-text>
    <br />

    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-nonmodal')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-nonmodal" type="${DialogType.nonModal}">
      <fluent-dialog-body>
        <div slot="title">Non-modal</div>
        <fluent-text block>
          <p>
            A non-modal dialog by default presents no backdrop, allowing elements outside of the dialog to be interacted with.

            A non-modal dialog will present by default a closeButton.
          </p>
        </fluent-text>
        </fluent-text block>
          <p><fluent-text weight="bold" as="span"><span>Note:<span></fluent-text> if an element outside of the dialog is focused then it will not be possible to close the dialog with the Escape key.</p>
        </fluent-text>
        <fluent-text block><code>type="non-modal"</code></fluent-text>
        <fluent-button slot="action" appearance="primary" @click="${(e: Event, c) =>
          closeDialog(e, 'dialog-nonmodal')}">
          Close Dialog
          </fluent-button>
        <fluent-button slot="action">Do Something</fluent-button>
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);

export const Alert = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block>
      <p>
        An alert is a type of modal-dialog that interrupts the user's workflow to communicate an important message and
        acquire a response. By default clicking on backdrop and pressing Escape will not dismiss an alert dialog.
      </p>
    </fluent-text>
    <br />
    <fluent-text block><code>type="alert"</code></fluent-text>

    <br />
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-alert')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-alert" type="${DialogType.alert}">
      <fluent-dialog-body>
        <div slot="title">Alert</div>
        <div>
          An alert is a type of modal-dialog that interrupts the user's workflow to communicate an important message and
          acquire a response. By default clicking on backdrop and pressing Escape will not dismiss an alert dialog.
        </div>
        <br />
        <fluent-text><code>type="alert"</code></fluent-text>
        <fluent-button slot="action" appearance="primary" @click="${(e: Event, c) => closeDialog(e, 'dialog-alert')}"
          >Close Dialog</fluent-button
        >
        <fluent-button slot="action">Do Something</fluent-button>
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);

export const Actions = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block
      ><p>
        A dialog should have no more than
        <fluent-text weight="bold"><span>two</span></fluent-text>
        actions.
      </p></fluent-text
    >
    <fluent-text block
      ><span>
        However, if required, you can populate the action slot with any number of buttons as needed.</span
      ></fluent-text
    >
    <br />
    <fluent-text block><code>slot="action"</code></fluent-text>
    <br />
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-fluidactions')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-fluidactions">
      <fluent-dialog-body>
        <div slot="title">Actions</div>
        <fluent-button
          appearance="transparent"
          icon-only
          @click="${(e: Event, c) => closeDialog(e, 'dialog-fluidactions')}"
          slot="title-action"
        >
          ${dismissed20Regular}
        </fluent-button>

        <fluent-text block>
          <span
            >A dialog should have no more than
            <fluent-text weight="bold"><span>two</span></fluent-text>
            footer actions.
          </span></fluent-text
        >
        <br />
        <fluent-text block
          ><span>
            However, if required, you can populate the action slot with any number of buttons as needed.</span
          ></fluent-text
        >
        <br />
        <fluent-text block><code>slot="action"</code></fluent-text>

        <fluent-button size="small" slot="action">Something</fluent-button>
        <fluent-button size="small" slot="action">Something Else</fluent-button>

        <fluent-button
          slot="action"
          size="small"
          appearance="primary"
          @click="${(e: Event, c) => closeDialog(e, 'dialog-fluidactions')}"
          >Close Dialog</fluent-button
        >
        <fluent-button size="small" slot="action">Something Else Entirely</fluent-button>
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);

export const TitleCustomAction = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block>
      <span>By default a non-modal dialog renders a dismiss button with a close icon. </span>
    </fluent-text>
    <br />
    <fluent-text block>
      <span>
        This slot can be customized to add a different kind of action, that it'll be available in any kind of dialog,
        ignoring the type property, here's an example replacing the simple close icon with a fluent button using a
        different icon.
      </span>
    </fluent-text>
    <br />
    <fluent-text block><code>slot="title-action"</code></fluent-text>
    <br />
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-titlecustomaction')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-titlecustomaction">
      <fluent-dialog-body>
        <div slot="title">Title Custom Action</div>
        <fluent-button
          appearance="transparent"
          icon-only
          @click="${(e: Event, c) => closeDialog(e, 'dialog-titlecustomaction')}"
          slot="title-action"
        >
          ${dismissCircle20Regular}
        </fluent-button>

        <fluent-text block>
          <span>By default a non-modal dialog renders a dismiss button with a close icon. </span>
        </fluent-text>
        <br />
        <fluent-text block>
          <span>
            This slot can be customized to add a different kind of action, that it'll be available in any kind of
            dialog, ignoring the type property, here's an example replacing the simple close icon with a fluent button
            using a different icon.
          </span>
        </fluent-text>
        <br />
        <fluent-text block><code>slot="title-action"</code></fluent-text>

        <fluent-button
          slot="action"
          appearance="primary"
          @click="${(e: Event, c) => closeDialog(e, 'dialog-titlecustomaction')}"
          >Close Dialog</fluent-button
        >
        <fluent-button slot="action">Do Something</fluent-button>
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);

export const NoTitleAction = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block
      ><p>
        The no-title-action attribute can be added to <code>fluent-dialog-body</code> to opt out of rendering any title
        action.
      </p></fluent-text
    >
    <br />
    <fluent-text block><code>no-title-action</code></fluent-text>
    <br />
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-notitleaction')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-notitleaction" type="${DialogType.nonModal}">
      <fluent-dialog-body no-title-action>
        <div slot="title">No Title Action</div>
        <fluent-text block>
          <p>The no-title-action attribute can be provided to opt out of rendering any title action.</p></fluent-text
        >
        <br />
        <fluent-text block><code>no-title-action</code></fluent-text>

        <fluent-button
          slot="action"
          appearance="primary"
          @click="${(e: Event, c) => closeDialog(e, 'dialog-notitleaction')}"
          >Close Dialog</fluent-button
        >
        <fluent-button slot="action">Do Something</fluent-button>
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);

export const TwoColumnLayout = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block
      ><p>
        The dialog is designed with flexibility in mind, accommodating multiple column layouts within its structure.
      </p></fluent-text
    >
    <br />
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-twocolumn')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-twocolumn" type="${DialogType.nonModal}">
      <fluent-dialog-body>
        <div slot="title">Welcome!</div>
        <div style="margin-bottom: 12px;">
          <fluent-text block
            ><p>
              The dialog is designed with flexibility in mind, accommodating multiple column layouts within its
              structure.
            </p></fluent-text
          >
        </div>
        <div
          style="display: grid; grid-template-columns: 1fr 1.5fr; grid-column-gap: 12px; margin-bottom: 4px; overflow-x: hidden;"
        >
          <div style="height: 248px;">
            <fluent-image fit="cover">
              <img alt="image layout story" src="https://picsum.photos/240/240" />
            </fluent-image>
          </div>
          <div>
            <fluent-text weight="semibold" block><p>Don't have an account? Sign up now!</p></fluent-text>
            <br />
            <fluent-text-input type="email">
              <fluent-label>Email</fluent-label>
            </fluent-text-input>
            <br />
            <fluent-text-input>
              <fluent-label>Username</fluent-label>
            </fluent-text-input>
            <br />
            <fluent-text-input type="password">
              <fluent-label>Password</fluent-label>
            </fluent-text-input>
            <br />
          </div>
        </div>

        <fluent-button slot="action" @click="${(e: Event, c) => closeDialog(e, 'dialog-twocolumn', true)}"
          >Cancel</fluent-button
        >
        <fluent-button appearance="primary" slot="action">Sign Up</fluent-button>
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);

export const ImageAndText = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block
      ><p>
        You can supply an image outside of the dialog body to create a more visually engaging dialog experience.
      </p></fluent-text
    >
    <br />
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-image')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-image" type="${DialogType.nonModal}">
      <fluent-image block>
        <img alt="image layout story" src="https://picsum.photos/600/400" />
      </fluent-image>
      <fluent-dialog-body>
        <div slot="title">Welcome!</div>

        <fluent-text block>
          <span>
            This slot can be customized to add a different kind of action, that it'll be available in any kind of
            dialog, ignoring the type property, here's an example replacing the simple close icon with a fluent button
            using a different icon.
          </span>
        </fluent-text>

        <fluent-button slot="action" @click="${(e: Event, c) => closeDialog(e, 'dialog-image', true)}"
          >Cancel</fluent-button
        >
        <fluent-button appearance="primary" slot="action">Sign Up</fluent-button>
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);

export const ModalWithNoTitleOrActions = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block><p>A dialog without a title or actions will render a close button by default.</p></fluent-text>
    <br />
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-notitleactions')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-notitleactions">
      <fluent-dialog-body>
        <fluent-text block
          ><p>A dialog without a title or actions will render a close button by default.</p></fluent-text
        >
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);

export const NonModalWithNoTitleOrActions = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block
      ><p>A non-modal dialog without a title or actions will render a close button by default.</p></fluent-text
    >
    <br />
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-nonmodalnotitleactions')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-nonmodalnotitleactions" type="${DialogType.nonModal}">
      <fluent-dialog-body>
        <fluent-text block
          ><p>
            A non-modal dialog without no title or title actions will render a close button by default.
          </p></fluent-text
        >
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);

export const RTL = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block
      ><p>
        The dialog component seamlessly supports both Right-to-Left (RTL) and Left-to-Right (LTR) text directions,
        ensuring flexibility for various language orientations.
      </p></fluent-text
    >
    <br />
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-rtl')}>Open Dialog</fluent-button>

    <fluent-dialog id="dialog-rtl" type="${DialogType.modal}" dir="rtl">
      <fluent-dialog-body>
        <div slot="title">أهلاً!</div>
        <fluent-button
          appearance="transparent"
          icon-only
          @click="${(e: Event, c) => closeDialog(e, 'dialog-rtl')}"
          slot="title-action"
        >
          ${dismissed20Regular}
        </fluent-button>
        <fluent-text block><p>هذا المكون يدعم كلاً من LTR و RTL.</p></fluent-text>

        <fluent-button slot="action" @click="${(e: Event, c) => closeDialog(e, 'dialog-rtl', true)}"
          >إلغاء</fluent-button
        >
        <fluent-button appearance="primary" slot="action">قم بشيء</fluent-button>
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);

export const ScrollingLongContent = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-text block
      ><p>
        By default content provided in the default slot should grow until it fits viewport size, overflowed content will
        be scrollable
      </p></fluent-text
    >
    <br />
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-longcontent')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-longcontent">
      <fluent-image block>
        <img alt="image layout story" src="https://picsum.photos/600/400" />
      </fluent-image>
      <fluent-dialog-body>
        <div slot="title">Scrolling Long Content</div>
        <fluent-button
          appearance="transparent"
          icon-only
          @click="${(e: Event, c) => closeDialog(e, 'dialog-longcontent')}"
          slot="title-action"
        >
          ${dismissed20Regular}
        </fluent-button>
        <fluent-text style="overflow: hidden;" block as="p"
          ><p>
            By default content provided in the default slot should grow until it fits viewport size, overflowed content
            will be scrollable
          </p></fluent-text
        >
        <hr />
        <br />
        <fluent-text block as="p">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lectus non lorem iaculis luctus. Proin ac
            dolor eget enim commodo pretium. Duis ut nibh ac metus interdum finibus. Integer maximus ante a tincidunt
            pretium. Aliquam erat volutpat. Sed nec ante vel lectus dignissim commodo id ut elit. Curabitur ullamcorper
            sapien id mauris interdum, ac placerat mi malesuada. Duis aliquam, dolor eget facilisis mollis, ante leo
            tincidunt quam, vel convallis ipsum turpis et turpis. Mauris fermentum neque nec tortor semper tempus.
            Integer malesuada, nunc ac cursus facilisis, lectus mauris interdum erat, in vulputate risus velit in neque.
            Etiam volutpat ante nec fringilla tempus. Quisque et lobortis dolor. Fusce sit amet odio sed ipsum fringilla
            auctor. Suspendisse faucibus tellus in luctus hendrerit. Vestibulum euismod velit non laoreet feugiat. Nam
            sit amet velit urna. Cras consectetur tempor sem, in suscipit sem ultrices id. Vivamus id felis fringilla,
            scelerisque nulla non, aliquam leo. In pharetra mauris ut enim ullamcorper, id suscipit quam ullamcorper.
            Quisque tincidunt, felis nec congue elementum, mauris est finibus ex, ut volutpat ante est nec est. Aliquam
            tempor, turpis ac scelerisque dignissim, metus velit rutrum sem, eget efficitur mauris erat in metus.
            Vestibulum in urna massa. Donec eleifend leo at dui convallis aliquet. Integer eleifend, velit ut consequat
            tempus, enim elit ultricies diam, at congue enim enim id nunc. Nullam fringilla bibendum nulla, at lacinia
            sem bibendum eget. Nunc posuere ipsum sed enim facilisis efficitur. Pellentesque id semper mi, a feugiat
            sem. Nunc interdum, leo ut tincidunt consectetur, nunc mauris accumsan nulla, vel ultricies velit erat nec
            sapien. Praesent eleifend ex at odio scelerisque cursus. Morbi eget tellus sed sapien scelerisque cursus at
            a ante. Sed venenatis vehicula erat eu feugiat. Ut eu elit vitae urna tincidunt pulvinar nec at nunc.
            Vestibulum eget tristique sapien. Sed egestas sapien vel ante viverra pharetra. Cras sit amet felis at nulla
            tincidunt euismod vitae et justo. Duis nec rutrum lectus, nec lobortis quam. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac ex condimentum, consectetur felis
            non, maximus odio. Sed mattis arcu id justo fringilla, a tristique purus vestibulum. Nulla nec fringilla
            quam. Sed ac elit ac sem posuere cursus nec vitae mauris. Suspendisse nec pulvinar risus. Sed a tincidunt
            elit, in gravida tortor. Quisque sollicitudin lectus vel interdum tempor. Fusce dictum fermentum sem sed
            suscipit. Vivamus sollicitudin ex turpis, sit amet consequat leo auctor at. Donec fermentum aliquet lectus,
            sit amet efficitur nibh pellentesque et. Curabitur dapibus quam vitae lectus pellentesque, vitae varius
            massa facilisis. Quisque consectetur eros a arcu cursus fringilla. Fusce efficitur auctor nibh, nec
            sollicitudin eros semper eget. Cras a elit ut tortor semper volutpat eu vel nunc. Duis dapibus quam risus,
            ac tristique nisl aliquam eu. Curabitur vel ipsum non nunc euismod fringilla vel a lorem. Curabitur viverra
            magna ac justo fringilla, eu vestibulum purus finibus. Donec elementum volutpat libero, in tempus massa
            convallis vitae. Curabitur vitae mauris id urna dictum pharetra. Nullam vehicula arcu arcu, vitae elementum
            enim tincidunt at. Duis eleifend, lorem a efficitur facilisis, nulla dolor finibus orci, et ullamcorper orci
            ex ac purus. Aenean sem lectus, malesuada id magna id, facilisis condimentum nibh. Cras tempor neque mi, sit
            amet suscipit libero consectetur non. Nullam id eleifend mauris. Mauris iaculis lectus eu scelerisque
            efficitur. In id suscipit libero. Donec condimentum, purus ac laoreet facilisis, risus lorem facilisis
            neque, id volutpat felis mi eget metus. Nulla facilisi. Donec consequat tincidunt nunc sed elementum.
            Integer consectetur tristique orci, ut congue justo pellentesque eu. Fusce faucibus iaculis mauris, eu
            lobortis orci egestas eget. Nullam nec arcu bibendum, cursus diam ac, facilisis enim. Nulla facilisi.
            Curabitur lacinia odio mauris, a gravida nisi volutpat in. Aliquam at maximus felis. Vestibulum convallis
            dignissim urna id gravida.
          </p>
        </fluent-text>
        <fluent-button
          slot="action"
          appearance="primary"
          @click="${(e: Event, c) => closeDialog(e, 'dialog-longcontent')}"
          >Close Dialog</fluent-button
        >
        <fluent-button slot="action">Do Something</fluent-button>
      </fluent-dialog-body>
    </fluent-dialog>
  </div>
`);
