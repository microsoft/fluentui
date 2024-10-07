import * as React from 'react';
import { clamp, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import type { ColorAreaState, ColorAreaProps } from './ColorArea.types';

const { areaXProgressVar, areaYProgressVar, thumbColorVar, mainColorVar } = colorAreaCSSVars;

const MIN = 0;
const MAX = 100;

const getPercent = (value: number) => {
  return ((value - MIN) / (MAX - MIN)) * 100;
};

type Coordinates = {
  x: number;
  y: number;
};

export const useColorAreaState_unstable = (state: ColorAreaState, props: ColorAreaProps) => {
  'use no memo';

  const { targetDocument } = useFluent();
  const { color, x = 0, y = 0, onChange, onMouseDown, onMouseUp } = props;

  const [coordinates, setCoordinates] = useControllableState<Coordinates>({
    state: { x, y },
    initialState: { x: 0, y: 0 },
  });
  const [isDragging, setIsDragging] = React.useState(false);

  const clampedXValue = clamp(coordinates.x, MIN, MAX);
  const clampedYValue = clamp(coordinates.y, MIN, MAX);

  const valueXPercent = getPercent(clampedXValue);
  const valueYPercent = getPercent(clampedYValue);

  function getCoordinates(event: React.MouseEvent<HTMLDivElement>) {
    const ref = state.root.ref as React.MutableRefObject<HTMLDivElement>;
    const rect = ref ? ref.current?.getBoundingClientRect() : event.currentTarget.getBoundingClientRect();
    const newX = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const newY = 100 - Math.round(((event.clientY - rect.top) / rect.height) * 100);

    return {
      x: clamp(newX, MIN, MAX),
      y: clamp(newY, MIN, MAX),
    };
  }

  const requestColorChange = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const _coordinates = getCoordinates(event);
    setCoordinates(_coordinates);
    return onChange?.(event, {
      type: 'onMouseMove',
      event,
      ..._coordinates,
    });
  });

  const _onMouseDown = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onMouseDown?.(event);
    setIsDragging(true);
    requestColorChange(event);
    targetDocument?.addEventListener('mousemove', requestColorChange);
  });

  const _onMouseUp = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onMouseUp?.(event);
    setIsDragging(false);
    targetDocument?.removeEventListener('mousemove', requestColorChange);
  });

  React.useEffect(() => {
    if (isDragging) {
      targetDocument?.addEventListener('mouseup', _onMouseUp);
    } else {
      targetDocument?.removeEventListener('mouseup', _onMouseUp);
    }
  }, [isDragging, _onMouseUp, targetDocument]);

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
