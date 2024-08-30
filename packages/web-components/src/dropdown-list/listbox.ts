import { FASTElement } from "@microsoft/fast-element"; 

/**
 * The base class for a component that behaves as a listbox.
 *
 * @internal
 */
export class BaseListbox extends FASTElement {
  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  constructor() {
    super();

    this.elementInternals.role = 'listbox';
  }
}
