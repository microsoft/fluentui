import { FASTElement, Observable, observable, Updates } from '@microsoft/fast-element';
import { isHTMLElement, keyArrowDown, keyArrowUp, keyEnd, keyHome } from '@microsoft/fast-web-utilities';
import type { MenuItemColumnCount } from '../menu-item/menu-item.js';
import { MenuItem } from '../menu-item/menu-item.js';
import { MenuItemRole } from '../menu-item/menu-item.options.js';

/**
 * A Menu Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#menu | ARIA menu }.
 *
 * @slot - The default slot for the menu items
 *
 * @public
 */
export class MenuList extends FASTElement {
  /**
   * @internal
   */
  @observable
  public items!: HTMLElement[];
  protected itemsChanged(oldValue: HTMLElement[], newValue: HTMLElement[]): void {
    // only update children after the component is connected and
    // the setItems has run on connectedCallback
    // (menuItems is undefined until then)
    if (this.$fastController.isConnected && this.menuItems !== undefined) {
      this.setItems();
    }
  }

  protected menuItems: Element[] | undefined;

  /**
   * The index of the focusable element in the items array
   * defaults to -1
   */
  private focusIndex: number = -1;

  private static focusableElementRoles = MenuItemRole;

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();
    Updates.enqueue(() => {
      // wait until children have had a chance to
      // connect before setting/checking their props/attributes
      this.setItems();
    });

