import * as React from 'react';
import { BaseComponent, KeyCodes, css, getId, getRTL, getRTLSafeKeyCode } from '../../Utilities';
import { ISliderProps, ISlider, ISliderStyleProps, ISliderStyles } from './Slider.types';
import { classNamesFunction, getNativeProps, divProperties } from '../../Utilities';
import { Label } from '../../Label';

export interface ISliderState {
  valueLeft?: number;
  renderedValueLeft?: number;
  valueRight?: number;
  renderedValueRight?: number;
}

const getClassNames = classNamesFunction<ISliderStyleProps, ISliderStyles>();
export const ONKEYDOWN_TIMEOUT_DURATION = 1000;

export class RangeSlider2 extends BaseComponent<ISliderProps, ISliderState> implements ISlider {
  public static defaultProps: ISliderProps = {
    step: 1,
    min: 0,
    max: 10,
    showValue: true,
    disabled: false,
    vertical: false,
    buttonProps: {},
    originFromZero: false
  };

  private _sliderLine = React.createRef<HTMLDivElement>();
  private _thumb = React.createRef<HTMLSpanElement>();
  private _id: string;
  private _onKeyDownTimer = -1;

  constructor(props: ISliderProps) {
    super(props);

    this._warnMutuallyExclusive({
      valueLeft: 'defaultValueLeft',
      valueRight: 'defaultValueRight'
    });

    this._id = getId('Slider');

    const valueLeft =
      props.valueLeft !== undefined ? props.valueLeft : props.defaultValueLeft !== undefined ? props.defaultValueLeft : props.min;
    const valueRight =
      props.valueLeft !== undefined ? props.valueRight : props.defaultValueRight !== undefined ? props.defaultValueRight : props.min;

    this.state = {
      valueLeft: valueLeft,
      valueRight: valueRight,
      renderedValueLeft: undefined,
      renderedValueRight: undefined
    };
  }

  public render(): React.ReactElement<{}> {
    const {
      ariaLabel,
      className,
      disabled,
      label,
      max,
      min,
      showValue,
      buttonProps,
      vertical,
      valueFormat,
      styles,
      theme,
      originFromZero
    } = this.props;
    const valueLeft = this.valueLeft;
    const valueRight = this.valueRight;
    const renderedValueLeft = this.renderedValueLeft;
    const renderedValueRight = this.renderedValueRight;
    const leftThumbOffsetPercent: number = min === max ? 0 : ((renderedValueLeft! - min!) / (max! - min!)) * 100;
    const rightThumbOffsetPercent: number = min === max ? 0 : ((renderedValueRight! - min!) / (max! - min!)) * 100;
    const zeroOffsetPercent: number = min! >= 0 ? 0 : (-min! / (max! - min!)) * 100;
    const lengthString = vertical ? 'height' : 'width';
    const onMouseDownProp: {} = disabled ? {} : { onMouseDown: this._onMouseDownOrTouchStart };
    const onTouchStartProp: {} = disabled ? {} : { onTouchStart: this._onMouseDownOrTouchStart };
    const onKeyDownProp: {} = disabled ? {} : { onKeyDown: this._onKeyDown };
    const classNames = getClassNames(styles, {
      className,
      disabled,
      vertical,
      showTransitions: renderedValueLeft === valueLeft && renderedValueRight === valueRight,
      showValue,
      theme: theme!
    });
    const divButtonProps = buttonProps ? getNativeProps<React.HTMLAttributes<HTMLDivElement>>(buttonProps, divProperties) : undefined;

    return (
      <div className={classNames.root}>
        {label && (
          <Label className={classNames.titleLabel} {...(ariaLabel ? {} : { htmlFor: this._id })} disabled={disabled}>
            {label}
          </Label>
        )}
        <div className={classNames.container}>
          <div
            aria-valuenow={valueLeft} // FIX ThiS FOR RIGHT SIDE TOO BUT LATER...
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuetext={this._getAriaValueText(valueLeft)} // ALSO FIX LATER
            aria-label={ariaLabel || label}
            aria-disabled={disabled}
            {...onMouseDownProp}
            {...onTouchStartProp}
            {...onKeyDownProp}
            {...divButtonProps}
            className={css(classNames.slideBox, buttonProps!.className)}
            id={this._id}
            role="slider"
            tabIndex={disabled ? undefined : 0}
            data-is-focusable={!disabled}
          >
            <div ref={this._sliderLine} className={classNames.line}>
              {originFromZero && (
                <span className={css(classNames.zeroTick)} style={this._getStyleUsingOffsetPercent(vertical, zeroOffsetPercent)} />
              )}
              <span
                ref={this._thumb}
                className={classNames.thumb}
                style={this._getStyleUsingOffsetPercent(vertical, leftThumbOffsetPercent)}
              />
              <span
                ref={this._thumb}
                className={classNames.thumb}
                style={this._getStyleUsingOffsetPercent(vertical, rightThumbOffsetPercent)}
              />
              {originFromZero ? (
                <>
                  <span
                    className={css(classNames.lineContainer, classNames.inactiveSection)}
                    style={{ [lengthString]: Math.min(leftThumbOffsetPercent, rightThumbOffsetPercent, zeroOffsetPercent) + '%' }}
                  />
                  <span
                    className={css(classNames.lineContainer, classNames.activeSection)}
                    style={{ [lengthString]: Math.abs(zeroOffsetPercent - leftThumbOffsetPercent) + '%' }}
                  />
                  <span
                    className={css(classNames.lineContainer, classNames.inactiveSection)}
                    style={{ [lengthString]: Math.min(100 - leftThumbOffsetPercent, 100 - zeroOffsetPercent) + '%' }}
                  />
                </>
              ) : (
                <>
                  <span
                    className={css(classNames.lineContainer, classNames.inactiveSection)}
                    style={{ [lengthString]: Math.min(leftThumbOffsetPercent, rightThumbOffsetPercent) + '%' }}
                  />
                  <span
                    className={css(classNames.lineContainer, classNames.activeSection)}
                    style={{ [lengthString]: Math.abs(leftThumbOffsetPercent - rightThumbOffsetPercent) + '%' }}
                  />
                  <span
                    className={css(classNames.lineContainer, classNames.inactiveSection)}
                    style={{ [lengthString]: 100 - rightThumbOffsetPercent + '%' }}
                  />
                </>
              )}
            </div>
          </div>
          {showValue && (
            <Label className={classNames.valueLabel} disabled={disabled}>
              {valueFormat ? valueFormat(valueLeft!) : valueLeft}
              {valueFormat ? valueFormat(valueRight!) : valueRight}
            </Label>
          )}
        </div>
      </div>
    ) as React.ReactElement<{}>;
  }

