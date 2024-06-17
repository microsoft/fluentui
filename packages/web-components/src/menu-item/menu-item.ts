import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { keyArrowLeft, keyArrowRight, keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
import type { StartEndOptions } from '../patterns/start-end.js';
import { StartEnd } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { MenuItemRole, roleForMenuItem } from './menu-item.options.js';

export type MenuItemColumnCount = 0 | 1 | 2;

export { MenuItemRole, roleForMenuItem };

/**
 * Menu Item configuration options
 * @public
 */
export type MenuItemOptions = StartEndOptions<MenuItem> & {
  indicator?: StaticallyComposableHTML<MenuItem>;
  submenuGlyph?: StaticallyComposableHTML<MenuItem>;
};

/**
 * A Switch Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#menuitem | ARIA menuitem }, {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemcheckbox | ARIA menuitemcheckbox}, or {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemradio | ARIA menuitemradio }.
 *
 * @slot indicator - The checkbox or radio indicator
 * @slot start - Content which can be provided before the menu item content
 * @slot - The default slot for menu item content
 * @slot end - Content which can be provided after the menu item content
 * @slot submenu-glyph - The submenu expand/collapse indicator
 * @slot submenu - Used to nest menu's within menu items
 * @csspart indicator - The element wrapping the `menuitemcheckbox` or  `menuitemradio` indicator
 * @csspart content - The element wrapping the menu item content
 * @csspart submenu-glyph-container - The element wrapping the expand collapse element
 * @fires change - Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked
 *
 * @public
 */
export class MenuItem extends FASTElement {
  /**
   * The disabled state of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr({ mode: 'boolean' })
  public disabled!: boolean;

  /**
   * The role of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: role
   */
  @attr
  public role: MenuItemRole = MenuItemRole.menuitem;

  /**
   * The checked value of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: checked
   */
  @attr({ mode: 'boolean' })
  public checked: boolean = false;
  protected checkedChanged(oldValue: boolean, newValue: boolean): void {
    if (this.$fastController.isConnected) {
      this.$emit('change');
    }
  }

  /**
   * The hidden attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: hidden
   */
  @attr({ mode: 'boolean' })
  public hidden!: boolean;

  /**
   * The submenu slotted content.
   *
   * @internal
   */
  @observable
  public slottedSubmenu!: HTMLElement[];

  /**
   * Sets the submenu and updates its position.
   *
   * @internal
   */
  protected slottedSubmenuChanged(prev: HTMLElement[] | undefined, next: HTMLElement[]) {
    if (next.length) {
      this.submenu = next[0];
      this.submenu.setAttribute('popover', '');

      if (!CSS.supports('anchor-name', '--menu-trigger')) {
        this.style.setProperty('--menu-item-width', this.getBoundingClientRect().width - 8 + 'px');
      }
    }
  }

  /**
   * @internal
   */
  @observable
  public submenu: HTMLElement | undefined;

  private focusSubmenuOnLoad: boolean = false;

  /**
   * @internal
   */
  public handleMenuItemKeyDown = (e: KeyboardEvent): boolean => {
    if (e.defaultPrevented) {
      return false;
    }

    switch (e.key) {
      case keyEnter:
      case keySpace:
        this.invoke();
        return false;

      case keyArrowRight:
        //open/focus on submenu
        if (this.disabled) return false;
        this.submenu?.showPopover();
        this.submenu?.focus();
        return false;

      case keyArrowLeft:
        //close submenu
        try {
          this.parentElement?.hidePopover();
        } catch (e) {
          // Catch DOMException if parentElement is not a menu
        }

        return false;
    }

    return true;
  };

  /**
   * @internal
   */
  public handleMenuItemClick = (e: MouseEvent): boolean => {
    if (e.defaultPrevented || this.disabled) {
      return false;
    }

    this.invoke();
    return false;
  };

  /**
   * @internal
   */
  public submenuLoaded = (): void => {
    if (!this.focusSubmenuOnLoad) {
      return;
    }
    // TODO: React version now supports focusing on load
    this.focusSubmenuOnLoad = false;
    if (this.submenu) {
      this.submenu.focus();
      this.setAttribute('tabindex', '-1');
    }
  };

  /**
   * @internal
   */
  public handleMouseOver = (e: MouseEvent): boolean => {
    if (this.disabled) return false;

    this.submenu?.showPopover();
    return false;
  };

  /**
   * @internal
   */
  public handleMouseOut = (e: MouseEvent): boolean => {
    if (this.contains(document.activeElement)) {
      return false;
    }

    this.submenu?.hidePopover();

    return false;
  };

  /**
   * @internal
   */
  public toggleHandler = (e: ToggleEvent | Event): void => {
    if (e instanceof ToggleEvent && e.newState === 'open') {
      this.submenu?.focus();
      this.setAttribute('tabindex', '-1');
      this.setAttribute('aria-expanded', 'true');
    }
    if (e instanceof ToggleEvent && e.newState === 'closed') {
      this.setAttribute('aria-expanded', 'false');
    }
  };

  /**
   * @internal
   */
  private invoke = (): void => {
    if (this.disabled) {
      return;
    }

    switch (this.role) {
      case MenuItemRole.menuitemcheckbox:
        this.checked = !this.checked;
        break;

      case MenuItemRole.menuitem:
        if (!!this.submenu) {
          this.submenu.togglePopover();
          break;
        }

        this.$emit('change');
        break;

      case MenuItemRole.menuitemradio:
        if (!this.checked) {
          this.checked = true;
        }
        break;
    }
  };
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
/* eslint-disable-next-line */
export interface MenuItem extends StartEnd {}
applyMixins(MenuItem, StartEnd);
