import { attr, FASTElement, nullableNumberConverter, Observable, observable } from '@microsoft/fast-element';
import { StartEnd } from '../patterns/start-end.js';
import { applyMixins } from '../utils/apply-mixins.js';
import { toggleState } from '../utils/element-internals.js';
import type { TextInputControlSize } from './text-input.options.js';
import { ImplicitSubmissionBlockingTypes, TextInputAppearance, TextInputType } from './text-input.options.js';

/**
 * A Text Input Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input | `<input>`} element.
 *
 * @slot start - Content which can be provided before the input
 * @slot end - Content which can be provided after the input
 * @slot - The default slot for button content
 * @csspart label - The internal `<label>` element
 * @csspart root - the root container for the internal control
 * @csspart control - The internal `<input>` control
 * @public
 */
export class TextInput extends FASTElement {
  /**
   * Indicates the styled appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance?: TextInputAppearance;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(prev: TextInputAppearance | undefined, next: TextInputAppearance | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * Indicates the element's autocomplete state.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/autocomplete | `autocomplete`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `autocomplete`
   */
  @attr
  public autocomplete?: string;

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
   * Sets the size of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `control-size`
   */
  @attr({ attribute: 'control-size' })
  public controlSize?: TextInputControlSize;

  /**
   * Handles changes to `control-size` attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public controlSizeChanged(prev: TextInputControlSize | undefined, next: TextInputControlSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * The default slotted content. This is the content that appears in the text field label.
   *
   * @internal
   */
  @observable
  public defaultSlottedNodes!: Node[];

  /**
   * Updates the control label visibility based on the presence of default slotted content.
   *
   * @internal
   */
  public defaultSlottedNodesChanged(prev: Node[] | undefined, next: Node[] | undefined): void {
    if (this.$fastController.isConnected) {
      this.controlLabel.hidden = !next?.length;
    }
  }

  /**
   * Sets the directionality of the element to be submitted with form data.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/dirname | `dirname`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `dirname`
   */
  @attr
  public dirname?: string;

  /**
   * Sets the element's disabled state.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/disabled | `disabled`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  disabled?: boolean;

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
   * The initial value of the input.
   *
   * @public
   * @remarks
   * HTML Attribute: `value`
   */
  @attr({ attribute: 'value', mode: 'fromView' })
  public initialValue!: string;

  /**
   * Sets the value of the element to the initial value.
   *
   * @internal
   */
  public initialValueChanged(): void {
    if (!this.dirtyValue) {
      this.value = this.initialValue;
    }
  }

  /**
   * Allows associating a `<datalist>` to the element by ID.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Element/input#list | `list`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `list`
   */
  @attr
  public list!: string;

  /**
   * The maximum number of characters a user can enter.
   *
   * @public
   * @remarks
   * HTML Attribute: `maxlength`
   */
  @attr({ converter: nullableNumberConverter })
  public maxlength!: number;

  /**
   * The minimum number of characters a user can enter.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/minlength | `minlength`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `minlength`
   */
  @attr({ converter: nullableNumberConverter })
  public minlength!: number;

  /**
   * Indicates that a comma-separated list of email addresses can be entered. This attribute is only valid when `type="email"`.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/multiple | `multiple`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `multiple`
   */
  @attr({ mode: 'boolean' })
  public multiple!: boolean;

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
   * A regular expression that the value must match to pass validation.
   *
   * @public
   * @remarks
   * HTML Attribute: `pattern`
   */
  @attr
  public pattern!: string;

  /**
   * Sets the placeholder value of the element, generally used to provide a hint to the user.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/placeholder | `placeholder`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `placeholder`
   * This attribute is not a valid substitute for a label.
   */
  @attr
  public placeholder!: string;

  /**
   * When true, the control will be immutable by user interaction.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/readonly | `readonly`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `readonly`
   */
  @attr({ attribute: 'readonly', mode: 'boolean' })
  public readOnly?: boolean;

  /**
   * Syncs the `ElementInternals.ariaReadOnly` property when the `readonly` property changes.
   *
   * @internal
   */
  public readOnlyChanged(): void {
    if (this.$fastController.isConnected) {
      this.elementInternals.ariaReadOnly = `${!!this.readOnly}`;
    }
  }

  /**
   * The element's required attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: `required`
   */
  @attr({ mode: 'boolean' })
  public required!: boolean;

  /**
   * Syncs the element's internal `aria-required` state with the `required` attribute.
   *
   * @param previous - the previous required state
   * @param next - the current required state
   *
   * @internal
   */
  public requiredChanged(previous: boolean, next: boolean): void {
    if (this.$fastController.isConnected) {
      this.elementInternals.ariaRequired = `${!!next}`;
    }
  }

  /**
   * Sets the width of the element to a specified number of characters.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr({ converter: nullableNumberConverter })
  public size!: number;

  /**
   * Controls whether or not to enable spell checking for the input field, or if the default spell checking configuration should be used.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck | `spellcheck`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `spellcheck`
   */
  @attr({
    converter: {
      fromView: value => (typeof value === 'string' ? ['true', ''].includes(value.trim().toLowerCase()) : null),
      toView: value => value.toString(),
    },
  })
  public spellcheck!: boolean;

  /**
   * Allows setting a type or mode of text.
   *
   * @public
   * @remarks
   * HTML Attribute: `type`
   */
  @attr
  public type: TextInputType = TextInputType.text;

