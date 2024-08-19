import * as React from 'react';
import { clamp, useControllableState, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import type { ColorAreaState, ColorAreaProps } from './ColorArea.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';

const { mainColorVar, thumbColorVar, sliderStepsPercentVar, sliderProgressXVar, sliderProgressYVar } = colorAreaCSSVars;

export const useColorAreaState_unstable = (state: ColorAreaState, props: ColorAreaProps) => {
  'use no memo';

  const { min = 0, max = 100, onClick = () => {}, x, y } = props;
  const step = 1;
  const ctxColor = useColorPickerContextValue_unstable(ctx => ctx.color);
  const ctxX = useColorPickerContextValue_unstable(ctx => ctx.xValue);
  const ctxY = useColorPickerContextValue_unstable(ctx => ctx.yValue);
  const ctxOnChange = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const color = props.color ?? ctxColor;

  const [currentXValue, setCurrentXValue] = useControllableState({
    state: x || ctxX,
    initialState: 0,
  });
  const [currentYValue, setCurrentYValue] = useControllableState({
    state: y || ctxY,
    initialState: 0,
  });

  const clampedXValue = clamp(currentXValue, min, max);
  const clampedYValue = clamp(currentYValue, min, max);
  // const valueXPercent = getPercent(clampedXValue, min, max);
  // const valueYPercent = getPercent(clampedYValue, min, max);

  function keyboardEvent(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key === 'ArrowRight') {
      const newXValue = currentXValue + 1;
      setCurrentXValue(clamp(newXValue, min, max));
    } else if (ev.key === 'ArrowLeft') {
      const newXValue = currentXValue - 1;
      setCurrentXValue(clamp(newXValue, min, max));
    } else if (ev.key === 'ArrowUp') {
      const newYValue = currentYValue + 1;
      setCurrentYValue(clamp(newYValue, min, max));
    } else if (ev.key === 'ArrowDown') {
      const newYValue = currentYValue - 1;
      setCurrentYValue(clamp(newYValue, min, max));
    }
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useEventCallback(ev => keyboardEvent(ev));

  const requestOnChange = useEventCallback(
    mergeCallbacks(onKeyDown, (event: React.KeyboardEventHandler<HTMLInputElement>) =>
      ctxOnChange(event, {
        x: Number(state.inputX.value),
        y: Number(state.inputY.value),
      }),
    ),
  );

  const _onClick: React.MouseEvent<HTMLDivElement> = useEventCallback(ev => {
    const rect = ev.target.getBoundingClientRect();
    const newX = Math.round(((ev.clientX - rect.left) / rect.width) * 100);
    const newY = Math.round(((ev.clientY - rect.top) / rect.height) * 100);

    setCurrentXValue(newX);
    setCurrentYValue(newY);
  });

  function getValue(ev: React.MouseEvent<HTMLDivElement>) {
    const rect = ev.target.getBoundingClientRect();
    const newX = Math.round(((ev.clientX - rect.left) / rect.width) * 100);
    const newY = 100 - Math.round(((ev.clientY - rect.top) / rect.height) * 100);
    // const lightness = newX * 0.5 + newY * 0.5;
    return {
      x: newX,
      y: newY,
    };
  }

  const requestOnClick = useEventCallback(
    mergeCallbacks(_onClick, (event: React.MouseEvent<HTMLDivElement>) =>
      onClick(event, {
        x: getValue(event).x,
        y: getValue(event).y,
      }),
    ),
  );

  const rootVariables = {
    [sliderStepsPercentVar]: step && step > 0 ? `${(step * 100) / (max - min)}%` : '',
    [sliderProgressXVar]: `${currentXValue}%`,
    [sliderProgressYVar]: `${currentYValue}%`,
    [thumbColorVar]: `hsl(${color}, 100%, 50%)`,
    [mainColorVar]: color,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  // Input Props
  state.inputX.value = clampedXValue;
  state.inputY.value = clampedYValue;
  state.inputX.onChange = requestOnChange;
  state.inputX.onKeyDown = onKeyDown;
  state.root.onClick = requestOnClick;

  return state;
};
