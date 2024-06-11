import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { Dialog } from './dialog.js';
import { DialogType } from './dialog.options.js';

/**
 * Template for the Dialog component
 * @public
 */
export const template: ElementViewTemplate<Dialog> = html`
  <dialog
    role="${x => (x.type === DialogType.alert ? 'alertdialog' : 'dialog')}"
    type="${x => x.type}"
    class="dialog"
    part="dialog"
    aria-modal="${x => (x.type === DialogType.modal || x.type === DialogType.alert ? 'true' : void 0)}"
    aria-describedby="${x => x.ariaDescribedby}"
    aria-labelledby="${x => x.ariaLabelledby}"
    aria-label="${x => x.ariaLabel}"
    @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
    @cancel="${(x, c) => (x.type === DialogType.alert ? c.event.preventDefault() : x.hide())}"
    ${ref('dialog')}
  >
    <slot></slot>
  </dialog>
`;
