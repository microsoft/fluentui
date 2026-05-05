import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { keyEnter, keyEscape, keySpace, keyTab } from '@microsoft/fast-web-utilities';
import { MenuItem } from '../menu-item/menu-item.js';
import { MenuItemRole } from '../menu-item/menu-item.options.js';

/**
 * A Menu component that provides a customizable menu element.
 *
 * @tag fluent-menu
 *
 * @class Menu
 * @extends FASTElement
 *
 * @attr open-on-hover - Determines if the menu should open on hover.
 * @attr open-on-context - Determines if the menu should open on right click.
 * @attr close-on-scroll - Determines if the menu should close on scroll.
 * @attr persist-on-item-click - Determines if the menu open state should persist on click of menu item.
 * @attr split - Determines if the menu is in split state.
 *
 * @cssproperty --menu-max-height - The max-height of the menu.
 *
 * @slot primary-action - Slot for the primary action elements. Used when in `split` state.
 * @slot trigger - Slot for the trigger elements.
 * @slot - Default slot for the menu list.
 *
 * @method connectedCallback - Called when the element is connected to the DOM. Sets up the component.
 * @method disconnectedCallback - Called when the element is disconnected from the DOM. Removes event listeners.
 * @method setComponent - Sets the component state.
 * @method toggleMenu - Toggles the open state of the menu.
 * @method closeMenu - Closes the menu.
 * @method openMenu - Opens the menu.
 * @method focusMenuList - Focuses on the menu list.
 * @method focusTrigger - Focuses on the menu trigger.
 * @method openOnHoverChanged - Called whenever the 'openOnHover' property changes.
 * @method persistOnItemClickChanged - Called whenever the 'persistOnItemClick' property changes.
 * @method openOnContextChanged - Called whenever the 'openOnContext' property changes.
 * @method closeOnScrollChanged - Called whenever the 'closeOnScroll' property changes.
 * @method addListeners - Adds event listeners.
 * @method removeListeners - Removes event listeners.
 * @method menuKeydownHandler - Handles keyboard interaction for the menu.
 * @method triggerKeydownHandler - Handles keyboard interaction for the trigger.
 * @method documentClickHandler - Handles document click events to close the menu when a click occurs outside of the menu or the trigger.
 *
 * @summary The Menu component functions as a customizable menu element.
 *
 * @tag fluent-menu
 *
 * @public
 */
export class Menu extends FASTElement {
  /**
   * Determines if the menu should open on hover.
   * @public
   */
  @attr({ attribute: 'open-on-hover', mode: 'boolean' })
  public openOnHover?: boolean;

  /**
   * Determines if the menu should open on right click.
   * @public
   */
  @attr({ attribute: 'open-on-context', mode: 'boolean' })
  public openOnContext?: boolean;

  /**
   * Determines if the menu should close on scroll.
   * @public
   */
  @attr({ attribute: 'close-on-scroll', mode: 'boolean' })
  public closeOnScroll?: boolean;

  /**
   * Determines if the menu open state should persis on click of menu item
   * @public
   */
  @attr({ attribute: 'persist-on-item-click', mode: 'boolean' })
  public persistOnItemClick?: boolean;

  /**
   * Determines if the menu is in split state.
   * @public
   */
  @attr({ mode: 'boolean' })
  public split?: boolean;

  /**
   * Holds the slotted menu list.
   * @public
   */
  @observable
  public slottedMenuList!: HTMLElement[];

  /**
   * Sets up the component when the slotted menu list changes.
   * @param prev - The previous items in the slotted menu list.
   * @param next - The new items in the slotted menu list.
   * @internal
   */
  slottedMenuListChanged(prev: HTMLElement[] | undefined, next: HTMLElement[] | undefined): void {
    this._menuListAbortController?.abort();

    if (!next?.length) {
      return;
    }

    this._menuList = next[0];
    this._menuList.popover = this.openOnContext ? 'manual' : '';
    this.addMenuListListeners();
  }

  /**
   * Holds the slotted triggers.
   * @public
   */
  @observable
  public slottedTriggers!: HTMLElement[];

  /**
   * Ensures the trigger is properly set up when the slotted triggers change.
   * This includes setting ARIA attributes and adding event listeners based on the current property values.
   *
   * @param prev - The previous items in the slotted triggers list.
   * @param next - The current items in the slotted triggers list.
   * @internal
   */
  public slottedTriggersChanged(prev: HTMLElement[] | undefined, next: HTMLElement[] | undefined): void {
    this._triggerAbortController?.abort();

    if (next?.length) {
      const trigger = next[0];
      this._trigger = trigger;

      if (this._trigger?.isConnected) {
        this._trigger.setAttribute('aria-haspopup', 'true');
        this._trigger.setAttribute('aria-expanded', `${this._open}`);
        this.addTriggerListeners();
      }
    }
  }

