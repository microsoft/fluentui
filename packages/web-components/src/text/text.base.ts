import { FASTElement } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-text custom element
 *
 * @slot - The default slot for text content
 *
 * @tag fluent-text
 *
 * @public
 */
export class BaseText extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();
}
