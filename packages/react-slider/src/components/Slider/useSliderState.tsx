import * as React from 'react';
import { clamp, useControllableState } from '@fluentui/react-utilities';
import { getPercent } from '../../utils/index';
import type { SliderState } from './Slider.types';

/**
 * Combine up to two event callbacks into a single function that calls them in order
 */
const useMergedCallbacks = <Event,>(
  callback1: ((ev: Event) => void) | undefined,
  callback2: ((ev: Event) => void) | undefined,
) => {
  return React.useCallback(
    (ev: Event) => {
      callback1?.(ev);
      callback2?.(ev);
    },
    [callback1, callback2],
  );
};

export const useSliderState = (state: SliderState) => {
  const {
    value,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    ariaValueText,
    origin,
    input,
  } = state;

  const [currentValue, setCurrentValue] = useControllableState({
    state: value && clamp(value, min, max),
    defaultState: clamp(defaultValue, min, max),
    initialState: 0,
  });

  const valuePercent = getPercent(currentValue, min, max);
  const originPercent = React.useMemo(() => {
    return origin !== undefined ? getPercent(origin, min, max) : 0;
  }, [max, min, origin]);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const newValue = Number(ev.target.value);
    setCurrentValue(newValue);
  };

  const rootVariables = {
    '--slider-thumb-position': valuePercent + '%',
    '--slider-rail-steps-percent': state.step && state.step > 0 ? `${(step * 100) / (max - min)}%` : '',
    '--slider-rail-offset': origin !== undefined ? `${Math.min(valuePercent, originPercent)}%` : '0%',
    '--slider-rail-progress':
      origin !== undefined
        ? `${Math.max(originPercent - valuePercent, valuePercent - originPercent)}%`
        : `${valuePercent}%`,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  // Input Props
  state.input.value = currentValue;
  state.input.min = min;
  state.input.max = max;
  ariaValueText && (state.input['aria-valuetext'] = ariaValueText(currentValue!));
  state.input.disabled = disabled;
  state.input.step = step;
  state.input.onChange = useMergedCallbacks(onInputChange, input.onChange);

  return state;
};
