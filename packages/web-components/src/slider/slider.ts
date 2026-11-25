import { attr, FASTElement, Observable, observable, Updates } from '@microsoft/fast-element';
import { maybeSetAutoFocus } from '../utils/autofocus.js';
import { numberLikeStringConverter } from '../utils/converters.js';
import { Direction, getDirection } from '../utils/direction.js';
import { limit } from '../utils/numbers.js';
import { Orientation } from '../utils/orientation.js';
import { type SliderConfiguration, SliderMode, SliderOrientation, type SliderSize } from './slider.options.js';

/**
 * The base class used for constructing a fluent-slider custom element
 *
 * @tag fluent-slider
 *
 * @slot thumb - The slot for a custom thumb element.
 * @csspart thumb-container - The container element of the thumb.
 * @csspart track-container - The container element of the track.
 * @fires { Event } change - Fires a custom 'change' event when the value changes.
 * @presentational {SliderSize | undefined} size - The size of the slider.
 *
 * @public
 */
export class Slider extends FASTElement implements SliderConfiguration {
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
   * @internal
   */
  public handleChange(_: any, propertyName: string): void {
    switch (propertyName) {
      case 'min':
      case 'max':
      case 'step': {
        if (!this.control || !this.track) {
          return;
        }
        this.control.min = this.minAsNumber.toString();
        this.control.step = this.stepAsNumber.toString();
        // Let native snapping find the nearest step even when it is above the public maximum.
        this.control.max = (this.maxAsNumber + this.stepAsNumber).toString();
        this.control.value = this.maxAsNumber.toString();
        this.controlMax = this.control.value;
        const range = this.control.valueAsNumber - this.minAsNumber;
        this.track.dataset.range = range > 0 ? range.toString() : '1';
        this.track.dataset.step = this.control.step;
        this.control.max = this.controlMax;
        this.control.value = this.value;
        this.updateControlValue();
        break;
      }
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
  public initialValue!: string;

  /**
   * Sets the value of the input when the value attribute changes.
   *
   * @param prev - The previous value
   * @param next - The current value
   * @internal
   */
  protected initialValueChanged(_: string, next: string): void {
    if (this.$fastController.isConnected) {
      this.value = next;
    } else {
      this._value = next;
    }
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
   * The element's validation message.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/validationMessage | `ElemenentInternals.validationMessage`} property.
   */
  public get validationMessage(): string {
    return this.elementInternals.validationMessage;
  }

  /**
   * Whether the element is a candidate for its owning form's constraint validation.
   *
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/willValidate | `ElemenentInternals.willValidate`} property.
   */
  public get willValidate() {
    return this.elementInternals.willValidate;
  }

  /**
   * Checks the element's validity.
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/checkValidity | `ElemenentInternals.checkValidity`} method.
   */
  public checkValidity() {
    return this.elementInternals.checkValidity();
  }

  /**
   * Reports the element's validity.
   * @public
   * @remarks
   * Reflects the {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/reportValidity | `ElemenentInternals.reportValidity`} method.
   */
  public reportValidity() {
    return this.elementInternals.reportValidity();
  }

  /**
   * Sets a custom validity message.
   * @public
   */
  public setCustomValidity(message: string) {
    this.setValidity({ customError: !!message }, message);
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
  public setValidity(flags?: Partial<ValidityState>, message?: string, anchor?: HTMLElement): void {
    if (this.$fastController.isConnected) {
      if (this.isDisabled) {
        this.elementInternals.setValidity({});
        return;
      }

      this.elementInternals.setValidity(
        { customError: !!message, ...flags },
        message ?? this.validationMessage,
        anchor,
      );
    }
  }

  /**
   * The internal value of the input.
   *
   * @internal
   */
  private _value!: string;

  /**
   * The current value of the input.
   *
   * @public
   */
  public get value(): string {
    Observable.track(this, 'value');
    return this._value?.toString() ?? '';
  }

  public set value(value: string) {
    if (!this.$fastController.isConnected) {
      this._value = value.toString();
      return;
    }

    const nextAsNumber = parseFloat(value);
    this.control.value = (Number.isFinite(nextAsNumber) ? nextAsNumber : this.minAsNumber).toString();
    this._value = limit(this.minAsNumber, this.maxAsNumber, this.control.valueAsNumber).toString();
    this.elementInternals.ariaValueNow = this._value;
    this.elementInternals.ariaValueText = this.valueTextFormatter(this._value);
    this.updateControlValue();
    this.$emit('change');
    this.setFormValue(this._value);
    Observable.notify(this, 'value');
  }

  /**
   * Resets the form value to its initial value when the form is reset.
   *
   * @internal
   */
  formResetCallback(): void {
    this.value = this.initialValue ?? this.midpoint;
  }

  /**
   * Disabled the component when its associated form is disabled.
   *
   * @internal
   *
   * @privateRemarks
   * DO NOT change the `disabled` property or attribute here, because if the
   * `disabled` attribute is present, reenabling an ancestor `<fieldset>`
   * element will not reenabling this component.
   */
  formDisabledCallback(disabled: boolean): void {
    this.setDisabledSideEffect(disabled);
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
   * @internal
   */
  public track!: HTMLDivElement;

  /**
   * @internal
   */
  public thumb!: HTMLDivElement;

  /**
   * @internal
   */
  public control!: HTMLInputElement;

  /**
   * Property is useful when the silder’s parent <fieldset> element is disabled.
   *
   * @internal
   */
  @observable
  public controlDisabled: boolean = false;

  /**
   * Native step-aligned maximum; the public value remains clamped to max.
   *
   * @internal
   */
  @observable
  public controlMax: string = '100';

  /**
   * @internal
   */
  @observable
  public direction: Direction = Direction.ltr;

  /**
   * @internal
   */
  @observable
  public isDragging: boolean = false;

  private pointerController?: AbortController;
  private pointerupHandler = (): void => {
    this.controlPointerdownHandler(null);
  };
  private pointercancelHandler = (): void => {
    this.controlPointerdownHandler(null);
  };

  /**
   * The value property, typed as a number.
   *
   * @public
   */
  public get valueAsNumber(): number {
    return parseFloat(this.value);
  }

  public set valueAsNumber(next: number) {
    this.value = next.toString();
  }

  /**
   * Custom function that generates a string for the component's "ariaValueText" on element internals based on the current value.
   *
   * @public
   */
  @observable
  public valueTextFormatter: (value: string) => string = () => '';
  protected valueTextFormatterChanged() {
    if (typeof this.valueTextFormatter === 'function') {
      this.elementInternals.ariaValueText = this.valueTextFormatter(this._value);
    } else {
      this.elementInternals.ariaValueText = '';
    }
  }

  /**
   * The element's disabled state.
   * @public
   * @remarks
   * HTML Attribute: `disabled`
   */
  @attr({ mode: 'boolean' })
  public disabled: boolean = false;
  protected disabledChanged(): void {
    this.setDisabledSideEffect(this.disabled);
  }

  /**
   * Returns true if the component is disabled, taking into account the `disabled`
   * attribute, `aria-disabled` attribute, and the `:disabled` pseudo-class.
   *
   * @internal
   */
  protected get isDisabled() {
    return (
      this.disabled || this.elementInternals?.ariaDisabled === 'true' || (this.isConnected && this.matches(':disabled'))
    );
  }

  /**
   * The minimum allowed value.
   *
   * @public
   * @remarks
   * HTML Attribute: min
   */
  @attr({ converter: numberLikeStringConverter })
  public min: string = '';
  protected minChanged(): void {
    this.elementInternals.ariaValueMin = `${this.minAsNumber}`;
    if (this.$fastController.isConnected) {
      this.handleChange(this, 'min');
      if (this.minAsNumber > this.valueAsNumber) {
        this.value = this.min!;
      }
    }
  }

  /**
   * Returns the min property or the default value
   *
   * @internal
   */
  private get minAsNumber(): number {
    if (this.min !== undefined) {
      const parsed = parseFloat(this.min);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
    return 0;
  }

  /**
   * The maximum allowed value.
   *
   * @public
   * @remarks
   * HTML Attribute: max
   */
  @attr({ converter: numberLikeStringConverter })
  public max: string = '';
  protected maxChanged(): void {
    this.elementInternals.ariaValueMax = `${this.maxAsNumber}`;
    if (this.$fastController.isConnected) {
      this.handleChange(this, 'max');
      if (this.maxAsNumber < this.valueAsNumber) {
        this.value = this.max!;
      }
    }
  }

  /**
   * Returns the max property or the default value
   *
   * @internal
   */
  private get maxAsNumber(): number {
    if (this.max !== undefined) {
      const parsed = parseFloat(this.max);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
    return 100;
  }

  /**
   * Value to increment or decrement via arrow keys, mouse click or drag.
   *
   * @public
   * @remarks
   * HTML Attribute: step
   */
  @attr({ converter: numberLikeStringConverter })
  public step: string = '';
  protected stepChanged(): void {
    // Update value to align with the new step if needed.
    if (this.$fastController.isConnected) {
      this.handleChange(this, 'step');
      this.value = this._value;
    }
  }

  /**
   * Returns the step property as a number.
   *
   * @internal
   */
  private get stepAsNumber(): number {
    if (this.step !== undefined) {
      const parsed = parseFloat(this.step);
      if (!Number.isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
    return 1;
  }

  /**
   * The orientation of the slider.
   *
   * @public
   * @remarks
   * HTML Attribute: orientation
   *
   * @privateRemarks
   * When checking the value of `this.orientation`, always compare it to
   * `Orientation.vertical`, never to `Orientation.horizontal`, it’s because
   * this property is optional, so it could be `undefined`. So any
   * orientation-related behavior should consider horizontal as default, and
   * apply different behavior when it’s vertical.
   */
  @attr
  public orientation?: Orientation;
  protected orientationChanged(prev: Orientation | undefined, next: Orientation | undefined) {
    this.elementInternals.ariaOrientation = next ?? Orientation.horizontal;
  }

  /**
   * The selection mode.
   *
   * @public
   * @remarks
   * HTML Attribute: mode
   */
  @attr
  public mode: SliderMode = SliderMode.singleValue;

  constructor() {
    super();

    this.elementInternals.role = 'slider';
    this.elementInternals.ariaOrientation = this.orientation ?? SliderOrientation.horizontal;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    Updates.enqueue(() => {
      if (!this.$fastController.isConnected) {
        return;
      }

      this.direction = getDirection(this);

      this.setDisabledSideEffect(this.disabled || this.matches(':disabled'));
      this.handleChange(this, 'step');
      this.setupDefaultValue();
    });

    maybeSetAutoFocus(this);
  }

  /**
   * @internal
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();

    this.pointerController?.abort();
    this.isDragging = false;
  }

  /**
   * Increment the value by the step
   *
   * @public
   */
  public increment(): void {
    this.control.stepUp(this.direction === Direction.rtl ? -1 : 1);
    this.value = this.control.value;
  }

  /**
   * Decrement the value by the step
   *
   * @public
   */
  public decrement(): void {
    this.control.stepDown(this.direction === Direction.rtl ? -1 : 1);
    this.value = this.control.value;
  }

  /**
   * @internal
   */
  public keydownHandler(event: KeyboardEvent): boolean {
    if (this.isDisabled) {
      return true;
    }

    switch (event.key) {
      case 'Home':
        event.preventDefault();
        this.value =
          this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
            ? `${this.minAsNumber}`
            : `${this.maxAsNumber}`;
        break;
      case 'End':
        event.preventDefault();
        this.value =
          this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
            ? `${this.maxAsNumber}`
            : `${this.minAsNumber}`;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        if (!event.shiftKey) {
          event.preventDefault();
          this.increment();
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        if (!event.shiftKey) {
          event.preventDefault();
          this.decrement();
        }
        break;
    }

    return true;
  }

  private updateControlValue(): void {
    if (this.control && this.track) {
      this.track.dataset.value = this.control.value;
    }
  }

  private get midpoint(): string {
    return `${(this.maxAsNumber + this.minAsNumber) / 2}`;
  }

  private setupDefaultValue(): void {
    if (!this._value) {
      this.value = this.initialValue ?? this.midpoint;
    }

    if (
      !Number.isNaN(this.valueAsNumber) &&
      (this.valueAsNumber < this.minAsNumber || this.valueAsNumber > this.maxAsNumber)
    ) {
      this.value = this.midpoint;
    }

    this.elementInternals.ariaValueNow = this.value;
  }

  /**
   * Synchronizes native range interaction with the public value and change event.
   *
   * @internal
   */
  public controlInputHandler(event: Event): boolean {
    event.stopPropagation();
    if (!this.isDisabled) {
      this.value = this.control.value;
    }
    return true;
  }

  /**
   * @internal
   */
  public controlChangeHandler(event: Event): boolean {
    event.stopPropagation();
    this.controlPointerdownHandler(null);
    return true;
  }

  /**
   * @internal
   */
  public controlFocusHandler(): boolean {
    if (!this.isDragging) {
      this.focus();
    }
    return true;
  }

  /**
   * @internal
   */
  public controlPointerdownHandler = (event: PointerEvent | null): boolean => {
    const wasDragging = this.isDragging;
    this.pointerController?.abort();
    this.isDragging = event !== null && event.button === 0 && !this.isDisabled;
    if (this.isDragging) {
      this.pointerController = new AbortController();
      const options = { once: true, signal: this.pointerController.signal };
      // Native release events can target outside the input after dragging past its bounds.
      this.ownerDocument.addEventListener('pointerup', this.pointerupHandler, options);
      this.ownerDocument.addEventListener('pointercancel', this.pointercancelHandler, options);
    }
    // Moving focus out of the native input during a drag cancels it in Firefox.
    if (wasDragging && event === null && !this.isDisabled) {
      this.focus();
    }
    return true;
  };

  /**
   * Makes sure the side effects of set up when the disabled state changes.
   */
  private setDisabledSideEffect(disabled: boolean = this.isDisabled): void {
    Updates.enqueue(() => {
      this.elementInternals.ariaDisabled = disabled.toString();
      this.controlDisabled = disabled;
      if (disabled) {
        this.controlPointerdownHandler(null);
      }
      this.tabIndex = disabled ? -1 : 0;
    });
  }
}
