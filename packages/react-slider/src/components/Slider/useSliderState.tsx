import * as React from 'react';
import { useFluent } from '@fluentui/react-shared-contexts';
import {
  clamp,
  useBoolean,
  useControllableState,
  useEvent,
  useEventCallback,
  useMergedRefs,
  usePointerCapture,
} from '@fluentui/react-utilities';
import {
  calculateSteps,
  getKeydownValue,
  getMarkPercent,
  getMarkValue,
  getPercent,
  renderMarks,
} from '../../utils/index';
import type { SliderState } from './Slider.types';

type EventData = {
  element?: HTMLElement;
  pointerId: number;
};

// TODO: Awaiting animation time from design spec.
export const animationTime = '0.1s';

export const useSliderState = (state: SliderState) => {
  const {
    value,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    keyboardStep = state.step || 1,
    disabled = false,
    ariaValueText,
    onChange,
    marks,
    vertical = false,
    origin,
  } = state;
  const { onPointerDown: onPointerDownCallback, onKeyDown: onKeyDownCallback } = state.root;

  const { dir } = useFluent();

  const [stepAnimation, { setTrue: showStepAnimation, setFalse: hideStepAnimation }] = useBoolean(false);
  const [renderedPosition, setRenderedPosition] = React.useState<number | undefined>(value ? value : defaultValue);
  const [currentValue, setCurrentValue] = useControllableState({
    state: value && clamp(value, min, max),
    defaultState: clamp(defaultValue, min, max),
    initialState: 0,
  });
  const [eventData, setEventData] = React.useState<EventData>({
    element: undefined,
    pointerId: 0,
  });

  const railRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  /**
   * Updates the controlled `currentValue` to the new `incomingValue` and clamps it.
   */
  const updateValue = useEventCallback(
    (incomingValue: number, ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void => {
      const clampedValue = clamp(incomingValue, min, max);

      if (clampedValue !== min && clampedValue !== max) {
        ev.stopPropagation();
        if (ev.type === 'keydown') {
          ev.preventDefault();
        }
      }

      onChange?.(ev, { value: clampedValue });
      setCurrentValue(clampedValue);
    },
  );

  /**
   * Updates the controlled `currentValue` and `renderedPosition` of the Slider.
   */
  const updatePosition = React.useCallback(
    (incomingValue: number, ev) => {
      setRenderedPosition(clamp(incomingValue, min, max));
      updateValue(incomingValue, ev);
    },
    [max, min, updateValue],
  );

  const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    updatePosition(Number(ev.target.value), ev);
  };

  const onPointerMove = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const position = calculateSteps(ev, railRef, min, max, step, vertical, dir);
      const currentStepPosition = Math.round(position / step) * step;

      setRenderedPosition(position);
      updateValue(currentStepPosition, ev);
    },
    [dir, max, min, step, updateValue, vertical],
  );

  const onPointerUp = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      showStepAnimation();
      setEventData({ element: undefined, pointerId: ev.pointerId });
      // When undefined, the position fallbacks to the currentValue state.
      setRenderedPosition(undefined);
      inputRef.current!.focus();
    },
    [showStepAnimation],
  );

  const onPointerDown = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      hideStepAnimation();
      onPointerDownCallback?.(ev);
      setEventData({ element: ev.currentTarget, pointerId: ev.pointerId });
      onPointerMove(ev);
    },
    [hideStepAnimation, onPointerDownCallback, onPointerMove],
  );

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      hideStepAnimation();
      onKeyDownCallback?.(ev);
      const incomingValue = getKeydownValue(ev, currentValue, min, max, dir, keyboardStep);

      if (currentValue !== incomingValue) {
        updatePosition(incomingValue, ev);
      }
    },
    [currentValue, dir, hideStepAnimation, keyboardStep, max, min, onKeyDownCallback, updatePosition],
  );

  const getTrackBorderRadius = () => {
    if (origin !== undefined && origin !== (max || min)) {
      if (vertical) {
        return originPercent > valuePercent ? '99px 99px 0px 0px' : '0px 0px 99px 99px';
      } else {
        return (dir === 'rtl' ? valuePercent > originPercent : valuePercent < originPercent)
          ? '99px 0px 0px 99px'
          : '0px 99px 99px 0px';
      }
    }
    return '99px';
  };

  useEvent(eventData.element, 'pointermove', onPointerMove);
  useEvent(eventData.element, 'pointerup', onPointerUp);
  usePointerCapture(eventData.element, eventData.pointerId);

  const valuePercent = getPercent(renderedPosition !== undefined ? renderedPosition : currentValue, min, max);

  const originPercent = React.useMemo(() => {
    return origin !== undefined ? getPercent(origin, min, max) : 0;
  }, [max, min, origin]);

  const markValues = React.useMemo((): number[] => getMarkValue(marks, min, max, step), [marks, max, min, step]);

  const markPercent = React.useMemo((): string[] => getMarkPercent(markValues), [markValues]);

  const thumbWrapperStyles = {
    transform: vertical
      ? `translateY(${valuePercent}%)`
      : `translateX(${dir === 'rtl' ? -valuePercent : valuePercent}%)`,
    transition: stepAnimation ? `transform ease-in-out ${animationTime}` : 'none',
    ...state.thumbWrapper.style,
  };

  const trackStyles = {
    [vertical ? 'top' : dir === 'rtl' ? 'right' : 'left']:
      origin !== undefined ? `${Math.min(valuePercent, originPercent)}%` : 0,
    [vertical ? 'height' : 'width']:
      origin !== undefined
        ? `${Math.max(originPercent - valuePercent, valuePercent - originPercent)}%`
        : `${valuePercent}%`,
    borderRadius: getTrackBorderRadius(),
    // When a transition is applied with the origin, a visible animation plays when it goes below the min.
    transition: stepAnimation
      ? `${vertical ? 'height' : 'width'} ease-in-out ${animationTime}${
          origin !== undefined
            ? ', ' + vertical
              ? 'top'
              : dir === 'rtl'
              ? 'right'
              : 'left' + 'ease-in-out ' + animationTime
            : ''
        }`
      : 'none',
    ...state.track.style,
  };

  const marksWrapperStyles = marks
    ? {
        [vertical ? 'gridTemplateRows' : 'gridTemplateColumns']: markPercent.join(''),
        ...state.marksWrapper.style,
      }
    : {};

  // Root props
  if (!disabled) {
    state.root.onPointerDown = onPointerDown;
    state.root.onKeyDown = onKeyDown;
  }

  // Track Props
  state.track.style = trackStyles;

  // Mark props
  if (marks) {
    state.marksWrapper.children = renderMarks(markValues, marks);
    state.marksWrapper.style = marksWrapperStyles;
  }

  // Thumb Wrapper Props
  state.thumbWrapper.style = thumbWrapperStyles;

  // Active Rail Props
  state.activeRail.ref = railRef;

  // Input Props
  state.input.ref = useMergedRefs(state.input.ref, inputRef);
  state.input.value = currentValue;
  state.input.min = min;
  state.input.max = max;
  ariaValueText && (state.input['aria-valuetext'] = ariaValueText(currentValue!));
  state.input.disabled = disabled;
  state.input.step = step;
  state.input.onChange = onInputChange;

  return state;
};
