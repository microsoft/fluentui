import * as React from 'react';
import { useId, slot, getPartitionedNativeProps, useMergedRefs, mergeCallbacks } from '@fluentui/react-utilities';
import type { ColorAreaProps, ColorAreaState, HsvColor } from './ColorArea.types';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import { clamp, useEventCallback, useControllableState } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { tinycolor } from '@ctrl/tinycolor';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';
import { MIN, MAX, INITIAL_COLOR } from '../../utils/constants';

const INITIAL_COLOR_HSV = parseColor(INITIAL_COLOR);

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
  const targetWindow = targetDocument?.defaultView!;
  const xRef = React.useRef<HTMLInputElement>(null);
  const yRef = React.useRef<HTMLInputElement>(null);
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

  const hsvColor = React.useMemo(() => (props.color ? parseColor(props.color) : undefined), [props.color]);
  const defaultHsv = React.useMemo(
    () => (props.defaultColor ? parseColor(props.defaultColor) : undefined),
    [props.defaultColor],
  );

  const [color, setColor] = useControllableState<HsvColor>({
    defaultState: defaultHsv,
    state: hsvColor,
    initialState: INITIAL_COLOR_HSV,
  });

  const coordinates = { x: color.s, y: color.v };

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

  const abortController = React.useRef(new AbortController()).current;

  React.useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, [abortController]);

  const dispatchCustomInputChangeEvent = (newColor: HsvColor) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      targetWindow.HTMLInputElement.prototype,
      'value',
    )!.set;
    nativeInputValueSetter?.call(yRef.current!, newColor.v.toString());
    nativeInputValueSetter?.call(xRef.current!, newColor.s.toString());

    const event = new Event('change', { bubbles: true });

    yRef.current?.dispatchEvent(event);
  };

  const requestColorChange = useEventCallback((event: MouseEvent) => {
    const _coordinates = getCoordinates(event);
    const newColor = { h: color.h, s: _coordinates.x, v: _coordinates.y, a: 1 };

    dispatchCustomInputChangeEvent(newColor);
  });

  const handleDocumentMouseMove = React.useCallback(
    (event: MouseEvent) => {
      requestColorChange(event);
    },
    [requestColorChange],
  );
  const handleDocumentMouseUp = useEventCallback(() => {
    targetDocument?.removeEventListener('mousemove', handleDocumentMouseMove);
    // targetDocument?.removeEventListener('mouseup', handleDocumentMouseUp);
  });

  const _onMouseDown: React.MouseEventHandler<HTMLDivElement> = useEventCallback(event => {
    event.stopPropagation();
    event.preventDefault();

    requestColorChange(event.nativeEvent);

    targetDocument?.addEventListener('mousemove', handleDocumentMouseMove, { signal: abortController.signal });
    targetDocument?.addEventListener('mouseup', handleDocumentMouseUp, { once: true, signal: abortController.signal });
  });

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newColor = { h: color.h, s: Number(xRef.current!.value), v: Number(yRef.current?.value), a: 1 };
    setColor(newColor);
    onChange?.(event, {
      type: 'change',
      event,
      color: stringifyColor(newColor),
    });
  });

  const _onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const newY = event.key === 'ArrowUp' ? clamp(coordinates.y + 1, MIN, MAX) : clamp(coordinates.y - 1, MIN, MAX);
      const newColor = { h: color.h, s: coordinates.x, v: newY, a: 1 };

      dispatchCustomInputChangeEvent(newColor);
    }
    // TODO: Add support for ArrowLeft and ArrowRight
  });

  const rootVariables = {
    [colorAreaCSSVars.areaXProgressVar]: `${coordinates.x}%`,
    [colorAreaCSSVars.areaYProgressVar]: `${coordinates.y}%`,
    [colorAreaCSSVars.thumbColorVar]: 'transparent',
    [colorAreaCSSVars.mainColorVar]: `hsl(${color.h}, 100%, 50%)` || INITIAL_COLOR,
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
        ref: xRef,
        ...nativeProps.primary,
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

  const rootRef = useMergedRefs(state.root.ref);
  state.root.ref = rootRef;
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  state.root.onMouseDown = useEventCallback(mergeCallbacks(state.root.onMouseDown, _onMouseDown));
  state.inputX.onChange = _onChange;
  state.inputY.onChange = _onChange;
  state.inputX.onKeyDown = _onKeyDown;
  state.inputX.value = coordinates.x;
  state.inputY.value = coordinates.y;

  return state;
};

function stringifyColor(color: HsvColor) {
  return tinycolor(color).toHexString();
}

function parseColor(color: string): HsvColor {
  const _color = tinycolor(color).toHsv();
  return {
    h: Math.round(_color.h),
    s: Math.round(_color.s * 100),
    v: Math.round(_color.v * 100),
    a: Math.round(_color.a),
  };
}
