import { type ElementViewTemplate, html } from '@microsoft/fast-element';
import type { DrawerBody } from './drawer-body.js';

/**
 * The template for the Drawer component.
 * @public
 */
export function drawerBodyTemplate<T extends DrawerBody>(): ElementViewTemplate<T> {
  return html<T>`
    <div class="header" part="header">
      <slot name="title"></slot>
      <slot name="close" @click="${(x, c) => x.clickHandler(c.event as PointerEvent)}"></slot>
    </div>
    <div class="content" part="content">
      <slot></slot>
    </div>
    <div class="footer" part="footer">
      <slot name="footer"></slot>
    </div>
  `;
}

export const template: ElementViewTemplate<DrawerBody> = drawerBodyTemplate();
