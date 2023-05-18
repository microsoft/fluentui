import { elements, ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import type { Menu } from './menu.js';

export function menuTemplate<T extends Menu>(): ElementViewTemplate<T> {
  return html<T>`
    <slot name="trigger" ${slotted({ property: 'trigger', filter: elements() })} tabindex="0"></slot>
    <span class="menu-container" ${ref('menuContainer')} ?hidden="${x => !x.expanded}">
      <slot ${slotted({ property: 'menu', filter: elements() })}></slot>
    </span>
  `;
}

export const template: ElementViewTemplate<Menu> = menuTemplate();
