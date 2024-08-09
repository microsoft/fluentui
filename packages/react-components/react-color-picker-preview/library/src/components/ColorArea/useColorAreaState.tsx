import * as React from 'react';
import { clamp, useControllableState, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import type { ColorAreaState, ColorAreaProps } from './ColorArea.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';

const { mainColorVar, thumbColorVar, sliderStepsPercentVar, sliderProgressXVar, sliderProgressYVar } = colorAreaCSSVars;

export const useColorAreaState_unstable = (state: ColorAreaState, props: ColorAreaProps) => {
  'use no memo';

  const { min = 0, max = 100, color = 'red', onClick = () => {} } = props;
  const step = 1;
  const ctxOnChange = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  // const [currentValue, setCurrentValue] = useControllableState({
  //   state: props.value,
  //   initialState: 0,
  // });
  // const clampedValue = clamp(currentValue, min, max);

  // TODO - use controllable state
  const [x, setX] = React.useState(96);
  const [y, setY] = React.useState(0);

  const _onClick: React.MouseEvent<HTMLDivElement> = useEventCallback(ev => {
    const rect = ev.target.getBoundingClientRect();
    const newX = Math.round(((ev.clientX - rect.left) / rect.width) * 100);
    const newY = Math.round(((ev.clientY - rect.top) / rect.height) * 100);

    setX(newX);
    setY(newY);
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

  // const inputOnChange = state.root.onChange;
  // const propsOnChange = props.onChange;

  // const onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(ev => {
  //   const newValue = Number(ev.target.value);
  //   setCurrentValue(clamp(newValue, min, max));

  //   if (inputOnChange && inputOnChange !== propsOnChange) {
  //     inputOnChange(ev);
  //   } else if (propsOnChange) {
  //     propsOnChange(ev, { x: newValue });
  //   }
  // });

  const rootVariables = {
    [sliderStepsPercentVar]: step && step > 0 ? `${(step * 100) / (max - min)}%` : '',
    [sliderProgressXVar]: `${x}%`,
    [sliderProgressYVar]: `${y}%`,
    [thumbColorVar]: `hsl(${color}, 100%, 50%)`,
    [mainColorVar]: color,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  // Input Props
  state.inputX.value = x;
  state.inputY.value = y;
  // state.inputX.onChange = onChange;
  state.root.onClick = requestOnClick;

  return state;
};