  /**
   * The current value of the input.
   *
   * @internal
   */
  private _value: string = this.initialValue;

  /**
   * A reference to the internal input element.
   *
   * @internal
   */
  public control!: HTMLInputElement;

  /**
   * A reference to the internal label element.
   *
   * @internal
   */
  @observable
  public controlLabel!: HTMLLabelElement;

  /**
   * Indicates that the value has been changed by the user.
   *
   * @internal
   */
  private dirtyValue: boolean = false;

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
  static readonly formAssociated = true;

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
   * The validation message.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/validationMessage | `ElementInternals.validationMessage`} property.
   */
  public get validationMessage(): string {
    return this.elementInternals.validationMessage || this.control.validationMessage;
  }

  /**
   * The current value of the input.
   * @public
   */
  public get value(): string {
    Observable.track(this, 'value');
    return this._value;
  }

  public set value(value: string) {
    this._value = value;

    if (this.$fastController.isConnected) {
      this.control.value = value;
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
   * The associated form element.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/form | `ElementInternals.form`} property.
   */
  public get form(): HTMLFormElement | null {
    return this.elementInternals.form;
  }

  /**
   * Handles the internal control's `keypress` event.
   *
   * @internal
   */
  public beforeinputHandler(e: InputEvent): boolean | void {
    if (e.inputType === 'insertLineBreak') {
      this.implicitSubmit();
    }

    return true;
  }

  /**
   * Change event handler for inner control.
   *
   * @internal
   * @privateRemarks
   * "Change" events are not `composable` so they will not permeate the shadow DOM boundary. This function effectively
   * proxies the change event, emitting a `change` event whenever the internal control emits a `change` event.
   */
  public changeHandler(e: InputEvent): boolean | void {
    this.setValidity();
    this.$emit('change', e, {
      bubbles: true,
      composed: true,
    });

    return true;
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
   * Clicks the inner control when the component is clicked.
   *
   * @param e - the event object
   */
  public clickHandler(e: MouseEvent): boolean | void {
    if (this.isSameNode(e.target as Node | null)) {
      this.control?.click();
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.setFormValue(this.value);
    this.setValidity();
  }

  /**
   * Focuses the inner control when the component is focused.
   *
   * @param e - the event object
   * @public
   */
  public focusinHandler(e: FocusEvent): boolean | void {
    this.control?.focus();
  }

  /**
   * Resets the value to its initial value when the form is reset.
   *
   * @internal
   */
  public formResetCallback(): void {
    this.value = this.initialValue;
    this.dirtyValue = false;
  }

  /**
   * Handles implicit form submission when the user presses the "Enter" key.
   *
   * @internal
   */
  private implicitSubmit(): void {
    if (!this.elementInternals.form) {
      return;
    }

    if (this.elementInternals.form.elements.length === 1) {
      this.elementInternals.form.requestSubmit();
      return;
    }

    const formElements = [...this.elementInternals.form.elements];

    // Try submitting with the first submit button, if any
    const submitButton = formElements.find(x => x.getAttribute('type') === 'submit');
    if (submitButton) {
      (submitButton as HTMLElement).click();
      return;
    }

    // Determine if there is only one implicit submission blocking element
    const filteredElements = formElements.filter(x =>
      ImplicitSubmissionBlockingTypes.includes(x.getAttribute('type') ?? ''),
    );
    if (filteredElements.length > 1) {
      return;
    }

    this.elementInternals.form.requestSubmit();
  }

  /**
   * Handles the internal control's `input` event.
   *
   * @internal
   */
  public inputHandler(e: InputEvent): boolean | void {
    this.dirtyValue = true;
    this.value = this.control.value;

    return true;
  }

  /**
   * Handles the internal control's `keydown` event.
   *
   * @param e - the event object
   * @internal
   */
  public keydownHandler(e: KeyboardEvent): boolean | void {
    if (e.key === 'Enter') {
      this.implicitSubmit();
    }

    return true;
  }

  /**
   * Selects all the text in the text field.
   *
   * @public
   * @privateRemarks
   * The `select` event does not permeate the shadow DOM boundary. This function effectively proxies the event,
   * emitting a `select` event whenever the internal control emits a `select` event
   *
   */
  public select(): void {
    this.control.select();
    this.$emit('select');
  }

  /**
   * Sets the custom validity message.
   * @param message - The message to set
   *
   * @public
   */
  public setCustomValidity(message: string): void {
    this.elementInternals.setValidity({ customError: true }, message);
    this.reportValidity();
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
   * Sets the validity of the control.
   *
   * @param flags - Validity flags. If not provided, the control's `validity` will be used.
   * @param message - Optional message to supply. If not provided, the control's `validationMessage` will be used. If the control does not have a `validationMessage`, the message will be empty.
   * @param anchor - Optional anchor to use for the validation message. If not provided, the control will be used.
   *
   * @internal
   */
  public setValidity(
    flags: Partial<ValidityState> = this.control.validity,
    message: string = this.validationMessage,
    anchor: HTMLElement = this.control,
  ): void {
    if (this.$fastController.isConnected) {
      if (this.disabled) {
        this.elementInternals.setValidity({});
        return;
      }

      this.elementInternals.setValidity(flags, message, anchor);
    }
  }
}

/**
 * @internal
 * @privateRemarks
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/rushstack/issues/1308
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface TextInput extends StartEnd {}
applyMixins(TextInput, StartEnd);
