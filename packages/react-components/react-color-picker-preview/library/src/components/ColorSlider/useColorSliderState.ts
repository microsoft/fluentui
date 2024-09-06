import * as React from 'react';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { colorSliderCSSVars } from './useColorSliderStyles.styles';
import type { ColorSliderState, ColorSliderProps } from './ColorSlider.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';

const { sliderProgressVar, sliderDirectionVar, thumbColorVar } = colorSliderCSSVars;

const MAX_COLOR_HUE = 360;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useColorSliderState_unstable = (state: ColorSliderState, props: ColorSliderProps) => {
  'use no memo';

  const { dir } = useFluent();
  const onChangeFromContext = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const { channel = 'hue', defaultValue, min = 0, max = MAX_COLOR_HUE, onChange = onChangeFromContext, value } = props;

  const [currentValue, setCurrentValue] = useControllableState({
    state: value,
    defaultState: defaultValue,
    initialState: 0,
  });
  const clampedValue = clamp(currentValue, min, max);
  const valuePercent = getPercent(clampedValue, min, max);

  const inputOnChange = state.input.onChange;

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newValue = Number(event.target.value);
    setCurrentValue(clamp(newValue, min, max));
    inputOnChange?.(event);
    onChange?.(event, { type: 'change', event, value: newValue, channel });
    onChangeFromContext(event, {
      value: Number(event.target.value),
      channel,
    });
  });

  const rootVariables = {
    [sliderDirectionVar]: state.vertical ? '180deg' : dir === 'ltr' ? '-90deg' : '90deg',
    [sliderProgressVar]: `${valuePercent}%`,
    [thumbColorVar]: `hsl(${clampedValue}, 100%, 50%)`,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  // Input Props
  state.input.value = clampedValue;
  state.input.onChange = _onChange;

  return state;
};
