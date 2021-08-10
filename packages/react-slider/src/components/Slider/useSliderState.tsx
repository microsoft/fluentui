import * as React from 'react';
import { useId, useControllableState, useMount } from '@fluentui/react-utilities';
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
    step = 1,
    ariaValueText,
    onChange,
    marks,
    onPointerDown: onPointerDownCallback,
    onKeyDown: onKeyDownCallback,
  } = state;

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
   * Updates the `currentValue` to the new `incomingValue` and clamps it.
   *
   * @param ev
   * @param incomingValue
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
   * Calculates the `step` position based off of a `Mouse` or `Touch` event.
   */
  const calculateSteps = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): number => {
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
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      if (step !== 1) {
        updateValue(Math.round((min + step * calculateSteps(ev)) / step) * step, ev);
      } else {
        updateValue(min + step * calculateSteps(ev), ev);
      }
    },
    [calculateSteps, min, step, updateValue],
  );

  const onPointerUp = (): void => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
    thumbRef.current!.focus();
  };

  const onPointerDown = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const { pointerId } = ev;
      const target = ev.target as HTMLElement;

      if (target.setPointerCapture) {
        target.setPointerCapture(pointerId);
      }

      onPointerDownCallback?.(ev);

      disposables.current.push(on(target, 'pointermove', onPointerMove), on(target, 'pointerup', onPointerUp), () => {
        target.releasePointerCapture(pointerId);
      });

      onPointerMove(ev);
    },
    [onPointerMove, onPointerDownCallback],
  );

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      onKeyDownCallback?.(ev);

      if (ev.shiftKey) {
        if (ev.key === 'ArrowDown' || ev.key === 'ArrowLeft') {
          updateValue(currentValue! - step * 10, ev);
          return;
        } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowRight') {
          updateValue(currentValue! + step * 10, ev);
          return;
        }
      } else if (ev.key === 'ArrowDown' || ev.key === 'ArrowLeft') {
        updateValue(currentValue! - step, ev);
        return;
      } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowRight') {
        updateValue(currentValue! + step, ev);
        return;
      } else {
        switch (ev.key) {
          case 'PageDown':
            updateValue(currentValue! - step * 10, ev);
            break;
          case 'PageUp':
            updateValue(currentValue! + step * 10, ev);
            break;
          case 'Home':
            updateValue(min, ev);
            break;
          case 'End':
            updateValue(max, ev);
            break;
        }
      }
    },
    [currentValue, max, min, onKeyDownCallback, step, updateValue],
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

  const valuePercent = getPercent(currentValue!, min, max);

  const thumbStyles = { transform: `translateX(${valuePercent}%)`, ...state.thumb.style };

  const trackStyles = { width: `${valuePercent}%`, ...state.track.style };

  const getMarkPercent = () => {
    // There are three cases:

    // 1. We receive a boolean: mark for every step.
    if (typeof marks === 'boolean' && marks === true) {
      return [...Array(Math.floor((max - min) / step) + 1)].map((val, index) =>
        getPercent(min + step * index, min, max),
      );
    }

    // 2. We receive an array of numbers: mark for every value in array.
    else if (Array.isArray(marks) && marks.length > 0) {
      return [...Array(marks.length)].map((val, index) => getPercent(min + marks[index], min, max));
    }

    // 3. We receive an array of objects with numbers and strings:
    // mark and label for every value + string in each object
    //  else if () {

    //  }
  };

  const marksPercent = marks ? getMarkPercent() : undefined;

  // Root props
  state.as = as;
  state.onPointerDown = onPointerDown;
  state.onKeyDown = onKeyDown;
  state.id = id;

  // Rail Props
  state.rail.children = null;

  // Track Props
  state.trackWrapper.children = null;

  // Track Props
  state.track.className = 'ms-Slider-track';
  state.track.style = trackStyles;
  state.track.children = null;

  // Mark props
  state.mark.className = state.mark.className || 'ms-Slider-markContainer';
  state.mark.children =
    marks && marksPercent
      ? marksPercent.map((percent, index) => (
          <span
            className="ms-Slider-mark"
            key={`mark-${index}`}
            style={{
              left: percent + '%',
            }}
          />
        ))
      : null;

  // Thumb Wrapper Props
  state.thumbWrapper.style = thumbStyles;
  state.thumbWrapper.children = null;

  // Thumb Props
  state.thumb.className = 'ms-Slider-thumb';
  state.thumb.ref = thumbRef;
  state.thumb.tabIndex = 0;
  state.thumb.role = 'slider';
  state.thumb['aria-valuemin'] = min;
  state.thumb['aria-valuemax'] = max;
  state.thumb['aria-valuenow'] = currentValue;
  state.thumb['aria-valuetext'] = ariaValueText ? ariaValueText(currentValue!) : currentValue!.toString();
  state.thumb.children = null;

  // Active Rail Props
  state.activeRail.ref = railRef;
  state.activeRail.children = null;

  return state;
};
