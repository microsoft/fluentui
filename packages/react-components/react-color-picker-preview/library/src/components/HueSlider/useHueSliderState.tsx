import * as React from 'react';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { hueSliderCSSVars } from './useHueSliderStyles.styles';
import type { HueSliderState, HueSliderProps } from './HueSlider.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';

const { sliderStepsPercentVar, sliderProgressVar, sliderDirectionVar, thumbColorVar, railColorVar } = hueSliderCSSVars;

const MAX_COLOR_HUE = 360;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useHueSliderState_unstable = (state: HueSliderState, props: HueSliderProps) => {
  'use no memo';

  const { dir } = useFluent();
  const { min = 0, value } = props;
  const ctxColor = useColorPickerContextValue_unstable(ctx => ctx.color);
  const color = props.color ?? ctxColor;
  const max = props.max || MAX_COLOR_HUE;
  const step = 1;

  const [currentValue, setCurrentValue] = useControllableState({
    state: value,
    initialState: 0,
  });
  const clampedValue = clamp(currentValue, min, max);
  const valuePercent = getPercent(clampedValue, min, max);

  const inputOnChange = state.input.onChange;
  const ctxOnChange = useColorPickerContextValue_unstable(ctx => ctx.onChange);
  const propsOnChange = props.onChange || ctxOnChange;

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
    [thumbColorVar]: `hsl(${clampedValue}, 100%, 50%)`,
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
