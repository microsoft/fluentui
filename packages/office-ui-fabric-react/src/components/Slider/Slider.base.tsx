import * as React from 'react';
import {
  KeyCodes,
  css,
  getId,
  getRTL,
  getRTLSafeKeyCode,
  warnMutuallyExclusive,
  initializeComponentRef,
  Async,
  on,
  FocusRects,
} from '../../Utilities';
import { ISliderProps, ISlider, ISliderStyleProps, ISliderStyles } from './Slider.types';
import { classNamesFunction, getNativeProps, divProperties } from '../../Utilities';
import { Label } from '../../Label';

export interface ISliderState {
  value?: number;
  lowerValue?: number;
  renderedValue?: number;
  renderedLowerValue?: number;
}

const getClassNames = classNamesFunction<ISliderStyleProps, ISliderStyles>();
const COMPONENT_NAME = 'SliderBase';
export const ONKEYDOWN_TIMEOUT_DURATION = 1000;

export class SliderBase extends React.Component<ISliderProps, ISliderState> implements ISlider {
  public static defaultProps: ISliderProps = {
    step: 1,
    min: 0,
    max: 10,
    showValue: true,
    disabled: false,
    vertical: false,
    buttonProps: {},
    originFromZero: false,
  };

  private _async: Async;
  private _disposables: (() => void)[] = [];
  private _sliderLine = React.createRef<HTMLDivElement>();
  private _thumb = React.createRef<HTMLSpanElement>();
  private _lowerValueThumb = React.createRef<HTMLSpanElement>();
  private _id: string;
  private _onKeyDownTimer = -1;
  private _isAdjustingLowerValue = false;

  constructor(props: ISliderProps) {
    super(props);

    this._async = new Async(this);
    initializeComponentRef(this);

    warnMutuallyExclusive(COMPONENT_NAME, this.props, {
      value: 'defaultValue',
    });

    if (props.ranged) {
      warnMutuallyExclusive(COMPONENT_NAME, this.props, {
        lowerValue: 'defaultLowerValue',
      });
    }

    this._id = getId('Slider');

    const value =
      props.value !== undefined ? props.value : props.defaultValue !== undefined ? props.defaultValue : props.min;

    const lowerValue =
      props.lowerValue !== undefined
        ? props.lowerValue
        : props.defaultLowerValue !== undefined
        ? props.defaultLowerValue
        : props.min;

    this.state = {
      value: value,
      lowerValue: lowerValue,
      renderedValue: undefined,
      renderedLowerValue: undefined,
    };
  }

  public componentWillUnmount() {
    this._async.dispose();
    this._disposeListeners();
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
      styles,
      theme,
      originFromZero,
      ranged,
    } = this.props;
    const value = this.value;
    const renderedValue = this.renderedValue;
    const renderedLowerValue = this.renderedLowerValue;
    const thumbOffsetPercent: number = this._getPercent(renderedValue);
    const lowerThumbOffsetPercent: number = this._getPercent(renderedLowerValue);
    const originValue = originFromZero ? 0 : min;

    const originPercent = this._getPercent(originValue);
    const activeSectionWidth = ranged
      ? thumbOffsetPercent - lowerThumbOffsetPercent
      : Math.abs(originPercent - thumbOffsetPercent);
    const topSectionWidth = Math.min(100 - thumbOffsetPercent, 100 - originPercent);
    const bottomSectionWidth = ranged ? lowerThumbOffsetPercent : Math.min(thumbOffsetPercent, originPercent);

    const lengthString = vertical ? 'height' : 'width';
    const onMouseDownProp: {} = disabled ? {} : { onMouseDown: this._onMouseDownOrTouchStart };
    const onTouchStartProp: {} = disabled ? {} : { onTouchStart: this._onMouseDownOrTouchStart };
    const onKeyDownProp: {} = disabled ? {} : { onKeyDown: this._onKeyDown };
    const onFocusProp: {} = disabled ? {} : { onFocus: this._onThumbFocus };

