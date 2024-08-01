import * as React from 'react';
import { clamp, useControllableState, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { alphaSliderCSSVars } from './useAlphaSliderStyles.styles';
import type { AlphaSliderState, AlphaSliderProps } from './AlphaSlider.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';
import { tinycolor } from '@ctrl/tinycolor';

const { sliderStepsPercentVar, sliderProgressVar, sliderDirectionVar, thumbColorVar, railColorVar } =
  alphaSliderCSSVars;

const MAX_COLOR_HUE = 360;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useAlphaSliderState_unstable = (state: AlphaSliderState, props: AlphaSliderProps) => {
  'use no memo';

  const { dir } = useFluent();
  const { min = 0, value } = props;
  const ctxColor = useColorPickerContextValue_unstable(ctx => ctx.color);
  const color = props.color ?? ctxColor;
  const max = props.max || 100;
  const step = 1;

  const [currentValue, setCurrentValue] = useControllableState({
    state: value,
    initialState: 0,
  });

  const [newColor, setNewColor] = React.useState(color);

  const clampedValue = clamp(currentValue, min, max);
  const valuePercent = getPercent(clampedValue, min, max);

  const inputOnChange = state.input.onChange;
  const ctxOnChange = useColorPickerContextValue_unstable(ctx => ctx.onChange);
  const propsOnChange = props.onChange || ctxOnChange;

  const requestChange = useColorPickerContextValue_unstable(ctx => ctx.requestChange);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(ev => {
    const newValue = Number(ev.target.value);
    setCurrentValue(clamp(newValue, min, max));

    if (inputOnChange && inputOnChange !== propsOnChange) {
      inputOnChange(ev);
    } else if (propsOnChange) {
      propsOnChange(ev, { value: newValue });
    }

    const hslColor = tinycolor(color).toHsl();
    setNewColor(tinycolor({ h: newValue, s: hslColor.s, l: hslColor.l }).toHex());
  });

  const onColorChange = useEventCallback(
    mergeCallbacks(
      (event: React.ChangeEventHandler<HTMLInputElement>) =>
        requestChange(event, {
          value: currentValue,
          channel: 'alpha',
          color: newColor,
        }),
      onChange,
    ),
  );

  const rootVariables = {
    [sliderDirectionVar]: state.vertical ? '0deg' : dir === 'ltr' ? '90deg' : '270deg',
    [sliderStepsPercentVar]: step && step > 0 ? `${(step * 100) / (max - min)}%` : '',
    [sliderProgressVar]: `${valuePercent}%`,
    [thumbColorVar]: 'transparent',
    [railColorVar]: color,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  // Input Props
  state.input.value = clampedValue;
  state.input.onChange = onColorChange;

  return state;
};