  /**
   * Holds the primary slot element.
   * @public
   */
  @observable
  public primaryAction!: HTMLSlotElement;

  /**
   * Defines whether the menu is open or not.
   * @internal
   */
  private _open: boolean = false;

  /**
   * The trigger element of the menu.
   * @internal
   */
  private _trigger?: HTMLElement;
  /**
   * The menu list element of the menu which has the popover behavior.
   * @internal
   */
  private _menuList?: HTMLElement;

  /**
   * @internal
   */
  private _triggerAbortController?: AbortController;

  /**
   * @internal
   */
  private _menuListAbortController?: AbortController;

  /**
   * Called when the element is connected to the DOM.
   * Sets up the component.
   * @public
   */
  public connectedCallback() {
    super.connectedCallback();

    // Retained for backward compatibility. The trigger and menu list listeners are now managed by their respective
    // slot-changed callbacks, so this method is no longer responsible for setting up the component. However, it is left in place to avoid breaking changes for any existing implementations that may be relying on it.
    this.setComponent();
  }

  /**
   * Called when the element is disconnected from the DOM.
   * Removes event listeners.
   * @public
   */
  public disconnectedCallback() {
    super.disconnectedCallback();

    this._triggerAbortController?.abort();
    this._menuListAbortController?.abort();
  }

  /**
   * Sets the component.
   * @deprecated This method is no longer used. Trigger and menu-list listeners are now
   * managed by their respective slot-changed callbacks.
   * @public
   */
  public setComponent(): void {}

  /**
   * Toggles the open state of the menu.
   * @public
   */
  public toggleMenu = () => {
    this._menuList?.togglePopover(!this._open);
  };

  /**
   * Closes the menu.
   * @public
   */
  public closeMenu = (event?: Event) => {
    // Keep menu open if the event target is a menu item checkbox or radio
    if (
      event?.target instanceof MenuItem &&
      (event.target.getAttribute('role') === MenuItemRole.menuitemcheckbox ||
        event.target.getAttribute('role') === MenuItemRole.menuitemradio)
    ) {
      return;
    }
    this._menuList?.togglePopover(false);

    if (this.closeOnScroll) {
      document.removeEventListener('scroll', this.closeMenu);
    }
  };

  /**
   * Opens the menu.
   * @public
   */
  public openMenu = (e?: Event) => {
    this._menuList?.togglePopover(true);

    if (e && this.openOnContext) {
      e.preventDefault();
    }

    if (this.closeOnScroll) {
      document.addEventListener('scroll', this.closeMenu);
    }
  };

  /**
   * Focuses on the menu list.
   * @public
   */
  public focusMenuList(): void {
    Updates.enqueue(() => {
      this._menuList!.focus();
    });
  }

  /**
   * Focuses on the menu trigger.
   * @public
   */
  public focusTrigger(): void {
    Updates.enqueue(() => {
      this._trigger!.focus();
    });
  }

  /**
   * Handles the 'toggle' event on the popover.
   * @public
   * @param e - the event
   * @returns void
   */
  public toggleHandler = (e: Event): void => {
    // @ts-expect-error - Baseline 2024
    if (e.type === 'toggle' && e.newState) {
      // @ts-expect-error - Baseline 2024
      const open = e.newState === 'open';
      this._trigger?.setAttribute('aria-expanded', `${open}`);
      this._menuList?.setAttribute('focusgroup', open ? 'menu' : 'none');
      this._open = open;
      if (this._open) {
        this.focusMenuList();
      }
    }
  };

  /**
   * Called whenever the 'openOnHover' property changes.
   * Adds or removes a 'mouseover' event listener to the trigger based on the new value.
   *
   * @param oldValue - The previous value of 'openOnHover'.
   * @param newValue - The new value of 'openOnHover'.
   * @public
   */
  public openOnHoverChanged(oldValue: boolean, newValue: boolean): void {
    if (this._trigger) {
      this._triggerAbortController?.abort();
      this.addTriggerListeners();
    }
  }

