import * as React from 'react';
import { useFluent } from '@fluentui/react-shared-contexts';
import { useBoolean, useControllableState, useEventCallback, useId, useUnmount } from '@fluentui/react-utilities';
import type { SliderState } from './Slider.types';

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

/**
 * Finds and swaps a provided key for it's right to left format.
 */
const getRTLSafeKey = (key: string, dir: 'ltr' | 'rtl') => {
  if (dir === 'rtl') {
    switch (key) {
      case 'ArrowLeft': {
        return 'ArrowRight';
      }

      case 'ArrowRight': {
        return 'ArrowLeft';
      }
    }
  }

  return key;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const on = (element: Element, eventName: string, callback: (ev: any) => void) => {
  element.addEventListener(eventName, callback);
  return () => element.removeEventListener(eventName, callback);
};

export const useSliderState = (state: SliderState) => {
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
    tooltipVisible = false,
    onPointerDown: onPointerDownCallback,
    onKeyDown: onKeyDownCallback,
  } = state;

  const { dir } = useFluent();

  const [stepAnimation, { setTrue: showStepAnimation, setFalse: hideStepAnimation }] = useBoolean(false);
  const [isTooltipVisible, { setTrue: showTooltip, setFalse: hideTooltip }] = useBoolean(false);
  const [thumbHasFocus, { setTrue: thumbFocused, setFalse: thumbUnfocused }] = useBoolean(false);
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
      showTooltip();
      setRenderedPosition(clamp(incomingValue, min, max));
      updateValue(incomingValue, ev);
      thumbFocused();
    },
    [max, min, showTooltip, thumbFocused, updateValue],
  );

  /**
   * Calculates the `step` position based off of a `Mouse` or `Touch` event.
   */
  const calculateSteps = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): number => {
      const currentBounds = railRef?.current?.getBoundingClientRect();
      const sliderSize = vertical ? currentBounds!.height : currentBounds!.width;
      let position;

      if (vertical) {
        position = currentBounds!.bottom;
      } else if (dir === 'rtl') {
        position = currentBounds!.right;
      } else {
        position = currentBounds!.left;
      }

      const totalSteps = (max - min) / step;
      const stepLength = sliderSize / totalSteps;
      const thumbPosition = vertical ? ev.clientY : ev.clientX;
      const distance = dir === 'rtl' || vertical ? position - thumbPosition : thumbPosition - position;

      return distance / stepLength;
    },
    [dir, max, min, step, vertical],
  );

  const onPointerMove = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const position = min + step * calculateSteps(ev);
      const currentStepPosition = state.step ? Math.round(position / step) * step : position;

      setRenderedPosition(clamp(position, min, max));
      updateValue(currentStepPosition, ev);
    },
    [calculateSteps, max, min, state.step, step, updateValue],
  );

  const onPointerUp = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      disposables.current.forEach(dispose => dispose());
      disposables.current = [];

      showStepAnimation();
      hideTooltip();
      setRenderedPosition(
        clamp(findClosestValue(Math.round((min + step * calculateSteps(ev)) / step) * step, step), min, max),
      );
      thumbRef.current!.focus();
    },
    [calculateSteps, hideTooltip, max, min, showStepAnimation, step],
  );

  const onPointerDown = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const { pointerId } = ev;
      const target = ev.target as HTMLElement;

      target.setPointerCapture?.(pointerId);

      hideStepAnimation();
      showTooltip();
      onPointerDownCallback?.(ev);

      disposables.current.push(on(target, 'pointermove', onPointerMove), on(target, 'pointerup', onPointerUp), () => {
        target.releasePointerCapture?.(pointerId);
      });

      onPointerMove(ev);
    },
    [hideStepAnimation, onPointerDownCallback, onPointerMove, onPointerUp, showTooltip],
  );

  const onThumbBlur = React.useCallback(() => {
    hideTooltip();
    thumbUnfocused();
  }, [hideTooltip, thumbUnfocused]);

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      const normalizedKey = getRTLSafeKey(ev.key, dir);
      hideStepAnimation();
      onKeyDownCallback?.(ev);

      if (ev.shiftKey) {
        if (normalizedKey === 'ArrowDown' || normalizedKey === 'ArrowLeft') {
          updatePosition(currentValue! - keyboardStep * 10, ev);
          return;
        } else if (normalizedKey === 'ArrowUp' || normalizedKey === 'ArrowRight') {
          updatePosition(currentValue! + keyboardStep * 10, ev);
          return;
        }
      } else if (normalizedKey === 'ArrowDown' || normalizedKey === 'ArrowLeft') {
        updatePosition(currentValue! - keyboardStep, ev);
        return;
      } else if (normalizedKey === 'ArrowUp' || normalizedKey === 'ArrowRight') {
        updatePosition(currentValue! + keyboardStep, ev);
        return;
      } else {
        switch (normalizedKey) {
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
    [currentValue, dir, hideStepAnimation, keyboardStep, max, min, onKeyDownCallback, updatePosition],
  );

  const getTrackBorderRadius = () => {
    if (origin && origin !== (max || min)) {
      if (vertical) {
        return originPercent > valuePercent ? '99px 99px 0px 0px' : '0px 0px 99px 99px';
      } else {
        return (dir === 'rtl' ? valuePercent > originPercent : valuePercent < originPercent)
          ? '99px 0px 0px 99px'
          : '0px 99px 99px 0px';
      }
    }
    return '99px';
  };

  useUnmount(() => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  });

  const valuePercent = getPercent(renderedPosition!, min, max);

  // TODO: Awaiting animation time from design spec.
  const animationTime = 0.1;

  const originPercent = origin ? getPercent(origin, min, max) : 0;

  const thumbWrapperStyles = {
    transform: vertical
      ? `translateY(${valuePercent}%)`
      : `translateX(${dir === 'rtl' ? -valuePercent : valuePercent}%)`,
    transition: stepAnimation ? `transform ease-in-out ${animationTime}s` : 'none',
    ...state.thumbWrapper.style,
  };

  const trackStyles = {
    [vertical ? 'top' : dir === 'rtl' ? 'right' : 'left']: origin ? `${Math.min(valuePercent, originPercent)}%` : 0,
    [vertical ? 'height' : 'width']: origin
      ? `${Math.max(originPercent - valuePercent, valuePercent - originPercent)}%`
      : `${valuePercent}%`,
    borderRadius: getTrackBorderRadius(),
    transition: stepAnimation
      ? `transform ease-in-out ${animationTime}, ${vertical ? 'height' : 'width'} ease-in-out ${animationTime}`
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
  state.thumbWrapper.style = thumbWrapperStyles;

  // Tooltip Props
  if (tooltipVisible) {
    state.tooltip.pointing = true;
    state.tooltip.content = currentValue;
    state.tooltip.showDelay = animationTime;
    state.tooltip.hideDelay = animationTime;
    state.tooltip.visible = isTooltipVisible;
    state.tooltip.positioning = vertical ? 'after' : 'above';
  }

  // Thumb Props
  state.thumb.ref = thumbRef;
  state.thumb.tabIndex = disabled ? undefined : 0;
  state.thumb.role = 'slider';
  state.thumb['aria-valuemin'] = min;
  state.thumb['aria-valuemax'] = max;
  state.thumb['aria-valuenow'] = currentValue;
  state.thumb['aria-valuetext'] = ariaValueText ? ariaValueText(currentValue!) : currentValue!.toString();
  tooltipVisible && (state.thumb.onPointerEnterCapture = showTooltip);
  tooltipVisible && (state.thumb.onPointerOutCapture = hideTooltip);
  tooltipVisible && thumbHasFocus && (state.thumb.onBlur = onThumbBlur);
  disabled && (state.thumb['aria-disabled'] = true);

  // Active Rail Props
  state.activeRail.ref = railRef;

  return state;
};
