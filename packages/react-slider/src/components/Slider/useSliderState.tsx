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
import { calculateSteps, getKeydownValue, getPercent, on } from '../../utils/index';
import type { SliderState } from './Slider.types';

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

  const railRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const disposables = React.useRef<(() => void)[]>([]);

  const valuePercent = getPercent(renderedPosition !== undefined ? renderedPosition : currentValue, min, max);
  const originPercent = React.useMemo(() => {
    return origin !== undefined ? getPercent(origin, min, max) : 0;
  }, [max, min, origin]);

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
      disposables.current.forEach(dispose => dispose());
      disposables.current = [];
      showStepAnimation();
      // When undefined, the position fallbacks to the currentValue state.
      setRenderedPosition(undefined);
      inputRef.current!.focus();
    },
    [showStepAnimation],
  );

  const onPointerDown = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const { pointerId } = ev;
      const target = ev.target as HTMLElement;

      target.setPointerCapture?.(pointerId);

      hideStepAnimation();
      onPointerDownCallback?.(ev);

      // eslint-disable-next-line deprecation/deprecation -- Should be remove an replaced with a useEvent hook.
      disposables.current.push(on(target, 'pointermove', onPointerMove), on(target, 'pointerup', onPointerUp), () => {
        target.releasePointerCapture?.(pointerId);
      });

      onPointerMove(ev);
    },
    [hideStepAnimation, onPointerDownCallback, onPointerMove, onPointerUp],
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

  useUnmount(() => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  });

  const thumbVariables = {
    '--slider-thumb-position': valuePercent + '%',
    '--slider-thumb-transition': stepAnimation ? `left ease-in-out ${animationTime}` : 'none',
  };

  const trackVariables = {
    '--slider-track-offset': origin !== undefined ? `${Math.min(valuePercent, originPercent)}%` : 0,
    '--slider-track-progress':
      origin !== undefined
        ? `${Math.max(originPercent - valuePercent, valuePercent - originPercent)}%`
        : `${valuePercent}%`,
    '--slider-track-transition': stepAnimation
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
    '--slider-track-border-radius':
      // if has !origin, border on one end
      origin !== undefined && origin !== (max || min)
        ? // top or bottom if vertical
          vertical
          ? originPercent > valuePercent
            ? '99px 99px 0px 0px'
            : '0px 0px 99px 99px'
          : // left or right depending on rtl and values
          (dir === 'rtl' ? valuePercent > originPercent : valuePercent < originPercent)
          ? '99px 0px 0px 99px'
          : '0px 99px 99px 0px'
        : '99px',
  };

  // Root props
  state.root.style = {
    ...thumbVariables,
    ...trackVariables,
    ...state.root.style,
  };

  if (!disabled) {
    state.root.onPointerDown = onPointerDown;
    state.root.onKeyDown = onKeyDown;
  }

  // Rail Props
  state.rail.ref = railRef;

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
