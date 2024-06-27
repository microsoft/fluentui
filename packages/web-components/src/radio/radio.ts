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
  /**
   * Indicates the position of the radio in a radio group.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/ariaPosInSet | `ElementInternals.ariaPosInSet`} property.
   */
  public get ariaPosInSet(): string | null {
    return this.elementInternals.ariaPosInSet;
  }

  public set ariaPosInSet(value: string | null) {
    this.elementInternals.ariaPosInSet = value;
  }

  /**
   * Indicates the number of radio buttons in the associated radio group.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/ariaSetSize | `ElementInternals.ariaSetSize`} property.
   */
  public get ariaSetSize(): string | null {
    return this.elementInternals.ariaSetSize;
  }

  public set ariaSetSize(value: string | null) {
    this.elementInternals.ariaSetSize = value;
  }

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
