import { FASTElement } from "@microsoft/fast-element";

/**
 * Base class for a DropdownList custom element.
 *
 * @public
 */
export class BaseDropdownList extends FASTElement {
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

/**
 * A DropdownList custom element.
 *
 * @public
 */
export class DropdownList extends BaseDropdownList {}
