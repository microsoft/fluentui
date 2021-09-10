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

const clampObject = (
  object: { lowerValue: number; upperValue: number },
  min: number,
  max: number,
): { lowerValue: number; upperValue: number } => object.map((value: number) => clamp(value, min, max));

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

  const [currentValue, setCurrentValue] = useControllableState({
    state: value && clampObject(value, min, max),
    defaultState: clampObject(defaultValue, min, max),
    initialState: { lowerValue: min, upperValue: max },
  });

  // Lower Input Props
  state.inputLower.ref = useMergedRefs(state.inputLower.ref, lowerInputRef);
  state.inputLower.value = currentValue.lowerValue;
  state.inputLower.min = min;
  state.inputLower.max = max;
  ariaValueText && (state.inputLower['aria-valuetext'] = ariaValueText(currentValue.lowerValue));
  state.inputLower.disabled = disabled;
  state.inputLower.step = step;
  // state.inputLower.onChange = onInputChange;

  // Upper Input Props
  state.inputUpper.ref = useMergedRefs(state.inputUpper.ref, upperInputRef);
  state.inputUpper.value = currentValue.upperValue;
  state.inputUpper.min = min;
  state.inputUpper.max = max;
  ariaValueText && (state.inputUpper['aria-valuetext'] = ariaValueText(currentValue.upperValue));
  state.inputUpper.disabled = disabled;
  state.inputUpper.step = step;
  // state.inputUpper.onChange = onInputChange;

  return state;
};
