import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useId, useControllableValue } from '@fluentui/react-utilities';
import {
  getCode,
  ArrowDownKey,
  ArrowUpKey,
  ArrowLeftKey,
  ArrowRightKey,
  PageDownKey,
  PageUpKey,
  HomeKey,
  EndKey,
} from '@fluentui/keyboard-key';
import { on } from '@fluentui/utilities';
import { SliderProps, SliderShorthandProps, SliderState, SliderPublicRef } from './Slider.types';
import { useMount } from '@fluentui/react-hooks';

/**
 * Array of all shorthand properties listed in SliderShorthandProps
 */
export const sliderShorthandProps: SliderShorthandProps[] = ['rail', 'track', 'thumb', 'activeRail'];

const mergeProps = makeMergeProps<SliderState>({ deepMerge: sliderShorthandProps });

/**
 * Validates that the `value` is a number and falls between the min and max.
 *
 * @param value - the value to be clamped
 * @param min - the lowest valid value
 * @param max - the highest valid value
 */
export const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value || 0));

/**
 * Gets the current percent of specified value between a min and max
 *
 * @param value - the value to find the percent
 * @param min - the lowest valid value
 * @param max - the highest valid value
 */
export const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};

/**
 * Create the state required to render Slider.
 *
 * The returned state can be modified with hooks such as useSliderStyles,
 * before being passed to renderSlider.
 *
 * @param props - props from this instance of Slider
 * @param ref - reference to root HTMLElement of Slider
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useSlider = (
  props: SliderProps,
  ref: React.RefObject<HTMLElement & SliderPublicRef>,
  defaultProps?: SliderProps,
): SliderState => {
  const {
    as = 'div',
    value,
    defaultValue = 0,
    min = 0,
    max = 10,
    step = 1,
    snapToStep = false,
    ariaValueText,
    onChange,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentValue, setCurrentValue] = useControllableValue<any, any, any>(
    value && clamp(value, min, max),
    clamp(defaultValue, min, max),
    (ev, val) => onChange?.(val, ev),
  );

  const railRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const disposables = React.useRef<(() => void)[]>([]);
  const id = useId('Slider', props.id);

  /**
   * Updates the `currentValue` to the new `incomingValue` and clamps it.
   *
   * @param ev
   * @param incomingValue
   */
  const updateValue = React.useCallback(
    (ev, incomingValue: number): void => {
      if (currentValue !== min && currentValue !== max) {
        ev.stopPropagation();
        if (ev.type === 'keydown') {
          ev.preventDefault();
        }
      }

      setCurrentValue(clamp(incomingValue, min, max), ev);
    },
    [currentValue, max, min, setCurrentValue],
  );

  /**
   * Calculates the `step` position based off of a `Mouse` or `Touch` event.
   */
  const calculateSteps = React.useCallback(
    (ev): number => {
      const currentBounds = railRef?.current?.getBoundingClientRect();
      const size = currentBounds?.width || 0;
      const position = currentBounds?.left || 0;

      const totalSteps = (max - min) / step;
      const stepLength = size / totalSteps;
      const thumbPosition = ev.clientX;
      const distance = thumbPosition - position;
      return distance / stepLength;
    },
    [max, min, step],
  );

  const onPointerMove = React.useCallback(
    (ev): void => {
      if (snapToStep || step !== 1) {
        updateValue(ev, Math.round((min + step * calculateSteps(ev)) / step) * step);
      } else {
        updateValue(ev, min + step * calculateSteps(ev));
      }
    },
    [calculateSteps, min, snapToStep, step, updateValue],
  );

  const onPointerUp = (): void => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  };

  const onPointerDown = React.useCallback(
    (ev): void => {
      const { currentTarget, pointerId } = ev;

      currentTarget.setPointerCapture(pointerId);

      disposables.current.push(
        on(currentTarget, 'pointermove', onPointerMove),
        on(currentTarget, 'pointerup', onPointerUp),
        () => currentTarget.releasePointerCapture(pointerId),
      );

      onPointerMove(ev);
    },
    [onPointerMove],
  );

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent): void => {
      const key = getCode(ev);

      if (ev.shiftKey) {
        if (key === ArrowDownKey || key === ArrowLeftKey) {
          updateValue(ev, currentValue - step * 10);
          return;
        } else if (key === ArrowUpKey || key === ArrowRightKey) {
          updateValue(ev, currentValue + step * 10);
          return;
        }
      } else if (key === ArrowDownKey || key === ArrowLeftKey) {
        updateValue(ev, currentValue - step);
        return;
      } else if (key === ArrowUpKey || key === ArrowRightKey) {
        updateValue(ev, currentValue + step);
        return;
      } else {
        switch (getCode(ev)) {
          case PageDownKey:
            updateValue(ev, currentValue - step * 10);
            break;
          case PageUpKey:
            updateValue(ev, currentValue + step * 10);
            break;
          case HomeKey:
            updateValue(ev, min);
            break;
          case EndKey:
            updateValue(ev, max);
            break;
        }
      }
    },
    [currentValue, max, min, step, updateValue],
  );

  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.value = currentValue;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref.current.focus = thumbRef?.current?.focus() as any;
    }
  }, [currentValue, ref]);

  useMount(() => {
    if (value !== undefined) {
      setCurrentValue(clamp(value, min, max));
    }
  });

  const valuePercent = getPercent(currentValue, min, max);

  const thumbStyles = {
    transform: `translateX(${valuePercent}%)`,
  };

  const trackStyles = { width: `${valuePercent}%` };

  const rootProps: Partial<SliderState> = {
    className: 'ms-Slider-root',
    onPointerDown: onPointerDown,
    onKeyDown: onKeyDown,
    id: id,
  };

  const railProps: React.HTMLAttributes<HTMLDivElement> = {
    className: 'ms-Slider-rail',
  };

  const trackProps: React.HTMLAttributes<HTMLDivElement> = {
    className: 'ms-Slider-track',
    style: trackStyles,
  };

  const thumbProps: React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement> = {
    className: 'ms-Slider-thumb',
    ref: thumbRef,
    tabIndex: 0,
    role: 'slider',
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': currentValue,
    'aria-valuetext': ariaValueText ? ariaValueText(currentValue) : currentValue.toString(),
    style: thumbStyles,
  };

  const activeRailProps: React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement> = {
    className: 'ms-Slider-activeRail',
    ref: railRef,
  };

  const state = mergeProps(
    {
      ref,
      as: as,
      rail: { as: 'div', children: null, ...railProps },
      track: { as: 'div', children: null, ...trackProps },
      thumb: { as: 'div', children: null, ...thumbProps },
      activeRail: { as: 'div', children: null, ...activeRailProps },
      ...rootProps,
    },
    defaultProps && resolveShorthandProps(defaultProps, sliderShorthandProps),
    resolveShorthandProps(props, sliderShorthandProps),
  );

  return state;
};
