import { css, html, ref } from '@microsoft/fast-element';
import type { DialogBody as FluentDialogBody } from '../dialog-body/dialog-body.js';
import { generateImage, type Meta, renderComponent, type StoryArgs, type StoryObj } from '../helpers.stories.js';
import { definition } from './dialog.definition.js';
import type { Dialog as FluentDialog } from './dialog.js';
import { DialogType } from './dialog.options.js';

type Story = StoryObj<FluentDialog>;

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

const info20Regular = html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M10.492 8.91A.5.5 0 0 0 9.5 9v4.502l.008.09a.5.5 0 0 0 .992-.09V9zm.307-2.16a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0M18 10a8 8 0 1 0-16 0a8 8 0 0 0 16 0M3 10a7 7 0 1 1 14 0a7 7 0 0 1-14 0"
  />
</svg>`;

const closeButtonTemplate = html<StoryArgs<FluentDialog>>`
  <fluent-button slot="action" appearance="primary" @click="${story => story.storyDialog.hide()}">
    Close Dialog
  </fluent-button>
`;

const dismissed16Regular = html.partial(`
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
  </svg>`);

const closeTemplate = html`
  <fluent-button tabindex="0" slot="close" appearance="transparent" icon-only aria-label="close">
    ${dismissed16Regular}
  </fluent-button>
`;

const storyTemplate = html<StoryArgs<FluentDialog & FluentDialogBody>>`
  <fluent-button @click="${story => story.storyDialog?.show()}">Open Dialog</fluent-button>
  <fluent-dialog
    id="dialog-default"
    type="${story => story.type}"
    ${ref('storyDialog')}
    aria-label="${story => story.ariaLabel}"
  >
    <fluent-dialog-body>
      ${story => story.actionSlottedContent?.()} ${story => story.slottedContent?.()}
      ${story => story.titleActionSlottedContent?.()} ${story => story.closeSlottedContent?.()}
      ${story => story.titleSlottedContent?.()}
    </fluent-dialog-body>
  </fluent-dialog>