    this.addEventListener('change', this.changedMenuItemHandler);
  }

  /**
   * @internal
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeItemListeners();
    this.menuItems = undefined;
    this.removeEventListener('change', this.changedMenuItemHandler);
  }

  /**
   * @internal
   */
  public readonly isNestedMenu = (): boolean => {
    return (
      this.parentElement !== null &&
      isHTMLElement(this.parentElement) &&
      this.parentElement.getAttribute('role') === 'menuitem'
    );
  };

  /**
   * Focuses the first item in the menu.
   *
   * @public
   */
  public focus(): void {
    this.setFocus(0, 1);
  }

  /**
   * @internal
   */
  public handleMenuKeyDown(e: KeyboardEvent): void | boolean {
    if (e.defaultPrevented || this.menuItems === undefined) {
      return;
    }
    switch (e.key) {
      case keyArrowDown:
        // go forward one index
        this.setFocus(this.focusIndex + 1, 1);
        return;
      case keyArrowUp:
        // go back one index
        this.setFocus(this.focusIndex - 1, -1);
        return;
      case keyEnd:
        // set focus on last item
        this.setFocus(this.menuItems.length - 1, -1);
        return;
      case keyHome:
        // set focus on first item
        this.setFocus(0, 1);
        return;

      default:
        // if we are not handling the event, do not prevent default
        return true;
    }
  }

  /**
   * if focus is moving out of the menu, reset to a stable initial state
   * @internal
   */
  public handleFocusOut = (e: FocusEvent) => {
    if (!this.contains(e.relatedTarget as Element) && this.menuItems !== undefined) {
      // find our first focusable element
      const focusIndex: number = this.menuItems.findIndex(this.isFocusableElement);
      // set the current focus index's tabindex to -1
      this.menuItems[this.focusIndex].setAttribute('tabindex', '-1');
      // set the first focusable element tabindex to 0
      this.menuItems[focusIndex].setAttribute('tabindex', '0');
      // set the focus index
      this.focusIndex = focusIndex;
    }
  };

  private handleItemFocus = (e: FocusEvent) => {
    const targetItem: HTMLElement = e.target as HTMLElement;

    if (this.menuItems !== undefined && targetItem !== this.menuItems[this.focusIndex]) {
      this.menuItems[this.focusIndex].setAttribute('tabindex', '-1');
      this.focusIndex = this.menuItems.indexOf(targetItem);
      targetItem.setAttribute('tabindex', '0');
    }
  };

  private removeItemListeners(items: HTMLElement[] = this.items): void {
    items.forEach(item => {
      item.removeEventListener('focus', this.handleItemFocus);
      Observable.getNotifier(item).unsubscribe(this, 'hidden');
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

  protected setItems(): void {
    const children: HTMLElement[] = Array.from(this.children) as HTMLElement[];

    this.removeItemListeners(children);

    children.forEach((child: Element) => Observable.getNotifier(child).subscribe(this, 'hidden'));

    const newItems: Element[] = children.filter(child => !child.hasAttribute('hidden'));

    this.menuItems = newItems;

    const menuItems = this.menuItems.filter(this.isMenuItemElement);

    // if our focus index is not -1 we have items
    if (menuItems.length) {
      this.focusIndex = 0;
    }

    menuItems.forEach((item: HTMLElement, index: number) => {
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
      item.addEventListener('focus', this.handleItemFocus);
    });

    /**
     * Set the indent attribute on MenuItem elements based on their
     * position in the MenuList. Each MenuItem element has a data-indent attribute that is
     * used to set the indent of the element's start slot content.
     */
    const filteredMenuListItems = this.menuItems?.filter(this.isMenuItemElement);
    const indent: MenuItemColumnCount = filteredMenuListItems?.reduce<MenuItemColumnCount>((accum, current) => {
      const elementValue = MenuList.elementIndent(current as HTMLElement);

      return Math.max(accum, elementValue as number) as MenuItemColumnCount;
    }, 0);

    filteredMenuListItems?.forEach((item: HTMLElement) => {
      if (item instanceof MenuItem) {
        item.setAttribute('data-indent', `${indent}`);
      }
    });
  }

  /**
   * Method for Observable changes to the hidden attribute of child elements
   */
  public handleChange(source: any, propertyName: string) {
    if (propertyName === 'hidden') {
      this.setItems();
    }
  }

  /**
   * Handle change from child MenuItem element and set radio group behavior
   */
  private changedMenuItemHandler = (e: Event): void => {
    if (this.menuItems === undefined) {
      return;
    }
    const changedMenuItem: MenuItem = e.target as MenuItem;
    const changeItemIndex: number = this.menuItems.indexOf(changedMenuItem);

    if (changeItemIndex === -1) {
      return;
    }

    if (changedMenuItem.role === 'menuitemradio' && changedMenuItem.checked === true) {
      for (let i = changeItemIndex - 1; i >= 0; --i) {
        const item: Element = this.menuItems[i];
        const role: string | null = item.getAttribute('role');
        if (role === MenuItemRole.menuitemradio) {
          (item as MenuItem).checked = false;
        }
        if (role === 'separator') {
          break;
        }
      }
      const maxIndex: number = this.menuItems.length - 1;
      for (let i = changeItemIndex + 1; i <= maxIndex; ++i) {
        const item: Element = this.menuItems[i];
        const role: string | null = item.getAttribute('role');
        if (role === MenuItemRole.menuitemradio) {
          (item as MenuItem).checked = false;
        }
        if (role === 'separator') {
          break;
        }
      }
    }
  };

  /**
   * check if the item is a menu item
   */
  protected isMenuItemElement = (el: Element): el is HTMLElement => {
    return (
      el instanceof MenuItem ||
      (isHTMLElement(el) && (el.getAttribute('role') as string) in MenuList.focusableElementRoles)
    );
  };

  /**
   * check if the item is focusable
   */
  private isFocusableElement = (el: Element): el is HTMLElement => {
    return this.isMenuItemElement(el);
  };

  private setFocus(focusIndex: number, adjustment: number): void {
    if (this.menuItems === undefined) {
      return;
    }

    while (focusIndex >= 0 && focusIndex < this.menuItems.length) {
      const child: Element = this.menuItems[focusIndex];

      if (this.isFocusableElement(child)) {
        // change the previous index to -1
        if (this.focusIndex > -1 && this.menuItems.length >= this.focusIndex - 1) {
          this.menuItems[this.focusIndex].setAttribute('tabindex', '-1');
        }

        // update the focus index
        this.focusIndex = focusIndex;

        // update the tabindex of next focusable element
        child.setAttribute('tabindex', '0');

        // focus the element
        child.focus();

        break;
      }

      focusIndex += adjustment;
    }
  }
}
