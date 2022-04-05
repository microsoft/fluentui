import * as React from 'react';
import {
  initializeComponentRef,
  KeyCodes,
  css,
  getId,
  getRTL,
  getRTLSafeKeyCode,
  warnMutuallyExclusive,
} from '../../Utilities';
import { classNamesFunction, getNativeProps, divProperties } from '../../Utilities';
import { Label } from '@fluentui/react/lib/Label';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { Async, EventGroup, FocusRects } from '@fluentui/utilities';
import type { ISliderProps, ISlider, ISliderStyleProps, ISliderStyles, ISliderMarks } from './Slider.types';

/* eslint-disable deprecation/deprecation */

/** @deprecated */
export interface ISliderState {
  value?: number;
  renderedValue?: number;
}

const getClassNames = classNamesFunction<ISliderStyleProps, ISliderStyles>();
const COMPONENT_NAME = 'Slider';

/** @deprecated */
export const ONKEYDOWN_TIMEOUT_DURATION = 1000;

/**
 * @deprecated This component was experimental and is not longer being developed on, nor will it be supported in the
 * future.
 */
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

  private _sliderLine = React.createRef<HTMLDivElement>();
  private _thumb = React.createRef<HTMLSpanElement>();
  private _id: string;
  private _onKeyDownTimer = -1;
  private _hostId: string = getId('tooltipHost');
  private _buttonId: string = getId('targetButton');

  private _async: Async;
  private _events: EventGroup;

  constructor(props: ISliderProps) {
    super(props);

    this._async = new Async(this);
    this._events = new EventGroup(this);
    initializeComponentRef(this);
    warnMutuallyExclusive(COMPONENT_NAME, props, {
      value: 'defaultValue',
    });

    this._id = getId('Slider');

    const value =
      props.value !== undefined ? props.value : props.defaultValue !== undefined ? props.defaultValue : props.min;

    this.state = {
      value: value,
      renderedValue: undefined,
    };
  }

  public componentWillUnmount(): void {
    this._async.dispose();
    this._events.dispose();
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
      marks,
      showThumbTooltip,
    } = this.props;
    const value = this.value;
    const renderedValue = this.renderedValue;
    const thumbOffsetPercent: number = min === max ? 0 : ((renderedValue! - min!) / (max! - min!)) * 100;
    const zeroOffsetPercent: number = min! >= 0 ? 0 : (-min! / (max! - min!)) * 100;
    const lengthString = vertical ? 'height' : 'width';
    const onMouseDownProp: {} = disabled ? {} : { onMouseDown: this._onMouseDownOrTouchStart };
    const onTouchStartProp: {} = disabled ? {} : { onTouchStart: this._onMouseDownOrTouchStart };
    const onKeyDownProp: {} = disabled ? {} : { onKeyDown: this._onKeyDown };
    const classNames = getClassNames(styles, {
      className,
      disabled,
      vertical,
      showTransitions: renderedValue === value,
      showValue,
      theme: theme!,
    });
    const divButtonProps = buttonProps
      ? getNativeProps<React.HTMLAttributes<HTMLDivElement>>(buttonProps, divProperties)
      : undefined;
    const thumbButton = (
      <span
        ref={this._thumb}
        className={classNames.thumb}
        style={this._getStyleUsingOffsetPercent(vertical, thumbOffsetPercent)}
        id={this._buttonId}
      />
    );
    return (
      <div className={classNames.root}>
        {label && (
          <Label className={classNames.titleLabel} {...(ariaLabel ? {} : { htmlFor: this._id })} disabled={disabled}>
            {label}
          </Label>
        )}
        {this._getValueLabel(classNames.valueLabel)}
        <div className={classNames.container}>
          <div
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuetext={this._getAriaValueText(value)}
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
                <span
                  className={classNames.zeroTick}
                  style={this._getStyleUsingOffsetPercent(vertical, zeroOffsetPercent)}
                />
              )}
              {marks && this._addTickmarks(classNames.regularTick)}
              {Array.isArray(marks) ? (
                this._addLabels(classNames.regularLabel, marks)
              ) : (
                <>
                  <span className={classNames.regularLabel} style={this._getStyleUsingOffsetPercent(vertical, 0)}>
                    {min}
                  </span>
                  <span className={classNames.regularLabel} style={this._getStyleUsingOffsetPercent(vertical, 100)}>
                    {max}
                  </span>
                </>
              )}

              {showThumbTooltip ? (
                <TooltipHost
                  content={`${value}`}
                  id={this._hostId}
                  calloutProps={{
                    gapSpace: 5,
                    beakWidth: 8,
                    target: `#${this._buttonId}`,
                    directionalHint: vertical ? DirectionalHint.leftCenter : DirectionalHint.topCenter,
                  }}
                >
                  {thumbButton}
                </TooltipHost>
              ) : (
                thumbButton
              )}
              {originFromZero ? (
                <>
                  <span
                    className={css(classNames.lineContainer, classNames.inactiveSection)}
                    style={{ [lengthString]: Math.min(thumbOffsetPercent, zeroOffsetPercent) + '%' }}
                  />
                  <span
                    className={css(classNames.lineContainer, classNames.activeSection)}
                    style={{ [lengthString]: Math.abs(zeroOffsetPercent - thumbOffsetPercent) + '%' }}
                  />
                  <span
                    className={css(classNames.lineContainer, classNames.inactiveSection)}
                    style={{ [lengthString]: Math.min(100 - thumbOffsetPercent, 100 - zeroOffsetPercent) + '%' }}
                  />
                </>
              ) : (
                <>
                  <span
                    className={css(classNames.lineContainer, classNames.activeSection)}
                    style={{ [lengthString]: thumbOffsetPercent + '%' }}
                  />
                  <span
                    className={css(classNames.lineContainer, classNames.inactiveSection)}
                    style={{ [lengthString]: 100 - thumbOffsetPercent + '%' }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div />
        <FocusRects />
      </div>
    ) as React.ReactElement<{}>;
  }

  public focus(): void {
    if (this._thumb.current) {
      this._thumb.current.focus();
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
  private _getValueLabel(className: string): JSX.Element | null {
    const { showValue, disabled, valueFormat, label } = this.props;
    if (showValue) {
      const value = valueFormat ? valueFormat(this.value!) : this.value;
      return (
        <Label className={className} disabled={disabled}>
          {label ? `: ${value}` : value}
        </Label>
      );
    }
    return null;
  }
  private get renderedValue(): number | undefined {
    // renderedValue is expected to be defined while user is interacting with control, otherwise `undefined`.
    // Fall back to `value`.
    const { renderedValue = this.value } = this.state;
    return renderedValue;
  }

  private _getAriaValueText = (value: number | undefined): string | undefined => {
    if (this.props.ariaValueText && value !== undefined) {
      return this.props.ariaValueText(value);
    }
  };

  private _getStyleUsingOffsetPercent(vertical: boolean | undefined, thumbOffsetPercent: number): any {
    const direction: string = vertical ? 'bottom' : getRTL() ? 'right' : 'left';
    return {
      [direction]: thumbOffsetPercent + '%',
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

  // returns an array of spans each span pertains to a custom label the user passes in
  private _addLabels(cssRegularLabelClassNames: string | undefined, marks: ISliderMarks[]): JSX.Element[] {
    const { vertical, min, max } = this.props;
    const labels: JSX.Element[] = [];
    if (min === undefined || max === undefined || marks === undefined) {
      return labels;
    }

    for (let i = 0; i < marks.length; i++) {
      // this makes it so that if user passes in a value that is not in bounds it will just cap off the value
      if (marks[i].value > max) {
        marks[i].value = max;
      }
      if (marks[i].value < min) {
        marks[i].value = min;
      }
      const currentLabel = (
        <span
          className={cssRegularLabelClassNames}
          style={this._getStyleUsingOffsetPercent(vertical, ((marks[i].value - min) / (max - min)) * 100)}
          key={i}
        >
          {marks[i].label}
        </span>
      );
      labels.push(currentLabel);
    }
    return labels;
  }

  private _addTickmarks(cssRegularTickClassNames: string | undefined): JSX.Element[] {
    const { min, max, step, vertical } = this.props;
    // if any of the values is undefined then we dont not render ticks
    if (min === undefined || max === undefined || step === undefined) {
      return [];
    }
    const ticks = [];
    // += number is basically the distance between each tick
    for (let i = 0; i <= 100; i += (100 * step) / (max - min)) {
      ticks.push(
        <span
          className={cssRegularTickClassNames}
          style={
            // the zeroOffsetPercent denotes where the tick mark should go
            this._getStyleUsingOffsetPercent(vertical, i)
          }
          key={i}
        />,
      );
    }
    return ticks;
  }

  private _updateValue(value: number, renderedValue: number): void {
    const { step, snapToStep } = this.props;

    let numDec = 0;
    if (isFinite(step!)) {
      while (Math.round(step! * Math.pow(10, numDec)) / Math.pow(10, numDec) !== step!) {
        numDec++;
      }
    }

    // Make sure value has correct number of decimal places based on number of decimals in step
    const roundedValue = parseFloat(value.toFixed(numDec));
    const valueChanged = roundedValue !== this.state.value;

    if (snapToStep) {
      renderedValue = roundedValue;
    }

    this.setState(
      {
        value: roundedValue,
        renderedValue,
      },
      () => {
        if (valueChanged && this.props.onChange) {
          this.props.onChange(this.state.value as number);
        }
      },
    );
  }

  private _onMouseUpOrTouchEnd = (event: MouseEvent | TouchEvent): void => {
    // Disable renderedValue override.
    this.setState({
      renderedValue: undefined,
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
