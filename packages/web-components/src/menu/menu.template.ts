import { elements, ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import type { Menu } from './menu.js';

export function menuTemplate<T extends Menu>(): ElementViewTemplate<T> {
  return html<T>`
    <template @keydown="${(x, c) => x.handleMenuKeydown(c.event as KeyboardEvent)}">
      <slot name="trigger" ${slotted({ property: 'trigger', filter: elements() })}></slot>
      <span class="menu-list-container" ${ref('menuListContainer')} ?hidden="${x => !x.expanded}">
        <slot ${slotted({ property: 'menu', filter: elements() })}></slot>
      </span>
    </template>
  `;
}

export const template: ElementViewTemplate<Menu> = menuTemplate();
