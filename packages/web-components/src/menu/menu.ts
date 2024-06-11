import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { keyEnter, keyEscape, keySpace, keyTab } from '@microsoft/fast-web-utilities';
import { MenuList } from '../menu-list/menu-list.js';

/**
 * The Menu class represents a menu component.
 * @public
 */
export class Menu extends FASTElement {
  /**
   * Determines if the menu should open on hover.
   * @public
   */
  @observable
  @attr({ attribute: 'open-on-hover', mode: 'boolean' })
  public openOnHover?: boolean = false;

  /**
   * Determines if the menu should open on right click.
   * @public
   */
  @observable
  @attr({ attribute: 'open-on-context', mode: 'boolean' })
  public openOnContext?: boolean = false;

  /**
   * Determines if the menu should close on scroll.
   * @public
   */
  @observable
  @attr({ attribute: 'close-on-scroll', mode: 'boolean' })
  public closeOnScroll?: boolean = false;

  /**
   * Determines if the menu open state should persis on click of menu item
   * @public
   */
  @observable
  @attr({ attribute: 'persist-on-item-click', mode: 'boolean' })
  public persistOnItemClick?: boolean = false;

  /**
   * Holds the slotted menu list.
   * @public
   */
  @observable
  public slottedMenuList: MenuList[] = [];

  /**
   * Holds the slotted triggers.
   * @public
   */
  @observable
  public slottedTriggers: HTMLElement[] = [];

  /**
   * The trigger element of the menu.
   * @internal
   */
  private _trigger?: HTMLElement;
  /**
   * The menu list element of the menu which has the popover behavior.
   *  @internal
   */
  private _menuList?: HTMLElement;

  /**
   * Called when the element is connected to the DOM.
   * Sets up the component.
   * @public
   */
  public connectedCallback() {
    super.connectedCallback();
    Updates.enqueue(() => this.setComponent());
  }

  /**
   * Called when the element is disconnected from the DOM.
   * Removes event listeners.
   * @public
   */
  public disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListeners();
  }

  /**
   * Sets the component.
   * Sets the trigger and menu list elements and adds event listeners.
   * @public
   */
  public setComponent(): void {
    if (this.$fastController.isConnected && this.slottedMenuList.length && this.slottedTriggers.length) {
      this._trigger = this.slottedTriggers![0];
      this._menuList = this.slottedMenuList![0];
      this._trigger.setAttribute('aria-haspopup', 'true');
      this._trigger.setAttribute('aria-expanded', 'false');
      this._menuList.setAttribute('popover', '');

      this.addListeners();
    }
  }

  /**
   * Toggles the open state of the menu.
   * @public
   */
  public toggleMenu = () => {
    this._menuList?.togglePopover();
  };

  /**
   * Closes the menu.
   * @public
   */
  public closeMenu = () => {
    this._menuList?.hidePopover();

    if (this.closeOnScroll) {
      document.removeEventListener('scroll', this.closeMenu);
    }
  };

  /**
   * Opens the menu.
   * @public
   */
  public openMenu = (e?: Event) => {
    if (e && this.openOnContext) {
      e.preventDefault();
    }
    this._menuList?.showPopover();

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
  public toggleHandler = (e: Event | ToggleEvent): void => {
    if (e instanceof ToggleEvent) {
      if (e.newState === 'open') {
        this._trigger?.setAttribute('aria-expanded', 'true');
        this.focusMenuList();
      } else {
        this._trigger?.setAttribute('aria-expanded', 'false');
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
    if (newValue) {
      this._trigger?.addEventListener('mouseover', this.openMenu);
    } else {
      this._trigger?.removeEventListener('mouseover', this.openMenu);
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
    if (!newValue) {
      this._menuList?.addEventListener('click', this.closeMenu);
    } else {
      this._menuList?.removeEventListener('click', this.closeMenu);
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
      this._trigger?.addEventListener('contextmenu', this.openMenu);
    } else {
      this._trigger?.removeEventListener('contextmenu', this.openMenu);
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

  // /**
  //  * Adds event listeners.
  //  * Adds click and keydown event listeners to the trigger and a click event listener to the document.
  //  * If 'openOnHover' is true, adds a 'mouseover' event listener to the trigger.
  //  * @public
  //  */
  private addListeners(): void {
    this._menuList?.addEventListener('toggle', this.toggleHandler);

    this._trigger?.addEventListener('keydown', this.triggerKeydownHandler);
    if (!this.persistOnItemClick) {
      this._menuList?.addEventListener('click', this.closeMenu);
    }
    if (this.openOnHover) {
      this._trigger?.addEventListener('mouseover', this.openMenu);
    } else if (this.openOnContext) {
      this._trigger?.addEventListener('contextmenu', this.openMenu);
    } else {
      this._trigger?.addEventListener('click', this.toggleMenu);
    }
  }

  /**
   * Removes event listeners.
   * Removes click and keydown event listeners from the trigger and a click event listener from the document.
   * Also removes 'mouseover' event listeners from the trigger.
   * @internal
   */
  private removeListeners(): void {
    this._menuList?.removeEventListener('toggle', this.toggleHandler);

    this._trigger?.removeEventListener('keydown', this.triggerKeydownHandler);
    if (!this.persistOnItemClick) {
      this._menuList?.removeEventListener('click', this.closeMenu);
    }
    if (this.openOnHover) {
      this._trigger?.removeEventListener('mouseover', this.openMenu);
    }
    if (this.openOnContext) {
      this._trigger?.removeEventListener('contextmenu', this.openMenu);
    } else {
      this._trigger?.removeEventListener('click', this.toggleMenu);
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
        this.closeMenu();
        this.focusTrigger();
        break;
      case keyTab:
        this.closeMenu();
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
}
