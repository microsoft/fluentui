import { FASTElement } from '@microsoft/fast-element';

import type { Dropdown as DropdownElement } from '../dropdown/dropdown.js';

// TODO: Add ComboboxElement when it's created.
type Combobox = null | DropdownElement;

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

  private _combobox: Combobox = null;

  /**
   * The associated combobox element.
   *
   * @internal
   */
  public get combobox(): Combobox {
    return this._combobox;
  }

  public set combobox(next: Combobox) {
    this._combobox = next;
  }

  constructor() {
    super();

    this.elementInternals.role = 'listbox';
  }
}
