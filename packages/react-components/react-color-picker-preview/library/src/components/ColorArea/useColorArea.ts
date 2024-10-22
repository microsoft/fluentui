import * as React from 'react';
import { useId, slot, getPartitionedNativeProps, useMergedRefs, mergeCallbacks } from '@fluentui/react-utilities';
import type { ColorAreaProps, ColorAreaState } from './ColorArea.types';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import { clamp, useEventCallback, useControllableState } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { tinycolor, HSVA, Numberify } from '@ctrl/tinycolor';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';
import { MIN, MAX, INITIAL_COLOR } from '../../utils/constants';

/**
 * Create the state required to render ColorArea.
 *
 * The returned state can be modified with hooks such as useColorAreaStyles_unstable,
 * before being passed to renderColorArea_unstable.
 *
 * @param props - props from this instance of ColorArea
 * @param ref - reference to root HTMLInputElement of ColorArea
 */
export const useColorArea_unstable = (props: ColorAreaProps, ref: React.Ref<HTMLInputElement>): ColorAreaState => {
  const { targetDocument } = useFluent();
  const onChangeFromContext = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange'],
  });

  const {
    onChange = onChangeFromContext,
    // Slots
    root,
    inputX,
    inputY,
    thumb,
  } = props;

  const hsvColor = React.useMemo(() => tinycolor(props.color || INITIAL_COLOR).toHsv(), [props.color]);
  const [color, setColor] = React.useState(hsvColor);

  const saturation = Math.round(color.s * 100);
  const value = Math.round(color.v * 100);
  const coordinates = { x: saturation, y: value };

  function getCoordinates(event: MouseEvent) {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) {
      return coordinates;
    }
    const newX = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const newY = 100 - Math.round(((event.clientY - rect.top) / rect.height) * 100);

    return {
      x: clamp(newX, MIN, MAX),
      y: clamp(newY, MIN, MAX),
    };
  }

  const requestColorChange = useEventCallback((event: MouseEvent) => {
    const _coordinates = getCoordinates(event);
    const newColor = { h: color.h, s: _coordinates.x / 100, v: _coordinates.y / 100, a: 1 };
    setColor(newColor);
    onChange?.(event, {
      type: 'mousemove',
      event,
      color: parseColor(newColor),
    });
  });

  const handleDocumentMouseMove = React.useCallback(
    (event: MouseEvent) => {
      requestColorChange(event);
    },
    [requestColorChange],
  );
  const handleDocumentMouseUp = useEventCallback(() => {
    targetDocument?.removeEventListener('mousemove', handleDocumentMouseMove);
    targetDocument?.removeEventListener('mouseup', handleDocumentMouseUp);
  });

  const _onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    requestColorChange(event.nativeEvent);

    targetDocument?.addEventListener('mousemove', handleDocumentMouseMove);
    targetDocument?.addEventListener('mouseup', handleDocumentMouseUp);
  };

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newValue = Number(event.target.value);
    const newColor = { h: color.h, s: newValue / 100, v: coordinates.y / 100, a: 1 };
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
      const newY = event.key === 'ArrowUp' ? clamp(coordinates.y + 1, MIN, MAX) : clamp(coordinates.y - 1, MIN, MAX);
      const newColor = { h: color.h, s: coordinates.x / 100, v: newY / 100, a: 1 };
      setColor(newColor);
      onChange?.(event, {
        type: 'change',
        event,
        color: parseColor(newColor),
      });
    }
  });

  const rootVariables = {
    [colorAreaCSSVars.areaXProgressVar]: `${coordinates.x}%`,
    [colorAreaCSSVars.areaYProgressVar]: `${coordinates.y}%`,
    [colorAreaCSSVars.thumbColorVar]: 'transparent',
    [colorAreaCSSVars.mainColorVar]: `hsl(${color.h}, 100%, 50%)` || '#fff',
  };

  const state: ColorAreaState = {
    components: {
      inputX: 'input',
      inputY: 'input',
      root: 'div',
      thumb: 'div',
    },
    root: slot.always(root, {
      defaultProps: { ...nativeProps.root },
      elementType: 'div',
    }),
    inputX: slot.always(inputX, {
      defaultProps: {
        id: useId('sliderX-', props.id),
        type: 'range',
        ref,
        ...nativeProps.primary,
      },
      elementType: 'input',
    }),
    inputY: slot.always(inputY, {
      defaultProps: {
        id: useId('sliderY-', props.id),
        type: 'range',
      },
      elementType: 'input',
    }),
    thumb: slot.always(thumb, { elementType: 'div' }),
  };

  const rootRef = useMergedRefs(state.root.ref);
  state.root.ref = rootRef;
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  state.root.onMouseDown = useEventCallback(mergeCallbacks(state.root.onMouseDown, _onMouseDown));
  state.inputX.onChange = _onChange;
  state.inputX.onKeyDown = _onKeyDown;
  state.inputX.value = coordinates.x;
  state.inputY.value = coordinates.y;

  return state;
};

function parseColor(color: Numberify<HSVA>) {
  return tinycolor(color).toRgbString();
}
