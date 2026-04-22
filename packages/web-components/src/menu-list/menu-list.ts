import { FocusGroup } from '@microsoft/focusgroup-polyfill/shadowless';
import type { MenuItem } from '../menu-item/menu-item.js';
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

  disconnectedCallback() {
    this.fg?.disconnect();
    super.disconnectedCallback();
  }

  override setItems(): void {
    super.setItems();

    this.fgItems ??= new ArrayItemCollection<MenuItem>(() => this.menuItems ?? []);
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
