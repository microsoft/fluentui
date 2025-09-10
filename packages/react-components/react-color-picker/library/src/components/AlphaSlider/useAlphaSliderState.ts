import * as React from 'react';
import { tinycolor } from '@ctrl/tinycolor';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { alphaSliderCSSVars } from './useAlphaSliderStyles.styles';
import type { AlphaSliderState, AlphaSliderProps } from './AlphaSlider.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';
import { MIN, MAX } from '../../utils/constants';
import { getPercent } from '../../utils/getPercent';
import { adjustToTransparency, calculateTransparencyValue, getSliderDirection } from './alphaSliderUtils';
import { createHsvColor } from '../../utils/createHsvColor';

export const useAlphaSliderState_unstable = (state: AlphaSliderState, props: AlphaSliderProps): AlphaSliderState => {
  'use no memo';

  const { dir } = useFluent();
  const onChangeFromContext = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const colorFromContext = useColorPickerContextValue_unstable(ctx => ctx.color);
  const { color, onChange = onChangeFromContext, transparency = false, vertical = false } = props;
  const hsvColor = color || colorFromContext;
  const hslColor = tinycolor(hsvColor).toHsl();

  const [currentValue, setCurrentValue] = useControllableState({
    defaultState: calculateTransparencyValue(transparency, props.defaultColor?.a),
    state: calculateTransparencyValue(transparency, hsvColor?.a),
    initialState: adjustToTransparency(100, transparency),
  });

  const clampedValue = clamp(currentValue, MIN, MAX);
  const valuePercent = getPercent(clampedValue, MIN, MAX);

  const inputOnChange = state.input.onChange;

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newValue = adjustToTransparency(Number(event.target.value), transparency);
    const newColor = createHsvColor({ ...hsvColor, a: newValue / 100 });
    setCurrentValue(newValue);
    inputOnChange?.(event);
    onChange?.(event, { type: 'change', event, color: newColor });
  });

  const sliderDirection = getSliderDirection(dir, vertical, transparency);

  const rootVariables = {
    [alphaSliderCSSVars.sliderDirectionVar]: sliderDirection,
    [alphaSliderCSSVars.sliderProgressVar]: `${valuePercent}%`,
    [alphaSliderCSSVars.thumbColorVar]: `hsla(${hslColor.h} ${hslColor.s * 100}%, ${hslColor.l * 100}%, ${hslColor.a})`,
    [alphaSliderCSSVars.railColorVar]: `hsl(${hslColor.h} ${hslColor.s * 100}%, ${hslColor.l * 100}%)`,
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
