import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { Drawer } from './drawer.js';

/**
 * The template for the Drawer component.
 * @public
 */
export function drawerTemplate<T extends Drawer>(): ElementViewTemplate<T> {
  return html<T>`
    <dialog
      class="dialog"
      part="dialog"
      role="${x => (x.type === 'non-modal' || x.inline ? 'region' : 'dialog')}"
      aria-modal="${x => (x.type === 'non-modal' || x.inline ? void 0 : 'true')}"
      aria-describedby="${x => x.ariaDescribedby}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-label="${x => x.ariaLabel}"
      size="${x => x.size}"
      position="${x => x.position}"
      type="${x => x.type}"
      ?inline="${x => x.inline}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @cancel="${(x, c) => x.hide()}"
      ${ref('dialog')}
    >
      <slot></slot>
    </dialog>
  `;
}

export const template: ElementViewTemplate<Drawer> = drawerTemplate();
