import { attr, css, nullableNumberConverter, observable, Observable } from '@microsoft/fast-element';
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
import { SliderConfiguration, SliderMode, SliderSize } from './slider.options.js';
import { FormAssociatedSlider } from './slider.form-associated.js';
import { convertPixelToPercent } from './slider-utilities.js';

/**
 * The base class used for constructing a fluent-slider custom element
 * @public
 */
export class Slider extends FormAssociatedSlider implements SliderConfiguration {
  /**
   * The size of the slider
   * @public
   * @remarks
   * HTML Attribute: size
   */
  @attr
  public size?: SliderSize;

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
      const totalSteps = (100 / Math.floor((this.max - this.min) / this.step)) as any;

      if (this.stepStyles !== undefined) {
        this.$fastController.removeStyles(this.stepStyles);
      }

      this.stepStyles = css/**css*/ `
        :host {
          --step-rate: ${totalSteps}%;
          color: blue;
        }
      `;

      this.$fastController.addStyles(this.stepStyles);
    } else if (this.stepStyles !== undefined) {
      this.$fastController.removeStyles(this.stepStyles);
    }
  }

  /**
   * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
   *
   * @public
   * @remarks
   * HTML Attribute: readonly
   */
  @attr({ attribute: 'readonly', mode: 'boolean' })
  public readOnly!: boolean; // Map to proxy element
  protected readOnlyChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.readOnly = this.readOnly;
    }
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
    return parseFloat(super.value);
  }

  public set valueAsNumber(next: number) {
    this.value = next.toString();
  }

  /**
   * Custom function that generates a string for the component's "aria-valuetext" attribute based on the current value.
   *
   * @public
   */
  @observable
  public valueTextFormatter: (value: string) => string | null = () => null;

  /**
   * @internal
   */
  public valueChanged(previous: string, next: string): void {
    if (this.$fastController.isConnected) {
      const nextAsNumber = parseFloat(next);
      const value = limit(this.min, this.max, this.convertToConstrainedValue(nextAsNumber)).toString();

      if (value !== next) {
        this.value = value;
        return;
      }

      super.valueChanged(previous, next);

      this.setThumbPositionForOrientation(this.direction);

      this.$emit('change');
    }
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
  public min: number = 0; // Map to proxy element.
  protected minChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.min = `${this.min}`;
    }

    this.validate();
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
  public max: number = 10; // Map to proxy element.
  protected maxChanged(): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.max = `${this.max}`;
    }
    this.validate();
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
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.step = `${this.step}`;
    }

    this.updateStepMultiplier();
    this.validate();
  }

  /**
   * The orientation of the slider.
   *
   * @public
   * @remarks
   * HTML Attribute: orientation
   */
  @attr
  public orientation: Orientation = Orientation.horizontal;
  protected orientationChanged(): void {
    if (this.$fastController.isConnected) {
      this.setThumbPositionForOrientation(this.direction);
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

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    this.proxy.setAttribute('type', 'range');

    this.direction = getDirection(this);
    this.updateStepMultiplier();
    this.setupTrackConstraints();
    this.setupListeners();
    this.setupDefaultValue();
    this.setThumbPositionForOrientation(this.direction);

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
      this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
        ? Number(this.value) + Number(this.stepValue)
        : Number(this.value) + Number(this.stepValue);
    const incrementedVal: number = this.convertToConstrainedValue(newVal);
    const incrementedValString: string = incrementedVal < Number(this.max) ? `${incrementedVal}` : `${this.max}`;
    this.value = incrementedValString;
  }

  /**
   * Decrement the value by the step
   *
   * @public
   */
  public decrement(): void {
    const newVal =
      this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
        ? Number(this.value) - Number(this.stepValue)
        : Number(this.value) - Number(this.stepValue);
    const decrementedVal: number = this.convertToConstrainedValue(newVal);
    const decrementedValString: string = decrementedVal > Number(this.min) ? `${decrementedVal}` : `${this.min}`;
    this.value = decrementedValString;
  }

  public keypressHandler = (e: KeyboardEvent): void => {
    if (this.readOnly || this.disabled) {
      return;
    }

    if (e.key === keyHome) {
      e.preventDefault();
      this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
        ? (this.value = `${this.min}`)
        : (this.value = `${this.max}`);
    } else if (e.key === keyEnd) {
      e.preventDefault();
      this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
        ? (this.value = `${this.max}`)
        : (this.value = `${this.min}`);
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
  private setThumbPositionForOrientation(direction: Direction): void {
    const newPct: number = convertPixelToPercent(Number(this.value), Number(this.min), Number(this.max), direction);
    const percentage: number = (1 - newPct) * 100;
    if (this.orientation === Orientation.horizontal) {
      this.position = this.isDragging
        ? `right: ${percentage}%; transition: none;`
        : `right: ${percentage}%; transition: all 0.2s ease;`;
    } else {
      this.position = this.isDragging
        ? `top: ${percentage}%; transition: none;`
        : `top: ${percentage}%; transition: all 0.2s ease;`;
    }
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

  //Remove
  private setupListeners = (remove: boolean = false): void => {
    //TODO Bug: https://github.com/microsoft/fluentui/issues/30087
    this.addEventListener('keydown', this.keypressHandler);
    this.addEventListener('mousedown', this.handleMouseDown);
    // removes handlers attached by mousedown handlers
    if (remove) {
      this.removeEventListener('keydown', this.keypressHandler);
      this.removeEventListener('mousedown', this.handleMouseDown);
    }
  };

  /**
   * @internal
   */
  public initialValue: string = '';

  private get midpoint(): string {
    return `${this.convertToConstrainedValue((this.max + this.min) / 2)}`;
  }

  private setupDefaultValue(): void {
    if (typeof this.value === 'string') {
      if (this.value.length === 0) {
        this.initialValue = this.midpoint;
      } else {
        const value = parseFloat(this.value);

        if (!Number.isNaN(value) && (value < this.min || value > this.max)) {
          this.value = this.midpoint;
        }
      }
    }
  }

  /**
   *  Handle mouse moves during a thumb drag operation
   *  If the event handler is null it removes the events
   */
  public handleThumbMouseDown = (event: MouseEvent | null): void => {
    const windowFn = event !== null ? window.addEventListener : window.removeEventListener;
    windowFn('mouseup', this.handleWindowMouseUp);
    windowFn('mousemove', this.handleMouseMove, { passive: true });
    windowFn('touchmove', this.handleMouseMove, { passive: true });
    windowFn('touchend', this.handleWindowMouseUp);
    this.isDragging = event !== null;
  };

  /**
   *  Handle mouse moves during a thumb drag operation
   */
  private handleMouseMove = (e: MouseEvent | TouchEvent | Event): void => {
    if (this.readOnly || this.disabled || e.defaultPrevented) {
      return;
    }
    // update the value based on current position
    const sourceEvent = window.TouchEvent && e instanceof TouchEvent ? e.touches[0] : (e as MouseEvent);
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
    const newValue: number = (this.max - this.min) * newPosition + this.min;
    return this.convertToConstrainedValue(newValue);
  }

  /**
   * Handle a window mouse up during a drag operation
   */
  private handleWindowMouseUp = (event: Event): void => {
    this.stopDragging();
  };

  private stopDragging = (): void => {
    this.isDragging = false;
    this.handleMouseDown(null);
    this.handleThumbMouseDown(null);
  };

  /**
   *
   * @param e - MouseEvent or null. If there is no event handler it will remove the events
   */
  public handleMouseDown = (e: MouseEvent | null) => {
    if (e === null || (!this.disabled && !this.readOnly)) {
      const windowFn = e !== null ? window.addEventListener : window.removeEventListener;
      const documentFn = e !== null ? document.addEventListener : document.removeEventListener;
      windowFn('mouseup', this.handleWindowMouseUp);
      documentFn('mouseleave', this.handleWindowMouseUp);
      windowFn('mousemove', this.handleMouseMove);

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
      value = this.min;
    }

    /**
     * The following logic intends to overcome the issue with math in JavaScript with regards to floating point numbers.
     * This is needed as the `step` may be an integer but could also be a float. To accomplish this the step  is assumed to be a float
     * and is converted to an integer by determining the number of decimal places it represent, multiplying it until it is an
     * integer and then dividing it to get back to the correct number.
     */
    let constrainedValue: number = value - this.min;
    const roundedConstrainedValue: number = Math.round(constrainedValue / this.stepValue);
    const remainderValue: number =
      constrainedValue - (roundedConstrainedValue * (this.stepMultiplier * this.stepValue)) / this.stepMultiplier;

    constrainedValue =
      remainderValue >= Number(this.stepValue) / 2
        ? constrainedValue - remainderValue + Number(this.stepValue)
        : constrainedValue - remainderValue;
    return constrainedValue + this.min;
  }
}
