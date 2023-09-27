import { elements, ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import type { Menu } from './menu.js';

export function menuTemplate<T extends Menu>(): ElementViewTemplate<T> {
  return html<T>`
    <template
      ?open-on-hover="${x => x.openOnHover}"
      ?open-on-context="${x => x.openOnContext}"
      ?close-on-scroll="${x => x.closeOnScroll}"
      ?persist-on-item-click="${x => x.persistOnItemClick}"
      @keydown="${(x, c) => x.handleMenuKeydown(c.event as KeyboardEvent)}"
    >
      <slot name="trigger" ${slotted({ property: 'slottedTriggers', filter: elements() })}></slot>
      <span
        ${ref('positioningContainer')}
        part="positioning-container"
        class="positioning-container"
        ?hidden="${x => !x.open}"
      >
        <slot ${slotted({ property: 'slottedMenuList', filter: elements() })}></slot>
      </span>
    </template>
  `;
}

export const template: ElementViewTemplate<Menu> = menuTemplate();
