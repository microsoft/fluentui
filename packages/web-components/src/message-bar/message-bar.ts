import { FASTElement } from '@microsoft/fast-element';
import type { MessageBarIntent, MessageBarLayout, MessageBarShape } from './message-bar.options.js';

/**
 * A Message Bar Custom HTML Element.
 *
 * @tag fluent-message-bar
 *
 * @slot actions - Content that can be provided for the actions
 * @slot dismiss - Content that can be provided for the dismiss button
 * @slot icon - Content that can be provided for the leading icon
 * @slot - The default slot for the content
 * @fires { CustomEvent } dismiss - Fired when the message bar is dismissed.
 * @presentational {MessageBarShape | undefined} shape - Sets the shape of the Message Bar.
 * @presentational {MessageBarLayout | undefined} layout - Sets the layout of the control.
 * @presentational {MessageBarIntent | undefined} intent - Sets the intent of the control.
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
   * Method to emit a `dismiss` event when the message bar is dismissed
   *
   * @public
   */
  public dismissMessageBar = () => {
    this.$emit('dismiss', {});
  };
}
