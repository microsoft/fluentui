import { attr } from '@microsoft/fast-element';
import { MessageBarIntent, MessageBarLayout, MessageBarShape } from './message-bar.options.js';
import { BaseMessageBar } from './message-bar.base';

/**
 * A MessageBar Custom HTML Element.
 * Based on BaseMessageBar and includes style and layout specific attributes
 *
 * @tag fluent-message-bar
 *
 */
export class MessageBar extends BaseMessageBar {
  /**
   * Sets the shape of the Message Bar.
   *
   * @public
   * @remarks
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: MessageBarShape;

  /**
   * Sets the layout of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `layout`
   */
  @attr
  public layout?: MessageBarLayout;

  /**
   * Sets the intent of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `intent`
   */
  @attr
  public intent?: MessageBarIntent;
}
