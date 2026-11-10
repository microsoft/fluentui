import { elements, type ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import type { Menu } from './menu.js';

export function menuTemplate<T extends Menu>(): ElementViewTemplate<T> {
  return html<T>`
    <template @keydown="${(x, c) => x.menuKeydownHandler(c.event as KeyboardEvent)}">
      <slot name="primary-action" ${ref('primaryAction')}></slot>
      <slot name="trigger" ${slotted({ property: 'slottedTriggers', filter: elements() })}></slot>
      <slot ${slotted({ property: 'slottedMenuList', filter: elements() })}></slot>
    </template>
  `;
}

export const template: ElementViewTemplate<Menu> = menuTemplate();
