import { FocusGroup } from '@microsoft/focusgroup-polyfill/shadowless';
import type { MenuItem } from '../menu-item/menu-item.js';
import { MenuItemRole } from '../menu-item/menu-item.options.js';
import { ArrayItemCollection } from '../utils/focusgroup.js';
import { BaseMenuList } from './menu-list.base.js';

/**
 * A MenuList Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#menu | ARIA menu }.
 *
 * @tag fluent-menu-list
 *
 * @slot - The default slot for the menu items
 *
 * @public
 */
export class MenuList extends BaseMenuList {
  private fg?: FocusGroup;

  private fgItems?: ArrayItemCollection<MenuItem>;

  private layoutObserver?: MutationObserver;

  disconnectedCallback() {
    this.layoutObserver?.disconnect();
    this.fg?.disconnect();
    super.disconnectedCallback();
  }

  private updateColumnStates(): void {
    const items = Array.from(this.children);
    const hasSlot = (slot: string) =>
      items.some(item => Array.from(item.children).some(child => child.getAttribute('slot') === slot));

    const hasCheckedItem = items.some(
      item =>
        item.getAttribute('role') === MenuItemRole.menuitemcheckbox ||
        item.getAttribute('role') === MenuItemRole.menuitemradio,
    );

    this.toggleAttribute('data-has-indicator', hasCheckedItem || hasSlot('indicator'));
    this.toggleAttribute('data-has-start', hasSlot('start'));
    this.toggleAttribute('data-has-end', hasSlot('end'));
    this.toggleAttribute('data-has-submenu', hasSlot('submenu'));
  }

  override setItems(): void {
    super.setItems();

    if (this.$fastController.isConnected) {
      this.layoutObserver ??= new MutationObserver(() => this.updateColumnStates());
      this.layoutObserver.observe(this, {
        attributes: true,
        attributeFilter: ['role', 'slot'],
        childList: true,
        subtree: true,
      });
      this.updateColumnStates();
    }

    this.fgItems ??= new ArrayItemCollection<MenuItem>(() => this.menuItems?.filter(i => !i.hidden) ?? []);
    if (!this.fg) {
      this.fg = new FocusGroup(this, this.fgItems, {
        definition: {
          behavior: 'menu',
          axis: 'block',
          wrap: true,
        },
      });
    } else {
      this.fg.update();
    }
  }
}
