import { type ElementViewTemplate, html, ref } from '@microsoft/fast-element';
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
      aria-describedby="${x => x.ariaDescribedby}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-label="${x => x.ariaLabel}"
      size="${x => x.size}"
      position="${x => x.position}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @cancel="${x => x.cancelHandler()}"
      ${ref('dialog')}
    >
      <slot></slot>
    </dialog>
  `;
}

export const template: ElementViewTemplate<Drawer> = drawerTemplate();
