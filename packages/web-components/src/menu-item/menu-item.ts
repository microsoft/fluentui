import { FASTMenuItem } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-menu-item custom element
 * @public
 */
export class MenuItem extends FASTMenuItem {
  /**
   * sets menu item styles for content alignment
   *
   * @public
   * @remarks
   * HTML Attribute: icon
   */
  @attr({ mode: 'boolean' })
  public icon: boolean = false;
}
