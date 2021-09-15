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
import { animationTime } from '../Slider/useSliderState';
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

interface RangedSliderInternalState {
  /**
   * The internal rendered value of the RangedSlider.
   */
  internalValue: RangedValue;

  /**
   * The locked value of the non-moving thumb. Used to ensure that the active thumb updates correctly when changed.
   * If the mouse moves quickly it would re evaluate both positions allowing for unintended movement. This locks it.
   */
  lockedValue: number;

  /**
   * The current selected thumb of the RangedSlider.
   */
  activeThumb: 'lowerValue' | 'upperValue';

  /**
   * Disposable events for the RangedSlider.
   */
  disposables: (() => void)[];
}

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
  const internalState = React.useRef<RangedSliderInternalState>({
    internalValue: value ? value : defaultValue,
    lockedValue: 0,
    activeThumb: 'lowerValue',
    disposables: [],
  });

  const [stepAnimation, { setTrue: showStepAnimation, setFalse: hideStepAnimation }] = useBoolean(false);
  const [renderedPosition, setRenderedPosition] = React.useState<RangedValue | undefined>(value ? value : defaultValue);
  const [currentValue, setCurrentValue] = useControllableState({
    state: value && clampRangedThumbValues(value, min, max),
    defaultState: clampRangedThumbValues(defaultValue, min, max),
    initialState: { lowerValue: min, upperValue: max },
  });

  /**
   * Updates the active thumb of the RangedSlider
   */
  const updateActiveThumb = React.useCallback((incomingValue: number) => {
    switch (internalState.current.activeThumb) {
      case 'lowerValue':
        if (incomingValue > internalState.current.internalValue.upperValue) {
          internalState.current.activeThumb = 'upperValue';
        }
        break;
      case 'upperValue':
        if (incomingValue < internalState.current.internalValue.lowerValue) {
          internalState.current.activeThumb = 'lowerValue';
        }
        break;
    }
  }, []);

  /**
   * Updates the controlled `currentValue` to the new `incomingValue` and clamps it.
   */
  const updateValue = useEventCallback(
    (incomingValue: number, ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void => {
      const clampedValue = clamp(incomingValue, min, max);

      const newValue: RangedValue = {
        upperValue:
          internalState.current.activeThumb === 'upperValue' ? clampedValue : internalState.current.lockedValue,
        lowerValue:
          internalState.current.activeThumb === 'lowerValue' ? clampedValue : internalState.current.lockedValue,
      };

      if (clampedValue !== min && clampedValue !== max) {
        ev.stopPropagation();
        if (ev.type === 'keydown') {
          ev.preventDefault();
        }
      }

      internalState.current.internalValue = newValue;
      onChange?.(ev, { value: newValue });
      setCurrentValue(newValue);
    },
  );

  /**
   * Updates the controlled `currentValue` and `renderedPosition` of the RangedSlider.
   */
  const updatePosition = React.useCallback(
    (incomingValue: number, ev) => {
      updateActiveThumb(clamp(incomingValue, min, max));
      internalState.current.internalValue = {
        ...internalState.current.internalValue,
        [internalState.current.activeThumb]: clamp(incomingValue, min, max),
      };
      internalState.current.lockedValue =
        internalState.current.activeThumb === 'lowerValue'
          ? internalState.current.internalValue.upperValue
          : internalState.current.internalValue.lowerValue;

      if (internalState.current.activeThumb === 'lowerValue') {
        lowerInputRef.current!.focus();
      } else {
        upperInputRef.current!.focus();
      }

      setRenderedPosition(internalState.current.internalValue);
      updateValue(incomingValue, ev);
    },
    [max, min, updateActiveThumb, updateValue],
  );

  /**
   * Updates the internal `renderedPosition` of the RangedSlider.
   */
  const updatedRenderedPosition = React.useCallback((incomingValue: number) => {
    setRenderedPosition({
      ...internalState.current.internalValue,
      [internalState.current.activeThumb]: incomingValue,
    });
  }, []);

  const onPointerMove = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const position = calculateSteps(ev, railRef, min, max, step, vertical, dir);
      const currentStepPosition = Math.round(position / step) * step;

      updateActiveThumb(currentStepPosition);
      updatedRenderedPosition(position);
      updateValue(currentStepPosition, ev);
    },
    [dir, max, min, step, updateActiveThumb, updateValue, updatedRenderedPosition, vertical],
  );

  const onPointerUp = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      internalState.current.disposables.forEach(dispose => dispose());
      internalState.current.disposables = [];
      showStepAnimation();
      // When undefined, the position fallbacks to the currentValue state.
      setRenderedPosition(undefined);
      if (internalState.current.activeThumb === 'lowerValue') {
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
      internalState.current.activeThumb = findClosestThumb(
        internalState.current.internalValue,
        calculateSteps(ev, railRef, min, max, step, vertical, dir),
      );

      internalState.current.lockedValue =
        internalState.current.activeThumb === 'lowerValue'
          ? internalState.current.internalValue.upperValue
          : internalState.current.internalValue.lowerValue;

      internalState.current.disposables.push(
        on(target, 'pointermove', onPointerMove),
        on(target, 'pointerup', onPointerUp),
        () => {
          target.releasePointerCapture?.(pointerId);
        },
      );

      onPointerMove(ev);
    },
    [dir, hideStepAnimation, max, min, onPointerDownCallback, onPointerMove, onPointerUp, step, vertical],
  );

  const onInputChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      updatePosition(Number(ev.target.value), ev);
    },
    [updatePosition],
  );

  const keyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      hideStepAnimation();

      const incomingValue = getKeydownValue(
        ev,
        currentValue[internalState.current.activeThumb],
        min,
        max,
        dir,
        keyboardStep,
      );

      if (incomingValue !== min && incomingValue !== max) {
        ev.stopPropagation();
        ev.preventDefault();
      }
      onKeyDownCallback?.(ev);

      if (currentValue[internalState.current.activeThumb] !== incomingValue) {
        updatePosition(incomingValue, ev);
      }
    },
    [currentValue, dir, hideStepAnimation, keyboardStep, max, min, onKeyDownCallback, updatePosition],
  );

  const onKeyDownLower = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      ev.stopPropagation();
      ev.preventDefault();
      internalState.current.activeThumb = 'lowerValue';
      keyDown(ev);
    },
    [keyDown],
  );

  const onKeyDownUpper = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      internalState.current.activeThumb = 'upperValue';
      keyDown(ev);
    },
    [keyDown],
  );

  useUnmount(() => {
    internalState.current.disposables.forEach(dispose => dispose());
    internalState.current.disposables = [];
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
  if (!disabled) {
    state.inputLower.onKeyDown = onKeyDownLower;
    state.inputLower.onChange = onInputChange;
  }

  // Upper Input Props
  state.inputUpper.ref = useMergedRefs(state.inputUpper.ref, upperInputRef);
  state.inputUpper.value = currentValue.upperValue;
  state.inputUpper.min = min;
  state.inputUpper.max = max;
  ariaValueText && (state.inputUpper['aria-valuetext'] = ariaValueText(currentValue.upperValue));
  state.inputUpper.disabled = disabled;
  state.inputUpper.step = step;
  if (!disabled) {
    state.inputUpper.onKeyDown = onKeyDownUpper;
    state.inputUpper.onChange = onInputChange;
  }

  return state;
};
