import { ElementViewTemplate, html, ref, when } from '@microsoft/fast-element';
import type { Drawer } from './drawer.js';
import { DrawerModalType } from './drawer.options.js';

/**
 * The template for the Drawer component.
 * @public
 */
export function drawerTemplate<T extends Drawer>(): ElementViewTemplate<T> {
  return html<T>`
    <dialog
      class="dialog"
      part="dialog"
      role="${x => (x.modalType === DrawerModalType.alert ? 'alertdialog' : void 0)}"
      aria-modal="${x => (x.modalType === 'non-modal' || x.type === 'inline' ? void 0 : 'true')}"
      aria-describedby="${x => x.ariaDescribedby}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-label="${x => x.ariaLabel}"
      size="${x => x.size}"
      position="${x => x.position}"
      modal-type="${x => x.modalType}"
      type="${x => x.type}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
      ${ref('dialog')}
    >
      <slot></slot>
    </dialog>
  `;
}

export const template: ElementViewTemplate<Drawer> = drawerTemplate();
