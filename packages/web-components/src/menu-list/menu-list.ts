import { FASTElement, observable, Updates } from '@microsoft/fast-element';
import { isHTMLElement } from '@microsoft/fast-web-utilities';
import type { MenuItemColumnCount } from '../menu-item/menu-item.js';
import type { MenuItem } from '../menu-item/menu-item.js';
import { isMenuItem, MenuItemRole } from '../menu-item/menu-item.options.js';

/**
 * A Menu Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#menu | ARIA menu }.
 *
 * @tag fluent-menu-list
 *
 * @slot - The default slot for the menu items
 *
 * @public
 */
export class MenuList extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

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

  protected menuItems: HTMLElement[] | undefined;

  private static focusableElementRoles = MenuItemRole;

  constructor() {
    super();

    this.elementInternals.role = 'menu';
  }

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

    Updates.enqueue(() => {
      // @ts-expect-error: client side module.
      window.FOCUSGROUP_POLYFILL?.(this);
    });

    this.addEventListener('change', this.changedMenuItemHandler);
  }

  /**
   * @internal
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();
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
    this.menuItems?.[0]?.focus();
  }

  private static elementIndent(el: HTMLElement): MenuItemColumnCount {
    const role = el.role;
    const startSlot = el.querySelector('[slot=start]');

    if (role && role !== MenuItemRole.menuitem) {
      return startSlot ? 2 : 1;
    }

    return startSlot ? 1 : 0;
  }

  protected setItems(): void {
    const children: HTMLElement[] = Array.from(this.children) as HTMLElement[];

    this.menuItems = children.filter(child => !child.hasAttribute('hidden')).filter(this.isMenuItemElement);

    /**
     * Set the indent attribute on MenuItem elements based on their
     * position in the MenuList. Each MenuItem element has a data-indent attribute that is
     * used to set the indent of the element's start slot content.
     */
    const indent: MenuItemColumnCount = this.menuItems?.reduce<MenuItemColumnCount>((accum, current) => {
      const elementValue = MenuList.elementIndent(current as HTMLElement);

      return Math.max(accum, elementValue as number) as MenuItemColumnCount;
    }, 0);

    this.menuItems?.forEach((item: HTMLElement) => {
      item.dataset.indent = `${indent}`;
      if (!item.hasAttribute('disabled')) {
        item.tabIndex = 0;
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
        const role: string | null = (item as HTMLElement).role;
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
        const role: string | null = (item as HTMLElement).role;
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
    return isMenuItem(el) || (isHTMLElement(el) && !!el.role && el.role in MenuList.focusableElementRoles);
  };
}
