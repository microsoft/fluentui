import * as React from 'react';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { sliderCSSVars } from './useSliderStyles.styles';
import type { SliderState, SliderProps } from './Slider.types';

const {
  sliderStepsPercentVar,
  sliderProgressVar,
  sliderProgressValueVar,
  sliderDirectionVar,
  sliderStepsColorVar,
  sliderStepsGradientVar,
} = sliderCSSVars;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

/**
 * Generates a linear gradient CSS value representing the steps of a slider.
 *
 * @param stepSize - The step size for each gradient stop.
 * @returns The linear gradient CSS value.
 */
const getStepsGradient = (stepSize: number) => {
  const steps = [];

  for (let step = stepSize; step < 100; step += stepSize) {
    steps.push(
      `#0000 calc(${step}% - 1px)`,
      `var(${sliderStepsColorVar}) calc(${step}% - 1px)`,
      `var(${sliderStepsColorVar}) ${step}%`,
      `#0000 ${step}%`,
    );
  }

  return `linear-gradient(var(${sliderDirectionVar}), #0000 0, ${steps.join(', ')}, #0000 100%)`;
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

  const stepsPercent = step && step > 0 ? (step * 100) / (max - min) : 0;

  const rootVariables = {
    [sliderDirectionVar]: state.vertical ? '0deg' : dir === 'ltr' ? '90deg' : '270deg',
    [sliderStepsPercentVar]: stepsPercent ? `${stepsPercent}%` : '',
    [sliderProgressVar]: `${valuePercent}%`,
    [sliderProgressValueVar]: `${valuePercent / 100}`,
    [sliderStepsGradientVar]: getStepsGradient(stepsPercent),
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
