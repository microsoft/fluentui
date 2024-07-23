import { elements, ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import type { Menu } from './menu.js';

export function menuTemplate<T extends Menu>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      ?open-on-hover="${x => x.openOnHover}"
      ?open-on-context="${x => x.openOnContext}"
      ?close-on-scroll="${x => x.closeOnScroll}"
      ?persist-on-item-click="${x => x.persistOnItemClick}"
      @keydown="${(x, c) => x.menuKeydownHandler(c.event as KeyboardEvent)}"
    >
      <slot name="trigger" ${slotted({ property: 'slottedTriggers', filter: elements() })}></slot>
      <slot ${slotted({ property: 'slottedMenuList', filter: elements() })}></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<Menu> = menuTemplate();