`;

export default {
  title: 'Components/Dialog/Dialog',
  component: definition.name,
  render: renderComponent(storyTemplate),
  args: {
    closeSlottedContent: () => closeTemplate,
  },
  argTypes: {
    type: {
      control: 'select',
      description:
        '`modal`: When this type of dialog is open, the rest of the page is dimmed out and cannot be interacted with. The tab sequence is kept within the dialog and moving the focus outside the dialog will imply closing it. This is the default type of the component.<br /><br />`non-modal`: When a non-modal dialog is open, the rest of the page is not dimmed out and users can interact with the rest of the page. This also implies that the tab focus can move outside the dialog when it reaches the last focusable element.<br /><br />`alert`: A special type of modal dialog that interrupts the users workflow to communicate an important message or ask for a decision. Unlike a typical modal dialog, the user must take an action through the options given to dismiss the dialog, and it cannot be dismissed through the dimmed background.',
      mapping: { '': null, ...DialogType },
      options: ['', ...Object.values(DialogType)],
      table: {
        category: 'attributes',
        defaultValue: { summary: DialogType.modal },
      },
      type: Object.values(DialogType).join('|'),
    },
    slottedContent: {
      control: false,
      name: '',
      description: 'Default slot for the dialog content.',
      table: { category: 'slots', type: {} },
    },
    actionSlottedContent: { table: { disable: true } },
    titleSlottedContent: { table: { disable: true } },
    titleActionSlottedContent: { table: { disable: true } },
  },
} as Meta<FluentDialog>;

export const Default: Story = {
  args: {
    titleSlottedContent: () => html` <h2 slot="title">Default Dialog</h2> `,
    ariaLabel: 'Default Dialog',
    slottedContent: () => html`
      <p>
        The dialog component is a window overlaid on either the primary window or another dialog window. Windows under a
        modal dialog are inert.
      </p>
      <p>That is, users cannot interact with content outside an active dialog window.</p>
    `,
    actionSlottedContent: () => closeButtonTemplate,
  },
};

export const WithTitleAction: Story = {
  args: {
    titleSlottedContent: () => html` <h2 slot="title">Title Action Slot</h2> `,
    ariaLabel: 'Title Action Slot',
    titleActionSlottedContent: () => html`
      <fluent-button appearance="transparent" icon-only slot="title-action"> ${info20Regular} </fluent-button>
    `,
    slottedContent: () => html` <p>This example shows a button slotted into the <code>title-action</code> slot.</p> `,
    actionSlottedContent: () => closeButtonTemplate,
  },
};

export const ModalType: Story = {
  args: {
    type: DialogType.modal,
    titleSlottedContent: () => html` <h2 slot="title">Modal</h2> `,
    ariaLabel: 'Model',
    slottedContent: () => html`
      <p>
        A modal is a type of dialog that temporarily halts the main workflow to convey a significant message or require
        user interaction. By default, interactions such as clicking outside the dialog or pressing the Escape key will
        close the modal-dialog, resuming the user's interaction with the main content.
      </p>
      <code>type="modal"</code>
    `,
    actionSlottedContent: () => closeButtonTemplate,
  },
};

export const NonModalType: Story = {
  name: 'Non-modal Type',
  render: renderComponent(html<StoryArgs<FluentDialog>>` <div style="min-height: 300px">${storyTemplate}</div> `),
  args: {
    type: DialogType.nonModal,
    titleSlottedContent: () => html` <h2 slot="title">Non-modal</h2> `,
    ariaLabel: 'Non-modal',
    slottedContent: () => html`
      <p>
        A non-modal dialog by default presents no backdrop, allowing elements outside of the dialog to be interacted
        with. A non-modal dialog will present by default a closeButton.
      </p>
      <p>
        <strong>Note:</strong>
        if an element outside of the dialog is focused then it will not be possible to close the dialog with the Escape
        key.
      </p>
      <code>type="non-modal"</code>
    `,
    actionSlottedContent: () => closeButtonTemplate,
  },
};

export const AlertType: Story = {
  args: {
    type: DialogType.alert,
    closeSlottedContent: () => html``,
    titleSlottedContent: () => html` <h2 slot="title">Alert</h2> `,
    ariaLabel: 'Alert',
    actionSlottedContent: () => closeButtonTemplate,
    slottedContent: () => html`
      <p>
        An alert is a type of modal-dialog that interrupts the user's workflow to communicate an important message and
        acquire a response. By default clicking on backdrop will not dismiss an alert dialog.
      </p>
      <code>type="alert"</code>
    `,
  },
};

export const Actions: Story = {
  args: {
    titleSlottedContent: () => html` <h2 slot="title">Actions</h2> `,
    ariaLabel: 'Actions',
    actionSlottedContent: () => html`
      <fluent-button size="small" slot="action">Something</fluent-button>
      <fluent-button size="small" slot="action">Something Else</fluent-button>
      <fluent-button size="small" slot="action">Something Else Entirely</fluent-button>
      ${closeButtonTemplate}
    `,
    slottedContent: () => html`
      <p>
        A dialog should have no more than
        <strong>two</strong>
        actions.
      </p>
      <p>However, if required, you can populate the action slot with any number of buttons as needed.</p>
    `,
  },
};

export const CustomClose: Story = {
  args: {
    closeSlottedContent: () => html`
      <fluent-button slot="close" appearance="transparent" icon-only @click="${() => alert('This is a custom action')}">
        ${dismissCircle20Regular}
      </fluent-button>
    `,
    slottedContent: () => html`
      <p>By default a non-modal dialog renders a dismiss button with a close icon.</p>
      <p>
        The
        <code>close</code>
        slot can be customized to add a different kind of action. Custom close slots can be used in any kind of dialog.
        Here's an example which replaces the default close icon with a
        <code>&lt;fluent-button&gt;</code>
        and a custom icon. Clicking the button will trigger a JavaScript alert.
      </p>
    `,
    titleSlottedContent: () => html` <h2 slot="title">Custom Close Slot</h2> `,
    ariaLabel: 'Custom Close Slot',
  },
};

export const NoClose: Story = {
  args: {
    titleSlottedContent: () => html` <h2 slot="title">No Close Slot</h2> `,
    ariaLabel: 'No Close Slot',
    closeSlottedContent: () => html``,
    slottedContent: () => html`
      <p>
        By not passing the
        <code>close</code>
        slot no close button will render.
      </p>
    `,
  },
};

export const ModalWithNoTitleOrTitleActions: Story = {
  args: {
    type: DialogType.modal,
    ariaLabel: 'No Title',
    slottedContent: () => html` <p>A dialog without a <code>title</code> slot or <code>title-action</code> slot</p> `,
  },
};

export const ModalWithNoTitle: Story = {
  args: {
    type: DialogType.modal,
    ariaLabel: 'No Title',
    titleActionSlottedContent: () => html`
      <fluent-button appearance="transparent" icon-only slot="title-action"> ${info20Regular} </fluent-button>
    `,
    slottedContent: () =>
      html` <p>A dialog without a <code>title</code> but with a <code>title-action</code> slot</p> `,
  },
};

export const NonModalWithNoTitleOrActions: Story = {
  render: renderComponent(html<StoryArgs<FluentDialog>>` <div style="min-height: 300px">${storyTemplate}</div> `),
  args: {
    type: DialogType.nonModal,
    slottedContent: () => html`
      <p>A non-modal dialog without a <code>title</code> slot or <code>title-action</code> slot.</p>
    `,
  },
};

export const AlertWithNoTitleOrActions: Story = {
  args: {
    type: DialogType.alert,
    slottedContent: () => html`
      <p>An alert dialog without a title or actions will not render a close button.</p>
      <p>Focus the dialog by clicking or tabbing to it and press the Escape key to dismiss it.</p>
    `,
  },
};

export const TwoColumnLayout: Story = {
  args: {
    titleSlottedContent: () => html` <h2 slot="title">Two Column Layout</h2> `,
    ariaLabel: 'Two Column Layout',
    slottedContent: () => html<StoryArgs<FluentDialog>>`
      <div style="margin-bottom: 12px;">
        <fluent-text block>
          The dialog is designed with flexibility in mind, accommodating multiple column layouts within its structure.
        </fluent-text>
      </div>
      <form
        style="display: grid; grid-template-columns: 1fr 1.5fr; grid-column-gap: 12px; margin-bottom: 4px; overflow-x: hidden;"
        @submit="${story => story.successMessage.toggleAttribute('hidden', false)}"
      >
        <div style="height: 248px;">
          <fluent-image fit="cover">
            <img alt="image layout story" src="${generateImage({ width: 240 })}" />
          </fluent-image>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 1em">
          <fluent-text weight="semibold" block>Here's an Example Form! </fluent-text>

          <fluent-field>
            <label slot="label">Text Input</label>
            <fluent-text-input slot="input"></fluent-text-input>
          </fluent-field>

          <fluent-field>
            <label slot="label">Range Slider</label>
            <fluent-slider slot="input" min="0" max="100" value="50"></fluent-slider>
          </fluent-field>

          <fluent-field label-position="after">
            <label slot="label">Checkbox</label>
            <fluent-checkbox slot="input"></fluent-checkbox>
          </fluent-field>

          <fluent-button type="submit" appearance="primary">Submit</fluent-button>
          <span id="success-message" hidden ${ref('successMessage')}>Form submitted successfully!</span>
        </div>
      </form>
    `,
  },
};

export const ScrollingLongContent: Story = {
  args: {
    titleSlottedContent: () => html` <h2 slot="title">Scrolling Long Content</h2> `,
    ariaLabel: 'Scrolling Long Content',
    slottedContent: () => html`
      <p>
        By default content provided in the default slot should grow until it fits viewport size. Overflow content will
        be scrollable. This story's content is vertically clamped to demonstrate the scrolling behavior.
      </p>
      <hr />
      <p>
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
      </p>
    `,
  },
  decorators: [
    Story => {
      const story = Story() as HTMLElement;
      const dialog = story.querySelector<FluentDialog>('fluent-dialog');

      dialog?.$fastController.addStyles(css`
        dialog {
          max-height: 500px;
        }
      `);

      return story;
    },
  ],
};
