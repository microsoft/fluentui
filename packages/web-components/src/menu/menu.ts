import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { autoUpdate, computePosition, flip, hide, size } from '@floating-ui/dom';
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
   * Defines whether the menu is open or not.
   * @public
   */
  @observable
  @attr({ mode: 'boolean' })
  public open: boolean = false;

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
   * The positioning container of the menu.
   * @internal
   */
  public positioningContainer?: HTMLElement;

  /**
   * The trigger element of the menu.
   * @private
   */
  private _trigger?: HTMLElement;

  /**
   * The menu list element of the menu.
   * @private
   */
  private _menuList?: HTMLElement;

  /**
   * Holds a reference to a function that is used to cleanup resources.
   * @public
   */
  public cleanup?: () => void;

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
    this.cleanup?.();
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
      this._trigger.setAttribute('aria-expanded', `${this.open}`);
      this.addListeners();
    }
  }

  /**
   * Toggles the open state of the menu.
   * @public
   */
  public toggleMenu = () => {
    if (this.open) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  };

  /**
   * Closes the menu.
   * @public
   */
  public closeMenu = () => {
    this.open = false;
    if (this.closeOnScroll) {
      document.removeEventListener('scroll', this.closeMenu);
    }
  };

  /**
   * Opens the menu.
   * @public
   */
  public openMenu = (e?: Event) => {
    this.open = true;
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
    if (this.open && this._menuList) {
      Updates.enqueue(() => {
        this._menuList!.focus();
      });
    }
  }

  /**
   * Focuses on the menu trigger.
   * @public
   */
  public focusTrigger(): void {
    if (!this.open && this._trigger) {
      Updates.enqueue(() => {
        this._trigger!.focus();
      });
    }
  }

  /**
   * Called whenever the open state changes.
   * Updates the 'aria-expanded' attribute and sets the positioning of the menu.
   * Sets menu list position
   * emits openChanged event
   * @public
   * @param {boolean} oldValue - The previous value of 'open'.
   * @param {boolean} newValue - The new value of 'open'.
   */
  public openChanged(oldValue: boolean, newValue: boolean): void {
    if (this.$fastController.isConnected && this._trigger instanceof HTMLElement) {
      this._trigger.setAttribute('aria-expanded', `${this.open}`);
      if (this._menuList && this.open) {
        Updates.enqueue(this.setPositioningTask);
      }
    }
    this.cleanup?.();
    this.$emit('onOpenChange', { open: newValue });
  }

  /**
   * Called whenever the 'openOnHover' property changes.
   * Adds or removes a 'mouseover' event listener to the trigger based on the new value.
   * @public
   * @param {boolean} oldValue - The previous value of 'openOnHover'.
   * @param {boolean} newValue - The new value of 'openOnHover'.
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
   * @param {boolean} oldValue - The previous value of 'persistOnItemClick'.
   * @param {boolean} newValue - The new value of 'persistOnItemClick'.
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
   * @param {boolean} oldValue - The previous value of 'openOnContext'.
   * @param {boolean} newValue - The new value of 'openOnContext'.
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
   * @param {boolean} oldValue - The previous value of 'closeOnScroll'.
   * @param {boolean} newValue - The new value of 'closeOnScroll'.
   */
  public closeOnScrollChanged(oldValue: boolean, newValue: boolean): void {
    if (newValue) {
      document.addEventListener('scroll', this.closeMenu);
    } else {
      document.removeEventListener('scroll', this.closeMenu);
    }
  }

  /**
   * The task to set the positioning of the menu.
   * @protected
   */
  protected setPositioningTask = () => {
    this.setPositioning();
  };

  /**
   * Sets the positioning of the menu.
   * @protected
   */
  protected setPositioning(): void {
    if (this.$fastController.isConnected && this._menuList && this.open && this._trigger) {
      this.cleanup = autoUpdate(this, this.positioningContainer!, async () => {
        const { middlewareData, x, y } = await computePosition(this._trigger!, this.positioningContainer!, {
          placement: 'bottom',
          strategy: 'fixed',
          middleware: [
            flip(),
            size({
              apply: ({ availableHeight, rects }) => {
                this.positioningContainer?.style &&
                  Object.assign(this.positioningContainer!.style, {
                    maxHeight: `${availableHeight}px`,
                    width: `${rects.reference.width}px`,
                  });
              },
            }),
            hide(),
          ],
        });
        if (middlewareData.hide?.referenceHidden) {
          this.open = false;
          return;
        }

        this.positioningContainer?.style &&
          Object.assign(this.positioningContainer.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            transform: `translate(${x}px, ${y}px)`,
          });
      });
    }
  }

  /**
   * Adds event listeners.
   * Adds click and keydown event listeners to the trigger and a click event listener to the document.
   * If 'openOnHover' is true, adds a 'mouseover' event listener to the trigger.
   * @public
   */
  private addListeners(): void {
    document.addEventListener('click', this.handleDocumentClick);
    this._trigger?.addEventListener('keydown', this.handleTriggerKeydown);
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
   * @private
   */
  private removeListeners(): void {
    document.removeEventListener('click', this.handleDocumentClick);
    this._trigger?.removeEventListener('keydown', this.handleTriggerKeydown);
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
   * Handles keyboard interaction for the menu.
   * Closes the menu and focuses on the trigger when the Escape key is pressed.
   * Closes the menu when the Tab key is pressed.
   * @public
   * @param {KeyboardEvent} e - the keyboard event
   */
  public handleMenuKeydown(e: KeyboardEvent): boolean | void {
    if (e.defaultPrevented) {
      return;
    }
    const key = e.key;

    switch (key) {
      case keyEscape:
        e.preventDefault();
        if (this.open) {
          this.closeMenu();
          this.focusTrigger();
        }
        break;
      case keyTab:
        if (this.open) {
          this.closeMenu();
        }
        if (e.shiftKey) {
          this.focusTrigger();
        }
      default:
        return true;
    }
  }

  /**
   * Handles keyboard interaction for the trigger.
   * Toggles the menu when the Space or Enter key is pressed.
   * If the menu is open, focuses on the menu list.
   * @public
   * @param {KeyboardEvent} e - the keyboard event
   */
  public handleTriggerKeydown = (e: KeyboardEvent): boolean | void => {
    if (e.defaultPrevented) {
      return;
    }
    const key = e.key;
    switch (key) {
      case keySpace:
      case keyEnter:
        e.preventDefault();
        this.toggleMenu();
        if (this.open) {
          this.focusMenuList();
        }
        break;
      default:
        return true;
    }
  };

  /**
   * Handles document click events to close the menu when a click occurs outside of the menu or the trigger.
   * @private
   * @param {Event} e - The event triggered on document click.
   */
  private handleDocumentClick = (e: any) => {
    if (e && !e.composedPath().includes(this._menuList) && !e.composedPath().includes(this._trigger)) {
      this.closeMenu();
    }
  };
}
