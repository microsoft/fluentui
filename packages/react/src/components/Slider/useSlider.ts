import * as React from 'react';
import { useId, useControllableValue, useConst, useSetTimeout } from '@fluentui/react-hooks';
import {
  KeyCodes,
  css,
  getRTL,
  getRTLSafeKeyCode,
  on,
  classNamesFunction,
  getNativeProps,
  divProperties,
} from '@fluentui/utilities';
import type { ISliderProps, ISliderStyleProps, ISliderStyles } from './Slider.types';
import type { ILabelProps } from '../Label/index';
import { useWindowEx } from '../../utilities/dom';

export const ONKEYDOWN_TIMEOUT_DURATION = 1000;

interface ISliderInternalState {
  onKeyDownTimer: number;
  /** For a ranged slider, whether the thumb currently being dragged is the lower value one. */
  isAdjustingLowerValue: boolean;
  /** Allows access to the latest `value` inside reused callbacks (to avoid stale capture issues) */
  latestValue: number;
  /** Allows access to the latest `lowerValue` inside reused callbacks (to avoid stale capture issues) */
  latestLowerValue: number;
  /**
   * Whether the user is currently dragging the thumb and it's between step intervals.
   * (If true, and `props.snapToStep` is falsy, transition animations will be disabled.)
   */
  isBetweenSteps?: boolean;
}

const getClassNames = classNamesFunction<ISliderStyleProps, ISliderStyles>();

type Dimension = 'height' | 'width';
type Position = 'bottom' | 'left' | 'right';
type PositionOrDimension = Dimension | Position;
/** All the possible event types for a change event */
type ChangeEvent = Parameters<Required<ISliderProps>['onChange']>[2];
/** All the possible event types for a change event that's dragging the slider (mouse or touch) */
type DragChangeEvent = React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent;

const getSlotStyleFn = (sty: PositionOrDimension) => {
  return (value: number) => {
    return {
      [sty]: `${value}%`,
    };
  };
};

const getPercent = (value: number, sliderMin: number, sliderMax: number) => {
  return sliderMax === sliderMin ? 0 : ((value - sliderMin) / (sliderMax - sliderMin)) * 100;
};

const useComponentRef = (
  props: ISliderProps,
  sliderBoxRef: React.RefObject<HTMLDivElement>,
  value: number | undefined,
  range: [number, number] | undefined,
) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      get value() {
        return value;
      },
      get range() {
        return range;
      },
      focus() {
        sliderBoxRef.current?.focus();
      },
    }),
    [range, sliderBoxRef, value],
  );
};

