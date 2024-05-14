import { elements, ElementViewTemplate, html, ref, slotted, when } from '@microsoft/fast-element';
import type { Dialog } from './dialog.js';
import { DialogModalType } from './dialog.options.js';

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
          <slot ${slotted({ property: 'titleAction', filter: elements() })} name="title-action"></slot>
          ${when(
            x => x.modalType === DialogModalType.nonModal && x.titleAction.length === 0 && !x.noTitleAction,
            html`<fluent-button
              tabindex="0"
              part="title-action"
              class="title-action"
              appearance="transparent"
              icon-only
              @click=${x => x.dismiss()}
              ${ref('defaultTitleAction')}
              >${dismissed16Regular}</fluent-button
            >`,
          )}
        </div>
        <div class="content" part="content">
          <slot></slot>
        </div>
        <div class="actions" part="actions">
          <slot name="action"></slot>
        </div>
      </div>
    </dialog>
  </template>
`;
