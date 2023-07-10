import { ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import type { DrawerSwitcher } from './drawer-switcher.js';

/**
 * The template for the {@link @microsoft/fast-foundation#(FASTTabs:class)} component.
 * @public
 */
export function drawerSwitcherTemplate<T extends DrawerSwitcher>(): ElementViewTemplate<T> {
  return html<T>`
    <div class="drawer" part="drawer">
      <slot name="drawer" ${slotted('drawers')}></slot>
    </div>
    <div class="toggle-buttons" part="toggle-buttons" tabindex="0">
      <slot name="togglebuttons" ${slotted('togglebuttons')}></slot>
    </div>
  `;
}

export const template: ElementViewTemplate<DrawerSwitcher> = drawerSwitcherTemplate();
