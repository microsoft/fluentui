import { FASTMenu, MenuItemRole } from '@microsoft/fast-foundation';
import { MenuItem, MenuItemColumnCount } from '../menu-item/index.js';

/**
 * The base class used for constructing a fluent-menu-list custom element
 * @public
 */

export class MenuList extends FASTMenu {
  protected setItems(): void {
    super.setItems();

    /**
     * Set the indent attribute on MenuItem elements based on their
     * position in the MenuList. Each MenuItem element has a data-indent attribute that is
     * used to set the indent of the element's start slot content.
     */
    const filteredMenuListItems = this.menuItems?.filter(this.isMenuItemElement);

    filteredMenuListItems?.forEach((item: HTMLElement, index: number) => {
      const indent: MenuItemColumnCount = filteredMenuListItems?.reduce<MenuItemColumnCount>((accum, current) => {
        const elementValue = MenuList.elementIndent(current as HTMLElement);

        return Math.max(accum, elementValue as number) as MenuItemColumnCount;
      }, 0);

      if (item instanceof MenuItem) {
        item.setAttribute('data-indent', `${indent}`);
      }
    });
  }

  private static elementIndent(el: HTMLElement): MenuItemColumnCount {
    const role = el.getAttribute('role');
    const startSlot = el.querySelector('[slot=start]');

    if (role && role !== MenuItemRole.menuitem) {
      return startSlot ? 2 : 1;
    }

    return startSlot ? 1 : 0;
  }
}
