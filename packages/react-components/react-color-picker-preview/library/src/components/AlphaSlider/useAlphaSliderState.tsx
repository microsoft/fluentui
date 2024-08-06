import * as React from 'react';
import { clamp, useControllableState, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { alphaSliderCSSVars } from './useAlphaSliderStyles.styles';
import type { AlphaSliderState, AlphaSliderProps } from './AlphaSlider.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';

const { sliderStepsPercentVar, sliderProgressVar, sliderDirectionVar, thumbColorVar, railColorVar } =
  alphaSliderCSSVars;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useAlphaSliderState_unstable = (state: AlphaSliderState, props: AlphaSliderProps) => {
  'use no memo';

  const { dir } = useFluent();
  const { min = 0, value } = props;
  const ctxOverlayColor = useColorPickerContextValue_unstable(ctx => ctx.overlayColor);
  const ctxAlpha = useColorPickerContextValue_unstable(ctx => ctx.alphaValue);
  const ctxOnChange = useColorPickerContextValue_unstable(ctx => ctx.requestChange);

  const overlayColor = props.overlayColor ?? ctxOverlayColor;
  const max = props.max || 100;
  const step = 1;

  const [currentValue, setCurrentValue] = useControllableState({
    state: value,
    defaultState: ctxAlpha,
    initialState: 0,
  });

  const clampedValue = clamp(currentValue, min, max);
  const valuePercent = getPercent(clampedValue, min, max);

  const inputOnChange = state.input.onChange;
  const propsOnChange = props.onChange;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(ev => {
    const newValue = Number(ev.target.value);
    setCurrentValue(clamp(newValue, min, max));

    if (inputOnChange && inputOnChange !== propsOnChange) {
      inputOnChange(ev);
    } else if (propsOnChange) {
      propsOnChange(ev, { value: newValue });
    }
  });

  const requestOnChange = useEventCallback(
    mergeCallbacks(onChange, (event: React.ChangeEventHandler<HTMLInputElement>) =>
      ctxOnChange(event, {
        alpha: currentValue,
      }),
    ),
  );

  const rootVariables = {
    [sliderDirectionVar]: state.vertical ? '0deg' : dir === 'ltr' ? '90deg' : '270deg',
    [sliderStepsPercentVar]: step && step > 0 ? `${(step * 100) / (max - min)}%` : '',
    [sliderProgressVar]: `${valuePercent}%`,
    [thumbColorVar]: 'transparent',
    [railColorVar]: overlayColor,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  // Input Props
  state.input.value = clampedValue;
  state.input.onChange = requestOnChange;

  return state;
};
