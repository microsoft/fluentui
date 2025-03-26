import { FASTElement } from '@microsoft/fast-element';

/**
 * The base class used for constructing a fluent-spinner custom element
 * @public
 */
export class BaseSpinner extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  constructor() {
    super();
    this.elementInternals.role = 'progressbar';
  }
}
