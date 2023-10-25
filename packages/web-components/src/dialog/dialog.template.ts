import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { Dialog } from './dialog.js';
import { DialogModalType } from './dialog.options.js';

/**
 * Template for the Dialog component
 * @public
 */
export const template: ElementViewTemplate<Dialog> = html`
  <template ?open="${x => x.open}">
    <dialog
      role="${x => (x.modalType === DialogModalType.alert ? 'alertdialog' : 'dialog')}"
      modal-type="${x => x.modalType}"
      class="dialog"
      part="dialog"
      aria-modal="${x =>
        x.modalType === DialogModalType.modal || x.modalType === DialogModalType.alert ? 'true' : void 0}"
      aria-describedby="${x => x.ariaDescribedby}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-label="${x => x.ariaLabel}"
      @keydown="${(x, c) => x.handleKeydown(c.event as KeyboardEvent)}"
      @click="${(x, c) => x.handleClick(c.event as MouseEvent)}"
      ${ref('dialog')}
    >
      <div class="root" part="root">
        <div class="title" part="title">
          <slot name="title"></slot>
          <slot name="close"></slot>
        </div>
        <div class="content" part="content">
          <slot></slot>
        </div>
        <div class="actions" part="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </dialog>
  </template>
`;
