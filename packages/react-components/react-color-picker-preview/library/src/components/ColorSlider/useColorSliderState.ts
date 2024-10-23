import * as React from 'react';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { colorSliderCSSVars } from './useColorSliderStyles.styles';
import type { ColorSliderState, ColorSliderProps } from './ColorSlider.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';
import { tinycolor } from '@ctrl/tinycolor';

const { sliderProgressVar, sliderDirectionVar, thumbColorVar } = colorSliderCSSVars;

const MAX = 360;
const MIN = 0;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useColorSliderState_unstable = (state: ColorSliderState, props: ColorSliderProps) => {
  'use no memo';

  const { dir } = useFluent();
  const onChangeFromContext = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const colorFromContext = useColorPickerContextValue_unstable(ctx => ctx.color);
  const { onChange = onChangeFromContext, color } = props;
  const _color = colorFromContext || color;
  const hsvColor = tinycolor(_color).toHsv();

  const [currentValue, setCurrentValue] = useControllableState({
    state: hsvColor.h,
    initialState: 0,
  });
  const clampedValue = clamp(currentValue, MIN, MAX);
  const valuePercent = getPercent(clampedValue, MIN, MAX);

  const inputOnChange = state.input.onChange;

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newValue = Number(event.target.value);
    const newColor = tinycolor({ ...hsvColor, h: newValue }).toRgbString();
    setCurrentValue(clamp(newValue, MIN, MAX));
    inputOnChange?.(event);
    onChange?.(event, { type: 'change', event, color: newColor });
    onChangeFromContext(event, {
      color: newColor,
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