    const classNames = getClassNames(styles, {
      className,
      ranged,
      disabled,
      vertical,
      showTransitions: renderedValue === value || (ranged && renderedLowerValue === this.lowerValue),
      showValue,
      theme: theme!,
    });
    const divButtonProps = buttonProps
      ? getNativeProps<React.HTMLAttributes<HTMLDivElement>>(buttonProps, divProperties)
      : undefined;

    const sliderProps = {
      'aria-disabled': disabled,
      role: 'slider',
      tabIndex: disabled ? undefined : 0,
      'data-is-focusable': !disabled,
    };

    const sliderBoxProps = {
      id: this._id,
      className: css(classNames.slideBox, buttonProps!.className),
      ...onMouseDownProp,
      ...onTouchStartProp,
      ...onKeyDownProp,
      ...divButtonProps,
      ...(!ranged && {
        ...sliderProps,
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': value,
        'aria-valuetext': this._getAriaValueText(value),
        'aria-label': ariaLabel || label,
      }),
    };

    const thumbProps = ranged
      ? {
          ...sliderProps,
          ...onFocusProp,
          id: `max-${this._id}`,
          'aria-valuemin': this.lowerValue,
          'aria-valuemax': max,
          'aria-valuenow': value,
          'aria-valuetext': this._getAriaValueText(value),
          'aria-label': `max ${ariaLabel || label}`,
        }
      : undefined;

    const lowerValueThumbProps = ranged
      ? {
          ...sliderProps,
          ...onFocusProp,
          id: `min-${this._id}`,
          'aria-valuemin': min,
          'aria-valuemax': value,
          'aria-valuenow': this.lowerValue,
          'aria-valuetext': this._getAriaValueText(this.lowerValue),
          'aria-label': `min ${ariaLabel || label}`,
        }
      : undefined;

