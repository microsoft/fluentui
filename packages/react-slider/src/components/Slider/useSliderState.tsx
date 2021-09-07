import * as React from 'react';
import { useFluent } from '@fluentui/react-shared-contexts';
import {
  useBoolean,
  useControllableState,
  useEventCallback,
  useId,
  useUnmount,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { mergeClasses } from '@fluentui/react-make-styles';
import { getRTLSafeKey, clamp, getPercent, calculateSteps, getMarkPercent, getMarkValue } from '../../utils/index';
import type { SliderState } from './Slider.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const on = (element: Element, eventName: string, callback: (ev: any) => void) => {
  element.addEventListener(eventName, callback);
  return () => element.removeEventListener(eventName, callback);
};

// The mark related classNames are needed since they are used in a JSX element that is dynamically generated.
const markContainerClassName = 'ms-Slider-markItemContainer';
export const markClassName = 'ms-Slider-mark';
const firstMarkClassName = 'ms-Slider-firstMark';
const lastMarkClassName = 'ms-Slider-lastMark';

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
    onPointerDown: onPointerDownCallback,
    onKeyDown: onKeyDownCallback,
  } = state;

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
  const id = useId('slider-', state.id);

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
      const position = min + step * calculateSteps(ev, railRef, min, max, step, vertical, dir);
      const currentStepPosition = Math.round(position / step) * step;

      setRenderedPosition(clamp(position, min, max));
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

      disposables.current.push(on(target, 'pointermove', onPointerMove), on(target, 'pointerup', onPointerUp), () => {
        target.releasePointerCapture?.(pointerId);
      });

      onPointerMove(ev);
    },
    [hideStepAnimation, onPointerDownCallback, onPointerMove, onPointerUp],
  );

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      const normalizedKey = getRTLSafeKey(ev.key, dir);
      hideStepAnimation();
      onKeyDownCallback?.(ev);

      if (ev.shiftKey) {
        if (normalizedKey === 'ArrowDown' || normalizedKey === 'ArrowLeft') {
          updatePosition(currentValue! - keyboardStep * 10, ev);
          return;
        } else if (normalizedKey === 'ArrowUp' || normalizedKey === 'ArrowRight') {
          updatePosition(currentValue! + keyboardStep * 10, ev);
          return;
        }
      } else if (normalizedKey === 'ArrowDown' || normalizedKey === 'ArrowLeft') {
        updatePosition(currentValue! - keyboardStep, ev);
        return;
      } else if (normalizedKey === 'ArrowUp' || normalizedKey === 'ArrowRight') {
        updatePosition(currentValue! + keyboardStep, ev);
        return;
      } else {
        switch (normalizedKey) {
          case 'PageDown':
            updatePosition(currentValue! - keyboardStep * 10, ev);
            break;
          case 'PageUp':
            updatePosition(currentValue! + keyboardStep * 10, ev);
            break;
          case 'Home':
            updatePosition(min, ev);
            break;
          case 'End':
            updatePosition(max, ev);
            break;
        }
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

  useUnmount(() => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  });

  // TODO: Awaiting animation time from design spec.
  const animationTime = '0.1s';

  const valuePercent = getPercent(renderedPosition !== undefined ? renderedPosition : currentValue, min, max);

  const originPercent = React.useMemo(() => {
    return origin !== undefined ? getPercent(origin, min, max) : 0;
  }, [max, min, origin]);

  const markValues = React.useMemo((): number[] => {
    return getMarkValue(marks, min, max, step);
  }, [marks, max, min, step]);

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

  /**
   * Renders the marks
   */
  const renderMarks = () => {
    const marksPercent = markPercent;
    const marksValue = markValues;
    const marksChildren: JSX.Element[] = [];
    for (let i = 0; i < marksPercent.length; i++) {
      marksChildren.push(
        <div className={markContainerClassName} key={`markItemContainer-${i}`}>
          <div
            className={mergeClasses(
              markClassName,
              (marksValue[i] === 0 && firstMarkClassName) || (marksValue[i] === 100 && lastMarkClassName) || '',
            )}
            key={`mark-${i}`}
          />
        </div>,
      );
    }

    return marksChildren;
  };

  // Root props
  state.id = id;
  if (!disabled) {
    state.onPointerDown = onPointerDown;
    state.onKeyDown = onKeyDown;
  }

  // Track Props
  state.track.style = trackStyles;

  // Mark props
  state.marksWrapper.children = marks ? renderMarks() : undefined;
  state.marksWrapper.style = marksWrapperStyles;

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
