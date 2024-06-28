import { attr, css, FASTElement, nullableNumberConverter, observable, Observable } from '@microsoft/fast-element';
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
import { getDirection } from '../utils/index.js';
import { toggleState } from '../utils/element-internals.js';
import { SliderConfiguration, SliderMode, SliderSize } from './slider.options.js';
import { convertPixelToPercent } from './slider-utilities.js';

/**
 * The base class used for constructing a fluent-slider custom element
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
  protected sizeChanged(prev: string, next: string): void {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  public handleChange(source: any, propertyName: string): void {
    switch (propertyName) {
      case 'min':
      case 'max':
      case 'step':
        this.handleStepStyles();
        break;
      default:
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
      const totalSteps = (100 / Math.floor((this._maxValue - this._minValue) / this.step)) as any;

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
  public initialValueChanged(prev: string, next: string): void {
    this.value = next;
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
  private _value!: string;

  /**
   * The current value of the input.
   *
   * @public
   */
  public get value(): string {
    Observable.track(this, 'value');
    return this._value.toString();
  }

  public set value(value: string) {
    if (this.$fastController.isConnected) {
      const nextAsNumber = parseFloat(value);
      const newValue = limit(this._minValue, this._maxValue, this.convertToConstrainedValue(nextAsNumber)).toString();

      if (newValue !== value) {
        this.value = newValue;
        return;
      }

      this._value = value.toString();
      this.elementInternals.ariaValueNow = this._value;
      this.elementInternals.ariaValueText = this.valueTextFormatter(this._value);
      this.setSliderPosition(this.direction);
      this.$emit('change');
      this.setFormValue(value);
      Observable.notify(this, 'value');
    }
  }

  /**
   * Resets the form value to its initial value when the form is reset.
   *
   * @internal
   */
  formResetCallback(): void {
    this.value = this.initialValue ?? false;
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
  private trackWidth: number = 0;

  /**
   * @internal
   */
  @observable
  private trackMinWidth: number = 0;

  /**
   * @internal
   */
  @observable
  private trackHeight: number = 0;

  /**
   * @internal
   */
  @observable
  private trackLeft: number = 0;

  /**
   * @internal
   */
  @observable
  private trackMinHeight: number = 0;

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
   * Returns the min property or the default value
   *
   * @public
   */
  public get _minValue(): number {
    return this.min ?? 0;
  }

  /**
   * Returns the max property or the default value
   *
   * @public
   */
  public get _maxValue(): number {
    return this.max ?? 100;
  }

  /**
   * Custom function that generates a string for the component's "aria-valuetext" attribute based on the current value.
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
    this.elementInternals.ariaDisabled = `${this.disabled}`;
  }

  /**
   * The minimum allowed value.
   *
   * @defaultValue - 0
   * @public
   * @remarks
   * HTML Attribute: min
   */
  @attr({ converter: nullableNumberConverter })
  public min!: number;
  protected minChanged(prev: string | undefined, next: string | undefined): void {
    this.elementInternals.ariaValueMin = `${this._minValue}`;
  }

  /**
   * The maximum allowed value.
   *
   * @defaultValue - 10
   * @public
   * @remarks
   * HTML Attribute: max
   */
  @attr({ converter: nullableNumberConverter })
  public max!: number;
  protected maxChanged(prev: string | undefined, next: string | undefined): void {
    this.elementInternals.ariaValueMax = `${this._maxValue}`;
  }

  /**
   * Value to increment or decrement via arrow keys, mouse click or drag.
   *
   * @public
   * @remarks
   * HTML Attribute: step
   */
  @attr({ converter: nullableNumberConverter })
  public step: number | undefined;
  protected stepChanged(): void {
    this.updateStepMultiplier();
  }

  /**
   * The orientation of the slider.
   *
   * @public
   * @remarks
   * HTML Attribute: orientation
   */
  @attr
  public orientation?: Orientation;
  protected orientationChanged(prev: string | undefined, next: string | undefined): void {
    this.elementInternals.ariaOrientation = next ?? Orientation.horizontal;

    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }

    if (this.$fastController.isConnected) {
      this.setSliderPosition(this.direction);
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
  }

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    this.direction = getDirection(this);
    this.updateStepMultiplier();
    this.setupTrackConstraints();
    this.setupListeners();
    this.setupDefaultValue();
    this.setSliderPosition(this.direction);

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

    this.setupListeners(true);

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
      this.direction !== Direction.rtl ? Number(this.value) + this.stepValue : Number(this.value) - this.stepValue;
    const incrementedVal: number = this.convertToConstrainedValue(newVal);
    const incrementedValString: string = incrementedVal < this._maxValue ? `${incrementedVal}` : `${this._maxValue}`;
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
        ? Number(this.value) - Number(this.stepValue)
        : Number(this.value) + Number(this.stepValue);
    const decrementedVal: number = this.convertToConstrainedValue(newVal);
    const decrementedValString: string = decrementedVal > this._minValue ? `${decrementedVal}` : `${this._minValue}`;
    this.value = decrementedValString;
  }

  public keypressHandler = (e: KeyboardEvent): void => {
    if (this.disabled) {
      return;
    }

    if (e.key === keyHome) {
      e.preventDefault();
      this.value =
        this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
          ? `${this._minValue}`
          : `${this._maxValue}`;
    } else if (e.key === keyEnd) {
      e.preventDefault();
      this.value =
        this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
          ? `${this._maxValue}`
          : `${this._minValue}`;
    } else if (!e.shiftKey) {
      switch (e.key) {
        case keyArrowRight:
        case keyArrowUp:
          e.preventDefault();
          this.increment();
          break;
        case keyArrowLeft:
        case keyArrowDown:
          e.preventDefault();
          this.decrement();
          break;
      }
    }
  };

  /**
   * Gets the actual step value for the slider
   *
   */
  private get stepValue(): number {
    return this.step === undefined ? 1 : this.step;
  }

  /**
   * Places the thumb based on the current value
   *
   * @public
   * @param direction - writing mode
   */
  private setSliderPosition(direction: Direction): void {
    const newPct: number = convertPixelToPercent(parseFloat(this.value), this._minValue, this._maxValue, direction);
    const percentage: number = (1 - newPct) * 100;
    const thumbPosition = `calc(100% - ${percentage}%)`;
    const trackProgress =
      !(this.orientation === Orientation.vertical) && direction === Direction.rtl
        ? `${percentage}%`
        : `calc(100% - ${percentage}%)`;
    this.position = `--slider-thumb: ${thumbPosition}; --slider-progress: ${trackProgress}`;
  }

  /**
   * Update the step multiplier used to ensure rounding errors from steps that
   * are not whole numbers
   */
  private updateStepMultiplier(): void {
    const stepString: string = this.stepValue + '';
    const decimalPlacesOfStep: number = !!(this.stepValue % 1) ? stepString.length - stepString.indexOf('.') - 1 : 0;
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

  private setupListeners = (remove: boolean = false): void => {
    //TODO Bug: https://github.com/microsoft/fluentui/issues/30087
    this.addEventListener('keydown', this.keypressHandler);

    if (remove) {
      this.removeEventListener('keydown', this.keypressHandler);
    }
  };

  private get midpoint(): string {
    return `${this.convertToConstrainedValue((this._maxValue + this._minValue) / 2)}`;
  }

  private setupDefaultValue(): void {
    this.value = this.initialValue ?? this.midpoint;

    if (!Number.isNaN(this.valueAsNumber) &&
        (this.valueAsNumber < this._minValue || this.valueAsNumber > this._maxValue)) {
      this.value = this.midpoint;
    }
  }

  /**
   *  Handle mouse moves during a thumb drag operation
   *  If the event handler is null it removes the events
   */
  public handleThumbPointerDown = (event: PointerEvent | null): void => {
    const windowFn = event !== null ? window.addEventListener : window.removeEventListener;
    windowFn('pointerup', this.handleWindowPointerUp);
    windowFn('pointermove', this.handlePointerMove, { passive: true });
    windowFn('touchmove', this.handlePointerMove, { passive: true });
    windowFn('touchend', this.handleWindowPointerUp);
    this.isDragging = event !== null;
  };

  /**
   *  Handle mouse moves during a thumb drag operation
   */
  private handlePointerMove = (e: PointerEvent | TouchEvent | Event): void => {
    if (this.disabled || e.defaultPrevented) {
      return;
    }

    // update the value based on current position
    const sourceEvent = window.TouchEvent && e instanceof TouchEvent ? e.touches[0] : (e as PointerEvent);
    const eventValue: number =
      this.orientation === Orientation.horizontal
        ? sourceEvent.pageX - document.documentElement.scrollLeft - this.trackLeft
        : sourceEvent.pageY - document.documentElement.scrollTop;

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
      this.orientation === Orientation.horizontal ? this.trackMinWidth : this.trackMinHeight,
      this.orientation === Orientation.horizontal ? this.trackWidth : this.trackHeight,
      this.direction,
    );
    const newValue: number = (this._maxValue - this._minValue) * newPosition + this._minValue;
    return this.convertToConstrainedValue(newValue);
  }

  /**
   * Handle a window mouse up during a drag operation
   */
  private handleWindowPointerUp = (event: Event): void => {
    this.stopDragging();
  };

  private stopDragging = (): void => {
    this.isDragging = false;
    this.handlePointerDown(null);
    this.handleThumbPointerDown(null);
  };

  /**
   *
   * @param e - PointerEvent or null. If there is no event handler it will remove the events
   */
  public handlePointerDown = (e: PointerEvent | null) => {
    if (e === null || !this.disabled) {
      const windowFn = e !== null ? window.addEventListener : window.removeEventListener;
      const documentFn = e !== null ? document.addEventListener : document.removeEventListener;
      windowFn('pointerup', this.handleWindowPointerUp);
      documentFn('mouseleave', this.handleWindowPointerUp);
      windowFn('pointermove', this.handlePointerMove);

      if (e) {
        this.setupTrackConstraints();
        const controlValue: number =
          this.orientation === Orientation.horizontal
            ? e.pageX - document.documentElement.scrollLeft - this.trackLeft
            : e.pageY - document.documentElement.scrollTop;

        this.value = `${this.calculateNewValue(controlValue)}`;
      }
    }
  };

  private convertToConstrainedValue(value: number): number {
    if (isNaN(value)) {
      value = this._minValue;
    }

    /**
     * The following logic intends to overcome the issue with math in JavaScript with regards to floating point numbers.
     * This is needed as the `step` may be an integer but could also be a float. To accomplish this the step  is assumed to be a float
     * and is converted to an integer by determining the number of decimal places it represent, multiplying it until it is an
     * integer and then dividing it to get back to the correct number.
     */
    let constrainedValue: number = value - this._minValue;
    const roundedConstrainedValue: number = Math.round(constrainedValue / this.stepValue);
    const remainderValue: number =
      constrainedValue - (roundedConstrainedValue * (this.stepMultiplier * this.stepValue)) / this.stepMultiplier;

    constrainedValue =
      remainderValue >= Number(this.stepValue) / 2
        ? constrainedValue - remainderValue + Number(this.stepValue)
        : constrainedValue - remainderValue;
    return constrainedValue + this._minValue;
  }
}
