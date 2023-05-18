import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { autoUpdate, computePosition, flip, hide, size } from '@floating-ui/dom';
import { keyEnd, keyEnter, keyEscape, keyHome, keySpace, keyTab } from '@microsoft/fast-web-utilities';
import { MenuList } from '../menu-list/menu-list.js';

/**
 * The base class used for constructing a fluent-menu custom element
 * @public
 */
export class Menu extends FASTElement {
  /**
   * 	Specifies whether the menu should open on hover
   *
   * @public
   * @remarks
   * HTML Attribute: open-on-hover
   */
  @attr({ attribute: 'open-on-hover', mode: 'boolean' })
  public openOnHover: boolean = false;

  private _menu?: MenuList;
  private _trigger?: HTMLElement;

  public menuListContainer?: HTMLElement;

  private cleanup?: () => void;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
    if (this.openOnHover) {
      document.removeEventListener('hover', this.handleDocumentClick);
    }
  }

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

  // Declare menu as an observable property of type HTMLElement[]
  @observable
  public menu?: HTMLElement[];

  // Method to update the menu when it changes
  protected menuChanged(): void {
    if (this.$fastController.isConnected && this.menu && this.menu.length) {
      this._menu = this.menu[0] as MenuList;
    }
  }

  // Declare trigger as an observable property of type HTMLElement[]
  @observable
  public trigger?: HTMLElement[];

  // Method to update the trigger when it changes
  protected triggerChanged(prev: HTMLElement[] | void, next: HTMLElement[]): void {
    if (prev !== next) {
      if (Array.isArray(prev) && prev.length) {
        this.cleanupTriggerEventListeners(prev[0]);
      }

      if (next && next.length) {
        this._trigger = next[0];

        this._trigger.setAttribute('aria-haspopup', 'true');
        this._trigger.setAttribute('aria-expanded', `${this.expanded}`);

        // Add new event listeners
        if (this.openOnHover) {
          this._trigger.addEventListener('mouseover', this.toggleExpanded);
        } else {
          this._trigger.addEventListener('click', this.toggleExpanded);
        }
      }
    }
  }

  // Declare expanded as an observable boolean property
  @observable
  @attr({ mode: 'boolean' })
  public expanded: boolean = false;

  // Method to update the expanded property when it changes
  protected expandedChanged(): void {
    if (this.$fastController.isConnected && this._trigger) {
      this._trigger.setAttribute('aria-expanded', `${this.expanded}`);
    }
    Updates.enqueue(() => {
      this.setPositioning();
      this.focus();
    });
  }

  // Method to focus on the menu when expanded
  public focus(): void {
    if (this.expanded && this._menu) {
      const menu = this._menu as MenuList;
      Updates.enqueue(() => menu.focus());
    }
  }

  // Method to toggle the expanded property
  protected toggleExpanded = (e: MouseEvent) => {
    this.expanded = !this.expanded;
  };

  // Method to close the menu
  private closeMenu() {
    this.expanded = false;
  }

  // Method to handle document click events
  private handleDocumentClick = (e: any) => {
    if (e && !e.composedPath().includes(this._menu) && !e.composedPath().includes(this._trigger)) {
      this.closeMenu();
    }
  };

  // Method to cleanup trigger event listeners
  private cleanupTriggerEventListeners(trigger: HTMLElement): void {
    if (this._trigger) {
      if (this.openOnHover) {
        this._trigger.removeEventListener('mouseover', this.toggleExpanded);
      } else {
        this._trigger.removeEventListener('click', this.toggleExpanded);
      }
    }
  }
  /**
   * Handle keyboard interaction for the menu.
   *
   * @param e - the keyboard event
   * @internal
   */
  public keydownHandler(e: KeyboardEvent): boolean | void {
    const key = e.key || e.key.charCodeAt(0);

    switch (key) {
      case keyTab: {
        if (this.expanded) {
          this.expanded = false;
        }
        break;
      }
      case keyEnter: {
        e.preventDefault();
        this.expanded = !this.expanded;
        break;
      }

      case keyEscape: {
        if (this.expanded) {
          e.preventDefault();
          this.expanded = false;
        }
        break;
      }
      case keyHome:
      case keyEnd: {
        e.preventDefault();
        break;
      }
      case keySpace: {
        e.preventDefault();
        this.expanded = !this.expanded;
        break;
      }
    }
  }
}
