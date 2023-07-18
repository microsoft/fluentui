import { html } from '@microsoft/fast-element';
import type { Args, Meta } from '@storybook/html';
import { renderComponent } from '../helpers.stories.js';
import type { Dialog as FluentDialog } from './dialog.js';
import './define.js';
import '../button/define.js';
import '../text/define.js';

type DialogStoryArgs = Args & FluentDialog;
type DialogStoryMeta = Meta<DialogStoryArgs>;

const DismissCircle24Regular = html`
  <svg
    fill="currentColor"
    aria-hidden="true"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm3.45 4.9.08.07c.27.27.3.68.07.98l-.07.08L13.06 12l2.47 2.47c.27.27.3.68.07.98l-.07.08a.75.75 0 0 1-.98.07l-.08-.07L12 13.06l-2.47 2.47a.75.75 0 0 1-.98.07l-.08-.07a.75.75 0 0 1-.07-.98l.07-.08L10.94 12 8.47 9.53a.75.75 0 0 1-.07-.98l.07-.08a.75.75 0 0 1 .98-.07l.08.07L12 10.94l2.47-2.47a.75.75 0 0 1 .98-.07Z"
      fill="currentColor"
    ></path>
  </svg>
`;

const closeDialog = (e: Event, id: string) => {
  const dialog = document.getElementById(id) as FluentDialog;
  dialog.hide();
};

const openDialog = (e: Event, id: string) => {
  const dialog = document.getElementById(id) as FluentDialog;
  dialog.show();
};

const dialogTemplate = html<DialogStoryArgs>`
  <style>
    ::part(positioning-region) {
      z-index: 9999;
    }
  </style>
  <div>
      <fluent-button @click=${(e: Event, c) => openDialog(e, 'dialog-default')}>Open Dialog</fluent-button>
      <fluent-dialog 
        id="dialog-default" 
        ?modal=${x => x.modal} 
        ?alert=${x => x.alert} 
        ?no-trap-focus=${x => x.noFocusTrap} 
        hidden
      >
        <div slot="title">Dialog Title</div>
        <div><code>Dialog</code> is a window overlaid on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.</div>
        <fluent-button 
          slot="actions" 
          appearance="primary" 
          @click="${(e: Event, c) => closeDialog(e, 'dialog-default')}">Close Drawer</fluent-button>
        <fluent-button
          slot="actions">Do Something</fluent-button>
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
    noTrapFocus: false,
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
    noFocusTrap: {
      description: 'removes trap focus',
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

export const Modal = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-modal')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-modal" modal hidden>
      <div slot="title">Modal Dialog Title</div>
      <div>
        When this type of dialog is open, the rest of the page is dimmed out and cannot be interacted with. The tab
        sequence is kept within the dialog and moving the focus outside the dialog will imply closing it.
      </div>
      <fluent-button slot="actions" appearance="primary" @click="${(e: Event, c) => closeDialog(e, 'dialog-modal')}"
        >Close Drawer</fluent-button
      >
      <fluent-button slot="actions">Do Something</fluent-button>
    </fluent-dialog>
  </div>
`);

export const Alert = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-alert')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-alert" alert hidden>
      <div slot="title">Alert Dialog Title</div>
      <div>
        An <code>alert</code> Dialog is a modal dialog that interrupts the user's workflow to communicate an important
        message and acquire a response. By default clicking on backdrop and pressing Escape will not dismiss an alert
        Dialog.
      </div>
      <fluent-button slot="actions" appearance="primary" @click="${(e: Event, c) => closeDialog(e, 'dialog-alert')}"
        >Close Drawer</fluent-button
      >
      <fluent-button slot="actions">Do Something</fluent-button>
    </fluent-dialog>
  </div>
