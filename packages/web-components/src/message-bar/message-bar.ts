import { attr, FASTElement } from '@microsoft/fast-element';
import { MessageBarIntent, MessageBarLayout, MessageBarPoliteness, MessageBarShape } from './message-bar.options.js';

/**
 * A Message Bar Custom HTML Element.
 *
 * @slot actions - Content that can be provided for the actions
 * @slot close - Content that can be provided for the close button
 * @slot - The default slot for the content
 * @public
 */
export class MessageBar extends FASTElement {
  /**
   * Sets the aria-labelledby attribute of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `aria-labelledby`
   */
  @attr({ attribute: 'aria-labelledby' })
  ariaLabelledBy: string | null = null;

  /**
   * Sets the shape of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `shape`
   */
  @attr
  shape: MessageBarShape = 'rounded';

  /**
   * Sets the layout of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `layout`
   */
  @attr
  layout: MessageBarLayout = 'singleline';

  /**
   * Sets the intent of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `intent`
   */
  @attr
  intent: MessageBarIntent = 'info';

  /**
   * Sets the politeness of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `politeness`
   */
  @attr
  politeness: MessageBarPoliteness = 'polite';

  /**
   * @public
   * Method to emit a `dismiss` event when the message bar is dismissed
   */
  public dismissMessageBar = () => {
    this.$emit('dismiss', {});
  };
}
