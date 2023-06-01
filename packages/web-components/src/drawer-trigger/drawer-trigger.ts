import { attr, observable, Updates } from '@microsoft/fast-element';
import { keyEnter } from '@microsoft/fast-web-utilities';
import { Button } from '../button/index.js';

/**
 * The base class used for constructing a fluent-drawer-trigger custom element
 * @public
 */
export class DrawerTrigger extends Button {
  // Declare expanded as an observable boolean property
  @observable
  @attr({ mode: 'boolean' })
  public expanded: boolean = false;

  public drawerButton?: HTMLElement;

  /**
   * The position attribute.
   *
   * @public
   * @default 'right'
   * @remarks
   * HTML Attribute: position
   */
  @attr({ attribute: 'drawer-id' })
  public drawerID?: string;

  public clickHandler(e: MouseEvent): void {
    this.expanded = !this.expanded;
  }

  // Method to update the expanded property when it changes
  protected expandedChanged(): void {
    if (this.$fastController.isConnected && this.drawerButton) {
      this.drawerButton.setAttribute('aria-expanded', `${this.expanded}`);
    }
    this.toggleDrawer();
  }

  public toggleDrawer(): void {
    const drawerId = this.getAttribute('drawer-id');

    if (drawerId) {
      const drawer = document.getElementById(drawerId);
      if (drawer && this.expanded) {
        drawer.setAttribute('open', '');
      } else if (drawer && !this.expanded) {
        drawer.removeAttribute('open');
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
      case keyEnter: {
        e.preventDefault();
        this.expanded = true;
        break;
      }
    }
  }
}
