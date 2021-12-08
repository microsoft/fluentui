import * as React from 'react';
import { clamp, useControllableState } from '@fluentui/react-utilities';
import { getPercent } from '../../utils/index';
import type { SliderState } from './Slider.types';

export const useSliderState = (state: SliderState) => {
  const { value, defaultValue = 0, min = 0, max = 100, step = 1, disabled = false, ariaValueText, origin } = state;

  const [currentValue, setCurrentValue] = useControllableState({
    state: value && clamp(value, min, max),
    defaultState: clamp(defaultValue, min, max),
    initialState: 0,
  });

  const valuePercent = getPercent(currentValue, min, max);
  const originPercent = React.useMemo(() => {
    return origin !== undefined ? getPercent(origin, min, max) : 0;
  }, [max, min, origin]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const newValue = Number(ev.target.value);
    setCurrentValue(newValue);

    const inputOnChange = state.input.onChange;
    const propsOnChange = state.onChange;

    if (inputOnChange && inputOnChange !== propsOnChange) {
      inputOnChange(ev);
    } else if (propsOnChange) {
      propsOnChange(ev, { value: newValue });
    }
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
  state.input.onChange = onChange;

  return state;
};
