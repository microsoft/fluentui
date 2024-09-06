import * as React from 'react';
import { clamp, useControllableState, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { alphaSliderCSSVars } from './useAlphaSliderStyles.styles';
import type { AlphaSliderState, AlphaSliderProps } from './AlphaSlider.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';

const { sliderProgressVar, sliderDirectionVar, thumbColorVar, railColorVar } = alphaSliderCSSVars;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useAlphaSliderState_unstable = (state: AlphaSliderState, props: AlphaSliderProps) => {
  'use no memo';

  const { dir } = useFluent();
  const { channel = 'alpha', defaultValue, min = 0, max = 100, onChange, value, overlayColor } = props;
  const ctxOnChange = useColorPickerContextValue_unstable(ctx => ctx.requestChange);

  const [currentValue, setCurrentValue] = useControllableState({
    state: value,
    defaultState: defaultValue,
    initialState: 0,
  });
  const clampedValue = clamp(currentValue, min, max);
  const valuePercent = getPercent(clampedValue, min, max);

  const inputOnChange = state.input.onChange;

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(
    mergeCallbacks(
      event => {
        const newValue = Number(event.target.value);
        setCurrentValue(clamp(newValue, min, max));
        if (inputOnChange && inputOnChange !== (onChange as unknown as React.ChangeEventHandler<HTMLInputElement>)) {
          inputOnChange(event);
        } else if (onChange) {
          onChange(event, { type: 'change', event, value: newValue, channel });
        }
      },
      (event: React.ChangeEvent<HTMLInputElement>) =>
        ctxOnChange(event, {
          value: Number(event.target.value),
          channel,
        }),
    ),
  );

  const rootVariables = {
    [sliderDirectionVar]: state.vertical ? '0deg' : dir === 'ltr' ? '90deg' : '-90deg',
    [sliderProgressVar]: `${valuePercent}%`,
    [thumbColorVar]: `transparent`,
    [railColorVar]: overlayColor,
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