  public focus(): void {
    if (this._thumb.current) {
      this._thumb.current.focus();
    }
  }

  public get valueLeft(): number | undefined {
    const { valueLeft = this.state.valueLeft } = this.props;
    if (this.props.min === undefined || this.props.max === undefined || valueLeft === undefined) {
      return undefined;
    } else {
      return Math.max(this.props.min, Math.min(this.props.max, valueLeft));
    }
  }
  public get valueRight(): number | undefined {
    const { valueRight = this.state.valueRight } = this.props;
    if (this.props.min === undefined || this.props.max === undefined || valueRight === undefined) {
      return undefined;
    } else {
      return Math.max(this.props.min, Math.min(this.props.max, valueRight));
    }
  }

  private get renderedValueLeft(): number | undefined {
    // renderedValue is expected to be defined while user is interacting with control, otherwise `undefined`. Fall back to `value`.
    const { renderedValueLeft = this.valueLeft } = this.state;
    return renderedValueLeft;
  }

  private get renderedValueRight(): number | undefined {
    // renderedValue is expected to be defined while user is interacting with control, otherwise `undefined`. Fall back to `value`.
    const { renderedValueRight = this.valueRight } = this.state;
    return renderedValueRight;
  }

  private _getAriaValueText = (value: number | undefined): string | undefined => {
    if (this.props.ariaValueText && value !== undefined) {
      return this.props.ariaValueText(value);
    }
  };

  private _getStyleUsingOffsetPercent(vertical: boolean | undefined, thumbOffsetPercent: number): any {
    const direction: string = vertical ? 'bottom' : getRTL() ? 'right' : 'left';
    return {
      [direction]: thumbOffsetPercent + '%'
    };
  }

  private _onMouseDownOrTouchStart = (event: MouseEvent | TouchEvent): void => {
    if (event.type === 'mousedown') {
      this._events.on(window, 'mousemove', this._onMouseMoveOrTouchMove, true);
      this._events.on(window, 'mouseup', this._onMouseUpOrTouchEnd, true);
    } else if (event.type === 'touchstart') {
      this._events.on(window, 'touchmove', this._onMouseMoveOrTouchMove, true);
      this._events.on(window, 'touchend', this._onMouseUpOrTouchEnd, true);
    }
    this._onMouseMoveOrTouchMove(event, true);
  };

