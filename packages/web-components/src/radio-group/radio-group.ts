import { attr, FASTElement, Observable, observable, Updates } from '@microsoft/fast-element';
import { findLastIndex } from '@microsoft/fast-web-utilities';
import { Radio } from '../radio/radio.js';
import { getDirection } from '../utils/direction.js';
import { getRootActiveElement } from '../utils/root-active-element.js';
import { RadioGroupOrientation } from './radio-group.options.js';

/**
 * A Radio Group Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria/#radiogroup | ARIA `radiogroup` role}.
 *
 * @tag fluent-radio-group
 *
 * @public
 *
 * @slot - The default slot for the radio group
 */
export class RadioGroup extends FASTElement {
  /**
   * The index of the checked radio, scoped to the enabled radios.
   *
   * @internal
   */
  @observable
  protected checkedIndex!: number;

  /**
   * Sets the checked state of the nearest enabled radio when the `checkedIndex` changes.
   *
   * @param prev - the previous index
   * @param next - the current index
   * @internal
   */
  protected checkedIndexChanged(prev: number | undefined, next: number): void {
    if (!this.enabledRadios) {
      return;
    }

    this.checkRadio(next);
  }

  /**
   * Indicates that the value has been changed by the user.
   */
  private dirtyState: boolean = false;

  /**
   * Disables the radio group and child radios.
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ attribute: 'disabled', mode: 'boolean' })
  public disabled: boolean = false;

  /**
   * Sets the `disabled` attribute on all child radios when the `disabled` property changes.
   *
   * @param prev - the previous disabled value
   * @param next - the current disabled value
   * @internal
   */
  protected disabledChanged(prev?: boolean, next?: boolean): void {
    if (this.$fastController.isConnected) {
      this.checkedIndex = -1;
      this.radios?.forEach(radio => {
        radio.disabled = !!radio.disabledAttribute || !!this.disabled;
      });
      this.restrictFocus();
    }
  }

  /**
   * The value of the checked radio.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ attribute: 'value', mode: 'fromView' })
  public initialValue?: string;

  /**
   * Sets the matching radio to checked when the value changes. If no radio matches the value, no radio will be checked.
   *
   * @param prev - the previous value
   * @param next - the current value
   */
  public initialValueChanged(prev: string | undefined, next: string | undefined): void {
    this.value = next ?? '';
  }

  /**
   * The name of the radio group.
   *
   * @public
   * @remarks
   * HTML Attribute: `name`
   */
  @attr
  public name!: string;

  /**
   * Sets the `name` attribute on all child radios when the `name` property changes.
   *
   * @internal
   */
  protected nameChanged(prev: string | undefined, next: string | undefined): void {
    if (this.isConnected && next) {
      this.radios?.forEach(radio => {
        radio.name = this.name;
      });
    }
  }

  /**
   * The orientation of the group.
   *
   * @public
   * @remarks
   * HTML Attribute: `orientation`
   */
  @attr
  public orientation?: RadioGroupOrientation;

  /**
   * Sets the ariaOrientation attribute when the orientation changes.
   *
   * @param prev - the previous orientation
   * @param next - the current orientation
   * @internal
   */
  public orientationChanged(prev: RadioGroupOrientation | undefined, next: RadioGroupOrientation | undefined): void {
    this.elementInternals.ariaOrientation = this.orientation ?? RadioGroupOrientation.horizontal;
  }

  /**
   * The collection of all child radios.
   *
   * @public
   */
  @observable
  public radios!: Radio[];

  /**
   * Updates the enabled radios collection when properties on the child radios change.
   *
   * @param prev - the previous radios
   * @param next - the current radios
   */
  public radiosChanged(prev: Radio[] | undefined, next: Radio[] | undefined): void {
    const setSize = next?.length;
    if (!setSize) {
      return;
    }

    if (!this.name && next.every(x => x.name === next[0].name)) {
      this.name = next[0].name;
    }

    const checkedIndex = findLastIndex(this.enabledRadios, x => x.initialChecked);

    next.forEach((radio, index) => {
      radio.ariaPosInSet = `${index + 1}`;
      radio.ariaSetSize = `${setSize}`;

      if (this.initialValue && !this.dirtyState) {
        radio.checked = radio.value === this.initialValue;
      } else {
        radio.checked = index === checkedIndex;
      }

      radio.name = this.name ?? radio.name;
      radio.disabled = !!this.disabled || !!radio.disabledAttribute;
    });

    if (!this.dirtyState && this.initialValue) {
      this.value = this.initialValue;
    }

    if (
      !this.value ||
      // This logic covers the case when the RadioGroup doesn't have a `value`
      // attribute, but does have a checked child Radio. Without this condition,
      // the checked Radio's value will be assigned to `this.value`, and
      // `checkedIndex` will be the checked Radio's index, but `this.checkedIndex`
      // will remain `undefined`, which would cause the RadioGroup to add
      // `tabindex=-1` to the checked Radio, and effectively makes the whole
      // RadioGroup unfocusable.
      (this.value && typeof this.checkedIndex !== 'number' && checkedIndex >= 0)
    ) {
      // TODO: Switch to standard `Array.findLastIndex` when TypeScript 5 is available
      this.checkedIndex = checkedIndex;
    }

    // prettier-ignore
    const radioIds = next.map(radio => radio.id).join(' ').trim();
    if (radioIds) {
      this.setAttribute('aria-owns', radioIds);
    }

    Updates.enqueue(() => {
      this.restrictFocus();
    });
  }

