import * as React from 'react';
import { useControlledState } from '../../hooks/useControlledState';
import { useWindowEvent } from '../../hooks/useWindowEvent';
import { ISliderProps } from './Slider.types';
import { mergeSlotProps } from '@fluentui/react-theming';

import cx from 'classnames';

function _getDragValues(
  ev: React.MouseEvent,
  containerRect: any,
  min: number,
  max: number,
  step: number,
  snapToStep: boolean,
  vertical: boolean,
) {
  const range = max - min;
  const percentage = Math.min(
    1,
    Math.max(
      0,
      vertical
        ? 1 - (ev.clientY - containerRect.top) / containerRect.height
        : (ev.clientX - containerRect.left) / containerRect.width,
    ),
  );
  const value = Math.round(min + (percentage * range) / step) * step;

  return {
    percentage: snapToStep ? (100 * value) / (max - min) : 100 * percentage,
    value,
  };
}

export interface ISliderState {
  focused: boolean;
  min: number;
  max: number;
  value: number;
  rootRef: React.Ref<Element>;
  thumbRef: React.Ref<Element>;
  onMouseDown?: (ev: React.MouseEvent) => void;
  onKeyDown?: (ev: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  percentage: number;
}

/**
 * Slider hook for building an accessible slider.
 *
 * https://www.w3.org/TR/2017/REC-wai-aria-1.1-20171214/#slider
 */
const useSliderState = (userProps: ISliderProps): ISliderState => {
  const {
    disabled = false,
    vertical = false,
    min = 0,
    max = 100,
    step = 1,
    value: controlledValue,
    snapToStep = false,
    onChange,
    defaultValue,
  } = userProps;
  const [focused, setFocused] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [value, setValue] = useControlledState(controlledValue, defaultValue);
  const [dragState, setDragState] = React.useState<{
    rootRect: DOMRect | null;
  }>({
    rootRect: null,
  });
  const rootRef = React.useRef<HTMLElement>(null);
  const thumbRef = React.useRef<HTMLElement>(null);
  const percentage = (100 * (value - min)) / (max - min);

  const _updateValue = React.useCallback(
    (ev, val) => {
      if (onChange) {
        onChange(ev, val);
      }

      setValue(val);
      return val;
    },
    [onChange, setValue],
  );

  const onMouseMove = React.useCallback(
    (ev: any, allowDefault: any) => {
      if (dragState && dragState.rootRect) {
        const drag = _getDragValues(ev, dragState.rootRect, min, max, step, snapToStep, vertical);

        _updateValue(ev, drag.value);
      }

      if (!allowDefault) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    },
    [dragState, min, max, step, snapToStep, _updateValue, vertical],
  );

  const onMouseDown = React.useCallback(
    (ev: any) => {
      const rootRect = rootRef.current!.getBoundingClientRect();

      setDragState({ rootRect });
      setDragging(true);
      const drag = _getDragValues(ev, rootRect, min, max, step, snapToStep, vertical);

      setImmediate(() => thumbRef.current?.focus());

      _updateValue(ev, drag.value);
    },
    [_updateValue, max, min, snapToStep, step, setDragging, setDragState, rootRef, vertical],
  );

  const onMouseUp = React.useCallback(
    (ev: any) => {
      setDragging(false);

      ev.preventDefault();
      ev.stopPropagation();
    },
    [setDragging],
  );

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useWindowEvent('mousemove', dragging && onMouseMove);
  useWindowEvent('mouseup', dragging && onMouseUp);

  const onKeyDown = (ev: React.KeyboardEvent) => {
    let newValue;
    const increment = (ev.shiftKey ? 10 : 1) * step;

    switch (ev.which) {
      case 36: // home
        newValue = min;
        break;

      case 35: // end
        newValue = max;
        break;

      case 37: // left
      case 40: // down
        newValue = ev.metaKey ? min : Math.max(min, value - increment);
        break;

      case 38: // up
      case 39: // right
        newValue = ev.metaKey ? max : Math.min(max, value + increment);
        break;

      default:
        return;
    }

    _updateValue(ev, newValue);
    ev.preventDefault();
    ev.stopPropagation();
  };

  return {
    min,
    max,
    value,
    rootRef,
    thumbRef,
    onMouseDown: disabled ? undefined : onMouseDown,
    onKeyDown: disabled ? undefined : onKeyDown,
    onFocus,
    onBlur,
    percentage,
    focused,
  };
};

export const useSlider = (props: ISliderProps) => {
  const { classes = {}, disabled, vertical } = props;
  const state = useSliderState(props);
  const { min, max, value, rootRef, thumbRef, onMouseDown, onKeyDown, onFocus, onBlur, percentage, focused } = state;
  const { rootFocused, rootDisabled, rootVertical } = classes;

  const slotProps = mergeSlotProps(props, {
    root: {
      ref: rootRef,
      onMouseDown,
      onKeyDown,
      className: cx(focused && rootFocused, disabled && rootDisabled, vertical && rootVertical),
    },
    rail: {},
    track: {
      style: vertical
        ? {
            height: `${percentage}%`,
          }
        : {
            width: `${percentage}%`,
          },
    },
    thumb: {
      ref: thumbRef,
      tabIndex: 0,
      role: 'slider',
      'aria-disabled': disabled,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': value,
      onFocus,
      onBlur,
      style: vertical
        ? {
            bottom: `${percentage}%`,
          }
        : {
            left: `${percentage}%`,
          },
    },
  });

  return {
    state,
    slotProps,
  };
};
