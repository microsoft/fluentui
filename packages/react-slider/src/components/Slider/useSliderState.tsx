import * as React from 'react';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import { sliderCSSVars } from './useSliderStyles';
import type { SliderState } from './Slider.types';

const { railOffsetVar, railStepsPercentVar, railProgressVar, thumbPositionVar, railDirectionVar } = sliderCSSVars;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useSliderState_unstable = (state: SliderState) => {
  const { value, defaultValue = 0, min = 0, max = 100, step = 1, origin } = state;
  const { dir } = useFluent();
  const [currentValue, setCurrentValue] = useControllableState({
    state: value !== undefined ? clamp(value, min, max) : undefined,
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
    setCurrentValue(clamp(newValue, min, max));

    if (inputOnChange && inputOnChange !== propsOnChange) {
      inputOnChange(ev);
    } else if (propsOnChange) {
      propsOnChange(ev, { value: newValue });
    }
  });

  const rootVariables = {
    [railDirectionVar]: state.vertical ? '0deg' : dir === 'ltr' ? '90deg' : '270deg',
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
  state.input.onChange = onChange;

  return state;
};
