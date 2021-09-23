import * as React from 'react';
import { useFluent } from '@fluentui/react-shared-contexts';
import {
  clamp,
  useBoolean,
  useControllableState,
  useEventCallback,
  useUnmount,
  useMergedRefs,
} from '@fluentui/react-utilities';
import {
  on,
  findClosestThumb,
  getPercent,
  calculateSteps,
  getMarkPercent,
  getMarkValue,
  getKeydownValue,
  renderMarks,
  validateRangedThumbValues,
} from '../../utils/index';
import { animationTime } from '../Slider/useSliderState';
import { RangedSliderState } from './RangedSlider.types';

interface RangedSliderInternalState {
  /**
   * The internal rendered value of the RangedSlider.
   */
  internalValue: [number, number];

  /**
   * The locked value of the non-moving thumb. Used to ensure that the active thumb updates correctly when changed.
   * If the mouse moves quickly it would re evaluate both positions allowing for unintended movement. This locks it.
   */
  lockedValue: number;

  /**
   * The current selected thumb index of the RangedSlider.
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
    defaultValue = [min, max],
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
    internalValue: value
      ? validateRangedThumbValues(value, min, max)
      : validateRangedThumbValues(defaultValue, min, max),
    lockedValue: 0,
    activeThumb: 'lowerValue',
    disposables: [],
  });

  const [stepAnimation, { setTrue: showStepAnimation, setFalse: hideStepAnimation }] = useBoolean(false);
  const [renderedPosition, setRenderedPosition] = React.useState<[number, number] | undefined>(
    value ? validateRangedThumbValues(value, min, max) : validateRangedThumbValues(defaultValue, min, max),
  );
  const [currentValue, setCurrentValue] = useControllableState({
    state: value && validateRangedThumbValues(value, min, max),
    defaultState: validateRangedThumbValues(defaultValue, min, max),
    initialState: [min, max],
  });

  /**
   * Updates the active thumb of the RangedSlider
   */
  const updateActiveThumb = React.useCallback((incomingValue: number) => {
    switch (internalState.current.activeThumb) {
      case 'lowerValue':
        if (incomingValue > internalState.current.internalValue[1]) {
          internalState.current.activeThumb = 'upperValue';
        }
        break;
      case 'upperValue':
        if (incomingValue < internalState.current.internalValue[0]) {
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

      const newValue: [number, number] = [
        internalState.current.activeThumb === 'lowerValue' ? clampedValue : internalState.current.lockedValue,
        internalState.current.activeThumb === 'upperValue' ? clampedValue : internalState.current.lockedValue,
      ];

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

      internalState.current.internalValue = [
        internalState.current.activeThumb === 'lowerValue'
          ? clamp(incomingValue, min, max)
          : internalState.current.internalValue[0],
        internalState.current.activeThumb === 'upperValue'
          ? clamp(incomingValue, min, max)
          : internalState.current.internalValue[1],
      ];

      internalState.current.lockedValue =
        internalState.current.activeThumb === 'lowerValue'
          ? internalState.current.internalValue[1]
          : internalState.current.internalValue[0];

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
    setRenderedPosition([
      internalState.current.activeThumb === 'lowerValue' ? incomingValue : internalState.current.internalValue[0],
      internalState.current.activeThumb === 'upperValue' ? incomingValue : internalState.current.internalValue[1],
    ]);
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
          ? internalState.current.internalValue[1]
          : internalState.current.internalValue[0];

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
      const activeThumbIndex = internalState.current.activeThumb === 'lowerValue' ? 0 : 1;
      hideStepAnimation();

      const incomingValue = getKeydownValue(ev, currentValue[activeThumbIndex], min, max, dir, keyboardStep);

      if (incomingValue !== min && incomingValue !== max) {
        ev.stopPropagation();
      }
      onKeyDownCallback?.(ev);

      if (currentValue[activeThumbIndex] !== incomingValue) {
        updatePosition(incomingValue, ev);
      }
    },
    [currentValue, dir, hideStepAnimation, keyboardStep, max, min, onKeyDownCallback, updatePosition],
  );

  const onKeyDownLower = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
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
    renderedPosition !== undefined ? renderedPosition[0] : currentValue[0],
    min,
    max,
  );

  const upperValuePercent = getPercent(
    renderedPosition !== undefined ? renderedPosition[1] : currentValue[1],
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
    state.marksWrapper.children = renderMarks(markValues, marks);
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
  state.inputLower.value = currentValue[0];
  state.inputLower.min = min;
  state.inputLower.max = max;
  ariaValueText && (state.inputLower['aria-valuetext'] = ariaValueText(currentValue[0]));
  state.inputLower.disabled = disabled;
  state.inputLower.step = step;
  if (!disabled) {
    state.inputLower.onKeyDown = onKeyDownLower;
    state.inputLower.onChange = onInputChange;
  }

  // Upper Input Props
  state.inputUpper.ref = useMergedRefs(state.inputUpper.ref, upperInputRef);
  state.inputUpper.value = currentValue[1];
  state.inputUpper.min = min;
  state.inputUpper.max = max;
  ariaValueText && (state.inputUpper['aria-valuetext'] = ariaValueText(currentValue[1]));
  state.inputUpper.disabled = disabled;
  state.inputUpper.step = step;
  if (!disabled) {
    state.inputUpper.onKeyDown = onKeyDownUpper;
    state.inputUpper.onChange = onInputChange;
  }

  return state;
};