  /**
   * Called whenever the 'persistOnItemClick' property changes.
   * Adds or removes a 'click' event listener to the menu list based on the new value.
   * @public
   * @param oldValue - The previous value of 'persistOnItemClick'.
   * @param newValue - The new value of 'persistOnItemClick'.
   */
  public persistOnItemClickChanged(oldValue: boolean, newValue: boolean): void {
    if (this._menuList) {
      this._menuListAbortController?.abort();
      this.addMenuListListeners();
    }
  }

  /**
   * Called whenever the 'openOnContext' property changes.
   * Adds or removes a 'contextmenu' event listener to the trigger based on the new value.
   * @public
   * @param oldValue - The previous value of 'openOnContext'.
   * @param newValue - The new value of 'openOnContext'.
   */
  public openOnContextChanged(oldValue: boolean, newValue: boolean): void {
    if (newValue) {
      this._menuList?.setAttribute('popover', 'manual');
    } else {
      this._menuList?.setAttribute('popover', '');
    }

    if (this._trigger) {
      this._triggerAbortController?.abort();
      this.addTriggerListeners();
    }
  }

  /**
   * Called whenever the 'closeOnScroll' property changes.
   * Adds or removes a 'closeOnScroll' event listener to the trigger based on the new value.
   * @public
   * @param oldValue - The previous value of 'closeOnScroll'.
   * @param newValue - The new value of 'closeOnScroll'.
   */
  public closeOnScrollChanged(oldValue: boolean, newValue: boolean): void {
    if (newValue) {
      document.addEventListener('scroll', this.closeMenu);
    } else {
      document.removeEventListener('scroll', this.closeMenu);
    }
  }

  /**
   * Adds trigger-related event listeners.
   * @internal
   */
  private addTriggerListeners(): void {
    this._triggerAbortController = new AbortController();
    const { signal } = this._triggerAbortController;

    this._trigger?.addEventListener('keydown', this.triggerKeydownHandler, { signal });

    if (this.openOnHover) {
      this._trigger?.addEventListener('mouseover', this.openMenu, { signal });
    } else if (this.openOnContext) {
      this._trigger?.addEventListener('contextmenu', this.openMenu, { signal });
      document.addEventListener('click', this.documentClickHandler, { signal });
    } else {
      this._trigger?.addEventListener('click', this.toggleMenu, { signal });
    }
  }

  /**
   * Adds menu-list event listeners.
   * @internal
   */
  private addMenuListListeners(): void {
    this._menuListAbortController = new AbortController();
    const { signal } = this._menuListAbortController;

    this._menuList?.addEventListener('toggle', this.toggleHandler, { signal });

    if (!this.persistOnItemClick) {
      this._menuList?.addEventListener('change', this.closeMenu, { signal });
    }
  }

  /**
   * Handles keyboard interaction for the menu. Closes the menu and focuses on the trigger when the Escape key is
   * pressed. Closes the menu when the Tab key is pressed.
   *
   * @param e - the keyboard event
   * @public
   */
  public menuKeydownHandler(e: KeyboardEvent): boolean | void {
    if (e.defaultPrevented) {
      return;
    }
    const key = e.key;

    switch (key) {
      case keyEscape:
        e.preventDefault();
        if (this._open) {
          this.closeMenu();
          this.focusTrigger();
        }
        break;
      case keyTab:
        if (this._open) this.closeMenu();
        if (
          e.shiftKey &&
          e.composedPath()[0] !== this._trigger &&
          (e.composedPath()[0] as HTMLElement).assignedSlot !== this.primaryAction
        ) {
          this.focusTrigger();
        } else if (e.shiftKey) {
          return true;
        }
      default:
        return true;
    }
  }

  /**
   * Handles keyboard interaction for the trigger. Toggles the menu when the Space or Enter key is pressed. If the menu
   * is open, focuses on the menu list.
   *
   * @param e - the keyboard event
   * @public
   */
  public triggerKeydownHandler = (e: KeyboardEvent): boolean | void => {
    if (e.defaultPrevented) {
      return;
    }
    const key = e.key;
    switch (key) {
      case keySpace:
      case keyEnter:
        e.preventDefault();
        this.toggleMenu();
        break;
      default:
        return true;
    }
  };

  /**
   * Handles document click events to close a menu opened with contextmenu in popover="manual" mode.
   * @internal
   * @param e - The event triggered on document click.
   */
  private documentClickHandler = (e: any) => {
    if (!e.composedPath().some((el: any) => el === this._trigger || el === this._menuList)) {
      this.closeMenu();
    }
  };
}
