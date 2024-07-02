import { BaseCheckbox } from '../checkbox/checkbox.js';

/**
 * A Radio Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#radio | ARIA `radio` role}.
 *
 * @slot checked-indicator - The checked indicator slot
 * @fires change - Emits a custom change event when the checked state changes
 * @fires input - Emits a custom input event when the checked state changes
 *
 * @public
 */
export class Radio extends BaseCheckbox {
  connectedCallback() {
    super.connectedCallback();

    this.tabIndex = this.disabled ? -1 : 0;
  }

  constructor() {
    super();
    this.elementInternals.role = 'radio';
  }

  protected disabledChanged(prev: boolean | undefined, next: boolean | undefined): void {
    super.disabledChanged(prev, next);
    if (next) {
      this.checked = false;
      this.tabIndex = -1;
    }

    this.$emit('disabled', next, { bubbles: true });
  }

  public requiredChanged(): void {
    return;
  }

  public setFormValue(): void {
    return;
  }

  public setValidity(): void {
    this.elementInternals.setValidity({});
  }

  public toggleChecked(state: boolean = true): void {
    super.toggleChecked(state);
  }
}
