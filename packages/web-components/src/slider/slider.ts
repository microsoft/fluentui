import { attr, css, FASTElement, observable, Observable } from '@microsoft/fast-element';
import type { ElementStyles } from '@microsoft/fast-element';
import {
  Direction,
  keyArrowDown,
  keyArrowLeft,
  keyArrowRight,
  keyArrowUp,
  keyEnd,
  keyHome,
  limit,
  Orientation,
} from '@microsoft/fast-web-utilities';
import { numberLikeStringConverter } from '../utils/converters.js';
import { getDirection } from '../utils/direction.js';
import { swapStates } from '../utils/element-internals.js';
import { type SliderConfiguration, SliderMode, SliderOrientation, SliderSize } from './slider.options.js';
import { convertPixelToPercent } from './slider-utilities.js';

/**
 * The base class used for constructing a fluent-slider custom element
 *
 * @tag fluent-slider
 *
 * @slot thumb - The slot for a custom thumb element.
 * @csspart thumb-container - The container element of the thumb.
 * @csspart track-container - The container element of the track.
 * @fires change - Fires a custom 'change' event when the value changes.
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
   * The size of the slider
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: SliderSize;

  public handleChange(_: any, propertyName: string): void {
    switch (propertyName) {
      case 'min':
      case 'max':
        this.setSliderPosition();
      case 'step':
        this.handleStepStyles();
        break;
    }
  }

  private stepStyles?: ElementStyles;

  /**
   * Handles changes to step styling based on the step value
   * NOTE: This function is not a changed callback, stepStyles is not observable
   */
  private handleStepStyles(): void {
    if (this.step) {
      const totalSteps = (100 / Math.floor((this.maxAsNumber - this.minAsNumber) / this.stepAsNumber)) as any;

      if (this.stepStyles !== undefined) {
        this.$fastController.removeStyles(this.stepStyles);
      }

      this.stepStyles = css/**css*/ `
        :host {
          --step-rate: ${totalSteps}%;
        }
      `;

      this.$fastController.addStyles(this.stepStyles);
    } else if (this.stepStyles !== undefined) {
      this.$fastController.removeStyles(this.stepStyles);
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
      if (this.disabled) {
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
    const newValue = limit(this.minAsNumber, this.maxAsNumber, this.convertToConstrainedValue(nextAsNumber)).toString();

    if (newValue !== value) {
      this.value = newValue;
      return;
    }

    this._value = value.toString();
    this.elementInternals.ariaValueNow = this._value;
    this.elementInternals.ariaValueText = this.valueTextFormatter(this._value);
    this.setSliderPosition();
    this.$emit('change');
    this.setFormValue(value);
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
  public stepMultiplier!: number;

  /**
   * @internal
   */
  @observable
  public direction: Direction = Direction.ltr;
  public directionChanged(): void {
    this.setSliderPosition();
  }

  /**
   * @internal
   */
  @observable
  public isDragging: boolean = false;

  /**
   * @internal
   */
  @observable
  public position!: string;

  /**
   * @internal
   */
  @observable
  public trackWidth: number = 0;

  /**
   * @internal
   */
  @observable
  public trackMinWidth: number = 0;

  /**
   * @internal
   */
  @observable
  public trackHeight: number = 0;

  /**
   * @internal
   */
  @observable
  public trackLeft: number = 0;

  /**
   * @internal
   */
  @observable
  public trackMinHeight: number = 0;

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
    if (this.$fastController.isConnected && this.minAsNumber > this.valueAsNumber) {
      this.value = this.min!;
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
    if (this.$fastController.isConnected && this.maxAsNumber < this.valueAsNumber) {
      this.value = this.max!;
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
    this.updateStepMultiplier();
    // Update value to align with the new step if needed.
    if (this.$fastController.isConnected) {
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

    if (this.$fastController.isConnected) {
      this.setSliderPosition();
    }
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

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    this.direction = getDirection(this);

    this.setDisabledSideEffect(this.disabled);
    this.updateStepMultiplier();
    this.setupTrackConstraints();
    this.setupDefaultValue();
    this.setSliderPosition();

    Observable.getNotifier(this).subscribe(this, 'max');
    Observable.getNotifier(this).subscribe(this, 'min');
    Observable.getNotifier(this).subscribe(this, 'step');

    this.handleStepStyles();
  }

  /**
   * @internal
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();

    Observable.getNotifier(this).unsubscribe(this, 'max');
    Observable.getNotifier(this).unsubscribe(this, 'min');
    Observable.getNotifier(this).unsubscribe(this, 'step');
  }

  /**
   * Increment the value by the step
   *
   * @public
   */
  public increment(): void {
    const newVal: number =
      this.direction !== Direction.rtl
        ? Number(this.value) + this.stepAsNumber
        : Number(this.value) - this.stepAsNumber;
    const incrementedVal: number = this.convertToConstrainedValue(newVal);
    const incrementedValString: string =
      incrementedVal < this.maxAsNumber ? `${incrementedVal}` : `${this.maxAsNumber}`;
    this.value = incrementedValString;
  }

  /**
   * Decrement the value by the step
   *
   * @public
   */
  public decrement(): void {
    const newVal =
      this.direction !== Direction.rtl
        ? Number(this.value) - Number(this.stepAsNumber)
        : Number(this.value) + Number(this.stepAsNumber);
    const decrementedVal: number = this.convertToConstrainedValue(newVal);
    const decrementedValString: string =
      decrementedVal > this.minAsNumber ? `${decrementedVal}` : `${this.minAsNumber}`;
    this.value = decrementedValString;
  }

  public handleKeydown(event: KeyboardEvent): boolean {
    if (this.disabled) {
      return true;
    }

    switch (event.key) {
      case keyHome:
        event.preventDefault();
        this.value =
          this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
            ? `${this.minAsNumber}`
            : `${this.maxAsNumber}`;
        break;
      case keyEnd:
        event.preventDefault();
        this.value =
          this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
            ? `${this.maxAsNumber}`
            : `${this.minAsNumber}`;
        break;
      case keyArrowRight:
      case keyArrowUp:
        if (!event.shiftKey) {
          event.preventDefault();
          this.increment();
        }
        break;
      case keyArrowLeft:
      case keyArrowDown:
        if (!event.shiftKey) {
          event.preventDefault();
          this.decrement();
        }
        break;
    }

    return true;
  }

  /**
   * Places the thumb based on the current value
   */
  private setSliderPosition(): void {
    const newPct: number = convertPixelToPercent(
      parseFloat(this.value),
      this.minAsNumber,
      this.maxAsNumber,
      this.orientation === Orientation.vertical ? undefined : this.direction,
    );
    const percentage: number = newPct * 100;
    this.position = `--slider-thumb: ${percentage}%; --slider-progress: ${percentage}%`;
  }

  /**
   * Update the step multiplier used to ensure rounding errors from steps that
   * are not whole numbers
   */
  private updateStepMultiplier(): void {
    const stepString: string = this.stepAsNumber + '';
    const decimalPlacesOfStep: number = !!(this.stepAsNumber % 1) ? stepString.length - stepString.indexOf('.') - 1 : 0;
    this.stepMultiplier = Math.pow(10, decimalPlacesOfStep);
  }

  private setupTrackConstraints = (): void => {
    const clientRect: DOMRect = this.track.getBoundingClientRect();
    this.trackWidth = this.track.clientWidth;
    this.trackMinWidth = this.track.clientLeft;
    this.trackHeight = clientRect.top;
    this.trackMinHeight = clientRect.bottom;
    this.trackLeft = this.getBoundingClientRect().left;
    if (this.trackWidth === 0) {
      this.trackWidth = 1;
    }
  };

  private get midpoint(): string {
    return `${this.convertToConstrainedValue((this.maxAsNumber + this.minAsNumber) / 2)}`;
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
   *  Handle mouse moves during a thumb drag operation
   *  If the event handler is null it removes the events
   */
  public handleThumbPointerDown = (event: PointerEvent | null): boolean => {
    const windowFn = event !== null ? window.addEventListener : window.removeEventListener;
    windowFn('pointerup', this.handleWindowPointerUp);
    windowFn('pointermove', this.handlePointerMove, { passive: true });
    windowFn('touchmove', this.handlePointerMove, { passive: true });
    windowFn('touchend', this.handleWindowPointerUp);
    this.isDragging = event !== null;
    return true;
  };

  /**
   *  Handle mouse moves during a thumb drag operation
   */
  private handlePointerMove = (event: PointerEvent | TouchEvent | Event): void => {
    if (this.disabled || event.defaultPrevented) {
      return;
    }

    // update the value based on current position
    const sourceEvent = window.TouchEvent && event instanceof TouchEvent ? event.touches[0] : (event as PointerEvent);

    const thumbWidth = this.thumb.getBoundingClientRect().width;

    const eventValue: number =
      this.orientation === Orientation.vertical
        ? sourceEvent.pageY - document.documentElement.scrollTop
        : sourceEvent.pageX - document.documentElement.scrollLeft - this.trackLeft - thumbWidth / 2;

    this.value = `${this.calculateNewValue(eventValue)}`;
  };

  /**
   * Calculate the new value based on the given raw pixel value.
   *
   * @param rawValue - the value to be converted to a constrained value
   * @returns the constrained value
   *
   * @internal
   */
  public calculateNewValue(rawValue: number): number {
    this.setupTrackConstraints();

    // update the value based on current position
    const newPosition = convertPixelToPercent(
      rawValue,
      this.orientation === Orientation.vertical ? this.trackMinHeight : this.trackMinWidth,
      this.orientation === Orientation.vertical ? this.trackHeight : this.trackWidth,
      this.orientation === Orientation.vertical ? undefined : this.direction,
    );
    const newValue: number = (this.maxAsNumber - this.minAsNumber) * newPosition + this.minAsNumber;
    return this.convertToConstrainedValue(newValue);
  }

  /**
   * Handle a window mouse up during a drag operation
   */
  private handleWindowPointerUp = (): void => {
    this.stopDragging();
  };

  private stopDragging = (): void => {
    this.isDragging = false;
    this.handlePointerDown(null);
    this.handleThumbPointerDown(null);
  };

  /**
   *
   * @param event - PointerEvent or null. If there is no event handler it will remove the events
   */
  public handlePointerDown = (event: PointerEvent | null) => {
    if (event === null || !this.disabled) {
      const windowFn = event !== null ? window.addEventListener : window.removeEventListener;
      const documentFn = event !== null ? document.addEventListener : document.removeEventListener;
      windowFn('pointerup', this.handleWindowPointerUp);
      documentFn('mouseleave', this.handleWindowPointerUp);
      windowFn('pointermove', this.handlePointerMove);

      const thumbWidth = this.thumb.getBoundingClientRect().width;

      if (event) {
        this.setupTrackConstraints();
        const controlValue: number =
          this.orientation === Orientation.vertical
            ? event.pageY - document.documentElement.scrollTop
            : event.pageX - document.documentElement.scrollLeft - this.trackLeft - thumbWidth / 2;

        this.value = `${this.calculateNewValue(controlValue)}`;
      }
    }
    return true;
  };

  private convertToConstrainedValue(value: number): number {
    if (isNaN(value)) {
      value = this.minAsNumber;
    }

    /**
     * The following logic intends to overcome the issue with math in JavaScript with regards to floating point numbers.
     * This is needed as the `step` may be an integer but could also be a float. To accomplish this the step  is assumed to be a float
     * and is converted to an integer by determining the number of decimal places it represent, multiplying it until it is an
     * integer and then dividing it to get back to the correct number.
     */
    let constrainedValue: number = value - this.minAsNumber;
    const roundedConstrainedValue: number = Math.round(constrainedValue / this.stepAsNumber);
    const remainderValue: number =
      constrainedValue - (roundedConstrainedValue * (this.stepMultiplier * this.stepAsNumber)) / this.stepMultiplier;

    constrainedValue =
      remainderValue >= Number(this.stepAsNumber) / 2
        ? constrainedValue - remainderValue + Number(this.stepAsNumber)
        : constrainedValue - remainderValue;
    return constrainedValue + this.minAsNumber;
  }

  /**
   * Makes sure the side effects of set up when the disabled state changes.
   */
  private setDisabledSideEffect(disabled: boolean) {
    if (!this.$fastController.isConnected) {
      return;
    }
    this.elementInternals.ariaDisabled = disabled.toString();
    this.tabIndex = disabled ? -1 : 0;
  }
}
