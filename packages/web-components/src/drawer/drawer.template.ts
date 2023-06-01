import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { Drawer } from './drawer.js';

/**
 * The template for the Drawer component.
 * @public
 */

export function drawerTemplate<T extends Drawer>(): ElementViewTemplate<T> {
  return html<T>`
    <template ?open="${x => x.open}" position="${x => x.position}" aria-disabled="${x => x.ariaDisabled}">
      <div class="drawer" part="drawer">
        <div class="header" part="header">
          <slot name="header"></slot>
          <div class="close" part="close" @click="${(x: { closeDrawer: () => any }) => x.closeDrawer()}">
            <slot name="close"></slot>
          </div>
        </div>
        <div class="content" part="content">
          <slot></slot>
        </div>
        <div class="actions" part="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Drawer> = drawerTemplate();
