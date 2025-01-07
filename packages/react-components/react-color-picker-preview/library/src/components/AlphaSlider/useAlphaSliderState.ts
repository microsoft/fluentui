import * as React from 'react';
import { tinycolor } from '@ctrl/tinycolor';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { alphaSliderCSSVars } from './useAlphaSliderStyles.styles';
import type { AlphaSliderState, AlphaSliderProps } from './AlphaSlider.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';
import { MIN, MAX } from '../../utils/constants';
import { getPercent } from '../../utils/getPercent';
import type { HsvColor } from '../../types/color';

export const useAlphaSliderState_unstable = (state: AlphaSliderState, props: AlphaSliderProps) => {
  'use no memo';

  const { dir } = useFluent();
  const onChangeFromContext = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const colorFromContext = useColorPickerContextValue_unstable(ctx => ctx.color);
  const { color, onChange = onChangeFromContext, transparency } = props;
  const hsvColor = color || colorFromContext;
  const hslColor = tinycolor(hsvColor).toHsl();

  function adjustToTransparency(value: number) {
    return transparency ? 100 - value : value;
  }

  const defaultState = props.defaultColor?.a !== undefined ? props.defaultColor.a * 100 : undefined;
  const _state = hsvColor?.a !== undefined ? hsvColor.a * 100 : undefined;
  const [currentValue, setCurrentValue] = useControllableState({
    defaultState: defaultState && adjustToTransparency(defaultState),
    state: _state && adjustToTransparency(_state),
    initialState: 100,
  });
  const clampedValue = clamp(currentValue, MIN, MAX);
  const valuePercent = getPercent(clampedValue, MIN, MAX);

  const inputOnChange = state.input.onChange;

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newValue = adjustToTransparency(Number(event.target.value));
    const newColor: HsvColor = { ...hsvColor, a: newValue / 100 };
    setCurrentValue(newValue);
    inputOnChange?.(event);
    onChange?.(event, { type: 'change', event, color: newColor });
  });

  const sliderDirection = state.vertical
    ? transparency
      ? '180deg'
      : '0deg'
    : dir === 'ltr' && !transparency
    ? '90deg'
    : '-90deg';

  const rootVariables = {
    [alphaSliderCSSVars.sliderDirectionVar]: sliderDirection,
    [alphaSliderCSSVars.sliderProgressVar]: `${valuePercent}%`,
    [alphaSliderCSSVars.thumbColorVar]: `transparent`,
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
