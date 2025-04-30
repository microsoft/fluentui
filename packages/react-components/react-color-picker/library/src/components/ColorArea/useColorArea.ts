import * as React from 'react';
import { tinycolor } from '@ctrl/tinycolor';
import { useId, slot, useMergedRefs, mergeCallbacks, getIntrinsicElementProps } from '@fluentui/react-utilities';
import type { ColorAreaProps, ColorAreaState } from './ColorArea.types';
import type { HsvColor } from '../../types/color';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import { useEventCallback, useControllableState } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useFocusWithin } from '@fluentui/react-tabster';
import { INITIAL_COLOR_HSV } from '../../utils/constants';
import { getCoordinates } from '../../utils/getCoordinates';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';

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
  const onChangeFromContext = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const colorFromContext = useColorPickerContextValue_unstable(ctx => ctx.color);
  const shapeFromContext = useColorPickerContextValue_unstable(ctx => ctx.shape);

  const {
    onChange = onChangeFromContext as unknown as ColorAreaProps['onChange'],
    shape = shapeFromContext,
    // Slots
    inputX,
    inputY,
    thumb,
    color,
    ...rest
  } = props;

  const [hsvColor, setColor] = useControllableState<HsvColor>({
    defaultState: props.defaultColor,
    state: color || colorFromContext,
    initialState: INITIAL_COLOR_HSV,
  });
  const saturation = Math.round(hsvColor.s * 100);
  const value = Math.round(hsvColor.v * 100);

  const [activeAxis, setActiveAxis] = React.useState<'x' | 'y' | null>(null);

  const requestColorChange = useEventCallback((event: PointerEvent) => {
    if (!rootRef.current) {
      return;
    }

    const coordinates = getCoordinates(rootRef.current, event);
    const newColor: HsvColor = {
      ...hsvColor,
      s: coordinates.x,
      v: coordinates.y,
    };

    setColor(newColor);
    onChange?.(event, {
      type: 'change',
      event: event,
      color: newColor,
    });
  });

  const handleDocumentPointerMove = React.useCallback(
    (event: PointerEvent) => {
      requestColorChange(event);
    },
    [requestColorChange],
  );

  const handleDocumentPointerUp = useEventCallback(() => {
    targetDocument?.removeEventListener('pointermove', handleDocumentPointerMove);
  });

  const handleRootOnPointerDown: React.PointerEventHandler<HTMLDivElement> = useEventCallback(event => {
    event.stopPropagation();
    event.preventDefault();

    requestColorChange(event.nativeEvent);

    targetDocument?.addEventListener('pointermove', handleDocumentPointerMove);
    targetDocument?.addEventListener('pointerup', handleDocumentPointerUp, { once: true });
  });

  const handleInputOnChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const targetValue = Number(event.target.value) / 100;
    const newColor: HsvColor = {
      ...hsvColor,
      ...(event.target === xRef.current && { s: targetValue }),
      ...(event.target === yRef.current && { v: targetValue }),
    };

    setColor(newColor);
    onChange?.(event, { type: 'change', event, color: newColor });
  });

  const handleRootOnKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    let deltaX = 0;
    let deltaY = 0;
    let axis: 'x' | 'y' = 'x';

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();

        axis = 'y';
        deltaY = 1;

        break;
      case 'ArrowDown':
        event.preventDefault();

        axis = 'y';
        deltaY = -1;

        break;
      case 'ArrowLeft':
        event.preventDefault();

        axis = 'x';
        deltaX = -1;

        break;
      case 'ArrowRight':
        event.preventDefault();

        axis = 'x';
        deltaX = 1;

        break;
    }

    if (deltaX === 0 && deltaY === 0) {
      return;
    }

    const newColor: HsvColor = {
      ...hsvColor,
      s: Math.min(Math.max(hsvColor.s + deltaX / 100, 0), 1),
      v: Math.min(Math.max(hsvColor.v + deltaY / 100, 0), 1),
    };

    setColor(newColor);
    setActiveAxis(axis);

    onChange?.(event, { type: 'change', event, color: newColor });
  });

  const rootVariables = {
    [colorAreaCSSVars.areaXProgressVar]: `${saturation}%`,
    [colorAreaCSSVars.areaYProgressVar]: `${value}%`,
    [colorAreaCSSVars.thumbColorVar]: tinycolor(hsvColor).toRgbString(),
    [colorAreaCSSVars.mainColorVar]: `hsl(${hsvColor.h}, 100%, 50%)`,
  };
  const state: ColorAreaState = {
    shape,
    components: {
      inputX: 'input',
      inputY: 'input',
      root: 'div',
      thumb: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...rest,
      }),
      { elementType: 'div' },
    ),
    inputX: slot.always(inputX, {
      defaultProps: {
        id: useId('sliderX-'),
        type: 'range',
        ...(activeAxis && { tabIndex: activeAxis === 'x' ? 0 : -1 }),
      },
      elementType: 'input',
    }),
    inputY: slot.always(inputY, {
      defaultProps: {
        id: useId('sliderY-'),
        type: 'range',
        tabIndex: activeAxis && activeAxis === 'y' ? 0 : -1,
      },
      elementType: 'input',
    }),
    thumb: slot.always(thumb, { elementType: 'div' }),
  };

  state.root.ref = useMergedRefs(state.root.ref, rootRef);
  state.thumb.ref = useMergedRefs(state.thumb.ref, focusWithinRef);
  state.inputX.ref = useMergedRefs(state.inputX.ref, xRef);
  state.inputY.ref = useMergedRefs(state.inputY.ref, yRef);

  state.root.style = {
    ...state.root.style,
    ...rootVariables,
  };

  state.root.onPointerDown = useEventCallback(mergeCallbacks(state.root.onPointerDown, handleRootOnPointerDown));
  state.root.onKeyDown = useEventCallback(mergeCallbacks(state.root.onKeyDown, handleRootOnKeyDown));
  state.inputX.onChange = useEventCallback(mergeCallbacks(state.inputX.onChange, handleInputOnChange));
  state.inputY.onChange = useEventCallback(mergeCallbacks(state.inputY.onChange, handleInputOnChange));

  state.inputX.value = saturation;
  state.inputY.value = value;

  return state;
};
