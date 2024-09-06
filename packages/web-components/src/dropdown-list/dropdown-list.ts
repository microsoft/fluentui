import { FASTElement, observable } from '@microsoft/fast-element';

import type { Option } from '../option/option.js';

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

  /**
   * @internal
   */
  @observable
  public slottedOptions!: Option[];

  /**
   * The option elements.
   *
   * @readonly
   * @public
   */
  public get options(): Option[] {
    return this.slottedOptions;
  }

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
