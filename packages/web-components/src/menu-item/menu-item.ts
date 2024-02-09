import type { Placement } from '@floating-ui/dom';
import { autoUpdate, computePosition, flip, shift, size } from '@floating-ui/dom';
import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { keyArrowLeft, keyArrowRight, keyEnter, keyEscape, keySpace } from '@microsoft/fast-web-utilities';
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
  checkboxIndicator?: StaticallyComposableHTML<MenuItem>;
  expandCollapseGlyph?: StaticallyComposableHTML<MenuItem>;
  radioIndicator?: StaticallyComposableHTML<MenuItem>;
};

/**
 * A Switch Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#menuitem | ARIA menuitem }, {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemcheckbox | ARIA menuitemcheckbox}, or {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemradio | ARIA menuitemradio }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot radio-indicator - The radio indicator
 * @slot start - Content which can be provided before the menu item content
 * @slot end - Content which can be provided after the menu item content
 * @slot - The default slot for menu item content
 * @slot expand-collapse-indicator - The expand/collapse indicator
 * @slot submenu - Used to nest menu's within menu items
 * @csspart input-container - The element representing the visual checked or radio indicator
 * @csspart checkbox - The element wrapping the `menuitemcheckbox` indicator
 * @csspart radio - The element wrapping the `menuitemradio` indicator
 * @csspart content - The element wrapping the menu item content
 * @csspart expand-collapse-glyph-container - The element wrapping the expand collapse element
 * @csspart expand-collapse - The expand/collapse element
 * @csspart submenu-region - The container for the submenu, used for positioning
 * @fires expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
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
   * The expanded state of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: expanded
   */
  @attr({ mode: 'boolean' })
  public expanded!: boolean;
  protected expandedChanged(prev: boolean | undefined, next: boolean): void {
    if (this.$fastController.isConnected) {
      if (next && this.submenu) {
        this.updateSubmenu();
      }

      this.$emit('expanded-change', this, { bubbles: false });
    }
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
   * Cleanup function for the submenu positioner.
   *
   * @public
   */
  public cleanup!: () => void;

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
   * @internal
   */
  public get hasSubmenu(): boolean {
    return !!this.submenu;
  }

  /**
   * Sets the submenu and updates its position.
   *
   * @internal
   */
  protected slottedSubmenuChanged(prev: HTMLElement[] | undefined, next: HTMLElement[]) {
    if (next.length) {
      this.submenu = next[0];
      this.updateSubmenu();
    }
  }

  /**
   * The container for the submenu.
   *
   * @internal
   */
  public submenuContainer!: HTMLDivElement;

  /**
   * @internal
   */
  @observable
  public submenu: HTMLElement | undefined;

  private focusSubmenuOnLoad: boolean = false;

  /**
   * @internal
   */
  public disconnectedCallback(): void {
    this.cleanup?.();
    super.disconnectedCallback();
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
        this.expanded && this.submenu ? this.submenu.focus() : this.expandAndFocus();
        return false;

      case keyEscape:
        // close submenu
        if (this.expanded) {
          this.closeSubMenu();
          return false;
        }
        break;

      case keyArrowLeft:
        //close submenu
        if (this.expanded) {
          this.closeSubMenu();
          return false;
        }
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
    if (this.disabled || !this.hasSubmenu || this.expanded) {
      return false;
    }

    this.expanded = true;

    return false;
  };

  /**
   * @internal
   */
  public handleMouseOut = (e: MouseEvent): boolean => {
    if (!this.expanded || this.contains(document.activeElement)) {
      return false;
    }

    this.expanded = false;

    return false;
  };

  /**
   * @internal
   */
  private closeSubMenu = (): void => {
    // close submenu
    this.expanded = false;
    this.focus();
  };

  /**
   * @internal
   */
  private expandAndFocus = (): void => {
    if (!this.hasSubmenu) {
      return;
    }

    this.focusSubmenuOnLoad = true;
    this.expanded = true;
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
        if (this.hasSubmenu) {
          this.expandAndFocus();
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
   * Calculate and apply submenu positioning.
   *
   * @public
   */
  public updateSubmenu() {
    this.cleanup?.();

    if (!this.submenu || !this.expanded) {
      return;
    }

    Updates.enqueue(() => {
      this.cleanup = autoUpdate(this, this.submenuContainer, async () => {
        const fallbackPlacements: Placement[] = ['left-start', 'right-start'];
        const { x, y } = await computePosition(this, this.submenuContainer, {
          middleware: [
            shift(),
            size({
              apply: ({ availableWidth, rects }) => {
                if (availableWidth < rects.floating.width) {
                  fallbackPlacements.push('bottom-end', 'top-end');
                }
              },
            }),
            flip({ fallbackPlacements }),
          ],
          placement: 'right-start',
          strategy: 'fixed',
        });

        Object.assign(this.submenuContainer.style, {
          left: `${x}px`,
          position: 'fixed',
          top: `${y}px`,
        });

        this.submenuLoaded();
      });
    });
  }
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
