'use client';

import * as React from 'react';
import {
  clamp,
  getPercentInRange,
  mergeCallbacks,
  useControllableState,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { rangeSliderCSSVars } from './RangeSlider.constants';
import type { RangeSliderBaseProps, RangeSliderBaseState, RangeSliderValue } from './RangeSlider.types';

const { rangeSliderDirectionVar, rangeSliderStartProgressVar, rangeSliderEndProgressVar, rangeSliderStepsPercentVar } =
  rangeSliderCSSVars;

type Thumb = 'start' | 'end';

type DragState = {
  /** The pointer that owns the drag */
  pointerId: number;
  /** The dragged thumb; null until the first move picks one of two overlapping thumbs */
  thumb: Thumb | null;
  /** Pointer value minus the grabbed thumb's value */
  offset: number;
  /** The pointer value at the press */
  pressValue: number;
};

// Tolerance for floating-point error when counting whole steps
const STEP_EPSILON = 1e-9;

/**
 * Number of decimal places in `value`, including exponent notation such as 1e-7.
 */
const getDecimalPlaces = (value: number): number => {
  const [mantissa, exponent] = String(value).split('e');
  const decimals = (mantissa.split('.')[1] ?? '').length - Number(exponent ?? 0);
  return Math.max(0, decimals);
};

export const useRangeSliderState_unstable = (
  state: RangeSliderBaseState,
  props: RangeSliderBaseProps,
): RangeSliderBaseState => {
  const { min = 0, max = 100, step } = props;
  const { dir } = useFluent();
  const { disabled, vertical } = state;
  const stepValue = step && step > 0 ? step : 1;
  const rangeSpan = max - min;

  // The RangeSlider `disabled` wins over `disabled` on an input slot
  const startDisabled = !!disabled || !!state.startInput.disabled;
  const endDisabled = !!disabled || !!state.endInput.disabled;

  // Round step values to the precision of `min` and `step` to avoid floating-point noise
  const precision = Math.max(getDecimalPlaces(min), getDecimalPlaces(stepValue));
  const roundToPrecision = (value: number) => Number(value.toFixed(precision));
  const getStepValue = (stepCount: number) => roundToPrecision(min + stepCount * stepValue);
  const countStepsDown = (value: number) => Math.floor((value - min) / stepValue + STEP_EPSILON);

  // The largest value on the step grid, below `max` when `step` doesn't divide the range
  const lastStepValue = rangeSpan > 0 ? getStepValue(countStepsDown(max)) : min;

  const snapToStep = (value: number): number => {
    if (rangeSpan <= 0) {
      return min;
    }
    return clamp(getStepValue(Math.round((value - min) / stepValue)), min, lastStepValue);
  };

  const [currentValues, setCurrentValues] = useControllableState<RangeSliderValue>({
    state: props.value,
    defaultState: props.defaultValue,
    initialState: { start: min, end: lastStepValue },
  });

  // Order the values and snap them to the step grid, as the native inputs do
  const { start: rawStart, end: rawEnd } = currentValues;
  const startValue = snapToStep(Math.min(rawStart, rawEnd));
  const endValue = snapToStep(Math.max(rawStart, rawEnd));

  // eslint-disable-next-line react-hooks/immutability
  state.value = { start: startValue, end: endValue };

  const drag = React.useRef<DragState | null>(null);
  const [lastUsedThumb, setLastUsedThumb] = React.useState<Thumb>('start');
  const rootRef = React.useRef<HTMLDivElement>(null);
  const railRef = React.useRef<HTMLDivElement>(null);
  const startThumbRef = React.useRef<HTMLDivElement>(null);
  const endThumbRef = React.useRef<HTMLDivElement>(null);
  const startInputRef = React.useRef<HTMLInputElement>(null);
  const endInputRef = React.useRef<HTMLInputElement>(null);

  // When one thumb is disabled, the enabled one is active
  const activeThumb: Thumb =
    startDisabled && !endDisabled ? 'end' : endDisabled && !startDisabled ? 'start' : lastUsedThumb;

  const updateValues = useEventCallback(
    (start: number, end: number, event: React.SyntheticEvent | Event, type: 'change' | 'pointer') => {
      if (start === startValue && end === endValue) {
        return;
      }

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

  const getValueFromPointer = (clientX: number, clientY: number): number | null => {
    const rect = railRef.current?.getBoundingClientRect() ?? rootRef.current?.getBoundingClientRect();
    const size = vertical ? rect?.height : rect?.width;
    if (!rect || !size) {
      return null;
    }

    const offset = vertical ? rect.bottom - clientY : clientX - rect.left;
    // Unbounded, so a grab offset can still reach both ends; snapToStep clamps the value
    const ratio = offset / size;
    const adjustedRatio = !vertical && dir === 'rtl' ? 1 - ratio : ratio;

    return min + adjustedRatio * rangeSpan;
  };

  const applyValueToThumb = (thumb: Thumb, value: number, event: React.SyntheticEvent | Event) => {
    const snapped = snapToStep(value);
    const newStart = thumb === 'start' ? Math.min(snapped, endValue) : startValue;
    const newEnd = thumb === 'end' ? Math.max(snapped, startValue) : endValue;
    updateValues(newStart, newEnd, event, 'pointer');
  };

  const getThumbForValue = (value: number): Thumb | null => {
    if (startDisabled || endDisabled) {
      return startDisabled && endDisabled ? null : activeThumb;
    }
    if (startValue === endValue) {
      // Overlapping thumbs: move the one on the side of the press
      return value < startValue ? 'start' : value > endValue ? 'end' : activeThumb;
    }
    const distStart = Math.abs(value - startValue);
    const distEnd = Math.abs(value - endValue);
    return distStart < distEnd ? 'start' : distEnd < distStart ? 'end' : activeThumb;
  };

  const endDrag = () => {
    drag.current = null;
  };

  // The inputs ignore pointer events, so focus them programmatically
  const focusThumb = (thumb: Thumb) => {
    setLastUsedThumb(thumb);
    (thumb === 'start' ? startInputRef : endInputRef).current?.focus();
  };

  const getPressedThumb = (target: EventTarget | null): Thumb | null => {
    const node = target as Node | null;
    if (!startDisabled && startThumbRef.current?.contains(node)) {
      return 'start';
    }
    if (!endDisabled && endThumbRef.current?.contains(node)) {
      return 'end';
    }
    return null;
  };

  const handlePointerDown = useEventCallback((ev: React.PointerEvent<HTMLDivElement>) => {
    // Ignore non-primary buttons and other pointers during a drag
    const isOtherPointer = drag.current !== null && ev.pointerId !== drag.current.pointerId;
    if (disabled || ev.button !== 0 || isOtherPointer) {
      return;
    }

    const value = getValueFromPointer(ev.clientX, ev.clientY);
    if (value === null) {
      return;
    }

    const pressedThumb = getPressedThumb(ev.target);
    if (pressedThumb) {
      // Grab the thumb without changing its value; overlapping thumbs wait for the first move
      const overlapping = startValue === endValue && !startDisabled && !endDisabled;
      const thumb = overlapping ? null : pressedThumb;
      drag.current = {
        pointerId: ev.pointerId,
        thumb,
        offset: value - (pressedThumb === 'start' ? startValue : endValue),
        pressValue: value,
      };
      ev.preventDefault();
      ev.currentTarget.setPointerCapture(ev.pointerId);
      focusThumb(thumb ?? activeThumb);
      return;
    }

    // A press on the rail moves the closest thumb
    const thumb = getThumbForValue(value);
    if (thumb === null) {
      return;
    }
    drag.current = { pointerId: ev.pointerId, thumb, offset: 0, pressValue: value };

    ev.preventDefault();
    ev.currentTarget.setPointerCapture(ev.pointerId);
    applyValueToThumb(thumb, value, ev);
    focusThumb(thumb);
  });

  const handlePointerMove = useEventCallback((ev: React.PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || ev.pointerId !== current.pointerId) {
      return;
    }

    const value = getValueFromPointer(ev.clientX, ev.clientY);
    if (value === null) {
      return;
    }

    if (current.thumb === null) {
      // The first move direction picks one of two overlapping thumbs
      if (value === current.pressValue) {
        return;
      }
      current.thumb = value < current.pressValue ? 'start' : 'end';
      focusThumb(current.thumb);
    }

    // The thumb may have been disabled during the drag
    if (current.thumb === 'start' ? startDisabled : endDisabled) {
      endDrag();
      return;
    }

    ev.preventDefault();
    applyValueToThumb(current.thumb, value - current.offset, ev);
  });

  const handlePointerUp = useEventCallback((ev: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || ev.pointerId !== drag.current.pointerId) {
      return;
    }
    if (ev.currentTarget.hasPointerCapture?.(ev.pointerId)) {
      ev.currentTarget.releasePointerCapture(ev.pointerId);
    }
    endDrag();
  });

  const stepPercent = step && step > 0 && rangeSpan ? `${(step * 100) / rangeSpan}%` : undefined;

  /* eslint-disable react-hooks/immutability */
  state.root.ref = useMergedRefs(state.root.ref, rootRef);
  state.rail.ref = useMergedRefs(state.rail.ref, railRef);
  state.startThumb.ref = useMergedRefs(state.startThumb.ref, startThumbRef);
  state.endThumb.ref = useMergedRefs(state.endThumb.ref, endThumbRef);
  state.startInput.ref = useMergedRefs(state.startInput.ref, startInputRef);
  state.endInput.ref = useMergedRefs(state.endInput.ref, endInputRef);
  state.root.style = {
    [rangeSliderDirectionVar]: vertical ? '0deg' : dir === 'ltr' ? '90deg' : '270deg',
    [rangeSliderStartProgressVar]: `${getPercentInRange(startValue, min, max)}%`,
    [rangeSliderEndProgressVar]: `${getPercentInRange(endValue, min, max)}%`,
    ...(stepPercent && { [rangeSliderStepsPercentVar]: stepPercent }),
    ...state.root.style,
  };

  state.root.onPointerDown = mergeCallbacks(state.root.onPointerDown, handlePointerDown);
  state.root.onPointerMove = mergeCallbacks(state.root.onPointerMove, handlePointerMove);
  state.root.onPointerUp = mergeCallbacks(state.root.onPointerUp, handlePointerUp);
  state.root.onPointerCancel = mergeCallbacks(state.root.onPointerCancel, handlePointerUp);
  state.root.onLostPointerCapture = mergeCallbacks(state.root.onLostPointerCapture, handlePointerUp);

  // A thumb disabled on its own uses aria-disabled, so it stays focusable and is still submitted
  state.startInput.disabled = disabled;
  state.startInput['aria-disabled'] = !disabled && startDisabled ? true : state.startInput['aria-disabled'];
  state.endInput.disabled = disabled;
  state.endInput['aria-disabled'] = !disabled && endDisabled ? true : state.endInput['aria-disabled'];

  // Each input is limited by the other thumb's value
  state.startInput.value = startValue;
  state.startInput.min = min;
  state.startInput.max = endValue;
  state.startInput.step = stepValue;
  state.startInput.onChange = mergeCallbacks(state.startInput.onChange, ev => {
    if (!startDisabled) {
      updateValues(Math.min(Number(ev.currentTarget.value), endValue), endValue, ev, 'change');
    }
  });
  state.startInput.onFocus = mergeCallbacks(state.startInput.onFocus, () => {
    setLastUsedThumb('start');
  });

  state.endInput.value = endValue;
  state.endInput.min = startValue;
  state.endInput.max = lastStepValue;
  state.endInput.step = stepValue;
  state.endInput.onChange = mergeCallbacks(state.endInput.onChange, ev => {
    if (!endDisabled) {
      updateValues(startValue, Math.max(Number(ev.currentTarget.value), startValue), ev, 'change');
    }
  });
  state.endInput.onFocus = mergeCallbacks(state.endInput.onFocus, () => {
    setLastUsedThumb('end');
  });

  state.startDisabled = startDisabled;
  state.endDisabled = endDisabled;
  state.activeThumb = activeThumb;
  /* eslint-enable react-hooks/immutability */

  return state;
};
