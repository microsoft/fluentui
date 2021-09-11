import * as React from 'react';
import { useFluent } from '@fluentui/react-shared-contexts';
import {
  useBoolean,
  useControllableState,
  useEventCallback,
  useUnmount,
  useMergedRefs,
} from '@fluentui/react-utilities';
import {
  on,
  clamp,
  getPercent,
  calculateSteps,
  getMarkPercent,
  getMarkValue,
  getKeydownValue,
  renderMarks,
} from '../../utils/index';
import { RangedSliderState } from './RangedSlider.types';

type RangedValue = { lowerValue: number; upperValue: number };

/**
 * Finds the closest thumb based of a given value and returns it's key.
 */
const findClosestThumb = (object: RangedValue, incomingValue: number) => {
  return Math.abs(incomingValue - object.lowerValue) <= Math.abs(object.upperValue - incomingValue)
    ? 'lowerValue'
    : 'upperValue';
};

/**
 * Clamps the values in RangedSlider to a given min and max
 */
const clampRangedThumbValues = (object: RangedValue, min: number, max: number): RangedValue => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};
  for (const [key, value] of Object.entries(object)) {
    result[key] = clamp(value, min, max);
  }
  return result as RangedValue;
};

export const useRangedSliderState = (state: RangedSliderState) => {
  const {
    min = 0,
    max = 100,
    value,
    defaultValue = { lowerValue: min, upperValue: max },
    step = 1,
    keyboardStep = state.step || 1,
    disabled = false,
    ariaValueText,
    onChange,
    marks,
    vertical = false,
  } = state;
  const { onPointerDown: onPointerDownCallback, onKeyDown: onKeyDownCallback } = state.root;

  const { dir } = useFluent();

  const lowerInputRef = React.useRef<HTMLInputElement>(null);
  const upperInputRef = React.useRef<HTMLInputElement>(null);
  const railRef = React.useRef<HTMLDivElement>(null);
  const activeThumb = React.useRef<'lowerValue' | 'upperValue'>('lowerValue');
  const disposables = React.useRef<(() => void)[]>([]);

  const [stepAnimation, { setTrue: showStepAnimation, setFalse: hideStepAnimation }] = useBoolean(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [renderedPosition, setRenderedPosition] = React.useState<any>(value ? value : defaultValue);
  const [currentValue, setCurrentValue] = useControllableState({
    state: value && clampRangedThumbValues(value, min, max),
    defaultState: clampRangedThumbValues(defaultValue, min, max),
    initialState: { lowerValue: min, upperValue: max },
  });

  /**
   * Updates the controlled `currentValue` to the new `incomingValue` and clamps it.
   */
  const updateValue = useEventCallback(
    (incomingValue: number, ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void => {
      const clampedValue = clamp(incomingValue, min, max);
      const newValue = {
        ...currentValue,
        [activeThumb.current]: clampedValue,
      };

      if (clampedValue !== min && clampedValue !== max) {
        ev.stopPropagation();
        if (ev.type === 'keydown') {
          ev.preventDefault();
        }
      }

      onChange?.(ev, { value: newValue });
      setCurrentValue(newValue);
    },
  );

  /**
   * Updates the controlled `currentValue` and `renderedPosition` of the Slider.
   */
  const updatePosition = React.useCallback(
    (incomingValue: number, ev) => {
      setRenderedPosition({
        ...currentValue,
        [activeThumb.current]: clamp(incomingValue, min, max),
      });
      updateValue(incomingValue, ev);
    },
    [currentValue, max, min, updateValue],
  );

  const onPointerMove = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const position = calculateSteps(ev, railRef, min, max, step, vertical, dir);
      const currentStepPosition = Math.round(position / step) * step;

      setRenderedPosition({
        ...currentValue,
        [activeThumb.current]: position,
      });

      updateValue(currentStepPosition, ev);
    },
    [currentValue, dir, max, min, step, updateValue, vertical],
  );

  const onPointerUp = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      disposables.current.forEach(dispose => dispose());
      disposables.current = [];
      showStepAnimation();
      // When undefined, the position fallbacks to the currentValue state.
      setRenderedPosition(undefined);
      if (activeThumb.current === 'lowerValue') {
        lowerInputRef.current!.focus();
      } else {
        upperInputRef.current!.focus();
      }
    },
    [showStepAnimation],
  );

  const onPointerDown = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const { pointerId } = ev;
      const target = ev.target as HTMLElement;

      target.setPointerCapture?.(pointerId);
      onPointerDownCallback?.(ev);
      hideStepAnimation();
      activeThumb.current = findClosestThumb(currentValue, calculateSteps(ev, railRef, min, max, step, vertical, dir));
      disposables.current.push(on(target, 'pointermove', onPointerMove), on(target, 'pointerup', onPointerUp), () => {
        target.releasePointerCapture?.(pointerId);
      });

      onPointerMove(ev);
    },
    [currentValue, dir, hideStepAnimation, max, min, onPointerDownCallback, onPointerMove, onPointerUp, step, vertical],
  );

  const onInputChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      updatePosition(Number(ev.target.value), ev);
    },
    [updatePosition],
  );

  const keyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDownCallback?.(ev);
      hideStepAnimation();

      const incomingValue = getKeydownValue(ev, currentValue[activeThumb.current], min, max, dir, keyboardStep);

      if (currentValue[activeThumb.current] !== incomingValue) {
        updatePosition(incomingValue, ev);
      }
    },
    [currentValue, dir, hideStepAnimation, keyboardStep, max, min, onKeyDownCallback, updatePosition],
  );

  const onKeyDownLower = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      activeThumb.current = 'lowerValue';
      keyDown(ev);
    },
    [keyDown],
  );

  const onKeyDownUpper = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      activeThumb.current = 'upperValue';
      keyDown(ev);
    },
    [keyDown],
  );

  useUnmount(() => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  });

  const lowerValuePercent = getPercent(
    renderedPosition !== undefined ? renderedPosition.lowerValue : currentValue.lowerValue,
    min,
    max,
  );

  const upperValuePercent = getPercent(
    renderedPosition !== undefined ? renderedPosition.upperValue : currentValue.upperValue,
    min,
    max,
  );

  const markValues = React.useMemo((): number[] => getMarkValue(marks, min, max, step), [marks, max, min, step]);
  const markPercent = React.useMemo((): string[] => getMarkPercent(markValues), [markValues]);

  // TODO: Awaiting animation time from design spec.
  const animationTime = '0.1s';

  const lowerThumbWrapperStyles = {
    transform: vertical
      ? `translateY(${lowerValuePercent}%)`
      : `translateX(${dir === 'rtl' ? -lowerValuePercent : lowerValuePercent}%)`,
    transition: stepAnimation ? `transform ease-in-out ${animationTime}` : 'none',
    ...state.lowerThumbWrapper.style,
  };

  const upperThumbWrapperStyles = {
    transform: vertical
      ? `translateY(${upperValuePercent}%)`
      : `translateX(${dir === 'rtl' ? -upperValuePercent : upperValuePercent}%)`,
    transition: stepAnimation ? `transform ease-in-out ${animationTime}` : 'none',
    ...state.upperThumbWrapper.style,
  };

  const marksWrapperStyles = marks
    ? {
        [vertical ? 'gridTemplateRows' : 'gridTemplateColumns']: markPercent.join(''),
        ...state.marksWrapper.style,
      }
    : {};

  const trackStyles = {
    [vertical ? 'top' : dir === 'rtl' ? 'right' : 'left']: `${Math.min(lowerValuePercent, upperValuePercent)}%`,
    [vertical ? 'height' : 'width']: `${Math.max(
      upperValuePercent - lowerValuePercent,
      lowerValuePercent - upperValuePercent,
    )}%`,
    transition: stepAnimation
      ? `${vertical ? 'height' : 'width'} ease-in-out ${animationTime}${
          ', ' + vertical ? 'top' : dir === 'rtl' ? 'right' : 'left' + 'ease-in-out ' + animationTime
        }`
      : 'none',
    ...state.track.style,
  };

  // Root props
  if (!disabled) {
    state.root.onPointerDown = onPointerDown;
  }

  // Track Props
  state.track.style = trackStyles;

  // Mark props
  if (marks) {
    state.marksWrapper.children = renderMarks(markValues);
    state.marksWrapper.style = marksWrapperStyles;
  }

  // Lower Thumb Wrapper Props
  state.lowerThumbWrapper.style = lowerThumbWrapperStyles;

  // Upper Thumb Wrapper Props
  state.upperThumbWrapper.style = upperThumbWrapperStyles;

  // Active Rail Props
  state.activeRail.ref = railRef;

  // Lower Input Props
  state.inputLower.ref = useMergedRefs(state.inputLower.ref, lowerInputRef);
  state.inputLower.value = currentValue.lowerValue;
  state.inputLower.min = min;
  state.inputLower.max = max;
  ariaValueText && (state.inputLower['aria-valuetext'] = ariaValueText(currentValue.lowerValue));
  state.inputLower.disabled = disabled;
  state.inputLower.step = step;
  state.inputLower.onKeyDown = onKeyDownLower;
  state.inputLower.onChange = onInputChange;

  // Upper Input Props
  state.inputUpper.ref = useMergedRefs(state.inputUpper.ref, upperInputRef);
  state.inputUpper.value = currentValue.upperValue;
  state.inputUpper.min = min;
  state.inputUpper.max = max;
  ariaValueText && (state.inputUpper['aria-valuetext'] = ariaValueText(currentValue.upperValue));
  state.inputUpper.disabled = disabled;
  state.inputUpper.step = step;
  state.inputUpper.onKeyDown = onKeyDownUpper;
  state.inputUpper.onChange = onInputChange;

  return state;
};
