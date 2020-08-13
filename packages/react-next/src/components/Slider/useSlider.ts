import * as React from 'react';
import { ISliderProps, ISliderStyleProps, ISliderStyles, ISliderState } from './Slider.types';
import { useId, useBoolean, useControllableValue } from '@uifabric/react-hooks';
import { KeyCodes, css, getRTL, getRTLSafeKeyCode, on } from '../../Utilities';
import { classNamesFunction, getNativeProps, divProperties } from '../../Utilities';

export const ONKEYDOWN_TIMEOUT_DURATION = 1000;

const getClassNames = classNamesFunction<ISliderStyleProps, ISliderStyles>({
  useStaticStyles: true,
});

type Dimension = 'height' | 'width';
type Position = 'bottom' | 'left' | 'right';
type PositionOrDimension = Dimension | Position;

const getSlotStyleFn = (sty: PositionOrDimension) => {
  return (value: number) => {
    return {
      [sty]: `${value}%`,
    };
  };
};
const getPositionStyleFn = (vertical: boolean = false, rtl: boolean = false) => {
  if (vertical) {
    return getSlotStyleFn('bottom');
  }
  return getSlotStyleFn(rtl ? 'right' : 'left');
};

const getPercent = (value: number, sliderMin: number, sliderMax: number) => {
  return sliderMax === sliderMin ? 0 : ((value! - sliderMin!) / (sliderMax! - sliderMin!)) * 100;
};

const getLineSectionStylesFn = (vertical: boolean = false) => {
  const lengthString = vertical ? 'height' : 'width';
  return getSlotStyleFn(lengthString);
};

const useComponentRef = (props: ISliderProps, thumb: React.RefObject<HTMLSpanElement>, value: number | undefined) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      get value() {
        return value;
      },
      focus() {
        if (thumb.current) {
          thumb.current.focus();
        }
      },
    }),
    [thumb, value],
  );
};

