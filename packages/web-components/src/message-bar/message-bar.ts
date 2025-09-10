import { attr, FASTElement } from '@microsoft/fast-element';
import { MessageBarIntent, MessageBarLayout, MessageBarShape } from './message-bar.options.js';

/**
 * A Message Bar Custom HTML Element.
 *
 * @tag fluent-message-bar
 *
 * @slot actions - Content that can be provided for the actions
 * @slot dismiss - Content that can be provided for the dismiss button
 * @slot - The default slot for the content
 * @public
 */
export class MessageBar extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  constructor() {
    super();
    this.elementInternals.role = 'status';
  }

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

  /**
   * @public
   * Method to emit a `dismiss` event when the message bar is dismissed
   */
  public dismissMessageBar = () => {
    this.$emit('dismiss', {});
  };
}