  /**
   * Indicates whether the radio group is required.
   *
   * @public
   * @remarks
   * HTML Attribute: `required`
   */
  @attr({ mode: 'boolean' })
  public required!: boolean;

  /**
   *
   * @param prev - the previous required value
   * @param next - the current required value
   */
  public requiredChanged(prev: boolean, next: boolean): void {
    this.elementInternals.ariaRequired = next ? 'true' : null;
    this.setValidity();
  }

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * A collection of child radios that are not disabled.
   *
   * @internal
   */
  public get enabledRadios(): Radio[] {
    if (this.disabled) {
      return [];
    }

    return this.radios?.filter(x => !x.disabled) ?? [];
  }

  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  public static formAssociated = true;

  /**
   * The fallback validation message, taken from a native checkbox `<input>` element.
   *
   * @internal
   */
  private _validationFallbackMessage!: string;

  /**
   * The validation message. Uses the browser's default validation message for native checkboxes if not otherwise
   * specified (e.g., via `setCustomValidity`).
   *
   * @internal
   */
  public get validationMessage(): string {
    if (this.elementInternals.validationMessage) {
      return this.elementInternals.validationMessage;
    }

    if (this.enabledRadios?.[0]?.validationMessage) {
      return this.enabledRadios[0].validationMessage;
    }

    if (!this._validationFallbackMessage) {
      const validationMessageFallbackControl = document.createElement('input');
      validationMessageFallbackControl.type = 'radio';
      validationMessageFallbackControl.required = true;
      validationMessageFallbackControl.checked = false;

      this._validationFallbackMessage = validationMessageFallbackControl.validationMessage;
    }

    return this._validationFallbackMessage;
  }

  /**
   * The element's validity state.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/validity | `ElementInternals.validity`} property.
   */
  public get validity(): ValidityState {
    return this.elementInternals.validity;
  }

  /**
   * The current value of the checked radio.
   *
   * @public
   */
  public get value(): string | null {
    Observable.notify(this, 'value');
    return this.enabledRadios.find(x => x.checked)?.value ?? null;
  }

  public set value(next: string | null) {
    const index = this.enabledRadios.findIndex(x => x.value === next);
    this.checkedIndex = index;

    if (this.$fastController.isConnected) {
      this.setFormValue(next);
      this.setValidity();
    }

    Observable.track(this, 'value');
  }

  /**
   * Sets the checked state of all radios when any radio emits a `change` event.
   *
   * @param e - the change event
   */
  public changeHandler(e: Event): boolean | void {
    if (this === e.target) {
      return true;
    }

    this.dirtyState = true;
    const radioIndex = this.enabledRadios.indexOf(e.target as Radio);
    this.checkRadio(radioIndex);
    this.radios
      ?.filter(x => x.disabled)
      ?.forEach(item => {
        item.checked = false;
      });
    return true;
  }

  /**
   * Checks the radio at the specified index.
   *
   * @param index - the index of the radio to check
   * @internal
   */
  public checkRadio(index: number = this.checkedIndex, shouldEmit: boolean = false): void {
    let checkedIndex = this.checkedIndex;

    this.enabledRadios.forEach((item, i) => {
      const shouldCheck = i === index;
      item.checked = shouldCheck;
      if (shouldCheck) {
        checkedIndex = i;
        if (shouldEmit) {
          item.$emit('change');
        }
      }
    });

    this.checkedIndex = checkedIndex;
    this.setFormValue(this.value);
    this.setValidity();
  }

  /**
   * Checks the validity of the element and returns the result.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/checkValidity | `HTMLInputElement.checkValidity()`} method.
   */
  public checkValidity(): boolean {
    return this.elementInternals.checkValidity();
  }

  /**
   * Handles click events for the radio group.
   *
   * @param e - the click event
   * @internal
   */
  public clickHandler(e: MouseEvent): boolean | void {
    if (this === e.target) {
      this.enabledRadios[Math.max(0, this.checkedIndex)]?.focus();
    }

    return true;
  }

  constructor() {
    super();

    this.elementInternals.role = 'radiogroup';
    this.elementInternals.ariaOrientation = this.orientation ?? RadioGroupOrientation.horizontal;
  }

