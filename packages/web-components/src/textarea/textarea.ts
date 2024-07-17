import { attr, FASTElement, nullableNumberConverter, Observable, observable } from '@microsoft/fast-element';
import { toggleState } from '../utils/element-internals.js';
import {
  TextAreaAppearance,
  TextAreaAppearancesForDisplayShadow,
  TextAreaAutocomplete,
  TextAreaHorizontallyResizableResize,
  TextAreaResizableResize,
  TextAreaResize,
  TextAreaSize,
  TextAreaVerticallyResizableResize,
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

  private handleTextboxInputListener?: EventListener;

  private handleTextboxBlurListener?: EventListener;

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
  public maxLength?: number;

  /**
   * The minimum number of characters a user can enter.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Attributes/minlength | `minlength`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `minlength`
   */
  @attr({ attribute: 'minlength', converter: nullableNumberConverter })
  public minLength?: number;

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
      this.togglePlaceholderShownState();
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
      this.setValidity();
    }
  }

  /**
   * Sets the size of the control.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: TextAreaSize;
  protected sizeChanged(prev: TextAreaSize | undefined, next: TextAreaSize | undefined) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * @internal
   */
  @observable
  public sizeStyles = '';

  /**
   * Controls whether or not to enable spell checking for the input field, or if the default spell checking configuration should be used.
   * @see The {@link https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck | `spellcheck`} attribute
   *
   * @public
   * @remarks
   * HTML Attribute: `spellcheck`
   */
  @attr({ mode: 'boolean' })
  public spellcheck = false;

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

    toggleState(this.elementInternals, `resize`, TextAreaResizableResize.includes(this.resize));
  }

  // TypeScript requires the event object’s type to be `Event` if the listener is typed to `EventListener`.
  private handleResizeListener?: (event: PointerEvent) => void;

  private isResizing = false;

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
    if (this.disabled || this.readOnly) {
      return;
    }
    this.textbox.textContent = next.trim();
    this.setFormValue(next);
    this.setValidity();
  }

  /**
   * Whether the user has interacted with the element.
   */
  private userInteracted = false;

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
      case 'required':
      case 'minLength':
      case 'maxLength':
        this.setValidity();
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

    this.setContentEditable(!this.disabled && !this.readOnly);
    this.setInitialValue();
    this.togglePlaceholderShownState();
    this.setValidity();

    this.bindEvents();

    Observable.getNotifier(this).subscribe(this, 'appearance');
    Observable.getNotifier(this).subscribe(this, 'displayShadow');
    Observable.getNotifier(this).subscribe(this, 'required');
    Observable.getNotifier(this).subscribe(this, 'minLength');
    Observable.getNotifier(this).subscribe(this, 'maxLength');
  }

  /**
   * @internal
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();

    this.unbindEvents();

    Observable.getNotifier(this).unsubscribe(this, 'appearance');
    Observable.getNotifier(this).unsubscribe(this, 'displayShadow');
    Observable.getNotifier(this).unsubscribe(this, 'required');
    Observable.getNotifier(this).unsubscribe(this, 'minLength');
    Observable.getNotifier(this).unsubscribe(this, 'maxLength');
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
  public setCustomValidity(message: string | undefined): void {
    this.elementInternals.setValidity({ customError: !!message }, !!message ? message.toString() : undefined);
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
    message?: string,
    anchor?: HTMLElement
  ): void {
    if (this.$fastController.isConnected) {
      if (this.disabled || !this.userInteracted) {
        this.elementInternals.setValidity({});
        return;
      }

      const validity = {
        valueMissing: false,
        tooLong: false,
        tooShort: false,
      };
      let defaultMessage = '';

      if (this.required && !this.value.length) {
        validity.valueMissing = true;
        defaultMessage = 'valueMissing';
      } else if (this.maxLength && this.value.length > this.maxLength) {
        validity.tooLong = true;
        defaultMessage = 'tooLong';
      } else if (this.minLength && this.value.length < this.minLength) {
        validity.tooShort = true;
        defaultMessage = 'tooShort';
      }

      // Notes on the `defaultMessage`:
      // There isn’t a way to get browser’s built-in validation messages for
      // `tooShort` or `tooLong`, because these flags require real user
      // interactions before they would be set by the browser, so creating a
      // `<textarea>` in the memory and trying to get its `validationMessage`
      // will not work for these 2 flags. `<fluent-field>` does provide the
      // `message` slot for authors add their custom validation messages based
      // on the validity state flags, and we do set the proper flags here.
      this.elementInternals.setValidity({
        ...validity,
        ...flags,
      }, message ?? defaultMessage, anchor);
    }
  }

  private setContentEditable(edtiable: boolean) {
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
    // Don't set `this.value` directly here since it won't set if the element
    // is read-only or disabled.
    // TODO: double check security
    const value = this.innerHTML.trim();
    this.textbox.textContent = value;
    this.setFormValue(value);
  }

  private bindEvents() {
    this.handleResizeListener = this.handleResize.bind(this);
    document.addEventListener('pointerdown', this.handleResizeListener);
    document.addEventListener('pointermove', this.handleResizeListener, { passive: true });
    document.addEventListener('pointerup', this.handleResizeListener);

    this.handleTextboxInputListener = this.handleTextboxInput.bind(this);
    this.textbox.addEventListener('input', this.handleTextboxInputListener, { passive: true });
    this.textbox.addEventListener('input', () => this.userInteracted = true, {once: true});

    this.handleTextboxBlurListener = this.handleTextboxBlur.bind(this);
    this.textbox.addEventListener('blur', this.handleTextboxBlurListener);
  }

  private unbindEvents() {
    if (this.handleResizeListener) {
      document.removeEventListener('pointerdown', this.handleResizeListener);
      document.removeEventListener('pointermove', this.handleResizeListener);
      document.removeEventListener('pointerup', this.handleResizeListener);
    }

    if (this.handleTextboxInputListener) {
      this.textbox.removeEventListener('input', this.handleTextboxInputListener);
    }

    if (this.handleTextboxBlurListener) {
      this.textbox.removeEventListener('blur', this.handleTextboxBlurListener);
    }
  }

  private handleResize(evt: PointerEvent) {
    if (!TextAreaResizableResize.includes(this.resize) || this.disabled) {
      return;
    }

    switch (evt.type) {
      case 'pointerdown':
        if (evt.composedPath()[0] === this.resizeHandle) {
          this.startResizing(evt.pageX, evt.pageY);
        }
        break;
      case 'pointermove':
        this.doResizing(evt.pageX, evt.pageY);
        break;
      case 'pointerup':
        this.stopResizing();
        break;
    }
  }

  private textboxInlineSize = 0;
  private textboxBlockSize = 0;
  private lastPointerX = 0;
  private lastPointerY = 0;

  private startResizing(pointerX: number, pointerY: number) {
    this.isResizing = true;

    this.textboxInlineSize = this.textbox.offsetWidth;
    this.textboxBlockSize = this.textbox.offsetHeight;

    this.sizeStyles = this.getTextboxSizeStyles();

    this.lastPointerX = pointerX;
    this.lastPointerY = pointerY;

    if (!this.elementInternals.states.has('resized')) {
      toggleState(this.elementInternals, 'resized', true);
    }
  }

  private doResizing(pointerX: number, pointerY: number) {
    if (!this.isResizing) {
      return;
    }

    this.sizeStyles = this.getTextboxSizeStyles(pointerX, pointerY);
  }

  private stopResizing() {
    if (!this.isResizing) {
      return;
    }

    this.textboxInlineSize = 0;
    this.textboxBlockSize = 0;
    this.lastPointerX = 0;
    this.lastPointerY = 0;

    this.isResizing = false;
  }

  private getTextboxSizeStyles(pointerX: number = 0, pointerY: number = 0): string {
    const allowVerticalResizing = TextAreaVerticallyResizableResize.includes(this.resize);
    const allowHorizontalResizing = TextAreaHorizontallyResizableResize.includes(this.resize);
    const deltaX = allowHorizontalResizing ? pointerX - this.lastPointerX : 0;
    const deltaY = allowVerticalResizing ? pointerY - this.lastPointerY : 0;
    const inline = this.textboxInlineSize + deltaX;
    const block = this.textboxBlockSize + deltaY;

    this.textboxInlineSize = inline;
    this.textboxBlockSize = block;
    this.lastPointerX = pointerX;
    this.lastPointerY = pointerY;

    return `--textbox-inline-size: ${inline}px; --textbox-block-size: ${block}px;`;
  }

  private togglePlaceholderShownState() {
    toggleState(this.elementInternals, 'placeholder-shown', !!this.placeholder && !this.value);
  }

  private handleTextboxInput() {
    this.togglePlaceholderShownState();
    this.setFormValue(this.value);
  }

  private handleTextboxBlur() {
    this.setValidity();
  }
}
