import { type ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { Dialog } from './dialog.js';
import { DialogType } from './dialog.options.js';

/**
 * Template for the Dialog component
 * @public
 */
export const template: ElementViewTemplate<Dialog> = html`
  <dialog
    class="dialog"
    part="dialog"
    aria-describedby="${x => x.ariaDescribedby}"
    aria-labelledby="${x => x.ariaLabelledby}"
    aria-label="${x => x.ariaLabel}"
    @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
    @cancel="${x => x.hide()}"
    ${ref('dialog')}
  >
    <slot></slot>
  </dialog>
`;