    return (
      <div className={classNames.root}>
        {label && (
          <Label className={classNames.titleLabel} {...(ariaLabel ? {} : { htmlFor: this._id })} disabled={disabled}>
            {label}
          </Label>
        )}
        <div className={classNames.container}>
          {ranged && showValue && (
            <Label className={classNames.valueLabel} disabled={disabled}>
              {this._getValueLabel(vertical ? this.value! : this.lowerValue!)}
            </Label>
          )}
          <div {...sliderBoxProps}>
            <div ref={this._sliderLine} className={classNames.line}>
              {originFromZero && (
                <span
                  className={css(classNames.zeroTick)}
                  style={this._getStyleUsingOffsetPercent(vertical, originPercent)}
                />
              )}
              {ranged && (
                <span
                  ref={this._lowerValueThumb}
                  className={classNames.thumb}
                  style={this._getStyleUsingOffsetPercent(vertical, lowerThumbOffsetPercent)}
                  {...lowerValueThumbProps}
                />
              )}
              <span
                ref={this._thumb}
                className={classNames.thumb}
                style={this._getStyleUsingOffsetPercent(vertical, thumbOffsetPercent)}
                {...thumbProps}
              />
              {(ranged || originFromZero) && (
                <span
                  className={css(classNames.lineContainer, classNames.inactiveSection)}
                  style={{ [lengthString]: bottomSectionWidth + '%' }}
                />
              )}
              <span
                className={css(classNames.lineContainer, classNames.activeSection)}
                style={{ [lengthString]: activeSectionWidth + '%' }}
              />
              <span
                className={css(classNames.lineContainer, classNames.inactiveSection)}
                style={{ [lengthString]: topSectionWidth + '%' }}
              />
            </div>
          </div>
          {showValue && (
            <Label className={classNames.valueLabel} disabled={disabled}>
              {this._getValueLabel(ranged && vertical ? this.lowerValue! : this.value!)}
            </Label>
          )}
        </div>
        <FocusRects />
      </div>
    ) as React.ReactElement<{}>;
  }

  public focus(): void {
    if (this._thumb.current) {
      this._thumb.current.focus();
    }
  }

  public get range(): [number, number] | undefined {
    if (this.props.ranged) {
      return [this.lowerValue!, this.value!];
    }
  }

  public get value(): number | undefined {
    const { value = this.state.value } = this.props;
    if (this.props.min === undefined || this.props.max === undefined || value === undefined) {
      return undefined;
    } else {
      return Math.max(this.props.min, Math.min(this.props.max, value));
    }
  }

  private get renderedValue(): number | undefined {
    // renderedValue is expected to be defined while user is interacting with control, otherwise `undefined`.
    // Fall back to `value`.
    const { renderedValue = this.value } = this.state;
    return renderedValue;
  }

  public get lowerValue(): number | undefined {
    const { lowerValue = this.state.lowerValue, ranged } = this.props;
    if (!ranged || this.props.min === undefined || this.props.max === undefined || lowerValue === undefined) {
      return undefined;
    } else {
      return Math.max(this.props.min, Math.min(this.props.max, lowerValue));
    }
  }

  private get renderedLowerValue(): number | undefined {
    // renderedLowerValue is expected to be defined while user is interacting with control, otherwise `undefined`.
    // Fall back to `lowerValue`.
    const { renderedLowerValue = this.lowerValue } = this.state;
    return renderedLowerValue;
  }

  private _getPercent(value: number | undefined) {
    const { min, max } = this.props;
    return max === min ? 0 : ((value! - min!) / (max! - min!)) * 100;
  }

  private _getValueLabel(value: number) {
    const { valueFormat } = this.props;
    return valueFormat ? valueFormat(value) : value;
  }

  private _getAriaValueText = (value: number | undefined): string | undefined => {
    const { ariaValueText } = this.props;
    if (value !== undefined) {
      return ariaValueText ? ariaValueText(value) : value.toString();
    }
    return undefined;
  };

  private _getStyleUsingOffsetPercent(vertical: boolean | undefined, thumbOffsetPercent: number): any {
    const direction: string = vertical ? 'bottom' : getRTL(this.props.theme) ? 'right' : 'left';
    return {
      [direction]: thumbOffsetPercent + '%',
    };
  }

  private _calculateCurrentSteps = (event: MouseEvent | TouchEvent): number | undefined => {
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
      distance = getRTL(this.props.theme) ? sliderPositionRect.right - left! : left! - sliderPositionRect.left;
      currentSteps = distance / stepLength;
    } else {
      const bottom: number | undefined = this._getPosition(event, this.props.vertical);
      distance = sliderPositionRect.bottom - bottom!;
      currentSteps = distance / stepLength;
    }

    return currentSteps;
  };

  private _onMouseDownOrTouchStart = (event: MouseEvent | TouchEvent): void => {
    const { ranged, min, step } = this.props;
    if (ranged) {
      const currentSteps = this._calculateCurrentSteps(event);
      const newRenderedValue = min! + step! * currentSteps!;

      if (
        newRenderedValue <= (this.state.lowerValue as number) ||
        newRenderedValue - (this.state.lowerValue as number) <= (this.state.value as number) - newRenderedValue
      ) {
        this._isAdjustingLowerValue = true;
      } else {
        this._isAdjustingLowerValue = false;
      }
    }
    if (event.type === 'mousedown') {
      this._disposables.push(
        on(window, 'mousemove', this._onMouseMoveOrTouchMove, true),
        on(window, 'mouseup', this._onMouseUpOrTouchEnd, true),
      );
    } else if (event.type === 'touchstart') {
      this._disposables.push(
        on(window, 'touchmove', this._onMouseMoveOrTouchMove, true),
        on(window, 'touchend', this._onMouseUpOrTouchEnd, true),
      );
    }
    this._onMouseMoveOrTouchMove(event, true);
  };

  private _onMouseMoveOrTouchMove = (event: MouseEvent | TouchEvent, suppressEventCancelation?: boolean): void => {
    if (!this._sliderLine.current) {
      return;
    }

    const { max, min, step } = this.props;
    const steps: number = (max! - min!) / step!;
    const currentSteps = this._calculateCurrentSteps(event);

    let currentValue: number | undefined;
    let renderedValue: number | undefined;

    // The value shouldn't be bigger than max or be smaller than min.
    if (currentSteps! > Math.floor(steps)) {
      renderedValue = currentValue = max as number;
    } else if (currentSteps! < 0) {
      renderedValue = currentValue = min as number;
    } else {
      renderedValue = min! + step! * currentSteps!;
      currentValue = min! + step! * Math.round(currentSteps!);
    }

    this._updateValue(currentValue, renderedValue);

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
        currentPosition = !vertical
          ? (event as TouchEvent).touches[0].clientX
          : (event as TouchEvent).touches[0].clientY;
        break;
    }
    return currentPosition;
  }

  private _setValueState(roundedValue: number, renderedValue: number) {
    const isAdjustingLowerValue = this._isAdjustingLowerValue;
    const valueChanged = roundedValue !== (isAdjustingLowerValue ? this.state.lowerValue : this.state.value);
    this.setState(
      {
        [isAdjustingLowerValue ? 'lowerValue' : 'value']: roundedValue,
        [isAdjustingLowerValue ? 'renderedLowerValue' : 'renderedValue']: renderedValue,
      },
      () => {
        const { lowerValue, value } = this.state;
        if (valueChanged && this.props.onChange) {
          this.props.onChange(
            isAdjustingLowerValue ? lowerValue! : value!,
            this.props.ranged ? [lowerValue!, value!] : undefined,
          );
        }
      },
    );
  }

  private _updateValue(value: number, renderedValue: number): void {
    const { step, snapToStep, ranged, originFromZero } = this.props;
    let numDec = 0;
    if (isFinite(step!)) {
      while (Math.round(step! * Math.pow(10, numDec)) / Math.pow(10, numDec) !== step!) {
        numDec++;
      }
    }

    // Make sure value has correct number of decimal places based on number of decimals in step
    const roundedValue = parseFloat(value.toFixed(numDec));

    if (snapToStep) {
      renderedValue = roundedValue;
    }

    const shouldAdjustLowerThumb =
      this._isAdjustingLowerValue && (originFromZero ? roundedValue <= 0 : roundedValue <= this.renderedValue!);
    const shouldAdjustUpperThumb =
      !this._isAdjustingLowerValue && (originFromZero ? roundedValue >= 0 : roundedValue >= this.renderedLowerValue!);

    if (!ranged || shouldAdjustLowerThumb || shouldAdjustUpperThumb) {
      this._setValueState(roundedValue, renderedValue);
    }
  }

  private _onMouseUpOrTouchEnd = (event: MouseEvent | TouchEvent): void => {
    // Disable renderedValue override.
    this.setState({
      renderedValue: undefined,
      renderedLowerValue: undefined,
    });

    if (this.props.onChanged) {
      this.props.onChanged(event, this.state.value as number);
    }

    this._disposeListeners();
  };

  private _disposeListeners = (): void => {
    this._disposables.forEach(dispose => dispose());
    this._disposables = [];
  };

  private _onKeyDown = (event: KeyboardEvent): void => {
    let value: number | undefined;
    if (this._isAdjustingLowerValue) {
      value = this.props.lowerValue || this.state.lowerValue;
    } else {
      value = this.props.value || this.state.value;
    }
    const { max, min, step } = this.props;

    let diff: number | undefined = 0;

    // eslint-disable-next-line deprecation/deprecation
    switch (event.which) {
      case getRTLSafeKeyCode(KeyCodes.left, this.props.theme):
      case KeyCodes.down:
        diff = -(step as number);

        this._clearOnKeyDownTimer();
        this._setOnKeyDownTimer(event);

        break;
      case getRTLSafeKeyCode(KeyCodes.right, this.props.theme):
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

    // Disable renderedValue override.
    this.setState({
      renderedValue: undefined,
      renderedLowerValue: undefined,
    });
  };

  private _onThumbFocus = (event: MouseEvent | TouchEvent): void => {
    this._isAdjustingLowerValue = event.target === this._lowerValueThumb.current;
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
