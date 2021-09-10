import * as React from 'react';
import { useFluent } from '@fluentui/react-shared-contexts';
import {
  useBoolean,
  useControllableState,
  useEventCallback,
  useUnmount,
  useMergedRefs,
} from '@fluentui/react-utilities';
import {
  on,
  clamp,
  getPercent,
  calculateSteps,
  getMarkPercent,
  getMarkValue,
  getKeydownValue,
  renderMarks,
} from '../../utils/index';
import { RangedSliderState } from './RangedSlider.types';

/**
 * Replaces a value at a given index in an array.
 */
const replaceAt = (array: number[], index: number, value: number) => {
  const result = array.slice(0);
  result[index] = value;
  return result;
};

/**
 * Converts an unknown number or number array value to always be a number array.
 *
 * @param value the value to convert to a number array
 */
const toNumberArray = (value: number | number[]): number[] => {
  return typeof value === 'number' ? [value] : value;
};

/**
 * Finds the closest value in an array and returns it's index.
 */
const findClosestArrayValue = (array: number[], value: number) => {
  let closestValue = Math.abs(array[0] - value);
  let index = 0;

  for (let i = 0; i < array.length; i++) {
    const newValue = Math.abs(array[i] - value);
    if (newValue < closestValue) {
      closestValue = newValue;
      index = i;
    }
  }

  return index;
};

/**
 * Clamps the values in an array to a given min and max.
 */
const clampArray = (array: number[], min: number, max: number) => {
  const clampedArray = [];
  for (let i = 0; i < array.length; i++) {
    const clampedValue = clamp(array[i], min, max);
    clampedArray.push(clampedValue);
  }
  return clampedArray;
};

/**
 * Clamps object's `values` to a number between the min and max.
 *
 * @param object - the object to be clamped
 * @param min - the lowest valid value
 * @param max - the highest valid value
 */
// const clampObject = <T,>(object: T, min: number, max: number): T =>
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   object.map((value: number) => clamp(value, min, max));

type RangedValue = { lowerValue: number; upperValue: number };

const clampObject = (object: RangedValue, min: number, max: number): RangedValue => {
  return object;
};

export const useRangedSliderState = (state: RangedSliderState) => {
  const {
    min = 0,
    max = 100,
    value,
    defaultValue = { lowerValue: min, upperValue: max },
    step = 1,
    keyboardStep = state.step || 1,
    disabled = false,
    ariaValueText,
    onChange,
    marks,
    vertical = false,
  } = state;
  const { onPointerDown: onPointerDownCallback, onKeyDown: onKeyDownCallback } = state.root;

  const { dir } = useFluent();

  const lowerInputRef = React.useRef<HTMLInputElement>(null);
  const upperInputRef = React.useRef<HTMLInputElement>(null);
  const railRef = React.useRef<HTMLDivElement>(null);
  const activeThumb = React.useRef<'lowerValue' | 'upperValue'>('lowerValue');
  const disposables = React.useRef<(() => void)[]>([]);

  const [currentValue, setCurrentValue] = useControllableState({
    state: value && clampObject(value, min, max),
    defaultState: clampObject(defaultValue, min, max),
    initialState: { lowerValue: min, upperValue: max },
  });

  /**
   * Updates the controlled `currentValue` to the new `incomingValue` and clamps it.
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

      onChange?.(ev, { value: currentValue });
      setCurrentValue({
        ...currentValue,
        [activeThumb.current]: clampedValue,
      });
    },
  );

  // const onPointerDown = React.useCallback(
  //   (ev: React.PointerEvent<HTMLDivElement>): void => {
  //     const { pointerId } = ev;
  //     const target = ev.target as HTMLElement;

  //     target.setPointerCapture?.(pointerId);

  //     onPointerDownCallback?.(ev);

  //     disposables.current.push(on(target, 'pointermove', onPointerMove), on(target, 'pointerup', onPointerUp), () => {
  //       target.releasePointerCapture?.(pointerId);
  //     });

  //     onPointerMove(ev);
  //   },
  //   [hideStepAnimation, onPointerDownCallback, onPointerMove, onPointerUp],
  // );

  const keyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDownCallback?.(ev);

      const incomingValue = getKeydownValue(ev, currentValue[activeThumb.current], min, max, dir, keyboardStep);

      if (currentValue[activeThumb.current] !== incomingValue) {
        updateValue(incomingValue, ev);
      }
    },
    [currentValue, dir, keyboardStep, max, min, onKeyDownCallback, updateValue],
  );

  const onKeyDownLower = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      activeThumb.current = 'lowerValue';
      keyDown(ev);
    },
    [keyDown],
  );

  const onKeyDownUpper = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      activeThumb.current = 'upperValue';
      keyDown(ev);
    },
    [keyDown],
  );

  useUnmount(() => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  });

  const lowerValuePercent = getPercent(currentValue.lowerValue, min, max);

  const markValues = React.useMemo((): number[] => getMarkValue(marks, min, max, step), [marks, max, min, step]);

  const markPercent = React.useMemo((): string[] => getMarkPercent(markValues), [markValues]);

  const lowerThumbWrapperStyles = {
    transform: vertical
      ? `translateY(${lowerValuePercent}%)`
      : `translateX(${dir === 'rtl' ? -lowerValuePercent : lowerValuePercent}%)`,
    ...state.lowerThumbWrapper.style,
  };

  const upperValuePercent = getPercent(currentValue.upperValue, min, max);

  const upperThumbWrapperStyles = {
    transform: vertical
      ? `translateY(${upperValuePercent}%)`
      : `translateX(${dir === 'rtl' ? -upperValuePercent : upperValuePercent}%)`,
    ...state.upperThumbWrapper.style,
  };

  const marksWrapperStyles = marks
    ? {
        [vertical ? 'gridTemplateRows' : 'gridTemplateColumns']: markPercent.join(''),
        ...state.marksWrapper.style,
      }
    : {};

  // Root props
  if (!disabled) {
    // state.root.onPointerDown = onPointerDown;
  }

  // Mark props
  if (marks) {
    state.marksWrapper.children = renderMarks(markValues);
    state.marksWrapper.style = marksWrapperStyles;
  }

  // Lower Thumb Wrapper Props
  state.lowerThumbWrapper.style = lowerThumbWrapperStyles;

  // Upper Thumb Wrapper Props
  state.upperThumbWrapper.style = upperThumbWrapperStyles;

  // Active Rail Props
  state.activeRail.ref = railRef;

  // Lower Input Props
  state.inputLower.ref = useMergedRefs(state.inputLower.ref, lowerInputRef);
  state.inputLower.value = currentValue.lowerValue;
  state.inputLower.min = min;
  state.inputLower.max = max;
  ariaValueText && (state.inputLower['aria-valuetext'] = ariaValueText(currentValue.lowerValue));
  state.inputLower.disabled = disabled;
  state.inputLower.step = step;
  state.inputLower.onKeyDown = onKeyDownLower;
  // state.inputLower.onChange = onInputChange;

  // Upper Input Props
  state.inputUpper.ref = useMergedRefs(state.inputUpper.ref, upperInputRef);
  state.inputUpper.value = currentValue.upperValue;
  state.inputUpper.min = min;
  state.inputUpper.max = max;
  ariaValueText && (state.inputUpper['aria-valuetext'] = ariaValueText(currentValue.upperValue));
  state.inputUpper.disabled = disabled;
  state.inputUpper.step = step;
  state.inputUpper.onKeyDown = onKeyDownUpper;
  // state.inputUpper.onChange = onInputChange;

  return state;
};
