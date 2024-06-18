import { attr, FASTElement, Observable, observable } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import { CheckboxShape, CheckboxSize } from './checkbox.options.js';

/**
 * A Checkbox Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#checkbox | ARIA checkbox }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot indeterminate-indicator - The indeterminate indicator
 * @fires change - Emits a custom change event when the checked state changes
 * @fires input - Emits a custom input event when the checked state changes
 *
 * @public
 */
export class BaseCheckbox extends FASTElement {
  /**
   * Indicates that the element should get focus after the page finishes loading.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Element/input#autofocus | `autofocus`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `autofocus`
   */
  @attr({ mode: 'boolean' })
  public autofocus!: boolean;

  /**
   * The element's current checked state.
   *
   * @public
   */
  public get checked(): boolean {
    Observable.track(this, 'checked');
    return this._checked;
  }

  public set checked(state: boolean) {
    this._checked = state;

    this.setFormValue(state ? this.value : null);
    this.setValidity();
    this.setAriaChecked();
    toggleState(this.elementInternals, 'checked', state);

    Observable.notify(this, 'checked');
  }

  /**
   * The element's disabled state.
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;

  /**
   * The id of a form to associate the element to.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Element/input#form | `form`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `form`
   */
  @attr({ attribute: 'form' })
  public formAttribute?: string;

  /**
   * Indicates that the element is in an indeterminate or mixed state.
   *
   * @public
   */
  @observable
  public indeterminate?: boolean;

  /**
   * Synchronizes the element's indeterminate state with the internal ElementInternals state.
   *
   * @internal
   */
  public indeterminateChanged(prev: boolean, next: boolean): void {
    this.setAriaChecked();
    toggleState(this.elementInternals, 'indeterminate', next);
  }

  /**
   * The element's checked state.
   *
   * @public
   * @remarks
   * HTML Attribute: `checked`
   */
  @attr({ attribute: 'checked', mode: 'boolean' })
  public initialChecked?: boolean;

  /**
   * Updates the form value when the checked state changes.
   *
   * @internal
   */
  public initialCheckedChanged(prev: boolean | undefined, next: boolean): void {
    if (!this.dirtyChecked) {
      this.checked = next;
    }
  }

  /**
   * The initial value of the input.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ attribute: 'value', mode: 'fromView' })
  public initialValue: string = 'on';

  /**
   * Sets the value of the input when the value attribute changes.
   *
   * @param prev - The previous value
   * @param next - The current value
   * @internal
   */
  public initialValueChanged(prev: string, next: string): void {
    this._value = next;
  }

  /**
   * The name of the element. This element's value will be surfaced during form submission under the provided name.
   *
   * @public
   * @remarks
   * HTML Attribute: `name`
   */
  @attr
  public name!: string;

  /**
   * The element's required state.
   *
   * @public
   * @remarks
   * HTML Attribute: `required`
   */
  @attr({ mode: 'boolean' })
  required!: boolean;

  /**
   * Sets the validity of the control when the required state changes.
   *
   * @param prev - The previous required state
   * @param next - The current required state
   * @internal
   */
  public requiredChanged(prev: boolean, next: boolean): void {
    if (this.$fastController.isConnected) {
      this.setValidity();
      this.elementInternals.ariaRequired = `${!!next}`;
    }
  }

  /**
   * The internal checked state of the control.
   *
   * @internal
   */
  private _checked: boolean = this.initialChecked ?? false;

  /**
   * Indicates that the checked state has been changed by the user.
   *
   * @internal
   */
  private dirtyChecked: boolean = false;

  /**
   * The associated `<form>` element.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/form | `ElementInternals.form`} property.
   */
  public get form(): HTMLFormElement | null {
    return this.elementInternals.form;
  }

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  public static formAssociated = true;

  /**
   * A reference to all associated `<label>` elements.
   *
   * @public
   */
  public get labels(): ReadonlyArray<Node> {
    return Object.freeze(Array.from(this.elementInternals.labels));
  }

  /**
   * The fallback validation message, taken from a native checkbox `<input>` element.
   *
   * @internal
   */
  private _validationFallbackMessage: string = '';

