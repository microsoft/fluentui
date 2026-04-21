import { FocusGroup, type FocusGroupItemCollection } from '@microsoft/focusgroup-polyfill/shadowless';
import { isMenuItem } from '../menu-item/menu-item.options.js';
import { ItemCollection } from '../utils/focusgroup.js';
import { waitForConnectedDescendants } from '../utils/request-idle-callback.js';
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
  private fg!: FocusGroup;

  private fgItems!: FocusGroupItemCollection;

  connectedCallback() {
    super.connectedCallback();

    waitForConnectedDescendants(this, () => {
      this.fg = new FocusGroup(this, this.fgItems, {
        definition: {
          behavior: 'menu',
          axis: 'block',
          wrap: true,
        },
      });
    });
  }

  disconnectedCallback() {
    this.fg?.disconnect();
    super.disconnectedCallback();
  }

  override setItems(): void {
    super.setItems();

    this.fgItems ??= new ItemCollection(this, el => isMenuItem(el) && !!this.menuItems?.includes(el));
    this.fg?.update();
  }
}
