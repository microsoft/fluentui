import { attr, type ElementsFilter, FASTElement, observable } from '@microsoft/fast-element';
import { keyArrowLeft, keyArrowRight, keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import type { MenuList } from '../menu-list/menu-list.js';
import type { StartEndOptions } from '../patterns/start-end.js';
import { StartEnd } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { toggleState } from '../utils/element-internals.js';
import type { StaticallyComposableHTML } from '../utils/template-helpers.js';
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
 * Creates a function that can be used to filter a Node array, selecting only elements with elementInternals role of "menu".
 * @public
 */
export const menuFilter = (): ElementsFilter => value =>
  value.nodeType === 1 && (value as MenuList).elementInternals.role === 'menu';

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
 * @csspart content - The element wrapping the menu item content
 * @fires change - Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked
 *
 * @public
 */
export class MenuItem extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

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
   * Handles changes to disabled attribute custom states and element internals
   * @param prev - the previous state
   * @param next - the next state
   */
  public disabledChanged(prev: boolean | undefined, next: boolean | undefined) {
    this.elementInternals.ariaDisabled = !!next ? `${next}` : null;
    toggleState(this.elementInternals, 'disabled', next);
  }

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
   * Handles changes to role attribute element internals properties
   * @param prev - the previous state
   * @param next - the next state
   */
  public roleChanged(prev: MenuItemRole | undefined, next: MenuItemRole | undefined) {
    this.elementInternals.role = next ?? MenuItemRole.menuitem;
  }

  /**
   * The checked value of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: checked
   */
  @attr({ mode: 'boolean' })
  public checked: boolean = false;

  /**
   * Handles changes to checked attribute custom states and element internals
   * @param prev - the previous state
   * @param next - the next state
   */
  protected checkedChanged(prev: boolean, next: boolean): void {
    const checkableMenuItem = this.role !== MenuItemRole.menuitem;
    this.elementInternals.ariaChecked = checkableMenuItem ? `${!!next}` : null;
    toggleState(this.elementInternals, 'checked', checkableMenuItem ? next : false);

    if (this.$fastController.isConnected) {
      this.$emit('change', next, { bubbles: true });
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
    this.submenu?.removeEventListener('toggle', this.toggleHandler);

    if (next.length) {
      this.submenu = next[0];
      this.submenu.toggleAttribute('popover', true);
      this.submenu.addEventListener('toggle', this.toggleHandler);
      this.elementInternals.ariaHasPopup = 'menu';
      toggleState(this.elementInternals, 'submenu', true);
    } else {
      this.elementInternals.ariaHasPopup = null;
      toggleState(this.elementInternals, 'submenu', false);
    }
  }

  /**
   * @internal
   */
  @observable
  public submenu: HTMLElement | undefined;

  public connectedCallback(): void {
    super.connectedCallback();

    this.elementInternals.role = this.role ?? MenuItemRole.menuitem;
    this.elementInternals.ariaChecked = this.role !== MenuItemRole.menuitem ? `${!!this.checked}` : null;
  }

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
        if (!this.disabled) {
          this.submenu?.togglePopover(true);
          this.submenu?.focus();
        }

        return false;

      case keyArrowLeft:
        //close submenu
        if (this.parentElement?.hasAttribute('popover')) {
          this.parentElement.togglePopover(false);
          // focus the menu item containing the submenu
          this.parentElement.parentElement?.focus();
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
  public handleMouseOver = (e: MouseEvent): boolean => {
    if (this.disabled) {
      return false;
    }
    this.submenu?.togglePopover(true);
    return false;
  };

  /**
   * @internal
   */
  public handleMouseOut = (e: MouseEvent): boolean => {
    if (this.contains(document.activeElement)) {
      return false;
    }
    this.submenu?.togglePopover(false);

    return false;
  };

  /**
   * Setup required ARIA on open/close
   * @internal
   */
  public toggleHandler = (e: Event): void => {
    if (e instanceof ToggleEvent && e.newState === 'open') {
      this.setAttribute('tabindex', '-1');
      this.elementInternals.ariaExpanded = 'true';
      this.setSubmenuPosition();
    }
    if (e instanceof ToggleEvent && e.newState === 'closed') {
      this.elementInternals.ariaExpanded = 'false';
      this.setAttribute('tabindex', '0');
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
          this.submenu.togglePopover(true);
          this.submenu.focus();
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

  /**
   * Set fallback position of menu on open when CSS anchor not supported
   * @internal
   */
  public setSubmenuPosition = (): void => {
    if (!CSS.supports('anchor-name', '--anchor') && !!this.submenu) {
      const thisRect = this.getBoundingClientRect();
      const thisSubmenuRect = this.submenu.getBoundingClientRect();
      const inlineEnd = getComputedStyle(this).direction === 'ltr' ? 'right' : 'left';

      // If an open submenu is too wide for the viewport, move it above.
      if (thisRect.width + thisSubmenuRect.width > window.innerWidth * 0.75) {
        this.submenu.style.translate = '0 -100%';
        return;
      }

      // If the open submenu is overflows the inline-end of the window (e.g. justify-content: end),
      // move to inline-start of menu item
      if (thisRect[inlineEnd] + thisSubmenuRect.width > window.innerWidth) {
        this.submenu.style.translate = '-100% 0';
        return;
      }

      // Default to inline-end of menu item
      this.submenu.style.translate = `${thisRect.width - 8}px 0`;
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
