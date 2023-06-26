import { ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import type { DrawerSwitcher } from './drawer-switcher.js';

export function drawerSwitcherTemplate<
  T extends DrawerSwitcher & { items: any[]; toggleButtons: any[] }
>(): ElementViewTemplate<T> {
  return html<T>`
    <template @keydown="${(x, c) => (x as any).handleKeydown(c.event as KeyboardEvent)}">
      <slot name="toggle-buttons" ${slotted('toggleButtons' as keyof T & string)}></slot>
      <slot name="drawers" ${slotted('drawers' as keyof T & string)}></slot>
    </template>
  `;
}

/**
 * The template for the Drawer Switcher component.
 * @public
 */
export const template: ElementViewTemplate<
  DrawerSwitcher & { items: any[]; toggleButtons: any[] }
> = drawerSwitcherTemplate<DrawerSwitcher & { items: any[]; toggleButtons: any[] }>() as ElementViewTemplate<
  DrawerSwitcher & { items: any[]; toggleButtons: any[] }
>;
