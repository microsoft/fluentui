import { FASTMenu } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-menu-list custom element
 * @public
 */
export class MenuList extends FASTMenu {
  /**
   * sets menuitem styles to align content when when icons are present
   *
   * @public
   * @remarks
   * HTML Attribute: icons
   */
  @attr({ mode: 'boolean' })
  public icons: boolean = false;
}
