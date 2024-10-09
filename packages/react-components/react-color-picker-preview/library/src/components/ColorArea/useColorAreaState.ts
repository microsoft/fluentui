import * as React from 'react';
import { clamp, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import type { ColorAreaState, ColorAreaProps } from './ColorArea.types';
import { tinycolor } from '@ctrl/tinycolor';

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
  const { color, onChange, onMouseDown, onMouseUp } = props;
  const hsvColor = tinycolor(color).toHsv();
  const saturation = hsvColor.s * 100;
  const value = hsvColor.v * 100;
  const [coordinates, setCoordinates] = React.useState<Coordinates>({ x: saturation, y: value });

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
    const newColor = tinycolor({ h: hsvColor.h, s: _coordinates.x / 100, v: _coordinates.y / 100 }).toRgbString();

    onChange?.(event, {
      type: 'onMouseMove',
      event,
      color: newColor,
    });
  });

  const _onMouseUp = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    onMouseUp?.(event);
    targetDocument?.removeEventListener('mousemove', requestColorChange as unknown as EventListener);
    targetDocument?.removeEventListener('mouseup', _onMouseUp as unknown as EventListener);
  });

  const _onMouseDown = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onMouseDown?.(event);
    requestColorChange(event);
    targetDocument?.addEventListener('mousemove', requestColorChange as unknown as EventListener);
    targetDocument?.addEventListener('mouseup', _onMouseUp as unknown as EventListener);
  });

  const rootVariables = {
    [areaXProgressVar]: `${getPercent(coordinates.x)}%`,
    [areaYProgressVar]: `${getPercent(coordinates.y)}%`,
    [thumbColorVar]: 'transparent',
    [mainColorVar]: color || '#fff',
  };

  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  state.root.onMouseDown = _onMouseDown;
  state.root.onMouseUp = _onMouseUp;

  return state;
};
