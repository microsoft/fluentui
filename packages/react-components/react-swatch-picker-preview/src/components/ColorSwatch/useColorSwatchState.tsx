import * as React from 'react';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
// import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { swatchCSSVars } from './useColorSwatchStyles.styles';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';

const { swatchColor } = swatchCSSVars;

export const useColorSwatchState_unstable = (state: ColorSwatchState, props: ColorSwatchProps) => {
  const { color = 'transparent' } = props;
  // const [currentValue, setCurrentValue] = useControllableState({
  //   state: value !== undefined ? clamp(value, min, max) : undefined,
  //   defaultState: clamp(defaultValue, min, max),
  //   initialState: 0,
  // });

  // const onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(ev => {
  //   const newValue = Number(ev.target.value);
  //   setCurrentValue(clamp(newValue, min, max));

  //   if (inputOnChange && inputOnChange !== propsOnChange) {
  //     inputOnChange(ev);
  //   } else if (propsOnChange) {
  //     propsOnChange(ev, { value: newValue });
  //   }
  // });

  // const rootVariables = {
  //   [sliderDirectionVar]: state.vertical ? '0deg' : dir === 'ltr' ? '90deg' : '270deg',
  //   [sliderStepsPercentVar]: step && step > 0 ? `${(step * 100) / (max - min)}%` : '',
  //   [sliderProgressVar]: `${valuePercent}%`,
  // };

  const rootVariables = {
    [swatchColor]: color,
  };
  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  // Input Props
  // state.input.value = currentValue;
  // state.input.onChange = onChange;

  return state;
};
