import * as React from 'react';
import { useFluent } from '@fluentui/react-shared-contexts';
import { useBoolean, useControllableState, useEventCallback, useId, useUnmount } from '@fluentui/react-utilities';
import type { SliderSlots, SliderState, SliderCommon } from './Slider.types';

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
    max = 100,
    step = 1,
    keyboardStep = state.step || 1,
    disabled = false,
    ariaValueText,
    onChange,
    vertical = false,
    origin,
    onPointerDown: onPointerDownCallback,
    onKeyDown: onKeyDownCallback,
  } = state;

  const { dir } = useFluent();

  const [stepAnimation, { setTrue: showStepAnimation, setFalse: hideStepAnimation }] = useBoolean(false);
  const [renderedPosition, setRenderedPosition] = React.useState<number>(value ? value : defaultValue);
  const [currentValue, setCurrentValue] = useControllableState({
    state: value && clamp(value, min, max),
    defaultState: clamp(defaultValue, min, max),
    initialState: 0,
  });

  const railRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLElement>(null);
  const disposables = React.useRef<(() => void)[]>([]);
  const id = useId('slider-', state.id);

  /**
   * Updates the controlled `currentValue` to the new `incomingValue` and clamps it.
   *
   * @param incomingValue
   * @param ev
   */
  const updateValue = useEventCallback(
    (incomingValue: number, ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void => {
      const clampedValue = clamp(incomingValue, min, max);

      if (clampedValue !== min && clampedValue !== max) {
        ev.stopPropagation();
        if (ev.type === 'keydown') {
          ev.preventDefault();
        }
      }

      onChange?.(ev, { value: clampedValue });
      setCurrentValue(clampedValue);
    },
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
      const sliderSize = vertical ? currentBounds!.height : currentBounds!.width;
      let position;

      // TODO switch to RTL
      if (dir === 'ltr') {
        position = currentBounds!.right;
      } else if (vertical) {
        position = currentBounds!.bottom;
      } else {
        position = currentBounds!.left;
      }

      const totalSteps = (max - min) / step;
      const stepLength = sliderSize / totalSteps;
      const thumbPosition = vertical ? ev.clientY : ev.clientX;
      const distance = dir === 'ltr' || vertical ? position - thumbPosition : thumbPosition - position;

      return distance / stepLength;
    },
    [dir, max, min, step, vertical],
  );

  const onPointerMove = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const position = min + step * calculateSteps(ev);
      const currentStepPosition = state.step ? Math.round(position / step) * step : position;

      setRenderedPosition(clamp(position, min, max));
      currentValue !== currentStepPosition && updateValue(currentStepPosition, ev);
    },
    [calculateSteps, currentValue, max, min, state.step, step, updateValue],
  );

  const onPointerUp = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      disposables.current.forEach(dispose => dispose());
      disposables.current = [];

      showStepAnimation();
      setRenderedPosition(
        clamp(findClosestValue(Math.round((min + step * calculateSteps(ev)) / step) * step, step), min, max),
      );
      thumbRef.current!.focus();
    },
    [calculateSteps, max, min, showStepAnimation, step],
  );

  const onPointerDown = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const { pointerId } = ev;
      const target = ev.target as HTMLElement;

      target.setPointerCapture?.(pointerId);

      hideStepAnimation();
      onPointerDownCallback?.(ev);

      disposables.current.push(on(target, 'pointermove', onPointerMove), on(target, 'pointerup', onPointerUp), () => {
        target.releasePointerCapture?.(pointerId);
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
          updatePosition(currentValue! - keyboardStep * 10, ev);
          return;
        } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowRight') {
          updatePosition(currentValue! + keyboardStep * 10, ev);
          return;
        }
      } else if (ev.key === 'ArrowDown' || ev.key === 'ArrowLeft') {
        updatePosition(currentValue! - keyboardStep, ev);
        return;
      } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowRight') {
        updatePosition(currentValue! + keyboardStep, ev);
        return;
      } else {
        switch (ev.key) {
          case 'PageDown':
            updatePosition(currentValue! - keyboardStep * 10, ev);
            break;
          case 'PageUp':
            updatePosition(currentValue! + keyboardStep * 10, ev);
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
    [currentValue, hideStepAnimation, keyboardStep, max, min, onKeyDownCallback, updatePosition],
  );

  useUnmount(() => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  });

  const valuePercent = getPercent(renderedPosition!, min, max);

  // TODO: Awaiting animation time from design spec.
  const animationTime = '0.1s';

  const originPercent = origin ? getPercent(origin, min, max) : 0;

  const thumbStyles = {
    transform: vertical
      ? `translateY(${valuePercent}%)`
      : dir === 'ltr'
      ? `translate(calc(${-valuePercent}% - (-5%)), -50%)`
      : `translateX(${valuePercent}%) translate(-50%, -50%)`,
    transition: stepAnimation ? `transform ease-in-out ${animationTime}` : 'none',
    ...state.thumb.style,
  };

  const trackStyles = vertical
    ? {
        top: origin ? `${Math.min(valuePercent, originPercent)}%` : 0,
        height: origin
          ? `${Math.max(originPercent - valuePercent, valuePercent - originPercent)}%`
          : `${valuePercent}%`,
        borderRadius:
          origin && origin !== (max || min)
            ? `${originPercent > valuePercent ? '99px 99px 0px 0px' : '0px 0px 99px 99px'}`
            : '99px',
        transition: stepAnimation
          ? `transform ease-in-out ${animationTime}, height ease-in-out ${animationTime}`
          : 'none',
        ...state.track.style,
      }
    : {
        [dir === 'ltr' ? 'right' : 'left']: origin ? `${Math.min(valuePercent, originPercent)}%` : 0,
        width: origin ? `${Math.max(originPercent - valuePercent, valuePercent - originPercent)}%` : `${valuePercent}%`,
        borderRadius:
          origin && origin !== (max || min)
            ? `${
                (dir === 'ltr' ? valuePercent > originPercent : originPercent > valuePercent)
                  ? '99px 0px 0px 99px'
                  : '0px 99px 99px 0px'
              }`
            : '99px',
        transition: stepAnimation
          ? `transform ease-in-out ${animationTime}, width ease-in-out ${animationTime} ${
              origin ? ', left ease-in-out ' + animationTime : ''
            }`
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

  // Track Props
  state.track.style = trackStyles;

  // Thumb Wrapper Props
  state.thumbWrapper.style = thumbStyles;

  // Thumb Props
  state.thumb.ref = thumbRef;
  state.thumb.tabIndex = disabled ? undefined : 0;
  state.thumb.role = 'slider';
  state.thumb['aria-valuemin'] = min;
  state.thumb['aria-valuemax'] = max;
  state.thumb['aria-valuenow'] = currentValue;
  state.thumb['aria-valuetext'] = ariaValueText ? ariaValueText(currentValue!) : currentValue!.toString();
  disabled && (state.thumb['aria-disabled'] = true);

  // Active Rail Props
  state.activeRail.ref = railRef;

  return state;
};
