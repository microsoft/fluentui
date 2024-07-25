import * as React from 'react';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import type { ColorAreaState, ColorAreaProps } from './ColorArea.types';

const { mainColorVar, thumbColorVar, sliderStepsPercentVar, sliderProgressVar } = colorAreaCSSVars;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useColorAreaState_unstable = (state: ColorAreaState, props: ColorAreaProps) => {
  'use no memo';

  const { min = 0, max = 100, color = 'red' } = props;
  const step = 1;
  const [currentValue, setCurrentValue] = useControllableState({
    state: props.value,
    initialState: 0,
    // think about default state
  });
  const clampedValue = clamp(currentValue, min, max);
  const valuePercent = getPercent(clampedValue, min, max);

  const inputOnChange = state.root.onChange;
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
    [sliderStepsPercentVar]: step && step > 0 ? `${(step * 100) / (max - min)}%` : '',
    [sliderProgressVar]: `${valuePercent}%`,
    [thumbColorVar]: `hsl(${color}, 100%, 50%)`,
    [mainColorVar]: color,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  // Input Props
  state.inputX.value = clampedValue;
  state.inputX.onChange = onChange;

  return state;
};
