import * as React from 'react';
import { useId, useControllableState, useMount, useBoolean } from '@fluentui/react-utilities';
import { SliderSlots, SliderState, SliderCommon } from './Slider.types';

/**
 * Validates that the `value` is a number and falls between the min and max.
 *
 * @param value - the value to be clamped
 * @param min - the lowest valid value
 * @param max - the highest valid value
 */
const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value || 0));

/**
 * Gets the current percent of specified value between a min and max
 *
 * @param value - the value to find the percent
 * @param min - the lowest valid value
 * @param max - the highest valid value
 */
const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

/**
 * Finds the closest number that is divisible by a specified value.
 *
 * @param value the number to evaluate the closest value for.
 * @param divisibleBy the number to check if divisible by.
 */
const findClosestValue = (value: number, divisibleBy: number) => {
  const absoluteValue = Math.abs(value);
  const absoluteDivisibleBy = Math.abs(divisibleBy);

  const lowerValue = absoluteValue - (absoluteValue % absoluteDivisibleBy);
  const upperValue = lowerValue + absoluteDivisibleBy;

  return absoluteValue - lowerValue < upperValue - absoluteValue
    ? lowerValue * Math.sign(value)
    : upperValue * Math.sign(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const on = (element: Element, eventName: string, callback: (ev: any) => void) => {
  element.addEventListener(eventName, callback);
  return () => element.removeEventListener(eventName, callback);
};

export const useSliderState = (state: Pick<SliderState, keyof SliderCommon | keyof SliderSlots | 'as' | 'ref'>) => {
  const {
    as = 'div',
    value,
    defaultValue = 0,
    min = 0,
    max = 10,
    step: stepIncrement = 1,
    disabled = false,
    ariaValueText,
    onChange,
    vertical = false,
    origin,
    onPointerDown: onPointerDownCallback,
    onKeyDown: onKeyDownCallback,
  } = state;

  const [stepAnimation, { setTrue: showStepAnimation, setFalse: hideStepAnimation }] = useBoolean(false);
  const [renderedPosition, setRenderedPosition] = React.useState<number>(value ? value : defaultValue);
  const [currentValue, setCurrentValue] = useControllableState({
    state: value && clamp(value, min, max),
    defaultState: clamp(defaultValue, min, max),
    initialState: 0,
  });

  const railRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const disposables = React.useRef<(() => void)[]>([]);
  const onChangeCallback = React.useRef(onChange);
  const id = useId('slider-', state.id);

  /**
   * Updates the controlled `currentValue` to the new `incomingValue` and clamps it.
   *
   * @param incomingValue
   * @param ev
   */
  const updateValue = React.useCallback(
    (incomingValue: number, ev): void => {
      const clampedValue = clamp(incomingValue, min, max);

      if (clampedValue !== min && clampedValue !== max) {
        ev.stopPropagation();
        if (ev.type === 'keydown') {
          ev.preventDefault();
        }
      }

      if (onChange && onChangeCallback.current) {
        onChangeCallback.current(clampedValue, ev);
      }

      setCurrentValue(clampedValue);
    },
    [max, min, onChange, setCurrentValue],
  );

  /**
   * Updates the controlled `currentValue` and `renderedPosition` of the Slider.
   *
   * @param incomingValue
   * @param ev
   */
  const updatePosition = React.useCallback(
    (incomingValue: number, ev) => {
      setRenderedPosition(clamp(incomingValue, min, max));
      updateValue(incomingValue, ev);
    },
    [max, min, updateValue],
  );

  /**
   * Calculates the `step` position based off of a `Mouse` or `Touch` event.
   */
  const calculateSteps = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): number => {
      const currentBounds = railRef?.current?.getBoundingClientRect();
      const size = vertical ? currentBounds?.height || 0 : currentBounds?.width || 0;
      const position = vertical ? currentBounds?.bottom || 0 : currentBounds?.left || 0;

      const totalSteps = (max - min) / stepIncrement;
      const stepLength = size / totalSteps;
      const thumbPosition = vertical ? ev.clientY : ev.clientX;
      const distance = vertical ? position - thumbPosition : thumbPosition - position;
      return distance / stepLength;
    },
    [max, min, stepIncrement, vertical],
  );

  const onPointerMove = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const position = min + stepIncrement * calculateSteps(ev);
      const currentStepPosition = Math.round(position / stepIncrement) * stepIncrement;

      setRenderedPosition(clamp(position, min, max));
      updateValue(currentStepPosition, ev);
    },
    [calculateSteps, max, min, stepIncrement, updateValue],
  );

  const onPointerUp = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      disposables.current.forEach(dispose => dispose());
      disposables.current = [];

      showStepAnimation();
      state.step &&
        setRenderedPosition(
          clamp(
            findClosestValue(
              Math.round((min + stepIncrement * calculateSteps(ev)) / stepIncrement) * stepIncrement,
              stepIncrement,
            ),
            min,
            max,
          ),
        );
      thumbRef.current!.focus();
    },
    [calculateSteps, max, min, showStepAnimation, state.step, stepIncrement],
  );

  const onPointerDown = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const { pointerId } = ev;
      const target = ev.target as HTMLElement;

      if (target.setPointerCapture) {
        target.setPointerCapture(pointerId);
      }

      hideStepAnimation();
      onPointerDownCallback?.(ev);

      disposables.current.push(on(target, 'pointermove', onPointerMove), on(target, 'pointerup', onPointerUp), () => {
        target.releasePointerCapture(pointerId);
      });

      onPointerMove(ev);
    },
    [hideStepAnimation, onPointerDownCallback, onPointerMove, onPointerUp],
  );

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      hideStepAnimation();
      onKeyDownCallback?.(ev);

      if (ev.shiftKey) {
        if (ev.key === 'ArrowDown' || ev.key === 'ArrowLeft') {
          updatePosition(currentValue! - stepIncrement * 10, ev);
          return;
        } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowRight') {
          updatePosition(currentValue! + stepIncrement * 10, ev);
          return;
        }
      } else if (ev.key === 'ArrowDown' || ev.key === 'ArrowLeft') {
        updatePosition(currentValue! - stepIncrement, ev);
        return;
      } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowRight') {
        updatePosition(currentValue! + stepIncrement, ev);
        return;
      } else {
        switch (ev.key) {
          case 'PageDown':
            updatePosition(currentValue! - stepIncrement * 10, ev);
            break;
          case 'PageUp':
            updatePosition(currentValue! + stepIncrement * 10, ev);
            break;
          case 'Home':
            updatePosition(min, ev);
            break;
          case 'End':
            updatePosition(max, ev);
            break;
        }
      }
    },
    [currentValue, hideStepAnimation, max, min, onKeyDownCallback, stepIncrement, updatePosition],
  );

  React.useEffect(() => {
    if (state.ref && state.ref.current) {
      state.ref.current.value = currentValue;
      state.ref.current.focus = () => thumbRef?.current?.focus();
    }
  }, [currentValue, state.ref]);

  useMount(() => {
    // If the user passes an out of bounds controlled value, clamp and update their value onMount.
    if (value !== undefined && (value < min || value > max) && onChange && onChangeCallback.current) {
      onChangeCallback.current(clamp(value, min, max));

      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('It appears that a controlled Slider has received an unclamped value outside of the min/max.');
      }
    }
  });

  const valuePercent = getPercent(renderedPosition!, min, max);

  // TODO: Awaiting animation time from design spec.
  const animationTime = '0.1s';

  const originPercent = origin ? getPercent(origin, min, max) : 0;

  const thumbStyles = {
    transform: vertical ? `translateY(${valuePercent}%)` : `translateX(${valuePercent}%)`,
    transition: stepAnimation ? `transform ease-in-out ${animationTime}` : 'none',
    ...state.thumb.style,
  };

  const trackStyles = vertical
    ? {
        top: origin ? `${Math.min(valuePercent, originPercent)}%` : 0,
        height: origin
          ? `${Math.max(originPercent - valuePercent, valuePercent - originPercent)}%`
          : `${valuePercent}%`,
        transition: stepAnimation
          ? `transform ease-in-out ${animationTime}, height ease-in-out ${animationTime}`
          : 'none',
        ...state.track.style,
      }
    : {
        left: origin ? `${Math.min(valuePercent, originPercent)}%` : 0,
        width: origin ? `${Math.max(originPercent - valuePercent, valuePercent - originPercent)}%` : `${valuePercent}%`,
        transition: stepAnimation
          ? `transform ease-in-out ${animationTime}, width ease-in-out ${animationTime}`
          : 'none',
        ...state.track.style,
      };

  // Root props
  state.as = as;
  state.id = id;
  if (!disabled) {
    state.onPointerDown = onPointerDown;
    state.onKeyDown = onKeyDown;
  }

  // Rail Props
  state.rail.children = null;

  // Track Props
  state.trackWrapper.children = null;

  // Track Props
  state.track.className = 'ms-Slider-track';
  state.track.style = trackStyles;
  state.track.children = null;

  // Thumb Wrapper Props
  state.thumbWrapper.style = thumbStyles;
  state.thumbWrapper.children = null;

  // Thumb Props
  state.thumb.className = 'ms-Slider-thumb';
  state.thumb.ref = thumbRef;
  state.thumb.tabIndex = disabled ? undefined : 0;
  state.thumb.role = 'slider';
  state.thumb['aria-valuemin'] = min;
  state.thumb['aria-valuemax'] = max;
  state.thumb['aria-valuenow'] = currentValue;
  state.thumb['aria-valuetext'] = ariaValueText ? ariaValueText(currentValue!) : currentValue!.toString();
  disabled && (state.thumb['aria-disabled'] = true);
  state.thumb.children = null;

  // Active Rail Props
  state.activeRail.ref = railRef;
  state.activeRail.children = null;

  return state;
};