export const useSlider: (props: ISliderProps, ref: React.Ref<HTMLDivElement>) => ISliderState = (props, ref) => {
  const {
    step = 1,
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
    originFromZero,
    'aria-label': ariaLabel,
  } = props;

  const disposables = React.useRef<(() => void)[]>([]);
  const sliderLine = React.useRef<HTMLDivElement>(null);

  const [unclampedValue, setValue] = useControllableValue(
    props.value,
    props.defaultValue,
    (ev: React.FormEvent<HTMLElement>, v: ISliderProps['value']) => props.onChange && props.onChange(v!),
  );

  // Ensure that value is always a number and is clamped by min/max.
  const value = Math.max(min, Math.min(max, unclampedValue || 0));
  const id = useId('Slider');
  const [useShowTransitions, { toggle: toggleUseShowTransitions }] = useBoolean(true);
  const classNames = getClassNames(styles, {
    className,
    disabled,
    vertical,
    showTransitions: useShowTransitions,
    showValue,
    theme: theme!,
  });

  const [timerId, setTimerId] = React.useState(0);

  const clearOnKeyDownTimer = (): void => {
    clearTimeout(timerId);
  };

  const setOnKeyDownTimer = (event: KeyboardEvent) => {
    clearOnKeyDownTimer();
    setTimerId(
      setTimeout(() => {
        if (props.onChanged) {
          props.onChanged(event, value as number);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, ONKEYDOWN_TIMEOUT_DURATION) as any,
    );
  };

  const getAriaValueText = (valueProps: number | undefined): string | undefined => {
    const { ariaValueText } = props;
    if (valueProps !== undefined) {
      return ariaValueText ? ariaValueText(valueProps) : valueProps.toString();
    }
    return undefined;
  };

  const updateValue = (valueProp: number, renderedValueProp: number): void => {
    const snapToStep = props;
    let numDec = 0;
    if (isFinite(step!)) {
      while (Math.round(step! * Math.pow(10, numDec)) / Math.pow(10, numDec) !== step!) {
        numDec++;
      }
    }
    // Make sure value has correct number of decimal places based on number of decimals in step
    const roundedValue = parseFloat(valueProp.toFixed(numDec));

    if (snapToStep) {
      renderedValueProp = roundedValue;
    }
    setValue(roundedValue);
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    let newCurrentValue: number | undefined = value;
    let diff: number | undefined = 0;
    // eslint-disable-next-line deprecation/deprecation
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

  const onMouseDownOrTouchStart = (event: MouseEvent | TouchEvent): void => {
    if (event.type === 'mousedown') {
      disposables.current.push(
        on(window, 'mousemove', onMouseMoveOrTouchMove, true),
        on(window, 'mouseup', onMouseUpOrTouchEnd, true),
      );
    } else if (event.type === 'touchstart') {
      disposables.current.push(
        on(window, 'touchmove', onMouseMoveOrTouchMove, true),
        on(window, 'touchend', onMouseUpOrTouchEnd, true),
      );
    }
    toggleUseShowTransitions();
    onMouseMoveOrTouchMove(event, true);
  };

  const onMouseUpOrTouchEnd = (event: MouseEvent | TouchEvent): void => {
    if (props.onChanged) {
      props.onChanged(event, value as number);
    }
    toggleUseShowTransitions();
    disposeListeners();
  };

  const disposeListeners = (): void => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  };

  const onMouseDownProp: {} = disabled ? {} : { onMouseDown: onMouseDownOrTouchStart };
  const onTouchStartProp: {} = disabled ? {} : { onTouchStart: onMouseDownOrTouchStart };
  const onKeyDownProp: {} = disabled ? {} : { onKeyDown: onKeyDown };

  const thumbRef = React.useRef<HTMLSpanElement>(null);
  useComponentRef(props, thumbRef, value);
  const getPositionStyles = getPositionStyleFn(vertical, getRTL(props.theme));
  const getTrackStyles = getLineSectionStylesFn(vertical);
  const originValue = originFromZero ? 0 : min;
  const valuePercent = getPercent(value, min, max);
  const originPercentOfLine = getPercent(originValue, min, max);
  const activeSectionWidth = Math.abs(originPercentOfLine - valuePercent);
  const topSectionWidth = Math.min(100 - valuePercent, 100 - originPercentOfLine);
  const bottomSectionWidth = Math.min(valuePercent, originPercentOfLine);

  const rootProps = {
    className: classNames.root,
    ref: ref,
  };

  const divButtonProps = buttonProps
    ? getNativeProps<React.HTMLAttributes<HTMLDivElement>>(buttonProps, divProperties)
    : undefined;

  const labelProps = {
    className: classNames.titleLabel,
    children: label,
    disabled,
    htmlFor: ariaLabel ? undefined : id,
  };

  const valueLabelProps = showValue && {
    className: classNames.valueLabel,
    children: valueFormat ? valueFormat(value!) : value,
    disabled,
  };

  const thumbProps = {
    ref: thumbRef,
    className: classNames.thumb,
    style: getPositionStyles(valuePercent),
  };

  const zeroTickProps = originFromZero && {
    className: classNames.zeroTick,
    style: getPositionStyles(originPercentOfLine),
  };

  const trackActiveProps = {
    className: css(classNames.lineContainer, classNames.activeSection),
    style: getTrackStyles(activeSectionWidth),
  };

  const trackTopInactiveProps = {
    className: css(classNames.lineContainer, classNames.inactiveSection),
    style: getTrackStyles(topSectionWidth),
  };

  const trackBottomInactiveProps = {
    className: css(classNames.lineContainer, classNames.inactiveSection),
    style: getTrackStyles(bottomSectionWidth),
  };

  const sliderBoxProps = {
    id,
    'aria-valuenow': value,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuetext': getAriaValueText(value),
    'aria-label': ariaLabel || label,
    'aria-disabled': disabled,
    ...onMouseDownProp,
    ...onTouchStartProp,
    ...onKeyDownProp,
    ...divButtonProps,
    className: css(classNames.slideBox, buttonProps!.className),
    role: 'slider',
    tabIndex: disabled ? undefined : 0,
    'data-is-focusable': !disabled,
  };

  const containerProps = {
    className: classNames.container,
  };
  const sliderLineProps = {
    ref: sliderLine,
    className: classNames.line,
  };

  return {
    root: rootProps,
    label: labelProps,
    sliderBox: sliderBoxProps,
    container: containerProps,
    valueLabel: valueLabelProps,
    thumb: thumbProps,
    zeroTick: zeroTickProps,
    activeTrack: trackActiveProps,
    topInactiveTrack: trackTopInactiveProps,
    bottomInactiveTrack: trackBottomInactiveProps,
    sliderLine: sliderLineProps,
  };
};
