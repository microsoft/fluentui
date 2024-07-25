import * as React from 'react';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { colorSliderCSSVars } from './useColorSliderStyles.styles';
import type { ColorSliderState, ColorSliderProps } from './ColorSlider.types';

const { sliderStepsPercentVar, sliderProgressVar, sliderDirectionVar, thumbColorVar, railColorVar } =
  colorSliderCSSVars;

const MAX_COLOR_HUE = 360;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useColorSliderState_unstable = (state: ColorSliderState, props: ColorSliderProps) => {
  'use no memo';

  const { min = 0, max = MAX_COLOR_HUE, color = 'red', variant } = props;
  const step = 1;
  const { dir } = useFluent();
  const [currentValue, setCurrentValue] = useControllableState({
    state: props.value,
    // defaultState: props.value,
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
    [thumbColorVar]: variant === 'hue' ? `hsl(${clampedValue}, 100%, 50%)` : 'transparent',
    [railColorVar]: color,
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
