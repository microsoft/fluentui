import { ElementViewTemplate, html } from '@microsoft/fast-element';
import type { DrawerSwitcherToggleButton } from './drawer-switcher-toggle-button.js';

/**
 * The template for the DrawerToggle component.
 * @public
 */
export function drawerSwitcherToggleButtonTemplate<T extends DrawerSwitcherToggleButton>(): ElementViewTemplate<T> {
  return html<T>`
    <template slot="togglebuttons" aria-disabled="${x => x.disabled}" tabindex="0">
      <fluent-button icon-only><slot></slot></fluent-button>
    </template>
  `;
}

export const template: ElementViewTemplate<DrawerSwitcherToggleButton> = drawerSwitcherToggleButtonTemplate();
