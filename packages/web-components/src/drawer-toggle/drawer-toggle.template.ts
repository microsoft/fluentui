import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { DrawerToggle } from './drawer-toggle.js';

/**
 * The template for the DrawerToggle component.
 * @public
 */
export function drawerToggleTemplate<T extends DrawerToggle>(): ElementViewTemplate<T> {
  return html<T>`
    <template slot="togglebuttons" aria-disabled="${x => x.disabled}" tabindex="0">
      <fluent-button icon-only><slot></slot></fluent-button>
    </template>
  `;
}

export const template: ElementViewTemplate<DrawerToggle> = drawerToggleTemplate();