  private _onMouseMoveOrTouchMove = (event: MouseEvent | TouchEvent, suppressEventCancelation?: boolean): void => {
    if (!this._sliderLine.current) {
      return;
    }

    const { max, min, step } = this.props;
    const steps: number = (max! - min!) / step!;
    const sliderPositionRect: ClientRect = this._sliderLine.current.getBoundingClientRect();
    const sliderLength: number = !this.props.vertical ? sliderPositionRect.width : sliderPositionRect.height;
    const stepLength: number = sliderLength / steps;
    let currentSteps: number | undefined;
    let distance: number | undefined;

    if (!this.props.vertical) {
      const left: number | undefined = this._getPosition(event, this.props.vertical);
      distance = getRTL() ? sliderPositionRect.right - left! : left! - sliderPositionRect.left;
      currentSteps = distance / stepLength;
    } else {
      const bottom: number | undefined = this._getPosition(event, this.props.vertical);
      distance = sliderPositionRect.bottom - bottom!;
      currentSteps = distance / stepLength;
    }

    let currentValueLeft: number | undefined;
    let renderedValueLeft: number | undefined;
    let currentValueRight: number | undefined;
    let renderedValueRight: number | undefined;

    // The value shouldn't be bigger than max or be smaller than min.
    if (currentSteps! > Math.floor(steps)) {
      renderedValueLeft = currentValueLeft = max as number;
      renderedValueRight = currentValueRight = max as number;
    } else if (currentSteps! < 0) {
      renderedValueRight = currentValueRight = min as number;
      renderedValueLeft = currentValueLeft = min as number;
    } else {
      renderedValueLeft = min! + step! * currentSteps!;
      renderedValueRight = min! + step! * currentSteps!;
      currentValueLeft = min! + step! * Math.round(currentSteps!);
      currentValueRight = currentValueLeft;
    }

    this._updateValue(currentValueLeft, renderedValueLeft);
    this._updateValue(currentValueRight, renderedValueRight);

    if (!suppressEventCancelation) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  private _getPosition(event: MouseEvent | TouchEvent, vertical: boolean | undefined): number | undefined {
    let currentPosition: number | undefined;
    switch (event.type) {
      case 'mousedown':
      case 'mousemove':
        currentPosition = !vertical ? (event as MouseEvent).clientX : (event as MouseEvent).clientY;
        break;
      case 'touchstart':
      case 'touchmove':
        currentPosition = !vertical ? (event as TouchEvent).touches[0].clientX : (event as TouchEvent).touches[0].clientY;
        break;
    }
    return currentPosition;
  }
  private _updateValue(value: number, renderedValue: number): void {
    const { step } = this.props;

    let numDec = 0;
    if (isFinite(step!)) {
      while (Math.round(step! * Math.pow(10, numDec)) / Math.pow(10, numDec) !== step!) {
        numDec++;
      }
    }

    // Make sure value has correct number of decimal places based on number of decimals in step
    const roundedValue = parseFloat(value.toFixed(numDec));
    const valueChanged = roundedValue !== this.state.valueLeft;

    this.setState(
      {
        value: roundedValue,
        renderedValue
      },
      () => {
        if (valueChanged && this.props.onChange) {
          this.props.onChange(this.state.value as number);
        }
      }
    );
  }

  private _onMouseUpOrTouchEnd = (event: MouseEvent | TouchEvent): void => {
    // Disable renderedValue override.
    this.setState({
      renderedValue: undefined
    });

    if (this.props.onChanged) {
      this.props.onChanged(event, this.state.value as number);
    }

    this._events.off();
  };

  private _onKeyDown = (event: KeyboardEvent): void => {
    let value: number | undefined = this.state.value;
    const { max, min, step } = this.props;

    let diff: number | undefined = 0;

    switch (event.which) {
      case getRTLSafeKeyCode(KeyCodes.left):
      case KeyCodes.down:
        diff = -(step as number);

        this._clearOnKeyDownTimer();
        this._setOnKeyDownTimer(event);

        break;
      case getRTLSafeKeyCode(KeyCodes.right):
      case KeyCodes.up:
        diff = step;

        this._clearOnKeyDownTimer();
        this._setOnKeyDownTimer(event);

        break;

      case KeyCodes.home:
        value = min;
        break;

      case KeyCodes.end:
        value = max;
        break;

      default:
        return;
    }

    const newValue: number = Math.min(max as number, Math.max(min as number, value! + diff!));

    this._updateValue(newValue, newValue);

    event.preventDefault();
    event.stopPropagation();
  };

  private _clearOnKeyDownTimer = (): void => {
    this._async.clearTimeout(this._onKeyDownTimer);
  };

  private _setOnKeyDownTimer = (event: KeyboardEvent): void => {
    this._onKeyDownTimer = this._async.setTimeout(() => {
      if (this.props.onChanged) {
        this.props.onChanged(event, this.state.value as number);
      }
    }, ONKEYDOWN_TIMEOUT_DURATION);
  };
}
