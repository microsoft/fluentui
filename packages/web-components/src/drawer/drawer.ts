import { attr, FASTElement, observable } from '@microsoft/fast-element';
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
  constructor() {
    super();
  }

  public drawer?: HTMLElement;

  protected openChanged(): void {
    if (this.$fastController.isConnected && this.drawer) {
      console.log('openChanged');
    }
  }

  /**
   * The toolbar attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: toolbar
   */

  @attr({ mode: 'boolean' })
  public toolbar: boolean = false;

  /**
   * The open attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: open
   */
  @observable
  @attr({ attribute: 'open', mode: 'boolean' })
  public open: boolean = false;

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

  /**
   * @internal
   */
  public dismiss(): void {
    this.$emit('dismiss');
    this.open = false;
  }
}
