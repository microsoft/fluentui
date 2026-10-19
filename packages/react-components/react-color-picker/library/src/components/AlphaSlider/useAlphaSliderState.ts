'use client';

import type * as React from 'react';
import { clamp, getPercentInRange, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { alphaSliderCSSVars } from './AlphaSlider.constants';
import type { AlphaSliderState, AlphaSliderProps } from './AlphaSlider.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';
import { MIN, MAX } from '../../utils/constants';
import { adjustToTransparency, getSliderDirection } from './alphaSliderUtils';
import { createHsvColor } from '../../utils/createHsvColor';
import { createHslColor } from '../../utils/createHslColor';
import type { HsvColor } from '../../types/color';

export const useAlphaSliderState_unstable = (state: AlphaSliderState, props: AlphaSliderProps): AlphaSliderState => {
  const { dir } = useFluent();
  const onChangeFromContext = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const colorFromContext = useColorPickerContextValue_unstable(ctx => ctx.color);
  const { color, onChange = onChangeFromContext, transparency = false, vertical = false } = props;
  const [currentColor, setCurrentColor] = useControllableState<HsvColor>({
    defaultState: props.defaultColor,
    state: color || colorFromContext,
    initialState: createHsvColor({}),
  });
  const hslColor = createHslColor(currentColor);
  const currentValue = adjustToTransparency((currentColor.a ?? 1) * 100, transparency);

  const clampedValue = clamp(currentValue, MIN, MAX);
  const valuePercent = getPercentInRange(clampedValue, MIN, MAX);

  const inputOnChange = state.input.onChange;

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newValue = adjustToTransparency(Number(event.target.value), transparency);
    const newColor = createHsvColor({ ...currentColor, a: newValue / 100 });
    setCurrentColor(newColor);
    inputOnChange?.(event);
    onChange?.(event, { type: 'change', event, color: newColor });
  });

  const sliderDirection = getSliderDirection(dir, vertical, transparency);

  const rootVariables = {
    [alphaSliderCSSVars.sliderDirectionVar]: sliderDirection,
    [alphaSliderCSSVars.sliderProgressVar]: `${valuePercent}%`,
    [alphaSliderCSSVars.thumbColorVar]: `hsla(${hslColor.h}, ${hslColor.s * 100}%, ${hslColor.l * 100}%, ${
      hslColor.a
    })`,
    [alphaSliderCSSVars.railColorVar]: `hsl(${hslColor.h}, ${hslColor.s * 100}%, ${hslColor.l * 100}%)`,
  };

  // Root props
  // eslint-disable-next-line react-hooks/immutability
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  // Input Props
  // eslint-disable-next-line react-hooks/immutability
  state.input.value = clampedValue;
  // eslint-disable-next-line react-hooks/immutability
  state.input.onChange = _onChange;

  return state;
};
