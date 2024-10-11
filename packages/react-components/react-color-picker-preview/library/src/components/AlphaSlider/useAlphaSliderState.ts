import * as React from 'react';
import { tinycolor } from '@ctrl/tinycolor';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { alphaSliderCSSVars } from './useAlphaSliderStyles.styles';
import type { AlphaSliderState, AlphaSliderProps } from './AlphaSlider.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';

const { sliderProgressVar, sliderDirectionVar, thumbColorVar, railColorVar } = alphaSliderCSSVars;

const MIN = 0;
const MAX = 100;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useAlphaSliderState_unstable = (state: AlphaSliderState, props: AlphaSliderProps) => {
  'use no memo';

  const { dir } = useFluent();
  const onChangeFromContext = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const colorFromContext = useColorPickerContextValue_unstable(ctx => ctx.color);
  const { color, onChange = onChangeFromContext } = props;
  const _color = colorFromContext || color;
  const hslColor = tinycolor(_color).toHsl();

  const [currentValue, setCurrentValue] = useControllableState({
    state: hslColor.a * 100,
    initialState: 0,
  });
  const clampedValue = clamp(currentValue, MIN, MAX);
  const valuePercent = getPercent(clampedValue, MIN, MAX);

  const inputOnChange = state.input.onChange;

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newValue = Number(event.target.value);
    const newColor = tinycolor({ ...hslColor, a: newValue / 100 }).toRgbString();
    setCurrentValue(clamp(newValue, MIN, MAX));
    inputOnChange?.(event);
    onChange?.(event, { type: 'change', event, color: newColor });
    onChangeFromContext(event, {
      color: newColor,
    });
  });

  const rootVariables = {
    [sliderDirectionVar]: state.vertical ? '0deg' : dir === 'ltr' ? '90deg' : '-90deg',
    [sliderProgressVar]: `${valuePercent}%`,
    [thumbColorVar]: `transparent`,
    [railColorVar]: `hsl(${hslColor.h} ${hslColor.s * 100}%, ${hslColor.l * 100}%)`,
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
