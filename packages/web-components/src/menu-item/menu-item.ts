import { FASTMenuItem } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-menu-item custom element
 * @public
 */
export class MenuItem extends FASTMenuItem {
  /**
   * Sets menu item styles for content alignment when checkboxes and radios are present
   *
   * @public
   * @remarks
   * HTML Attribute: checkmark
   */
  @attr({ mode: 'boolean' })
  public checkmark: boolean = false;

  /**
   * Sets menu item styles for content alignment when icons are present
   *
   * @public
   * @remarks
   * HTML Attribute: icon
   */
  @attr({ mode: 'boolean' })
  public icon: boolean = false;
}
