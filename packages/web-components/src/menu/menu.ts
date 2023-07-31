import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { autoUpdate, computePosition, flip, hide, size } from '@floating-ui/dom';
import { keyEnter, keyEscape, keySpace, keyTab } from '@microsoft/fast-web-utilities';
import { MenuList } from '../menu-list/menu-list.js';

/**
 * The base class used for constructing a fluent-menu custom element
 * @public
 */
export class Menu extends FASTElement {
  public connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleDocumentClick);
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
  }

  /**
   * Defines whether the menu is expanded or not.
   * @public
   */
  @observable
  @attr({ mode: 'boolean' })
  public expanded: boolean = false;

  /**
   * The array of HTMLElements for the menu.
   * @public
   */
  @observable
  public menu?: HTMLElement[];

  /**
   * The array of HTMLElements for the trigger.
   * @public
   */
  @observable
  public trigger?: HTMLElement[];

  /**
   * Attribute that determines if the menu should open on hover.
   * @public
   */
  @attr({ attribute: 'open-on-hover', mode: 'boolean' })
  public openOnHover: boolean = false;

  /**
   * Holds the reference to the MenuList object.
   * @private
   */
  private _menu?: MenuList;

  /**
   * Holds the reference to the HTMLElement that triggers the menu.
   * @private
   */
  private _trigger?: HTMLElement;

  /**
   * Container that holds the menu list items.
   * @public
   */
  public menuListContainer?: HTMLElement;

  /**
   * Holds a reference to a function that is used to cleanup resources.
   * @private
   */
  private cleanup?: () => void;

  /**
   * Method to toggle the expanded state of the menu on an event.
   * @param {MouseEvent} e - The event that triggered the expansion of the menu.
   * @public
   */
  public toggleExpanded = (e: MouseEvent) => {
    this.expanded = !this.expanded;
  };

  /**
   * Method to close the menu.
   * @public
   */
  public closeMenu() {
    this.expanded = false;
  }

  /**
   * Method to open the menu.
   * @public
   */
  public openMenu() {
    this.expanded = false;
  }

  /**
   * Method to focus on the menu.
   * @public
   */
  public focus(): void {
    if (this.expanded && this._menu) {
      const menu = this._menu as MenuList;
      Updates.enqueue(() => menu.focus());
    }
  }

  /**
   * Method to set the positioning of the menu.
   * @public
   */
  public setPositioning(): void {
    if (this.$fastController.isConnected && this._trigger && this.menuListContainer) {
      this.cleanup = autoUpdate(this, this.menuListContainer, async () => {
        const { middlewareData, x, y } = await computePosition(this._trigger!, this.menuListContainer!, {
          placement: 'bottom',
          strategy: 'fixed',
          middleware: [
            flip(),
            size({
              apply: ({ availableHeight, rects }) => {
                this.menuListContainer?.style &&
                  Object.assign(this.menuListContainer.style, {
                    maxHeight: `${availableHeight}px`,
                    width: `${rects.reference.width}px`,
                  });
              },
            }),
            hide(),
          ],
        });
        if (middlewareData.hide?.referenceHidden) {
          this.expanded = false;
          return;
        }

        this.menuListContainer?.style &&
          Object.assign(this.menuListContainer.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            transform: `translate(${x}px, ${y}px)`,
          });
      });
    }
  }

  /**
   * Method that gets called whenever the menu changes.
   * @protected
   */
  protected menuChanged(): void {
    if (this.$fastController.isConnected && this.menu && this.menu.length) {
      this._menu = this.menu[0] as MenuList;
    }
  }

  /**
   * Method that gets called whenever the trigger changes.
   * @protected
   * @param {HTMLElement[] | void} prev - The previous value of the trigger.
   * @param {HTMLElement[]} next - The new value of the trigger.
   */
  protected triggerChanged(prev: HTMLElement[] | void, next: HTMLElement[]): void {
    if (prev !== next) {
      if (Array.isArray(prev) && prev.length) {
        this.cleanupTriggerEventListeners(prev[0]);
      }

      if (next && next.length) {
        this._trigger = next[0];
        this._trigger.setAttribute('aria-haspopup', 'true');
        this._trigger.setAttribute('aria-expanded', `${this.expanded}`);
        this._trigger.addEventListener('keydown', this.handleTriggerKeydown);
        this._trigger.addEventListener('click', this.toggleExpanded);

        if (this.openOnHover) {
          this._trigger.addEventListener('mouseover', this.toggleExpanded);
        }
      }
    }
  }

  /**
   * Method that gets called whenever the expanded state changes.
   * @protected
   */
  protected expandedChanged(): void {
    if (this.$fastController.isConnected && this._trigger) {
      this._trigger.setAttribute('aria-expanded', `${this.expanded}`);
    }
    Updates.enqueue(() => {
      this.setPositioning();
      this.focus();
    });
  }

  /**
   * Handles document click events to close the menu when a click occurs outside of the menu or the trigger.
   * @param {Event} e - The event triggered on document click.
   * @private
   */
  private handleDocumentClick = (e: any) => {
    if (e && !e.composedPath().includes(this._menu) && !e.composedPath().includes(this._trigger)) {
      this.closeMenu();
    }
  };

  /**
   * Handle keyboard interaction for the menu.
   *
   * @param e - the keyboard event
   * @internal
   */
  public handleMenuKeydown(e: KeyboardEvent): boolean | void {
    const key = e.key;

    switch (key) {
      case keyTab: {
        if (this.expanded) {
          this.expanded = false;
        }
        break;
      }
      case keyEscape: {
        if (this.expanded) {
          e.preventDefault();
          this.expanded = false;
          this._trigger?.focus();
        }
        break;
      }
    }
  }

  /**
   * Handles keyboard interaction for the trigger.
   * @param {KeyboardEvent} e - the keyboard event
   * @public
   */
  public handleTriggerKeydown(e: KeyboardEvent): void {
    const key = e.key;
    switch (key) {
      case keySpace:
      case keyEnter: {
        e.preventDefault();
        this.expanded = !this.expanded;
        break;
      }
    }
  }

  /**
   * Method to cleanup trigger event listeners
   * @param {HTMLElement} trigger - The HTMLElement of the trigger
   * @private
   */
  private cleanupTriggerEventListeners(trigger: HTMLElement): void {
    if (this._trigger) {
      this._trigger.removeEventListener('keydown', this.handleTriggerKeydown);
      if (this.openOnHover) {
        this._trigger.removeEventListener('mouseover', this.toggleExpanded);
      } else {
        this._trigger.removeEventListener('click', this.toggleExpanded);
      }
    }
  }
}
