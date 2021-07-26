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
import { SliderProps, SliderShorthandProps, SliderState, DragChangeEvent } from './Slider.types';
import { clamp } from './utils/clamp';
import { getPercent } from './utils/getPercent';

/**
 * Array of all shorthand properties listed in SliderShorthandProps
 */
export const sliderShorthandProps: SliderShorthandProps[] = ['rail', 'track', 'thumb', 'activeRail'];

const mergeProps = makeMergeProps<SliderState>({ deepMerge: sliderShorthandProps });

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
export const useSlider = (props: SliderProps, ref: React.Ref<HTMLElement>, defaultProps?: SliderProps): SliderState => {
  const { as = 'div', value, defaultValue = 0, min = 0, max = 10, step = 1, ariaValueText, onChange } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentValue, setCurrentValue] = useControllableValue<any, any, any>(
    value && clamp(value, min, max),
    clamp(defaultValue, min, max),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ev: any, val: number) => onChange?.(val, ev),
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ev: any, incomingValue: number): void => {
      if (currentValue !== min && currentValue !== max) {
        ev.preventDefault();
        ev.stopPropagation();
      }

      setCurrentValue(clamp(incomingValue, min, max), ev);
    },
    [currentValue, max, min, setCurrentValue],
  );

  /**
   * Gets the current position of the `thumb` based on the cursor position.
   */
  const getPosition = (ev: DragChangeEvent): number => {
    let currentPosition = 0;

    switch (ev.type) {
      case 'mousedown':
      case 'mousemove':
        currentPosition = (ev as MouseEvent).clientX;
        break;
      case 'touchstart':
      case 'touchmove':
        currentPosition = (ev as TouchEvent).touches[0].clientX;
        break;
    }

    return currentPosition;
  };

  /**
   * Calculates the `step` position based off of a `Mouse` or `Touch` event.
   */
  const calculateSteps = React.useCallback(
    (ev: DragChangeEvent): number => {
      const currentBounds = railRef?.current?.getBoundingClientRect();
      const size = currentBounds?.width || 0;
      const position = currentBounds?.left || 0;

      const totalSteps = (max - min) / step;
      const stepLength: number = size / totalSteps;
      const thumbPosition = getPosition(ev);
      const distance = thumbPosition - position;
      return distance / stepLength;
    },
    [max, min, step],
  );

  const onDrag = (ev: DragChangeEvent): void => {
    updateValue(ev, min + step * calculateSteps(ev));
  };

  const onThumbReleased = (): void => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  };

  const onThumbPressed = (ev: React.MouseEvent | React.TouchEvent): void => {
    if (ev.type === 'mousedown') {
      disposables.current.push(
        on(window, 'mousemove', onDrag as (ev: Event) => void, true),
        on(window, 'mouseup', onThumbReleased, true),
      );
    } else if (ev.type === 'touchstart') {
      disposables.current.push(
        on(window, 'touchmove', onDrag as (ev: Event) => void, true),
        on(window, 'touchend', onThumbReleased, true),
      );
    }

    onDrag(ev);
  };

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

  const valuePercent = getPercent(currentValue, min, max);

  const thumbStyles = {
    transform: `translateX(${valuePercent}%)`,
  };

  const trackStyles = { width: `${valuePercent}%` };

  const rootProps: Partial<SliderState> = {
    className: 'ms-Slider-root',
    onMouseDown: onThumbPressed,
    onTouchStart: onThumbPressed,
    onKeyDown: onKeyDown,
    id: id,
  };

  const railProps: React.HTMLAttributes<HTMLDivElement> = {
    className: 'ms-Slider-rail',
  };

  const activeRailProps: React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement> = {
    className: 'ms-Slider-activeRail',
    ref: railRef,
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

  const state = mergeProps(
    {
      ref,
      as: as,
      rail: { as: 'div', children: null, ...railProps },
      activeRail: { as: 'div', children: null, ...activeRailProps },
      track: { as: 'div', children: null, ...trackProps },
      thumb: { as: 'div', children: null, ...thumbProps },
      ...rootProps,
    },
    defaultProps && resolveShorthandProps(defaultProps, sliderShorthandProps),
    resolveShorthandProps(props, sliderShorthandProps),
  );

  return state;
};

// React.useImperativeHandle(
//   ref,
//   () => ({
//     get value() {
//       return currentValue;
//     },
//     focus() {
//       if (thumbRef.current) {
//         thumbRef.current.focus();
//       }
//     },
//   }),
//   [currentValue, thumbRef],
// );
