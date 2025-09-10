import { attr, FASTElement, nullableNumberConverter, observable } from '@microsoft/fast-element';
import { whitespaceFilter } from '../utils/index.js';
import type { Label } from '../label/label.js';
import { hasMatchingState, swapStates, toggleState } from '../utils/element-internals.js';
import { TextAreaAutocomplete, TextAreaResize } from './textarea.options.js';

/**
 * A Text Area Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea | `<textarea>`} element.
 *
 * @slot - The default content/value of the component.
 * @slot label - The content for the `<label>`, it should be a `<fluent-label>` element.
 * @csspart label - The `<label>` element.
 * @csspart root - The container element of the `<textarea>` element.
 * @csspart control - The internal `<textarea>` element.
 * @fires change - Fires after the control loses focus, if the content has changed.
 * @fires select - Fires when the `select()` method is called.
 *
 * @public
 */
export class BaseTextArea extends FASTElement {
  /**
   * The form-associated flag.
   * @see {@link https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example | Form-associated custom elements}
   *
   * @public
   */
  static readonly formAssociated = true;

  /**
   * The internal {@link https://developer.mozilla.org/docs/Web/API/ElementInternals | `ElementInternals`} instance for the component.
   *
   * @internal
   */
  public elementInternals: ElementInternals = this.attachInternals();

  /**
   * The `<label>` element.
   * @internal
   */
  public labelEl!: HTMLLabelElement;

  /**
   * The `<textarea>` element.
   * @internal
   */
  public controlEl!: HTMLTextAreaElement;

  /**
   * @internal
   */
  public autoSizerEl?: HTMLDivElement;

  /**
   * The list of nodes that are assigned to the default slot.
   * @internal
   */
  @observable
  public defaultSlottedNodes!: Node[];
  protected defaultSlottedNodesChanged() {
    const next = this.getContent();
    this.defaultValue = next;
    this.value = next;
  }

  private filteredLabelSlottedNodes: Label[] = [];

  /**
   * The list of nodes that are assigned to the `label` slot.
   * @internal
   */
  @observable
  public labelSlottedNodes: Label[] = [];
  protected labelSlottedNodesChanged() {
    this.filteredLabelSlottedNodes = this.labelSlottedNodes.filter(whitespaceFilter);

    if (this.labelEl) {
      this.labelEl.hidden = !this.filteredLabelSlottedNodes.length;
    }

    this.filteredLabelSlottedNodes.forEach(node => {
      node.disabled = this.disabled;
      node.required = this.required;
    });
  }

  private userInteracted = false;

  private autoSizerObserver?: ResizeObserver;

  private controlElAttrObserver!: MutationObserver;

  private preConnectControlEl: HTMLTextAreaElement | null = document.createElement('textarea');

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
   * Indicates whether the element’s block size (height) should be automatically changed based on the content.
   * Note: When this property’s value is set to be `true`, the element should not have a fixed block-size
   * defined in CSS. Instead, use `min-height` or `min-block-size`.
   *
   * @public
   * @remarks
   * HTML Attribute: `auto-resize`
   */
  @attr({ attribute: 'auto-resize', mode: 'boolean' })
  public autoResize = false;
  protected autoResizeChanged() {
    this.maybeCreateAutoSizerEl();
    toggleState(this.elementInternals, 'auto-resize', this.autoResize);
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
    this.elementInternals.ariaReadOnly = `${!!this.readOnly}`;
  }

  /**
   * The element's required attribute.
   *
   * @public
   * @remarks
   * HTML Attribute: `required`
   */
  @attr({ mode: 'boolean' })
  public required = false;
  protected requiredChanged() {
    this.elementInternals.ariaRequired = `${!!this.required}`;
    if (this.filteredLabelSlottedNodes?.length) {
      this.filteredLabelSlottedNodes.forEach(node => (node.required = this.required));
    }
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
    swapStates(this.elementInternals, prev, next, TextAreaResize, 'resize-');

    toggleState(
      this.elementInternals,
      'resize',
      hasMatchingState(TextAreaResize, next) && next !== TextAreaResize.none,
    );
  }

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
   * The length of the current value.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement#textLength | 'textLength'} property
   *
   * @public
   */
  public get textLength(): number {
    return this.controlEl.textLength;
  }

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
    return this.elementInternals.validationMessage || this.controlEl.validationMessage;
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
   * The text content of the element before user interaction.
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement#defaultvalue | `defaultValue`} property
   *
   * @public
   * @remarks
   * In order to set the initial/default value, an author should either add the default value in the HTML as the children
   * of the component, or setting this property in JavaScript. Setting `innerHTML`, `innerText`, or `textContent` on this
   * component will not change the default value or the content displayed inside the component.
   */
  public get defaultValue(): string {
    return this.controlEl?.defaultValue ?? this.preConnectControlEl!.defaultValue;
  }

  public set defaultValue(next: string) {
    const controlEl = this.controlEl ?? this.preConnectControlEl;
    controlEl.defaultValue = next;
    if (this.controlEl && !this.userInteracted) {
      this.controlEl.value = next;
    }
  }

  /**
   * The value of the element.
   *
   * @public
   * @remarks
   * Reflects the `value` property.
   */
  public get value(): string {
    return this.controlEl?.value ?? this.preConnectControlEl!.value;
  }

  public set value(next: string) {
    const controlEl = this.controlEl ?? this.preConnectControlEl;
    controlEl.value = next;
    this.setFormValue(next);
    this.setValidity();
  }