`);

export const ScrollingLongContent = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-longcontent')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-longcontent" hidden>
      <div slot="title">Custom Close Icon Dialog Title</div>
      <span slot="close-icon">${DismissCircle24Regular}</span>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lectus non lorem iaculis luctus. Proin ac
        dolor eget enim commodo pretium. Duis ut nibh ac metus interdum finibus. Integer maximus ante a tincidunt
        pretium. Aliquam erat volutpat. Sed nec ante vel lectus dignissim commodo id ut elit. Curabitur ullamcorper
        sapien id mauris interdum, ac placerat mi malesuada. Duis aliquam, dolor eget facilisis mollis, ante leo
        tincidunt quam, vel convallis ipsum turpis et turpis. Mauris fermentum neque nec tortor semper tempus. Integer
        malesuada, nunc ac cursus facilisis, lectus mauris interdum erat, in vulputate risus velit in neque. Etiam
        volutpat ante nec fringilla tempus. Quisque et lobortis dolor. Fusce sit amet odio sed ipsum fringilla auctor.
        Suspendisse faucibus tellus in luctus hendrerit. Vestibulum euismod velit non laoreet feugiat. Nam sit amet
        velit urna. Cras consectetur tempor sem, in suscipit sem ultrices id. Vivamus id felis fringilla, scelerisque
        nulla non, aliquam leo. In pharetra mauris ut enim ullamcorper, id suscipit quam ullamcorper. Quisque tincidunt,
        felis nec congue elementum, mauris est finibus ex, ut volutpat ante est nec est. Aliquam tempor, turpis ac
        scelerisque dignissim, metus velit rutrum sem, eget efficitur mauris erat in metus. Vestibulum in urna massa.
        Donec eleifend leo at dui convallis aliquet. Integer eleifend, velit ut consequat tempus, enim elit ultricies
        diam, at congue enim enim id nunc. Nullam fringilla bibendum nulla, at lacinia sem bibendum eget. Nunc posuere
        ipsum sed enim facilisis efficitur. Pellentesque id semper mi, a feugiat sem. Nunc interdum, leo ut tincidunt
        consectetur, nunc mauris accumsan nulla, vel ultricies velit erat nec sapien. Praesent eleifend ex at odio
        scelerisque cursus. Morbi eget tellus sed sapien scelerisque cursus at a ante. Sed venenatis vehicula erat eu
        feugiat. Ut eu elit vitae urna tincidunt pulvinar nec at nunc. Vestibulum eget tristique sapien. Sed egestas
        sapien vel ante viverra pharetra. Cras sit amet felis at nulla tincidunt euismod vitae et justo. Duis nec rutrum
        lectus, nec lobortis quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Sed ac ex condimentum, consectetur felis non, maximus odio. Sed mattis arcu id justo fringilla, a
        tristique purus vestibulum. Nulla nec fringilla quam. Sed ac elit ac sem posuere cursus nec vitae mauris.
        Suspendisse nec pulvinar risus. Sed a tincidunt elit, in gravida tortor. Quisque sollicitudin lectus vel
        interdum tempor. Fusce dictum fermentum sem sed suscipit. Vivamus sollicitudin ex turpis, sit amet consequat leo
        auctor at. Donec fermentum aliquet lectus, sit amet efficitur nibh pellentesque et. Curabitur dapibus quam vitae
        lectus pellentesque, vitae varius massa facilisis. Quisque consectetur eros a arcu cursus fringilla. Fusce
        efficitur auctor nibh, nec sollicitudin eros semper eget. Cras a elit ut tortor semper volutpat eu vel nunc.
        Duis dapibus quam risus, ac tristique nisl aliquam eu. Curabitur vel ipsum non nunc euismod fringilla vel a
        lorem. Curabitur viverra magna ac justo fringilla, eu vestibulum purus finibus. Donec elementum volutpat libero,
        in tempus massa convallis vitae. Curabitur vitae mauris id urna dictum pharetra. Nullam vehicula arcu arcu,
        vitae elementum enim tincidunt at. Duis eleifend, lorem a efficitur facilisis, nulla dolor finibus orci, et
        ullamcorper orci ex ac purus. Aenean sem lectus, malesuada id magna id, facilisis condimentum nibh. Cras tempor
        neque mi, sit amet suscipit libero consectetur non. Nullam id eleifend mauris. Mauris iaculis lectus eu
        scelerisque efficitur. In id suscipit libero. Donec condimentum, purus ac laoreet facilisis, risus lorem
        facilisis neque, id volutpat felis mi eget metus. Nulla facilisi. Donec consequat tincidunt nunc sed elementum.
        Integer consectetur tristique orci, ut congue justo pellentesque eu. Fusce faucibus iaculis mauris, eu lobortis
        orci egestas eget. Nullam nec arcu bibendum, cursus diam ac, facilisis enim. Nulla facilisi. Curabitur lacinia
        odio mauris, a gravida nisi volutpat in. Aliquam at maximus felis. Vestibulum convallis dignissim urna id
        gravida.
      </div>
      <fluent-button
        slot="actions"
        appearance="primary"
        @click="${(e: Event, c) => closeDialog(e, 'dialog-longcontent')}"
        >Close Drawer</fluent-button
      >
      <fluent-button slot="actions">Do Something</fluent-button>
    </fluent-dialog>
  </div>
`);

export const CustomCloseIcon = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-closeicon')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-closeicon" hidden>
      <div slot="title">Custom Close Icon Dialog Title</div>
      <span slot="close-icon">${DismissCircle24Regular}</span>
      <div>Dialog content</div>
      <fluent-button slot="actions" appearance="primary" @click="${(e: Event, c) => closeDialog(e, 'dialog-closeicon')}"
        >Close Drawer</fluent-button
      >
      <fluent-button slot="actions">Do Something</fluent-button>
    </fluent-dialog>
  </div>
`);

export const NoFocusTrap = renderComponent(html<DialogStoryArgs>`
  <div>
    <fluent-button @click=${(e: Event) => openDialog(e, 'dialog-nofocustrap')}>Open Dialog</fluent-button>
    <fluent-dialog id="dialog-nofocustrap" no-focus-trap hidden>
      <div slot="title">NoTrapFocus Dialog Title</div>
      <div>Dialog content</div>
      <fluent-button
        slot="actions"
        appearance="primary"
        @click="${(e: Event, c) => closeDialog(e, 'dialog-nofocustrap')}"
        >Close Drawer</fluent-button
      >
      <fluent-button slot="actions">Do Something</fluent-button>
    </fluent-dialog>
  </div>
`);
