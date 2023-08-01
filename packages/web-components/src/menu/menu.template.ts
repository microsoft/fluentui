import { elements, ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import type { Menu } from './menu.js';

export function menuTemplate<T extends Menu>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      ?open-on-hover="${x => x.openOnHover}"
      @keydown="${(x, c) => x.handleMenuKeydown(c.event as KeyboardEvent)}"
    >
      <slot name="trigger" ${slotted({ property: 'slottedTriggers', filter: elements() })}></slot>
      <span ${ref('positioningContainer')} class="positioning-container" ?hidden="${x => !x.open}">
        <slot ${slotted({ property: 'slottedMenuList', filter: elements() })}></slot>
      </span>
    </template>
  `;
}

export const template: ElementViewTemplate<Menu> = menuTemplate();
