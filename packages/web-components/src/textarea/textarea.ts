import { attr, FASTElement, nullableNumberConverter, Observable } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import {
  TextAreaAppearance,
  TextAreaAppearancesForDisplayShadow,
  TextAreaAutocomplete,
  TextAreaControlSize,
  TextAreaResize,
} from './textarea.options.js';

/**
 * A Text Area Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea | `<textarea>`} element.
 * @public
 */
export class TextArea extends FASTElement {
  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  static readonly formAssociated = true;

  /**
   * The textbox element.
   * @internal
   */
  public textbox!: HTMLDivElement;

  /**
   * The placeholder container element.
   * @internal
   */
  public placeholderContainer!: HTMLDivElement;

  /**
   * The button to handle resize interactions.
   * @internal
   */
  public resizeHandle!: HTMLButtonElement;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * Indicates the styled appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr({ mode: 'fromView' })
  public appearance: TextAreaAppearance = TextAreaAppearance.outline;
  protected appearanceChanged(prev: TextAreaAppearance | undefined, next: TextAreaAppearance | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }

    if (!next || !Array.from(Object.values(TextAreaAppearance)).includes(next)) {
      toggleState(this.elementInternals, TextAreaAppearance.outline, true);
    } else {
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
  public autocomplete?: TextAreaAutocomplete;

  /**
   * Indicates whether the element’s block size (height) should be automatically changed as the input grows longer.
   *
   * @public
   * @remarks
   * HTML Attribute: `auto-resize`
   */
  @attr({ attribute: 'auto-resize', mode: 'boolean' })
  public autoResize = false;
  protected autoResizeChanged() {
    toggleState(this.elementInternals, `auto-resize`, this.autoResize);
  }

  /**
   * Indicates whether the textarea should be a block-level element in the layout.
   *
   * @public
   * @remarks
   * HTML Attribute: `block`
   */
  @attr({ mode: 'boolean' })
  public block: boolean = false;
  protected blockChanged() {
    toggleState(this.elementInternals, `block`, this.block);
  }

  /**
   * Sets the size of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: TextAreaControlSize;
  protected sizeChanged(prev: TextAreaControlSize | undefined, next: TextAreaControlSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * Sets the name of the value directionality to be submitted with form data.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/dirname | `dirname`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `dirname`
   */
  @attr({ attribute: 'dirname' })
  public dirName?: string;

  /**
   * Sets the element's disabled state.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/disabled | `disabled`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  public disabled = false;
  protected disabledChanged() {
    this.setDisabledSideEffect(this.disabled);
  }

  /**
   * Indicates whether the element displays a box shadow. This only has effect when `appearance` is set to be `filled-darker` or `filled-lighter`.
   *
   * @public
   * @remarks
   * HTML Attribute: `display-shadow`
   */
  @attr({ attribute: 'display-shadow', mode: 'boolean' })
  public displayShadow = false;

  /**
   * The id of a form to associate the element to.
   *
   * @public
   * @remarks
   * HTML Attribute: `form`
   */
  @attr({ attribute: 'form' })
  public initialForm?: string;

  /**
   * The form element that’s associated to the element, or `null` if no form is associated.
   *
   * @public
   */
  public get form(): HTMLFormElement | null {
    return this.elementInternals.form;
  }

  /**
   * A `NodeList` of `<label>` element associated with the element.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/labels | `labels`} property
   *
   * @public
   */
  public get labels(): NodeList {
    return this.elementInternals.labels;
  }

  /**
   * The maximum number of characters a user can enter.
   *
   * @public
   * @remarks
   * HTML Attribute: `maxlength`
   */
  @attr({ attribute: 'maxlength', converter: nullableNumberConverter })
  public maxLength!: number;

  /**
   * The minimum number of characters a user can enter.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/minlength | `minlength`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `minlength`
   */
  @attr({ attribute: 'minlength', converter: nullableNumberConverter })
  public minLength!: number;

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
   * Sets the placeholder value of the element, generally used to provide a hint to the user.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/placeholder | `placeholder`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `placeholder`
   * This attribute is not a valid substitute for a label.
   */
  @attr
  public placeholder?: string;
  protected placeholderChanged() {
    if (this.$fastController.isConnected) {
      this.elementInternals.ariaPlaceholder = `${this.placeholder ?? ''}`;
    }
  }

  /**
   * When true, the control will be immutable by user interaction.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/readonly | `readonly`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `readonly`
   */
  @attr({ attribute: 'readonly', mode: 'boolean' })
  public readOnly = false;
  protected readOnlyChanged() {
    if (this.$fastController.isConnected) {
      this.elementInternals.ariaReadOnly = `${!!this.readOnly}`;
      this.setContentEditable(!this.readOnly);
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
  protected requiredChanged() {
    if (this.$fastController.isConnected) {
      this.elementInternals.ariaRequired = `${!!this.required}`;
    }
  }

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
   * The type of the element, which is always "textarea".
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/type | `type`} property
   *
   * @public
   */
  public get type(): 'textarea' {
    return 'textarea';
  }

  /**
   * Indicates whether the element can be resized by end users.
   *
   * @public
   * @remarks
   * HTML Attribute: `resize`
   */
  @attr({ mode: 'fromView' })
  public resize: TextAreaResize = TextAreaResize.none;
  protected resizeChanged(prev: TextAreaResize | undefined, next: TextAreaResize | undefined): void {
    if (prev) {
      toggleState(this.elementInternals, `resize-${prev}`, false);
    }

    if (next) {
      toggleState(this.elementInternals, `resize-${next}`, true);
    }

    toggleState(
      this.elementInternals,
      `resize`,
      Array.from(Object.keys(TextAreaResize))
        .filter(r => r !== TextAreaResize.none)
        .includes(this.resize),
    );

    // TODO
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
   * The validation message.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/docs/Web/API/ElementInternals/validationMessage | `ElementInternals.validationMessage`} property.
   */
  public get validationMessage(): string {
    return this.elementInternals.validationMessage;
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
   * The value of the element.
   *
   * @public
   * @remark
   * Reflects the `value` property.
   */
  public get value(): string {
    return this.textbox.textContent?.trim() ?? '';
  }

  public set value(next: string) {
    this.textbox.textContent = next;
    this.setFormValue(next);
  }

  public handleChange(_: any, propertyName: string) {
    switch (propertyName) {
      case 'appearance':
      case 'displayShadow':
        toggleState(
          this.elementInternals,
          'display-shadow',
          this.displayShadow && TextAreaAppearancesForDisplayShadow.includes(this.appearance),
        );
        break;
    }
  }

  constructor() {
    super();

    this.elementInternals.role = 'textbox';
    this.elementInternals.ariaMultiLine = 'true';
  }

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    this.setContentEditable(true);
    this.setInitialValue();
    this.setValidity();

    Observable.getNotifier(this).subscribe(this, 'appearance');
    Observable.getNotifier(this).subscribe(this, 'displayShadow');

  }

  /**
   * @internal
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();

    Observable.getNotifier(this).unsubscribe(this, 'appearance');
    Observable.getNotifier(this).unsubscribe(this, 'displayShadow');
  }

  /**
   * Resets the value to its initial value when the form is reset.
   *
   * @internal
   */
  public formResetCallback(): void {
    this.setInitialValue();
  }

  /**
   * @internal
   */
  public formDisabledCallback(disabled: boolean) {
    this.setDisabledSideEffect(disabled);
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
    flags: Partial<ValidityState> = {},
    message: string = this.validationMessage,
    anchor: HTMLElement = this.textbox,
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
   * @internal
   */
  public setContentEditable(edtiable: boolean) {
    if (!edtiable) {
      this.textbox.contentEditable = 'false';
    } else {
      try {
        this.textbox.contentEditable = 'plaintext-only';
      } catch {
        // Firefox does’t support `plaintext-only` yet.
        this.textbox.contentEditable = 'true';
      }
    }
  }

  private setDisabledSideEffect(disabled: boolean) {
    if (!this.$fastController.isConnected) {
      return;
    }

    this.elementInternals.ariaDisabled = `${disabled}`;
    this.setContentEditable(!disabled);
  }

  private setInitialValue() {
    if (this.innerHTML.trim() !== '') {
      // TODO: double check security
      this.textbox.textContent = this.innerHTML;
    }
  }
}