  constructor() {
    super();

    // TODO: Re-enabled this when Reference Target is out.
    // this.elementInternals.role = 'textbox';
    // this.elementInternals.ariaMultiLine = 'true';
  }

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    this.setDefaultValue();
    this.maybeCreateAutoSizerEl();

    this.bindEvents();
    this.observeControlElAttrs();
  }

  /**
   * @internal
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();

    this.autoSizerObserver?.disconnect();
    this.controlElAttrObserver?.disconnect();
  }

  /**
   * Resets the value to its initial value when the form is reset.
   *
   * @internal
   */
  public formResetCallback(): void {
    this.value = this.defaultValue;
  }

  /**
   * @internal
   */
  public formDisabledCallback(disabled: boolean) {
    this.setDisabledSideEffect(disabled);
    this.setValidity();
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
   * Sets the custom validity message.
   * @param message - The message to set
   *
   * @public
   */
  public setCustomValidity(message: string | null): void {
    this.elementInternals.setValidity({ customError: !!message }, !!message ? message.toString() : undefined);
    this.reportValidity();
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
  public setValidity(flags?: Partial<ValidityState>, message?: string, anchor?: HTMLElement): void {
    if (!this.$fastController.isConnected) {
      return;
    }

    if (this.disabled || this.readOnly) {
      this.elementInternals.setValidity({});
    } else {
      this.elementInternals.setValidity(
        flags ?? this.controlEl.validity,
        message ?? this.controlEl.validationMessage,
        anchor ?? this.controlEl,
      );
    }

    if (this.userInteracted) {
      this.toggleUserValidityState();
    }
  }

  /**
   * Selects the content in the element.
   *
   * @public
   */
  public select() {
    this.controlEl.select();
  }

  private setDefaultValue() {
    this.defaultValue = this.innerHTML.trim() || this.preConnectControlEl!.defaultValue || '';
    this.value = this.preConnectControlEl!.value || this.defaultValue;

    this.setFormValue(this.value);
    this.setValidity();

    this.preConnectControlEl = null;
  }

  private bindEvents() {
    this.controlEl.addEventListener('input', () => (this.userInteracted = true), { once: true });
  }

  /**
   * Gets the content inside the light DOM, if any HTML element is present, use its `outerHTML` value.
   */
  private getContent(): string {
    return (
      this.defaultSlottedNodes
        .map(node => {
          switch (node.nodeType) {
            case Node.ELEMENT_NODE:
              return (node as Element).outerHTML;
            case Node.TEXT_NODE:
              return node.textContent!.trim();
            default:
              return '';
          }
        })
        .join('') || ''
    );
  }

  private observeControlElAttrs() {
    this.controlElAttrObserver = new MutationObserver(() => {
      this.setValidity();
    });
    this.controlElAttrObserver.observe(this.controlEl, {
      attributes: true,
      attributeFilter: ['disabled', 'required', 'readonly', 'maxlength', 'minlength'],
    });
  }

  private setDisabledSideEffect(disabled: boolean) {
    this.elementInternals.ariaDisabled = `${disabled}`;

    if (this.controlEl) {
      this.controlEl.disabled = disabled;
    }

    if (this.filteredLabelSlottedNodes?.length) {
      this.filteredLabelSlottedNodes.forEach(node => (node.disabled = this.disabled));
    }
  }

  private toggleUserValidityState() {
    toggleState(this.elementInternals, 'user-invalid', !this.validity.valid);
    toggleState(this.elementInternals, 'user-valid', this.validity.valid);
  }

  // Technique inspired by https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
  // TODO: This should be removed after `field-sizing: content` is widely supported
  // https://caniuse.com/mdn-css_properties_field-sizing_content
  private maybeCreateAutoSizerEl() {
    if (CSS.supports('field-sizing: content')) {
      return;
    }

    if (!this.autoResize) {
      this.autoSizerEl?.remove();
      this.autoSizerObserver?.disconnect();
      return;
    }

    if (!this.autoSizerEl) {
      this.autoSizerEl = document.createElement('div');
      this.autoSizerEl.classList.add('auto-sizer');
      this.autoSizerEl.ariaHidden = 'true';
    }
    this.shadowRoot!.prepend(this.autoSizerEl);

    // The `ResizeObserver` is used to observe when the component gains
    // explicit block size, when so, the `autoSizerEl` element should be
    // removed to let the defined blocked size dictate the component’s block size.
    if (!this.autoSizerObserver) {
      this.autoSizerObserver = new ResizeObserver((_, observer) => {
        const blockSizePropName = window.getComputedStyle(this).writingMode.startsWith('horizontal')
          ? 'height'
          : 'width';
        if (this.style.getPropertyValue(blockSizePropName) !== '') {
          this.autoSizerEl?.remove();
          observer.disconnect();
        }
      });
    }
    this.autoSizerObserver.observe(this);
  }

  /**
   * @internal
   */
  public handleControlInput() {
    if (this.autoResize && this.autoSizerEl) {
      this.autoSizerEl.textContent = this.value + ' ';
    }

    this.setFormValue(this.value);
    this.setValidity();
  }

  /**
   * @internal
   */
  public handleControlChange() {
    this.toggleUserValidityState();
    this.$emit('change');
  }

  /**
   * @internal
   */
  public handleControlSelect() {
    this.$emit('select');
  }
}
