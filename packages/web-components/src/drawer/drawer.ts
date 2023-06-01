import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { DrawerPosition } from './drawer.options.js';

export interface DrawerOptions {
  toolbar?: boolean;
  open?: boolean;
  position?: DrawerPosition;
}

/**
 * The base class used for constructing a fluent-panel custom element
 * @public
 */
export class Drawer extends FASTElement {
  /**
   * The open attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: open
   */
  @attr({ attribute: 'open', mode: 'boolean' })
  public open: boolean = false;

  // Method to update the expanded property when it changes
  public openChanged(prev: boolean, next: boolean): void {
    if (this.$fastController.isConnected) {
      this.$emit('change', this.open);
    }
  }

  /**
   * The position attribute.
   *
   * @public
   * @default 'right'
   * @remarks
   * HTML Attribute: position
   */
  @attr
  public position?: DrawerPosition = DrawerPosition.right;

  public openDrawer(): void {
    this.open = true;
  }

  public closeDrawer(): void {
    this.open = false;
  }

  public toggleDrawer(): void {
    this.open = !this.open;
  }
}