  /**
   * The validation message. Uses the browser's default validation message for native checkboxes if not otherwise
   * specified (e.g., via `setCustomValidity`).
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/validationMessage | `ElementInternals.validationMessage`} property.
   */
  public get validationMessage(): string {
    if (this.elementInternals.validationMessage) {
      return this.elementInternals.validationMessage;
    }

    if (!this._validationFallbackMessage) {
      const validationMessageFallbackControl = document.createElement('input');
      validationMessageFallbackControl.type = 'checkbox';
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
   * The internal value of the input.
   *
   * @internal
   */
  private _value: string = this.initialValue;

  /**
   * The current value of the input.
   *
   * @public
   */
  public get value(): string {
    Observable.track(this, 'value');
    return this._value;
  }

  public set value(value: string) {
    this._value = value;

    if (this.$fastController.isConnected) {
      this.setFormValue(value);
      this.setValidity();
      Observable.notify(this, 'value');
    }
  }

  /**
   * Determines if the control can be submitted for constraint validation.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/willValidate | `ElementInternals.willValidate`} property.
   */
  public get willValidate(): boolean {
    return this.elementInternals.willValidate;
  }

  /**
   * Sets the `elementInternals.ariaChecked` value based on the checked state.
   *
   * @internal
   */
  private setAriaChecked(): void {
    this.elementInternals.ariaChecked = this.indeterminate ? 'mixed' : `${this.checked}`;
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
   * Toggles the checked state when the user clicks the element.
   *
   * @param e - the event object
   * @internal
   */
  public clickHandler(e: MouseEvent): boolean | void {
    if (this.disabled) {
      return;
    }

    this.dirtyChecked = true;
    this.toggleChecked();
    this.$emit('change');
    this.$emit('input');
    return true;
  }

  public connectedCallback() {
    super.connectedCallback();

    this.setFormValue(this.checked ? this.value : null);
    this.setAriaChecked();
    this.setValidity();
  }

  constructor() {
    super();
    this.elementInternals.role = 'checkbox';
  }

  /**
   * Updates the form value when a user changes the `checked` state.
   *
   * @param e - the event object
   * @internal
   */
  public inputHandler(e: Event): boolean | void {
    this.elementInternals.setFormValue(this.value);
    this.setValidity();

    return true;
  }

  /**
   * Prevents scrolling when the user presses the space key.
   *
   * @param e - the event object
   * @internal
   */
  public keydownHandler(e: KeyboardEvent): boolean | void {
    if (e.key !== ' ') {
      return true;
    }
  }

  /**
   * Toggles the checked state when the user releases the space key.
   *
   * @param e - the event object
   * @internal
   */
  public keyupHandler(e: KeyboardEvent): boolean | void {
    if (e.key !== ' ') {
      return true;
    }

    this.click();
  }

  /**
   * Resets the form value to its initial value when the form is reset.
   *
   * @internal
   */
  formResetCallback(): void {
    this.checked = this.initialChecked ?? false;
    this.dirtyChecked = false;
    this.indeterminate = false;
    this.setValidity();
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
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/setFormValue | `ElementInternals.setFormValue()`} method.
   *
   * @internal
   */
  public setFormValue(value: File | string | FormData | null, state?: File | string | FormData | null): void {
    this.elementInternals.setFormValue(value, value ?? state);
  }

  /**
   * Sets a custom validity message.
   *
   * @param message - The message to set
   * @public
   */
  public setCustomValidity(message: string): void {
    this.elementInternals.setValidity({ customError: true }, message);
    this.setValidity();
  }

  /**
   * Sets the validity of the control.
   *
   * @param flags - Validity flags to set.
   * @param message - Optional message to supply. If not provided, the control's `validationMessage` will be used.
   * @param anchor - Optional anchor to use for the validation message.
   *
   * @internal
   */
  public setValidity(
    flags: Partial<ValidityState> = { valueMissing: !!this.required && !this.checked },
    message: string = this.validationMessage,
    anchor?: HTMLElement,
  ): void {
    if (this.$fastController.isConnected) {
      if (this.disabled) {
        this.elementInternals.setValidity({});
        return;
      }

      this.elementInternals.setValidity(flags, message, anchor);
    }
  }

  /**
   * Toggles the checked state of the control.
   *
   * @public
   */
  private toggleChecked(force: boolean = !this.checked): void {
    this.indeterminate = false;
    this.checked = force;
  }
}

export class Checkbox extends BaseCheckbox {
  /**
   * Indicates the shape of the checkbox.
   *
   * @public
   * @remarks
   * HTML Attribute: `shape`
   */
  @attr
  public shape?: CheckboxShape;

  /**
   * Handles changes to shape attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public shapeChanged(prev: CheckboxShape | undefined, next: CheckboxShape | undefined) {
    if (prev) {
      toggleState(this.elementInternals, prev, false);
    }
    if (next) {
      toggleState(this.elementInternals, next, true);
    }
  }

  /**
   * Indicates the size of the checkbox.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: CheckboxSize;

  /**
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(prev: CheckboxSize | undefined, next: CheckboxSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, prev, false);
    }
    if (next) {
      toggleState(this.elementInternals, next, true);
    }
  }
}
