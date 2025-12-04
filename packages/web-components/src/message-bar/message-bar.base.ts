import { FASTElement } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-message-bar custom element
 *
 * @tag fluent-message-bar
 *
 * @slot actions - Content that can be provided for the actions
 * @slot dismiss - Content that can be provided for the dismiss button
 * @slot - The default slot for the content
 * @public
 */
export class BaseMessageBar extends FASTElement {
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
   * @public
   * Method to emit a `dismiss` event when the message bar is dismissed
   */
  public dismissMessageBar = () => {
    this.$emit('dismiss', {});
  };
}
