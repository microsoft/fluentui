import * as React from 'react';
import { useId, useControllableState, useEventCallback } from '@fluentui/react-utilities';
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
    disabled = false,
    ariaValueText,
    onChange,
    marks,
    vertical = false,
    origin,
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
  const id = useId('slider-', state.id);

  /**
   * Updates the `currentValue` to the new `incomingValue` and clamps it.
   *
   * @param ev
   * @param incomingValue
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
   * Calculates the `step` position based off of a `Mouse` or `Touch` event.
   */
  const calculateSteps = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): number => {
      const currentBounds = railRef?.current?.getBoundingClientRect();
      const size = vertical ? currentBounds?.height || 0 : currentBounds?.width || 0;
      const position = vertical ? currentBounds?.bottom || 0 : currentBounds?.left || 0;

      const totalSteps = (max - min) / step;
      const stepLength = size / totalSteps;
      const thumbPosition = vertical ? ev.clientY : ev.clientX;
      const distance = vertical ? position - thumbPosition : thumbPosition - position;
      return distance / stepLength;
    },
    [max, min, step, vertical],
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

  const valuePercent = getPercent(currentValue!, min, max);

  const originPercent = origin ? getPercent(origin, min, max) : 0;

  /**
   * Gets the current percentage position for the marks.
   */
  const getMarkPercent = (): string[] => {
    const percentArray: number[] = [];
    const result: string[] = [];
    // There are three cases:

    // 1. We receive a boolean: mark for every step.
    if (typeof marks === 'boolean' && marks === true) {
      for (let i = 0; i < (max - min) / step + 1; i++) {
        percentArray.push(getPercent(min + step * i, min, max));
      }
    } else if (Array.isArray(marks) && marks.length > 0) {
      for (let i = 0; i < marks.length; i++) {
        const marksItem = marks[i];

        // 2. We receive an array with numbers: mark for every value in array.
        if (typeof marksItem === 'number') {
          percentArray.push(getPercent(min + marksItem, min, max));
        }
      }
    }

    // For CSS grid to work the percents array must be remapped by the previous percent - the current percent
    if (percentArray.length > 0) {
      result.push(percentArray[0] + '% ');
      let prevPercent = percentArray[0];
      for (let i = 1; i < percentArray.length; i++) {
        result.push(percentArray[i] - prevPercent + '% ');
        prevPercent = percentArray[i];
      }
    }

    return result;
  };

  const thumbStyles = {
    transform: vertical ? `translateY(${valuePercent}%)` : `translateX(${valuePercent}%)`,
    ...state.thumb.style,
  };

  const trackStyles = vertical
    ? {
        top: origin ? `${Math.min(valuePercent, originPercent)}%` : 0,
        height: origin
          ? `${Math.max(originPercent - valuePercent, valuePercent - originPercent)}%`
          : `${valuePercent}%`,
        ...state.track.style,
      }
    : {
        left: origin ? `${Math.min(valuePercent, originPercent)}%` : 0,
        width: origin ? `${Math.max(originPercent - valuePercent, valuePercent - originPercent)}%` : `${valuePercent}%`,
        ...state.track.style,
      };

  const marksContainerStyles = marks
    ? vertical
      ? {
          gridTemplateRows: getMarkPercent().join(''),
          ...state.marksContainer.style,
        }
      : {
          gridTemplateColumns: getMarkPercent().join(''),
          ...state.marksContainer.style,
        }
    : {};

  /**
   * Renders the marks
   */
  const renderMarks = () => {
    const marksPercent = getMarkPercent();
    const marksChildren: JSX.Element[] = [];

    for (let i = 0; i < marksPercent.length; i++) {
      marksChildren.push(
        <div className="ms-Slider-markItemContainer" key={`markItemContainer-${i}`}>
          <div className="ms-Slider-mark" key={`mark-${i}`} />
        </div>,
      );
    }

    return marksChildren;
  };

  // Root props
  state.as = as;
  state.id = id;
  if (!disabled) {
    state.onPointerDown = onPointerDown;
    state.onKeyDown = onKeyDown;
  }

  // Track Props
  state.track.className = 'ms-Slider-track';
  state.track.style = trackStyles;

  // Mark props
  marks && (state.marksContainer.children = renderMarks());
  state.marksContainer.style = marksContainerStyles;

  // Thumb Wrapper Props
  state.thumbWrapper.style = thumbStyles;

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

  // Active Rail Props
  state.activeRail.ref = railRef;

  return state;
};
