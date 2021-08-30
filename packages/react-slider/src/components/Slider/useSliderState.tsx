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
  const [thumbFocus, { setTrue: thumbHasFocus, setFalse: thumbLostFocus }] = useBoolean(false);
  const [renderedPosition, setRenderedPosition] = React.useState<number | undefined>(value ? value : defaultValue);
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
      thumbHasFocus();
      setRenderedPosition(clamp(incomingValue, min, max));
      updateValue(incomingValue, ev);
    },
    [max, min, thumbHasFocus, updateValue],
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
      const currentStepPosition = Math.round(position / step) * step;

      setRenderedPosition(clamp(position, min, max));
      updateValue(currentStepPosition, ev);
    },
    [calculateSteps, max, min, step, updateValue],
  );

  const onPointerUp = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      disposables.current.forEach(dispose => dispose());
      disposables.current = [];

      hideTooltip();
      showStepAnimation();

      // When undefined, the position fallbacks to the currentValue state.
      setRenderedPosition(undefined);
      thumbRef.current!.focus();
    },
    [hideTooltip, showStepAnimation],
  );

  const onPointerDown = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const { pointerId } = ev;
      const target = ev.target as HTMLElement;

      target.setPointerCapture?.(pointerId);

      hideStepAnimation();
      thumbLostFocus();
      showTooltip();
      onPointerDownCallback?.(ev);

      disposables.current.push(on(target, 'pointermove', onPointerMove), on(target, 'pointerup', onPointerUp), () => {
        target.releasePointerCapture?.(pointerId);
      });

      onPointerMove(ev);
    },
    [hideStepAnimation, onPointerDownCallback, onPointerMove, onPointerUp, showTooltip, thumbLostFocus],
  );

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

  const onPointerOut = React.useCallback(() => {
    hideTooltip();
    hideStepAnimation();
  }, [hideStepAnimation, hideTooltip]);

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

  const valuePercent = getPercent(renderedPosition !== undefined ? renderedPosition : currentValue, min, max);

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
  if (tooltipVisible && !disabled) {
    state.tooltip.pointing = true;
    state.tooltip.content = currentValue;
    state.tooltip.showDelay = animationTime;
    state.tooltip.hideDelay = animationTime;
    state.tooltip.visible = isTooltipVisible;
    state.tooltip.positioning = vertical ? 'after' : 'above';
  }

  const onBlur = React.useCallback(() => {
    hideTooltip();
    thumbLostFocus();
  }, [hideTooltip, thumbLostFocus]);

  // Thumb Props
  state.thumb.ref = thumbRef;
  state.thumb.tabIndex = disabled ? undefined : 0;
  state.thumb.role = 'slider';
  state.thumb['aria-valuemin'] = min;
  state.thumb['aria-valuemax'] = max;
  state.thumb['aria-valuenow'] = currentValue;
  state.thumb['aria-valuetext'] = ariaValueText ? ariaValueText(currentValue!) : currentValue!.toString();
  if (tooltipVisible && !disabled) {
    // Transition causes the onPointerEnter callback for the tooltip to trigger when collided with.
    // To avoid this, hover events are ignored while the animation occurs
    !stepAnimation && (state.thumb.onPointerEnter = showTooltip);
    // Once the cursor leaves the thumb hide the tooltip and disable the animation
    state.thumb.onPointerOut = onPointerOut;
    // onBlur will hide the tooltip when the rail is pressed and focus will trigger during any selection
    // The thumb focus boolean is set during a valid keypress to true and false when onBlur is called
    !thumbFocus && !stepAnimation && (state.thumb.onFocus = showTooltip);
    thumbFocus && (state.onBlur = onBlur);
  }
  disabled && (state.thumb['aria-disabled'] = true);

  // Active Rail Props
  state.activeRail.ref = railRef;

  return state;
};
