import { ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import type { MenuList } from './menu-list.js';

export function menuTemplate<T extends MenuList>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      slot="${x => (x.slot ? x.slot : x.isNestedMenu() ? 'submenu' : void 0)}"
      role="menu"
      @keydown="${(x, c) => x.handleMenuKeyDown(c.event as KeyboardEvent)}"
      @focusout="${(x, c) => x.handleFocusOut(c.event as FocusEvent)}"
    >
      <slot ${slotted('items')}></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<MenuList> = menuTemplate();
