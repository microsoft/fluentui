'use client';

import * as React from 'react';
import {
  clamp,
  getPercent,
  mergeCallbacks,
  useControllableState,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { rangeSliderCSSVars } from './useRangeSliderStyles.styles';
import type { RangeSliderProps, RangeSliderState, RangeSliderValue } from './RangeSlider.types';

const {
  rangeSliderDirectionVar,
  rangeSliderLowerProgressVar,
  rangeSliderUpperProgressVar,
  rangeSliderStepsPercentVar,
} = rangeSliderCSSVars;

export const useRangeSliderState_unstable = (state: RangeSliderState, props: RangeSliderProps): RangeSliderState => {
  'use no memo';

  const { min = 0, max = 100, step } = props;
  const { dir } = useFluent();
  const { disabled, vertical } = state;
  const stepValue = step && step > 0 ? step : 1;
  const rangeSpan = max - min;

  // Default offset between start/end thumbs so the initial range has a visible selection
  const defaultRangeOffset = rangeSpan * 0.1;

  const [currentValues, setCurrentValues] = useControllableState<RangeSliderValue>({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: { start: min, end: Math.min(min + defaultRangeOffset, max) },
  });

  // Ensure values are properly ordered and clamped
  const { start: rawStart, end: rawEnd } = currentValues;
  const lowerValue = clamp(Math.min(rawStart, rawEnd), min, max);
  const upperValue = clamp(Math.max(rawStart, rawEnd), min, max);

  state.value = { start: lowerValue, end: upperValue };

  // Refs for pointer tracking and position calculation
  const activeDragThumb = React.useRef<'start' | 'end' | null>(null);
  const [activeThumb, setActiveThumb] = React.useState<'start' | 'end'>('start');
  const rootRef = React.useRef<HTMLDivElement>(null);
  const railRef = React.useRef<HTMLDivElement>(null);
  const startInputRef = React.useRef<HTMLInputElement>(null);
  const endInputRef = React.useRef<HTMLInputElement>(null);

  // Shared update function for pointer and input handlers.
  const updateValues = useEventCallback(
    (start: number, end: number, event: React.SyntheticEvent | Event, type: 'change' | 'pointer') => {
      setCurrentValues({ start, end });
      const value = { start, end };

      if (type === 'pointer') {
        props.onChange?.(event, {
          type: 'pointer',
          event: event as React.PointerEvent<HTMLDivElement>,
          value,
        });
      } else {
        props.onChange?.(event, {
          type: 'change',
          event: event as React.ChangeEvent<HTMLInputElement>,
          value,
        });
      }
    },
  );

  // Convert pointer position to slider value using the rail's bounding rect
  // (rail excludes thumb overhang padding, giving accurate 0-100% mapping)
  const getValueFromPointer = (clientX: number, clientY: number): number | null => {
    const rect = railRef.current?.getBoundingClientRect() ?? rootRef.current?.getBoundingClientRect();
    if (!rect) {
      return null;
    }

    const size = vertical ? rect.height : rect.width;
    const offset = vertical ? rect.bottom - clientY : clientX - rect.left;
    const ratio = clamp(offset / size, 0, 1);
    const adjustedRatio = !vertical && dir === 'rtl' ? 1 - ratio : ratio;

    return min + adjustedRatio * rangeSpan;
  };

  // Snap value to nearest step (always snaps, using stepValue which defaults to 1)
  const snapToStep = (value: number): number => {
    if (rangeSpan === 0) {
      return min;
    }
    return clamp(min + Math.round((value - min) / stepValue) * stepValue, min, max);
  };

  // Apply snapped value to the appropriate thumb
  const applyValueToThumb = (thumb: 'start' | 'end', value: number, event: React.SyntheticEvent | Event) => {
    const snapped = snapToStep(value);
    const newStart = thumb === 'start' ? Math.min(snapped, upperValue) : lowerValue;
    const newEnd = thumb === 'end' ? Math.max(snapped, lowerValue) : upperValue;
    updateValues(newStart, newEnd, event, 'pointer');
  };

  // Pointer handlers for rail click and drag
  const handlePointerDown = useEventCallback((ev: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    const value = getValueFromPointer(ev.clientX, ev.clientY);
    if (value === null) {
      return;
    }

    // Determine closest thumb based on distance; when equal (thumbs overlap), prefer the last-used thumb
    const distStart = Math.abs(value - lowerValue);
    const distEnd = Math.abs(value - upperValue);
    const thumb = distStart < distEnd ? 'start' : distEnd < distStart ? 'end' : activeThumb;
    activeDragThumb.current = thumb;
    setActiveThumb(thumb);

    ev.preventDefault();
    ev.currentTarget.setPointerCapture(ev.pointerId);
    applyValueToThumb(thumb, value, ev);

    // Focus the corresponding input programmatically since pointerEvents: 'none'
    // on the input prevents it from receiving click-focus naturally.
    const inputRef = thumb === 'start' ? startInputRef : endInputRef;
    inputRef.current?.focus();
  });

  const handlePointerMove = useEventCallback((ev: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !activeDragThumb.current) {
      return;
    }

    const value = getValueFromPointer(ev.clientX, ev.clientY);
    if (value === null) {
      return;
    }

    ev.preventDefault();
    applyValueToThumb(activeDragThumb.current, value, ev);
  });

  const handlePointerUp = useEventCallback((ev: React.PointerEvent<HTMLDivElement>) => {
    if (ev.currentTarget.hasPointerCapture(ev.pointerId)) {
      ev.currentTarget.releasePointerCapture(ev.pointerId);
    }
    activeDragThumb.current = null;
  });

  // CSS variables for thumb positioning
  const stepPercent = step && step > 0 && rangeSpan ? `${(step * 100) / rangeSpan}%` : undefined;

  state.root.ref = useMergedRefs(state.root.ref, rootRef);
  state.rail.ref = useMergedRefs(state.rail.ref, railRef);
  state.startInput.ref = useMergedRefs(state.startInput.ref, startInputRef);
  state.endInput.ref = useMergedRefs(state.endInput.ref, endInputRef);
  state.root.style = {
    [rangeSliderDirectionVar]: vertical ? '0deg' : dir === 'ltr' ? '90deg' : '270deg',
    [rangeSliderLowerProgressVar]: `${getPercent(lowerValue, min, max)}%`,
    [rangeSliderUpperProgressVar]: `${getPercent(upperValue, min, max)}%`,
    ...(stepPercent && { [rangeSliderStepsPercentVar]: stepPercent }),
    ...state.root.style,
  };

  state.root.onPointerDown = mergeCallbacks(state.root.onPointerDown, handlePointerDown);
  state.root.onPointerMove = mergeCallbacks(state.root.onPointerMove, handlePointerMove);
  state.root.onPointerUp = mergeCallbacks(state.root.onPointerUp, handlePointerUp);
  state.root.onPointerCancel = mergeCallbacks(state.root.onPointerCancel, handlePointerUp);

  // Input configuration for keyboard accessibility
  state.startInput.value = lowerValue;
  state.startInput.min = min;
  state.startInput.max = upperValue;
  state.startInput.step = stepValue;
  state.startInput.disabled = disabled;
  state.startInput.onChange = mergeCallbacks(state.startInput.onChange, ev => {
    if (!disabled) {
      updateValues(Math.min(Number(ev.currentTarget.value), upperValue), upperValue, ev, 'change');
    }
  });
  state.startInput.onFocus = mergeCallbacks(state.startInput.onFocus, () => {
    setActiveThumb('start');
  });

  state.endInput.value = upperValue;
  state.endInput.min = lowerValue;
  state.endInput.max = max;
  state.endInput.step = stepValue;
  state.endInput.disabled = disabled;
  state.endInput.onChange = mergeCallbacks(state.endInput.onChange, ev => {
    if (!disabled) {
      updateValues(lowerValue, Math.max(Number(ev.currentTarget.value), lowerValue), ev, 'change');
    }
  });
  state.endInput.onFocus = mergeCallbacks(state.endInput.onFocus, () => {
    setActiveThumb('end');
  });

  state.activeThumb = activeThumb;

  return state;
};