  /**
   * Focuses the checked radio or the first enabled radio.
   *
   * @internal
   */
  public focus() {
    this.enabledRadios[Math.max(0, this.checkedIndex)]?.focus();
  }

  /**
   * Enables tabbing through the radio group when the group receives focus.
   *
   * @param e - the focus event
   * @internal
   */
  public focusinHandler(e: FocusEvent): boolean | void {
    if (!this.disabled) {
      this.enabledRadios.forEach(radio => {
        radio.tabIndex = 0;
      });
    }

    return true;
  }

  /**
   * Sets the tabindex of the radios based on the checked state when the radio group loses focus.
   *
   * @param e - the focusout event
   * @internal
   */
  public focusoutHandler(e: FocusEvent): boolean | void {
    if (this.radios?.includes(e.relatedTarget as Radio) && this.radios?.some(x => x.checked)) {
      this.restrictFocus();
    }

    return true;
  }

  formResetCallback(): void {
    this.dirtyState = false;
    this.checkedIndex = -1;
    this.setFormValue(this.value);
    this.setValidity();
  }

  private getEnabledIndexInBounds(index: number, upperBound = this.enabledRadios.length): number {
    if (upperBound === 0) {
      return -1;
    }

    return (index + upperBound) % upperBound;
  }

  /**
   * Handles keydown events for the radio group.
   *
   * @param e - the keyboard event
   * @internal
   */
  public keydownHandler(e: KeyboardEvent): boolean | void {
    const isRtl = getDirection(this) === 'rtl';
    const checkedIndex = this.enabledRadios.findIndex(x => x === getRootActiveElement(this)) ?? this.checkedIndex;
    let increment = 0;

    switch (e.key) {
      case 'ArrowLeft': {
        increment = isRtl ? 1 : -1;
        break;
      }

      case 'ArrowUp': {
        increment = -1;
        break;
      }

      case 'ArrowRight': {
        increment = isRtl ? -1 : 1;
        break;
      }

      case 'ArrowDown': {
        increment = 1;
        break;
      }

      case 'Tab': {
        this.restrictFocus();
        break;
      }

      case ' ': {
        this.checkRadio();
        break;
      }
    }

    if (!increment) {
      return true;
    }

    const nextIndex = checkedIndex + increment;
    this.checkRadio(this.getEnabledIndexInBounds(nextIndex), true);
    this.enabledRadios[this.checkedIndex]?.focus();
  }

  /**
   *
   * @param e - the disabled event
   */
  disabledRadioHandler(e: CustomEvent): void {
    if (e.detail === true && (e.target as Radio).checked) {
      this.checkedIndex = -1;
    }
  }

  /**
   * Reports the validity of the element.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/reportValidity | `HTMLInputElement.reportValidity()`} method.
   */
  public reportValidity(): boolean {
    return this.elementInternals.reportValidity();
  }

  /**
   * Resets the `tabIndex` for all child radios when the radio group loses focus.
   *
   * @internal
   */
  private restrictFocus() {
    let activeIndex = Math.max(this.checkedIndex, 0);
    const focusedRadioIndex = this.enabledRadios.indexOf(getRootActiveElement(this) as Radio);

    if (focusedRadioIndex !== -1) {
      activeIndex = focusedRadioIndex;
    }

    activeIndex = this.getEnabledIndexInBounds(activeIndex);

    this.enabledRadios.forEach((item, index) => {
      item.tabIndex = index === activeIndex ? 0 : -1;
    });
  }

  /**
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/setFormValue | `ElementInternals.setFormValue()`} method.
   *
   * @internal
   */
  public setFormValue(value: File | string | FormData | null, state?: File | string | FormData | null): void {
    this.elementInternals.setFormValue(value, value ?? state);
  }

  /**
   * Sets the validity of the element.
   *
   * @param flags - Validity flags to set.
   * @param message - Optional message to supply. If not provided, the element's `validationMessage` will be used.
   * @param anchor - Optional anchor to use for the validation message.
   *
   * @internal
   */
  public setValidity(flags?: Partial<ValidityState>, message?: string, anchor?: HTMLElement): void {
    if (this.$fastController.isConnected) {
      if (this.disabled || !this.required) {
        this.elementInternals.setValidity({});
        return;
      }

      this.elementInternals.setValidity(
        { valueMissing: this.required && !this.value, ...flags },
        message ?? this.validationMessage,
        anchor ?? this.enabledRadios[0],
      );
    }
  }

  /**
   * Updates the collection of child radios when the slot changes.
   *
   * @param e - the slot change event
   * @internal
   */
  public slotchangeHandler(e: Event): void {
    Updates.enqueue(() => {
      this.radios = [...this.querySelectorAll('*')].filter(x => x instanceof Radio) as Radio[];
    });
  }
}
