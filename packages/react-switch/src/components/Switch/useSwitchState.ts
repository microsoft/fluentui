import * as React from 'react';
import { useBoolean, useControllableState, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import type { SwitchState } from './Switch.types';

/**
 * Validates that the `value` is a number and falls between the min and max.
 *
 * @param value - the value to be clamped
 * @param min - the lowest valid value
 * @param max - the highest valid value
 */
const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value || 0));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const on = (element: Element, eventName: string, callback: (ev: any) => void) => {
  element.addEventListener(eventName, callback);
  return () => element.removeEventListener(eventName, callback);
};

export const useSwitchState = (state: SwitchState) => {
  const { defaultChecked = false, checked, disabled = false, onChange } = state;

  const { dir } = useFluent();
  const inputRef = useMergedRefs(state.input.ref);
  const railRef = React.useRef<HTMLDivElement>(null);
  const disposables = React.useRef<(() => void)[]>([]);
  const [internalValue, setInternalValue] = useControllableState({
    defaultState: defaultChecked,
    state: checked,
    initialState: false,
  });
  const [thumbAnimation, { setTrue: showThumbAnimation, setFalse: hideThumbAnimation }] = useBoolean(false);
  const [renderedPosition, setRenderedPosition] = React.useState<number | undefined>(internalValue === true ? 100 : 0);

  const setChecked = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>, incomingValue: boolean) => {
      onChange?.(ev, { checked: incomingValue });
      setInternalValue(incomingValue);
      setRenderedPosition(incomingValue ? (dir === 'ltr' ? 100 : -100) : 0);
    },
    [dir, onChange, setInternalValue],
  );

  const userOnChange = state.input.onChange;

  const onInputChange = useEventCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    userOnChange?.(ev);
    setChecked(ev, ev.currentTarget.checked);
  });

  const calculatePosition = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): number => {
      const currentBounds = railRef?.current?.getBoundingClientRect();
      const railWidth = currentBounds!.width;
      const railPosition = dir === 'rtl' ? currentBounds!.right : currentBounds!.left;
      const distance = dir === 'rtl' ? railPosition - ev.clientX : ev.clientX - railPosition;

      return clamp((distance / railWidth) * 100, 0, 100);
    },
    [dir],
  );

  const onPointerMove = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const incomingPosition = calculatePosition(ev);
      // const roundedPosition = Math.round(calculatePosition(ev)! / 100) * 100;
      setRenderedPosition(incomingPosition);
      onChange?.(ev, { checked: incomingPosition === 100 ? true : false });
      setInternalValue(incomingPosition === 100 ? true : false);
    },
    [calculatePosition, setInternalValue],
  );

  const onPointerUp = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      disposables.current.forEach(dispose => dispose());
      disposables.current = [];
      inputRef.current!.focus();
      const roundedPosition = Math.round(calculatePosition(ev)! / 100) * 100;
      showThumbAnimation();
      setRenderedPosition(roundedPosition);
      if (roundedPosition === 100) {
        setChecked(ev, true);
      } else if (roundedPosition === 0) {
        setChecked(ev, false);
      }
    },
    [calculatePosition, inputRef, setChecked, showThumbAnimation],
  );

  const onThumbPointerDown = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const { pointerId } = ev;
      const target = ev.target as HTMLElement;

      target.setPointerCapture?.(pointerId);

      disposables.current.push(on(target, 'pointermove', onPointerMove), on(target, 'pointerup', onPointerUp), () => {
        target.releasePointerCapture?.(pointerId);
      });

      onPointerMove(ev);
      hideThumbAnimation();
    },
    [hideThumbAnimation, onPointerMove, onPointerUp],
  );

  const onRootPointerDown = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      ev.stopPropagation();
      setChecked(ev, !internalValue);
    },
    [internalValue, setChecked],
  );

  const thumbWrapperStyles = {
    transform: `translate(${renderedPosition}%)`,
    transition: thumbAnimation
      ? 'transform .1s cubic-bezier(0.33, 0.0, 0.67, 1), background .1s cubic-bezier(0.33, 0.0, 0.67, 1)'
      : 'none',
    '::after': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      borderRadius: '999px',
      boxSizing: 'border-box',
      content: "''",
      background: 'red',
    },
  };

  // Root Props
  //state.root.onPointerDown = onRootPointerDown;

  // Thumb Props
  if (!disabled) {
    state.thumb.onPointerDown = onThumbPointerDown;
  }

  // Input Props
  state.input.onChange = onInputChange;
  state.input.checked = internalValue;
  state.input.disabled = disabled;
  state.input.ref = inputRef;

  // Thumb Container Props
  state.thumbWrapper.style = thumbWrapperStyles;

  // Active Rail Props
  state.activeRail.ref = railRef;

  return state;
};
