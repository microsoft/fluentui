import * as React from 'react';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { getPercent } from '../../utils/index';
import { railOffsetVar, railStepsPercentVar, railProgressVar, thumbPositionVar } from './useSliderStyles';
import type { SliderState } from './Slider.types';

export const useSliderState = (state: SliderState) => {
  const { value, defaultValue = 0, min = 0, max = 100, step = 1, getAriaValueText, origin } = state;

  const [currentValue, setCurrentValue] = useControllableState({
    state: value && clamp(value, min, max),
    defaultState: clamp(defaultValue, min, max),
    initialState: 0,
  });

  const valuePercent = getPercent(currentValue, min, max);
  const originPercent = React.useMemo(() => {
    return origin !== undefined ? getPercent(origin, min, max) : 0;
  }, [max, min, origin]);

  const inputOnChange = state.input.onChange;
  const propsOnChange = state.onChange;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(ev => {
    const newValue = Number(ev.target.value);
    setCurrentValue(newValue);

    if (inputOnChange && inputOnChange !== propsOnChange) {
      inputOnChange(ev);
    } else if (propsOnChange) {
      propsOnChange(ev, { value: newValue });
    }
  });

  const rootVariables = {
    [thumbPositionVar]: valuePercent + '%',
    [railStepsPercentVar]: state.step && state.step > 0 ? `${(step * 100) / (max - min)}%` : '',
    [railOffsetVar]: origin !== undefined ? `${Math.min(valuePercent, originPercent)}%` : '0%',
    [railProgressVar]:
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
  getAriaValueText && (state.input['aria-valuetext'] = getAriaValueText(currentValue!));
  state.input.onChange = onChange;

  return state;
};
