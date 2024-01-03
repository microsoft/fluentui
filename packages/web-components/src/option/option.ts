import { FASTListboxOption } from '../listbox-option/listbox-option.js';

/**
 * @class ListboxOption component
 *
 * @remarks
 * This class extends the FASTListboxOption.
 */
export class ListboxOption extends FASTListboxOption {
  public connectedCallback() {
    super.connectedCallback();
    this.tabIndex = 0;
  }
}
