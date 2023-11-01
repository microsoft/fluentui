import { FASTListboxOption } from '@microsoft/fast-foundation';

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
