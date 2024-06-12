import * as React from 'react';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { sliderCSSVars } from './useSliderStyles.styles';
import type { SliderState, SliderProps } from './Slider.types';

const { sliderStepsPercentVar, sliderProgressVar, sliderDirectionVar } = sliderCSSVars;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useSliderState_unstable = (state: SliderState, props: SliderProps) => {
  'use no memo';

  const { min = 0, max = 100, step } = props;
  const { dir } = useFluent();
  const [currentValue, setCurrentValue] = useControllableState({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: 0,
  });
  const clampedValue = clamp(currentValue, min, max);
  const valuePercent = getPercent(clampedValue, min, max);

  const inputOnChange = state.input.onChange;
  const propsOnChange = props.onChange;

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
    [sliderDirectionVar]: state.vertical ? '0deg' : dir === 'ltr' ? '90deg' : '270deg',
    [sliderStepsPercentVar]: step && step > 0 ? `${(step * 100) / (max - min)}%` : '',
    [sliderProgressVar]: `${valuePercent}%`,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  // Input Props
  state.input.value = clampedValue;
  state.input.onChange = onChange;

  return state;
};
