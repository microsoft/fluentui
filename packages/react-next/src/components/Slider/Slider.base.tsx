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
import { useId, useControllableValue, useMergedRefs } from '@uifabric/react-hooks';

export interface ISliderState {
  value?: number;
  renderedValue?: number;
}

const getClassNames = classNamesFunction<ISliderStyleProps, ISliderStyles>();
const COMPONENT_NAME = 'SliderBase';
export const ONKEYDOWN_TIMEOUT_DURATION = 1000;

const useComponentRef = (props: ISliderProps, thumb: React.RefObject<HTMLSpanElement>, value: number | undefined) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      get value() {
        return !!value;
      },
      focus() {
        if (thumb.current) {
          thumb.current.focus();
        }
      },
    }),
    [value],
  );
};

export const SliderBase = (props: ISliderProps) => {
  let disposables: (() => void)[] = [];
  const sliderLine = React.useRef<HTMLDivElement>(null);
  const thumb = React.createRef<HTMLSpanElement>();
  const onKeyDownTimer = -1;
  const id = useId('Slider');
  const {
    step = 1,
    ariaLabel,
    className,
    disabled = false,
    label,
    max = 10,
    min = 0,
    showValue = true,
    buttonProps = {},
    vertical = false,
    valueFormat,
    styles,
    theme,
    originFromZero = false,
  } = props;
  const [value, setValue] = React.useState(
    props.value !== undefined ? props.value : props.defaultValue !== undefined ? props.defaultValue : min,
  );
  const thumbOffsetPercent: number = min === max ? 0 : ((value! - min!) / (max! - min!)) * 100;
  const zeroOffsetPercent: number = min! >= 0 ? 0 : (-min! / (max! - min!)) * 100;
  const lengthString = vertical ? 'height' : 'width';
  const classNames = getClassNames(styles, {
    className,
    disabled,
    vertical,
    showTransitions: true,
    showValue,
    theme: theme!,
  });
  const inactiveSectionStyles = { [lengthString]: Math.min(thumbOffsetPercent, zeroOffsetPercent) + '%' };
  const activeSectionStyles = { [lengthString]: Math.abs(zeroOffsetPercent - thumbOffsetPercent) + '%' };
  const inactiveSectionFromZeroStyles = {
    [lengthString]: Math.min(100 - thumbOffsetPercent, 100 - zeroOffsetPercent) + '%',
  };
  const activeSectionOffsetStyles = { [lengthString]: thumbOffsetPercent + '%' };
  const inactiveSectionOffsetStyles = { [lengthString]: 100 - thumbOffsetPercent + '%' };

  const divButtonProps = buttonProps
    ? getNativeProps<React.HTMLAttributes<HTMLDivElement>>(buttonProps, divProperties)
    : undefined;

  warnMutuallyExclusive(COMPONENT_NAME, props, {
    value: 'defaultValue',
  });

  const getAriaValueText = (valueProps: number | undefined): string | undefined => {
    const { ariaValueText } = props;
    if (valueProps !== undefined) {
      return ariaValueText ? ariaValueText(valueProps) : valueProps.toString();
    }
    return undefined;
  };

  const getStyleUsingOffsetPercent = (verticalProp: boolean | undefined, thumbOffsetPercentProp: number): any => {
    const direction: string = verticalProp ? 'bottom' : getRTL(props.theme) ? 'right' : 'left';
    return {
      [direction]: thumbOffsetPercentProp + '%',
    };
  };

  const onMouseDownOrTouchStart = (event: MouseEvent | TouchEvent): void => {
    if (event.type === 'mousedown') {
      disposables.push(
        on(window, 'mousemove', onMouseMoveOrTouchMove, true),
        on(window, 'mouseup', onMouseUpOrTouchEnd, true),
      );
    } else if (event.type === 'touchstart') {
      disposables.push(
        on(window, 'touchmove', onMouseMoveOrTouchMove, true),
        on(window, 'touchend', onMouseUpOrTouchEnd, true),
      );
    }
    onMouseMoveOrTouchMove(event, true);
  };

  const onMouseUpOrTouchEnd = (event: MouseEvent | TouchEvent): void => {
    if (props.onChanged) {
      props.onChanged(event, value as number);
    }
    disposeListeners();
  };

  const disposeListeners = (): void => {
    disposables.forEach(dispose => dispose());
    disposables = [];
  };

  const onMouseMoveOrTouchMove = (event: MouseEvent | TouchEvent, suppressEventCancelation?: boolean): void => {
    if (!sliderLine.current) {
      return;
    }
    const steps: number = (max! - min!) / step!;
    const sliderPositionRect: ClientRect = sliderLine.current.getBoundingClientRect();
    const sliderLength: number = !props.vertical ? sliderPositionRect.width : sliderPositionRect.height;
    const stepLength: number = sliderLength / steps;
    let currentSteps: number | undefined;
    let distance: number | undefined;
    if (!props.vertical) {
      const left: number | undefined = getPosition(event, props.vertical);
      distance = getRTL(props.theme) ? sliderPositionRect.right - left! : left! - sliderPositionRect.left;
      currentSteps = distance / stepLength;
    } else {
      const bottom: number | undefined = getPosition(event, props.vertical);
      distance = sliderPositionRect.bottom - bottom!;
      currentSteps = distance / stepLength;
    }
    let newCurrentValue: number | undefined;
    let newRenderedValue: number | undefined;
    // The value shouldn't be bigger than max or be smaller than min.
    if (currentSteps! > Math.floor(steps)) {
      newRenderedValue = newCurrentValue = max as number;
    } else if (currentSteps! < 0) {
      newRenderedValue = newCurrentValue = min as number;
    } else {
      newRenderedValue = min! + step! * currentSteps!;
      newCurrentValue = min! + step! * Math.round(currentSteps!);
    }
    updateValue(newCurrentValue, newRenderedValue);
    if (!suppressEventCancelation) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const getPosition = (event: MouseEvent | TouchEvent, verticalProp: boolean | undefined): number | undefined => {
    let currentPosition: number | undefined;
    switch (event.type) {
      case 'mousedown':
      case 'mousemove':
        currentPosition = !verticalProp ? (event as MouseEvent).clientX : (event as MouseEvent).clientY;
        break;
      case 'touchstart':
      case 'touchmove':
        currentPosition = !verticalProp
          ? (event as TouchEvent).touches[0].clientX
          : (event as TouchEvent).touches[0].clientY;
        break;
    }
    return currentPosition;
  };

  const updateValue = (valueProp: number, renderedValueProp: number): void => {
    const { snapToStep } = props;
    let numDec = 0;
    if (isFinite(step!)) {
      while (Math.round(step! * Math.pow(10, numDec)) / Math.pow(10, numDec) !== step!) {
        numDec++;
      }
    }
    // Make sure value has correct number of decimal places based on number of decimals in step
    const roundedValue = parseFloat(valueProp.toFixed(numDec));
    const valueChanged = roundedValue !== value;
    if (snapToStep) {
      renderedValueProp = roundedValue;
    }
    setValue(roundedValue);
    if (valueChanged && props.onChange) {
      props.onChange(value as number);
    }
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    let newCurrentValue: number | undefined = value;
    let diff: number | undefined = 0;
    // tslint:disable-next-line:deprecation
    switch (event.which) {
      case getRTLSafeKeyCode(KeyCodes.left, props.theme):
      case KeyCodes.down:
        diff = -(step as number);
        clearOnKeyDownTimer();
        setOnKeyDownTimer(event);
        break;
      case getRTLSafeKeyCode(KeyCodes.right, props.theme):
      case KeyCodes.up:
        diff = step;
        clearOnKeyDownTimer();
        setOnKeyDownTimer(event);
        break;
      case KeyCodes.home:
        newCurrentValue = min;
        break;

      case KeyCodes.end:
        newCurrentValue = max;
        break;

      default:
        return;
    }
    const newValue: number = Math.min(max as number, Math.max(min as number, newCurrentValue! + diff!));
    updateValue(newValue, newValue);
    event.preventDefault();
    event.stopPropagation();
  };

  const clearOnKeyDownTimer = (): void => {
    // this._async.clearTimeout(this._onKeyDownTimer);
  };

  const setOnKeyDownTimer = (event: KeyboardEvent): void => {
    //   this._onKeyDownTimer = this._async.setTimeout(() => {
    //     if (this.props.onChanged) {
    //       this.props.onChanged(event, this.state.value as number);
    //     }
    //   }, ONKEYDOWN_TIMEOUT_DURATION);
    // };
  };

  const onMouseDownProp: {} = disabled ? {} : { onMouseDown: onMouseDownOrTouchStart };
  const onTouchStartProp: {} = disabled ? {} : { onTouchStart: onMouseDownOrTouchStart };
  const onKeyDownProp: {} = disabled ? {} : { onKeyDown: onKeyDown };
  useComponentRef(props, thumb, value);

  return (
    <div className={classNames.root}>
      {label && (
        <Label className={classNames.titleLabel} {...(ariaLabel ? {} : { htmlFor: id })} disabled={disabled}>
          {label}
        </Label>
      )}
      <div className={classNames.container}>
        <div
          id={id}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={getAriaValueText(value)}
          aria-label={ariaLabel || label}
          aria-disabled={disabled}
          {...onMouseDownProp}
          {...onTouchStartProp}
          {...onKeyDownProp}
          {...divButtonProps}
          className={css(classNames.slideBox, buttonProps!.className)}
          role="slider"
          tabIndex={disabled ? undefined : 0}
          data-is-focusable={!disabled}
        >
          <div ref={sliderLine} className={classNames.line}>
            {originFromZero && (
              <span
                className={css(classNames.zeroTick)}
                style={getStyleUsingOffsetPercent(vertical, zeroOffsetPercent)}
              />
            )}
            <span
              ref={thumb}
              className={classNames.thumb}
              style={getStyleUsingOffsetPercent(vertical, thumbOffsetPercent)}
            />
            {originFromZero ? (
              <>
                <span
                  className={css(classNames.lineContainer, classNames.inactiveSection)}
                  style={inactiveSectionStyles}
                />
                <span className={css(classNames.lineContainer, classNames.activeSection)} style={activeSectionStyles} />
                <span
                  className={css(classNames.lineContainer, classNames.inactiveSection)}
                  style={inactiveSectionFromZeroStyles}
                />
              </>
            ) : (
              <>
                <span
                  className={css(classNames.lineContainer, classNames.activeSection)}
                  style={activeSectionOffsetStyles}
                />
                <span
                  className={css(classNames.lineContainer, classNames.inactiveSection)}
                  style={inactiveSectionOffsetStyles}
                />
              </>
            )}
          </div>
        </div>
        {showValue && (
          <Label className={classNames.valueLabel} disabled={disabled}>
            {valueFormat ? valueFormat(value!) : value}
          </Label>
        )}
      </div>
      <FocusRects />
    </div>
  ) as React.ReactElement<{}>;
};
