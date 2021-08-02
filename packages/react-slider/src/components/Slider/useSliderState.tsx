import * as React from 'react';
import { useId, useControllableValue, useMount } from '@fluentui/react-utilities';
import {
  getCode,
  ArrowDownKey,
  ArrowUpKey,
  ArrowLeftKey,
  ArrowRightKey,
  PageDownKey,
  PageUpKey,
  HomeKey,
  EndKey,
} from '@fluentui/keyboard-key';
import { SliderState } from './Slider.types';

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

const on = (element: Element, eventName: string, callback: (ev: Event) => void) => {
  element.addEventListener(eventName, callback);
  return () => element.removeEventListener(eventName, callback);
};

export const useSliderState = (state: SliderState): SliderState => {
  const {
    as = 'div',
    value,
    defaultValue = 0,
    min = 0,
    max = 10,
    step = 1,
    snapToStep = false,
    ariaValueText,
    onChange,
    onPointerDown: onPointerDownCallback,
    onKeyDown: onKeyDownCallback,
  } = state;

  const [currentValue, setCurrentValue] = useControllableValue(
    value && clamp(value, min, max),
    clamp(defaultValue, min, max),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ev is not a SyntheticEvent
    (ev: any, val) => onChange?.(val!, ev),
  );

  const railRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const disposables = React.useRef<(() => void)[]>([]);
  const id = useId('slider-', state.id);

  /**
   * Updates the `currentValue` to the new `incomingValue` and clamps it.
   *
   * @param ev
   * @param incomingValue
   */
  const updateValue = React.useCallback(
    (ev, incomingValue: number): void => {
      if (incomingValue !== min && incomingValue !== max) {
        ev.stopPropagation();
        if (ev.type === 'keydown') {
          ev.preventDefault();
        }
      }

      setCurrentValue(clamp(incomingValue, min, max), ev);
    },
    [max, min, setCurrentValue],
  );

  /**
   * Calculates the `step` position based off of a `Mouse` or `Touch` event.
   */
  const calculateSteps = React.useCallback(
    (ev): number => {
      const currentBounds = railRef?.current?.getBoundingClientRect();
      const size = currentBounds?.width || 0;
      const position = currentBounds?.left || 0;

      const totalSteps = (max - min) / step;
      const stepLength = size / totalSteps;
      const thumbPosition = ev.clientX;
      const distance = thumbPosition - position;
      return distance / stepLength;
    },
    [max, min, step],
  );

  const onPointerMove = React.useCallback(
    (ev): void => {
      if (snapToStep || step !== 1) {
        updateValue(ev, Math.round((min + step * calculateSteps(ev)) / step) * step);
      } else {
        updateValue(ev, min + step * calculateSteps(ev));
      }
    },
    [calculateSteps, min, snapToStep, step, updateValue],
  );

  const onPointerUp = (): void => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  };

  const onPointerDown = React.useCallback(
    (ev): void => {
      const { currentTarget, pointerId } = ev;

      onPointerDownCallback?.(ev);

      if (currentTarget.setPointerCapture) {
        currentTarget.setPointerCapture(pointerId);
      }

      disposables.current.push(
        on(currentTarget, 'pointermove', onPointerMove),
        on(currentTarget, 'pointerup', onPointerUp),
        () => {
          currentTarget.releasePointerCapture(pointerId);
        },
      );

      onPointerMove(ev);
    },
    [onPointerMove, onPointerDownCallback],
  );

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      const key = getCode(ev);

      onKeyDownCallback?.(ev);

      if (ev.shiftKey) {
        if (key === ArrowDownKey || key === ArrowLeftKey) {
          updateValue(ev, currentValue! - step * 10);
          return;
        } else if (key === ArrowUpKey || key === ArrowRightKey) {
          updateValue(ev, currentValue! + step * 10);
          return;
        }
      } else if (key === ArrowDownKey || key === ArrowLeftKey) {
        updateValue(ev, currentValue! - step);
        return;
      } else if (key === ArrowUpKey || key === ArrowRightKey) {
        updateValue(ev, currentValue! + step);
        return;
      } else {
        switch (key) {
          case PageDownKey:
            updateValue(ev, currentValue! - step * 10);
            break;
          case PageUpKey:
            updateValue(ev, currentValue! + step * 10);
            break;
          case HomeKey:
            updateValue(ev, min);
            break;
          case EndKey:
            updateValue(ev, max);
            break;
        }
      }
    },
    [currentValue, max, min, onKeyDownCallback, step, updateValue],
  );

  React.useEffect(() => {
    if (state.ref && state.ref.current) {
      state.ref.current.value = currentValue;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.ref.current.focus = thumbRef?.current?.focus() as any;
    }
  }, [currentValue, state.ref]);

  useMount(() => {
    if (value !== undefined) {
      setCurrentValue(clamp(value, min, max));
    }
  });

  const valuePercent = getPercent(currentValue!, min, max);

  const thumbStyles = {
    transform: `translateX(${valuePercent}%)`,
  };

  const trackStyles = { width: `${valuePercent}%` };

  // Root props
  state.as = as;
  state.onPointerDown = onPointerDown;
  state.onKeyDown = onKeyDown;
  state.id = id;

  // Rail Props
  state.rail.className = 'ms-Slider-rail';

  // Track Props
  state.track.className = 'ms-Slider-track';
  state.track.style = trackStyles;

  // Thumb Props
  state.thumb.className = 'ms-Slider-thumb';
  state.thumb.ref = thumbRef;
  state.thumb.tabIndex = 0;
  state.thumb.role = 'slider';
  state.thumb['aria-valuemin'] = min;
  state.thumb['aria-valuemax'] = max;
  state.thumb['aria-valuenow'] = currentValue;
  state.thumb['aria-valuetext'] = ariaValueText ? ariaValueText(currentValue!) : currentValue!.toString();
  state.thumb.style = thumbStyles;

  // Active Rail Props
  state.activeRail.className = 'ms-Slider-activeRail';
  state.activeRail.ref = railRef;

  return state;
};
