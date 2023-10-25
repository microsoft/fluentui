import { ElementViewTemplate, html, ref, when } from '@microsoft/fast-element';
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
      role="${x => (x.modalType === 'non-modal' || x.type === 'inline' ? 'complementary' : 'dialog')}"
      aria-modal="${x => (x.modalType === 'non-modal' ? 'false' : 'true')}"
      aria-describedby="${x => x.ariaDescribedby}"
      aria-labelledby="${x => x.ariaLabelledby}"
      aria-label="${x => x.ariaLabel}"
      ?open="${x => x.open}"
      size="${x => x.size}"
      position="${x => x.position}"
      modal-type="${x => x.modalType}"
      type="${x => x.type}"
      @click="${(x, c) => x.handleClick(c.event as MouseEvent)}"
      ${ref('dialog')}
    >
      <div class="drawer" ${ref('drawer')}>
        <div class="header">
          <nav class="navigation">
            <slot name="navigation"></slot>
          </nav>
          <div class="title">
            <slot name="title"></slot>
            <slot name="action"></slot>
          </div>
        </div>
        <div class="content" part="content" ${ref('content')}>
          <slot></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </dialog>
  `;
}

export const template: ElementViewTemplate<Drawer> = drawerTemplate();
