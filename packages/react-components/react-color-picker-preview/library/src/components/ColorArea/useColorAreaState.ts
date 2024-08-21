import * as React from 'react';
import { clamp, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import type { ColorAreaState, ColorAreaProps } from './ColorArea.types';
import { tinycolor, HSVA, Numberify } from '@ctrl/tinycolor';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';

const { areaXProgressVar, areaYProgressVar, thumbColorVar, mainColorVar } = colorAreaCSSVars;

const MIN = 0;
const MAX = 100;

export const useColorAreaState_unstable = (state: ColorAreaState, props: ColorAreaProps) => {
  'use no memo';

  const { targetDocument } = useFluent();
  const onChangeFromContext = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const { onChange = onChangeFromContext, onMouseDown, onMouseUp } = props;

  const hsvColor = tinycolor(props.color || '#fff').toHsv();
  const [color, setColor] = React.useState(hsvColor);

  const saturation = Math.round(color.s * 100);
  const value = Math.round(color.v * 100);
  const coordinates = { x: saturation, y: value };

  function getCoordinates(event: React.MouseEvent<HTMLDivElement>) {
    const ref = state.root.ref as React.MutableRefObject<HTMLDivElement>;
    const rect = ref.current?.getBoundingClientRect();
    const newX = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const newY = 100 - Math.round(((event.clientY - rect.top) / rect.height) * 100);

    return {
      x: clamp(newX, MIN, MAX),
      y: clamp(newY, MIN, MAX),
    };
  }

  const requestColorChange = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const _coordinates = getCoordinates(event);
    const newColor = { h: hsvColor.h, s: _coordinates.x / 100, v: _coordinates.y / 100, a: 1 };
    setColor(newColor);
    onChange?.(event, {
      type: 'mousemove',
      event,
      color: parseColor(newColor),
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

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newValue = Number(event.target.value);
    const newColor = { h: hsvColor.h, s: newValue / 100, v: coordinates.y / 100, a: 1 };
    setColor(newColor);
    onChange?.(event, {
      type: 'change',
      event,
      color: parseColor(newColor),
    });
  });

  const _onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      let newY = coordinates.y;
      if (event.key === 'ArrowUp') {
        newY = clamp(coordinates.y + 1, MIN, MAX);
      } else {
        newY = clamp(coordinates.y - 1, MIN, MAX);
      }
      const newColor = { h: hsvColor.h, s: coordinates.x / 100, v: newY / 100, a: 1 };
      setColor(newColor);
      onChange?.(event, {
        type: 'change',
        event,
        color: parseColor(newColor),
      });
    }
  });

  const rootVariables = {
    [areaXProgressVar]: `${coordinates.x}%`,
    [areaYProgressVar]: `${coordinates.y}%`,
    [thumbColorVar]: 'transparent',
    [mainColorVar]: `hsl(${hsvColor.h}, 100%, 50%)` || '#fff',
  };

  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  state.inputX.value = coordinates.x;
  state.inputY.value = coordinates.y;
  state.inputX.onChange = _onChange;
  state.inputX.onKeyDown = _onKeyDown;
  state.root.onMouseDown = _onMouseDown;
  state.root.onMouseUp = _onMouseUp;

  return state;
};

function parseColor(color: Numberify<HSVA>) {
  return tinycolor(color).toRgbString();
}
