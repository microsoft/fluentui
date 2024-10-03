import * as React from 'react';
import { clamp, useControllableState, useEventCallback, EventHandler } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import type { ColorAreaState, ColorAreaProps, ColorAreaOnColorChangeData } from './ColorArea.types';

const { areaXProgressVar, areaYProgressVar, thumbColorVar, mainColorVar } = colorAreaCSSVars;

const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

export const useColorAreaState_unstable = (state: ColorAreaState, props: ColorAreaProps) => {
  'use no memo';

  const { targetDocument } = useFluent();
  const { color, min = 0, max = 100, x, y, onColorChange, onMouseDown, onMouseUp } = props;

  const [currentXValue, setCurrentXValue] = useControllableState({
    state: x,
    initialState: 0,
  });
  const [currentYValue, setCurrentYValue] = useControllableState({
    state: y,
    initialState: 0,
  });

  const [isDragging, setIsDragging] = React.useState(false);

  const clampedXValue = clamp(currentXValue, min, max);
  const clampedYValue = clamp(currentYValue, min, max);

  const valueXPercent = getPercent(clampedXValue, min, max);
  const valueYPercent = getPercent(clampedYValue, min, max);

  function getCoordinates(event: React.MouseEvent<HTMLDivElement>) {
    const ref = state.root.ref as React.MutableRefObject<HTMLDivElement>;
    const rect = ref ? ref.current?.getBoundingClientRect() : event.currentTarget.getBoundingClientRect();
    const newX = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const newY = 100 - Math.round(((event.clientY - rect.top) / rect.height) * 100);

    setCurrentXValue(clamp(newX, min, max));
    setCurrentYValue(clamp(newY, min, max));
    return {
      x: clamp(newX, min, max),
      y: clamp(newY, min, max),
    };
  }

  const requestColorChange = useEventCallback((event: React.MouseEvent<HTMLDivElement>) =>
    onColorChange?.(event, {
      type: 'onMouseMove',
      event,
      x: getCoordinates(event).x,
      y: getCoordinates(event).y,
    }),
  );

  const _onMouseDown = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onMouseDown?.(event);
    setIsDragging(true);
    onColorChange?.(event, {
      type: 'onMouseMove',
      event,
      ...getCoordinates(event),
      y: getCoordinates(event).y,
    });
    targetDocument?.addEventListener('mousemove', requestColorChange);
  });

  const _onMouseUp = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onMouseUp?.(event);
    setIsDragging(false);
    targetDocument?.removeEventListener('mousemove', requestColorChange);
    onColorChange?.(event, {
      type: 'onMouseMove',
      event,
      x: getCoordinates(event).x,
      y: getCoordinates(event).y,
    });
  });

  React.useEffect(() => {
    if (isDragging) {
      targetDocument?.addEventListener('mouseup', () => {
        setIsDragging(false);
        targetDocument?.removeEventListener('mousemove', requestColorChange);
      });
    }
  }, [isDragging, requestColorChange, targetDocument]);

  const rootVariables = {
    [areaXProgressVar]: `${valueXPercent}%`,
    [areaYProgressVar]: `${valueYPercent}%`,
    [thumbColorVar]: 'transparent',
    [mainColorVar]: color || 'red',
  };

  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  state.inputX.value = clampedXValue;
  state.inputY.value = clampedYValue;
  state.root.onMouseDown = _onMouseDown;
  state.root.onMouseUp = _onMouseUp;

  return state;
};
