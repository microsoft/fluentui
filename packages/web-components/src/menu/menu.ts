import { FASTMenu, MenuItemRole } from '@microsoft/fast-foundation';
import { MenuItem, MenuItemColumnCount } from '../index.js';

/**
 * The base class used for constructing a fluent-menu custom element
 * @public
 */

export class Menu extends FASTMenu {
  protected setItems(): void {
    super.setItems();

    /**
     * TSet the indent attribute on MenuItem elements based on their
     * position in the Menu. Each MenuItem element has a data-indent attribute that is
     * used to set the indent of the element's start slot content.
     */
    const filteredMenuItems = this.menuItems?.filter(this.isMenuItemElement);

    filteredMenuItems?.forEach((item: HTMLElement, index: number) => {
      const indent: MenuItemColumnCount = filteredMenuItems?.reduce<MenuItemColumnCount>((accum, current) => {
        const elementValue = Menu.elementIndent(current as HTMLElement);

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
      return !startSlot ? 1 : 2;
    }

    return !startSlot ? 0 : 1;
  }
}
