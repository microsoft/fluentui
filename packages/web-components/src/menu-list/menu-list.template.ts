import { type ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import type { MenuList } from './menu-list.js';

export function menuTemplate<T extends MenuList>(): ElementViewTemplate<T> {
  return html<T>`
    <template focusgroup="menu" slot="${x => (x.slot ? x.slot : x.isNestedMenu() ? 'submenu' : void 0)}">
      <slot ${slotted('items')}></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<MenuList> = menuTemplate();