export const useSlider = (props: ISliderProps, ref: React.ForwardedRef<HTMLDivElement>) => {
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
    snapToStep,
    valueFormat,
    styles,
    theme,
    originFromZero,
    'aria-labelledby': ariaLabelledBy,
    ariaLabel = props['aria-label'],
    ranged,
    onChange,
    onChanged,
  } = props;

  const disposables = React.useRef<(() => void)[]>([]);
  const { setTimeout, clearTimeout } = useSetTimeout();
  const sliderLine = React.useRef<HTMLDivElement>(null);
  const win = useWindowEx();

  // Casting here is necessary because useControllableValue expects the event for the change callback
  // to extend React.SyntheticEvent, when in fact for Slider, the event could be either a React event
  // or a native browser event depending on the context.
  const [unclampedValue, setValue] = useControllableValue(props.value, props.defaultValue, (ev: any, v) =>
    onChange?.(v!, ranged ? [internalState.latestLowerValue, v!] : undefined, ev),
  ) as [number | undefined, (v: number | undefined, ev: ChangeEvent) => void];
  const [unclampedLowerValue, setLowerValue] = useControllableValue(
    props.lowerValue,
    props.defaultLowerValue,
    (ev: any, lv) => onChange?.(internalState.latestValue, [lv!, internalState.latestValue], ev),
  ) as [number | undefined, (v: number | undefined, ev: ChangeEvent) => void];

  // Ensure that value is always a number and is clamped by min/max.
  const value = Math.max(min, Math.min(max, unclampedValue || 0));
  const lowerValue = Math.max(min, Math.min(value, unclampedLowerValue || 0));

  const internalState = useConst<ISliderInternalState>({
    onKeyDownTimer: -1,
    isAdjustingLowerValue: false,
    latestValue: value,
    latestLowerValue: lowerValue,
  });
  // On each render, update this saved value used by callbacks. (This should be safe even if render
  // is called multiple times, because an event handler or timeout callback will only run once.)
  internalState.latestValue = value;
  internalState.latestLowerValue = lowerValue;

  const id = useId('Slider', props.id || buttonProps?.id);
  const classNames = getClassNames(styles, {
    className,
    disabled,
    vertical,
    showTransitions: !snapToStep && !internalState.isBetweenSteps,
    showValue,
    ranged,
    theme: theme!,
  });

  const steps = (max - min) / step;

  const clearOnKeyDownTimer = (): void => {
    clearTimeout(internalState.onKeyDownTimer);
    internalState.onKeyDownTimer = -1;
  };

  const setOnKeyDownTimer = (event: React.KeyboardEvent) => {
    clearOnKeyDownTimer();
    if (onChanged) {
      internalState.onKeyDownTimer = setTimeout(() => {
        onChanged(
          event,
          internalState.latestValue,
          ranged ? [internalState.latestLowerValue, internalState.latestValue] : undefined,
        );
      }, ONKEYDOWN_TIMEOUT_DURATION);
    }
  };

  const getAriaValueText = (valueProps: number | undefined): string | undefined => {
    const { ariaValueText } = props;
    if (valueProps !== undefined) {
      return ariaValueText ? ariaValueText(valueProps) : valueProps.toString();
    }
    return undefined;
  };

  /**
   * Update `value` or `lowerValue`, including clamping between min/max and rounding to
   * appropriate precision.
   * @param newValue - New current value of the slider, possibly rounded to a whole step.
   * @param newUnroundedValue - Like `newValue` but without the rounding to a step. If this is
   * provided and not equal to `newValue`, `internalState.isBetweenSteps` will be set, which
   * may cause thumb movement animations to be disabled.
   */
  const updateValue = (ev: any, newValue: number, newUnroundedValue?: number): void => {
    newValue = Math.min(max, Math.max(min, newValue));
    newUnroundedValue = newUnroundedValue !== undefined ? Math.min(max, Math.max(min, newUnroundedValue)) : undefined;

    let numDec = 0;
    if (isFinite(step)) {
      while (Math.round(step * Math.pow(10, numDec)) / Math.pow(10, numDec) !== step) {
        numDec++;
      }
    }
    // Make sure value has correct number of decimal places based on number of decimals in step
    const roundedValue = parseFloat(newValue.toFixed(numDec));

    internalState.isBetweenSteps = newUnroundedValue !== undefined && newUnroundedValue !== roundedValue;

    if (ranged) {
      // decided which thumb value to change
      if (
        internalState.isAdjustingLowerValue &&
        (originFromZero ? roundedValue <= 0 : roundedValue <= internalState.latestValue)
      ) {
        setLowerValue(roundedValue, ev);
      } else if (
        !internalState.isAdjustingLowerValue &&
        (originFromZero ? roundedValue >= 0 : roundedValue >= internalState.latestLowerValue)
      ) {
        setValue(roundedValue, ev);
      }
    } else {
      setValue(roundedValue, ev);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent): void => {
    let newCurrentValue = internalState.isAdjustingLowerValue
      ? internalState.latestLowerValue
      : internalState.latestValue;
    let diff = 0;
    // eslint-disable-next-line deprecation/deprecation
    switch (event.which) {
      case getRTLSafeKeyCode(KeyCodes.left, props.theme):
      case KeyCodes.down:
        diff = -step;
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
        clearOnKeyDownTimer();
        setOnKeyDownTimer(event);
        break;
      case KeyCodes.end:
        newCurrentValue = max;
        clearOnKeyDownTimer();
        setOnKeyDownTimer(event);
        break;
      default:
        return;
    }
    updateValue(event, newCurrentValue + diff);
    event.preventDefault();
    event.stopPropagation();
  };

  const getPosition = (event: DragChangeEvent, verticalProp: boolean | undefined): number => {
    let currentPosition = 0;
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

  const calculateCurrentSteps = (event: DragChangeEvent) => {
    // eslint-disable-next-line deprecation/deprecation
    const sliderPositionRect: ClientRect = sliderLine.current!.getBoundingClientRect();
    const sliderLength: number = !props.vertical ? sliderPositionRect.width : sliderPositionRect.height;
    const stepLength: number = sliderLength / steps;
    let currentSteps: number;
    let distance: number;
    if (!props.vertical) {
      const left = getPosition(event, props.vertical);
      distance = getRTL(props.theme) ? sliderPositionRect.right - left : left - sliderPositionRect.left;
      currentSteps = distance / stepLength;
    } else {
      const bottom = getPosition(event, props.vertical);
      distance = sliderPositionRect.bottom - bottom;
      currentSteps = distance / stepLength;
    }
    return currentSteps;
  };

  const onMouseMoveOrTouchMove = (event: DragChangeEvent, suppressEventCancelation?: boolean): void => {
    const currentSteps = calculateCurrentSteps(event);
    const newUnroundedValue = min + step * currentSteps;
    const newCurrentValue = min + step * Math.round(currentSteps);
    updateValue(event, newCurrentValue, newUnroundedValue);
    if (!suppressEventCancelation) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onMouseDownOrTouchStart = (event: React.MouseEvent | React.TouchEvent): void => {
    if (ranged) {
      const currentSteps = calculateCurrentSteps(event);
      const newValue = min + step * currentSteps;

      internalState.isAdjustingLowerValue =
        newValue <= internalState.latestLowerValue ||
        newValue - internalState.latestLowerValue <= internalState.latestValue - newValue;
    }

    // safe to use `win!` since it can only be called on the client
    if (event.type === 'mousedown') {
      disposables.current.push(
        on(win!, 'mousemove', onMouseMoveOrTouchMove as (ev: Event) => void, true),
        on(win!, 'mouseup', onMouseUpOrTouchEnd, true),
      );
    } else if (event.type === 'touchstart') {
      disposables.current.push(
        on(win!, 'touchmove', onMouseMoveOrTouchMove as (ev: Event) => void, true),
        on(win!, 'touchend', onMouseUpOrTouchEnd, true),
      );
    }
    onMouseMoveOrTouchMove(event, true);
  };

  const onMouseUpOrTouchEnd = (event: MouseEvent | TouchEvent): void => {
    // Done adjusting, so clear this value
    internalState.isBetweenSteps = undefined;

    onChanged?.(
      event,
      internalState.latestValue,
      ranged ? [internalState.latestLowerValue, internalState.latestValue] : undefined,
    );
    disposeListeners();
  };

  const onThumbFocus = (event: React.FocusEvent): void => {
    internalState.isAdjustingLowerValue = event.target === lowerValueThumbRef.current;
  };

  const disposeListeners = React.useCallback((): void => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  }, []);

  React.useEffect(() => disposeListeners, [disposeListeners]);

  const lowerValueThumbRef = React.useRef<HTMLElement>(null);
  const thumbRef = React.useRef<HTMLElement>(null);
  const sliderBoxRef = React.useRef<HTMLDivElement>(null);
  useComponentRef(props, sliderBoxRef, value, ranged ? [lowerValue, value] : undefined);
  const getPositionStyles = getSlotStyleFn(vertical ? 'bottom' : getRTL(props.theme) ? 'right' : 'left');
  const getTrackStyles = getSlotStyleFn(vertical ? 'height' : 'width');
  const originValue = originFromZero ? 0 : min;
  const valuePercent = getPercent(value, min, max);
  const lowerValuePercent = getPercent(lowerValue, min, max);
  const originPercentOfLine = getPercent(originValue, min, max);
  const activeSectionWidth = ranged ? valuePercent - lowerValuePercent : Math.abs(originPercentOfLine - valuePercent);
  const topSectionWidth = Math.min(100 - valuePercent, 100 - originPercentOfLine);
  const bottomSectionWidth = ranged ? lowerValuePercent : Math.min(valuePercent, originPercentOfLine);

  const rootProps: React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement> = {
    className: classNames.root,
    ref,
  };

  const labelProps: ILabelProps = {
    className: classNames.titleLabel,
    children: label,
    disabled,
    htmlFor: ariaLabel ? undefined : id,
  };

  const valueLabelProps: ILabelProps | undefined = showValue
    ? {
        className: classNames.valueLabel,
        children: valueFormat ? valueFormat(value) : value,
        disabled,
        htmlFor: disabled ? id : undefined,
      }
    : undefined;

  const lowerValueLabelProps: ILabelProps | undefined =
    ranged && showValue
      ? {
          className: classNames.valueLabel,
          children: valueFormat ? valueFormat(lowerValue) : lowerValue,
          disabled,
        }
      : undefined;

  const zeroTickProps: React.HTMLAttributes<HTMLElement> | undefined = originFromZero
    ? {
        className: classNames.zeroTick,
        style: getPositionStyles(originPercentOfLine),
      }
    : undefined;

  const trackActiveProps: React.HTMLAttributes<HTMLElement> = {
    className: css(classNames.lineContainer, classNames.activeSection),
    style: getTrackStyles(activeSectionWidth),
  };

  const trackTopInactiveProps: React.HTMLAttributes<HTMLElement> = {
    className: css(classNames.lineContainer, classNames.inactiveSection),
    style: getTrackStyles(topSectionWidth),
  };

  const trackBottomInactiveProps: React.HTMLAttributes<HTMLElement> = {
    className: css(classNames.lineContainer, classNames.inactiveSection),
    style: getTrackStyles(bottomSectionWidth),
  };

  const sliderProps: React.HTMLAttributes<HTMLElement> = {
    'aria-disabled': disabled,
    role: 'slider',
    tabIndex: disabled ? undefined : 0,
    ...({ 'data-is-focusable': !disabled } as any),
  };

  const sliderBoxProps: React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLDivElement> = {
    id,
    className: css(classNames.slideBox, buttonProps.className),
    ref: sliderBoxRef,
    ...(!disabled && {
      onMouseDown: onMouseDownOrTouchStart,
      onTouchStart: onMouseDownOrTouchStart,
      onKeyDown,
    }),
    ...(buttonProps &&
      getNativeProps<React.HTMLAttributes<HTMLDivElement>>(buttonProps, divProperties, ['id', 'className'])),
    ...(!ranged && {
      ...sliderProps,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': value,
      'aria-valuetext': getAriaValueText(value),
      'aria-label': ariaLabel || label,
      'aria-labelledby': ariaLabelledBy,
    }),
  };

  const onFocusProp = disabled ? {} : { onFocus: onThumbFocus };

  const thumbProps: React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement> = {
    ref: thumbRef,
    className: classNames.thumb,
    style: getPositionStyles(valuePercent),
    ...(ranged && {
      ...sliderProps,
      ...onFocusProp,
      id: `max-${id}`,
      'aria-valuemin': lowerValue,
      'aria-valuemax': max,
      'aria-valuenow': value,
      'aria-valuetext': getAriaValueText(value),
      'aria-label': `max ${ariaLabel || label}`,
    }),
  };

  const lowerValueThumbProps: (React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>) | undefined =
    ranged
      ? {
          ref: lowerValueThumbRef,
          className: classNames.thumb,
          style: getPositionStyles(lowerValuePercent),
          ...sliderProps,
          ...onFocusProp,
          id: `min-${id}`,
          'aria-valuemin': min,
          'aria-valuemax': value,
          'aria-valuenow': lowerValue,
          'aria-valuetext': getAriaValueText(lowerValue),
          'aria-label': `min ${ariaLabel || label}`,
        }
      : undefined;

  const containerProps: React.HTMLAttributes<HTMLElement> = {
    className: classNames.container,
  };

  const sliderLineProps: React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement> = {
    ref: sliderLine,
    className: classNames.line,
  };

  return {
    root: rootProps,
    label: labelProps,
    sliderBox: sliderBoxProps,
    container: containerProps,
    valueLabel: valueLabelProps,
    lowerValueLabel: lowerValueLabelProps,
    thumb: thumbProps,
    lowerValueThumb: lowerValueThumbProps,
    zeroTick: zeroTickProps,
    activeTrack: trackActiveProps,
    topInactiveTrack: trackTopInactiveProps,
    bottomInactiveTrack: trackBottomInactiveProps,
    sliderLine: sliderLineProps,
  };
};
