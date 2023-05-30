import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { Drawer } from './drawer.js';

/**
 * The template for the Drawer component.
 * @public
 */

export function drawerTemplate<T extends Drawer>(): ElementViewTemplate<T> {
  return html<T>`
    <template ?open="${x => x.open}" position="${x => x.position}" aria-disabled="${x => x.ariaDisabled}">
      <div class="panel" part="panel">
        <div class="header">
          <slot name="header"></slot>
          <div class="close" @click="${(x: { dismiss: () => any }) => x.dismiss()}">
            <slot name="close"></slot>
          </div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Drawer> = drawerTemplate();
