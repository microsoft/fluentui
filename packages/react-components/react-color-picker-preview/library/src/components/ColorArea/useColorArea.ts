import * as React from 'react';
import { useId, slot, useMergedRefs, mergeCallbacks, getIntrinsicElementProps } from '@fluentui/react-utilities';
import type { ColorAreaProps, ColorAreaState, HsvColor } from './ColorArea.types';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import { clamp, useEventCallback, useControllableState } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { tinycolor } from '@ctrl/tinycolor';
import { useFocusWithin } from '@fluentui/react-tabster';
import { MIN, MAX, INITIAL_COLOR } from '../../utils/constants';
import { getCoordinates } from '../../utils/getCoordinates';

const INITIAL_COLOR_HSV = tinycolor(INITIAL_COLOR).toHsv();

/**
 * Create the state required to render ColorArea.
 *
 * The returned state can be modified with hooks such as useColorAreaStyles_unstable,
 * before being passed to renderColorArea_unstable.
 *
 * @param props - props from this instance of ColorArea
 * @param ref - reference to root HTMLDivElement of ColorArea
 */
export const useColorArea_unstable = (props: ColorAreaProps, ref: React.Ref<HTMLDivElement>): ColorAreaState => {
  const { targetDocument } = useFluent();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const xRef = React.useRef<HTMLInputElement>(null);
  const yRef = React.useRef<HTMLInputElement>(null);
  const focusWithinRef = useFocusWithin();

  const {
    onChange,
    // Slots
    inputX,
    inputY,
    thumb,

    ...rest
  } = props;

  const [color, setColor] = useControllableState<HsvColor>({
    defaultState: props.defaultColor,
    state: props.color,
    initialState: INITIAL_COLOR_HSV,
  });

  const saturation = Math.round(color.s * 100);
  const value = Math.round(color.v * 100);

  const requestColorChange = useEventCallback((event: MouseEvent) => {
    if (!rootRef.current) {
      return;
    }
    const coordinates = getCoordinates(rootRef.current, event);
    const newColor: HsvColor = {
      ...color,
      s: coordinates.x,
      v: coordinates.y,
    };

    setColor(newColor);
    onChange?.(event, { type: 'change', event, color: newColor });
  });

  const handleDocumentMouseMove = React.useCallback(
    (event: MouseEvent) => {
      requestColorChange(event);
    },
    [requestColorChange],
  );
  const handleDocumentMouseUp = useEventCallback(() => {
    targetDocument?.removeEventListener('mousemove', handleDocumentMouseMove);
  });

  const _onMouseDown: React.MouseEventHandler<HTMLDivElement> = useEventCallback(event => {
    event.stopPropagation();
    event.preventDefault();

    requestColorChange(event.nativeEvent);

    targetDocument?.addEventListener('mousemove', handleDocumentMouseMove);
    targetDocument?.addEventListener('mouseup', handleDocumentMouseUp, { once: true });
  });

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newColor = { h: color.h, s: Number(xRef.current!.value) / 100, v: Number(yRef.current?.value) / 100, a: 1 };

    setColor(newColor);
    onChange?.(event, {
      type: 'change',
      event,
      color: newColor,
    });
  });

  const _onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();

      const newY = event.key === 'ArrowUp' ? clamp(value + 1, MIN, MAX) : clamp(value - 1, MIN, MAX);
      const newColor: HsvColor = {
        ...color,
        s: color.s,
        v: newY / 100,
      };
      setColor(newColor);
      onChange?.(event, { type: 'change', event, color: newColor });
    }
  });

  const rootVariables = {
    [colorAreaCSSVars.areaXProgressVar]: `${saturation}%`,
    [colorAreaCSSVars.areaYProgressVar]: `${value}%`,
    [colorAreaCSSVars.thumbColorVar]: 'transparent',
    [colorAreaCSSVars.mainColorVar]: `hsl(${color.h}, 100%, 50%)`,
  };

  const state: ColorAreaState = {
    components: {
      inputX: 'input',
      inputY: 'input',
      root: 'div',
      thumb: 'div',
    },
    root: slot.always(getIntrinsicElementProps('div', { ...rest, ref }), { elementType: 'div' }),
    inputX: slot.always(inputX, {
      defaultProps: {
        id: useId('sliderX-', props.id),
        type: 'range',
        ref: xRef,
      },
      elementType: 'input',
    }),
    inputY: slot.always(inputY, {
      defaultProps: {
        id: useId('sliderY-', props.id),
        type: 'range',
        ref: yRef,
      },
      elementType: 'input',
    }),
    thumb: slot.always(thumb, { elementType: 'div' }),
  };

  state.root.ref = useMergedRefs(state.root.ref, rootRef);
  state.thumb.ref = useMergedRefs(state.thumb.ref, focusWithinRef);

  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  state.root.onMouseDown = useEventCallback(mergeCallbacks(state.root.onMouseDown, _onMouseDown));
  state.inputX.onChange = useEventCallback(mergeCallbacks(state.inputX.onChange, _onChange));
  state.inputY.onChange = useEventCallback(mergeCallbacks(state.inputY.onChange, _onChange));
  state.inputX.onKeyDown = useEventCallback(mergeCallbacks(state.inputX.onKeyDown, _onKeyDown));
  state.inputX.value = saturation;
  state.inputY.value = value;

  return state;
};
