import * as React from 'react';
import { clamp, useBoolean, useControllableState, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import type { SwitchState } from './Switch.types';

type SwitchInternalState = {
  /**
   * The internal rendered value of the Switch.
   */
  internalValue: boolean;

  /**
   * Whether the thumb is currently being dragged.
   */
  thumbIsDragging: boolean;

  /**
   * Disposable events for the Switch.
   */
  disposables: (() => void)[];
};

// TODO: This should be replaced with a useEvent hook
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const on = (element: Element, eventName: string, callback: (ev: any) => void) => {
  element.addEventListener(eventName, callback);
  return () => element.removeEventListener(eventName, callback);
};

export const useSwitchState = (state: SwitchState) => {
  const { defaultChecked = false, checked, disabled = false, onChange } = state;
  const { onPointerDown: onPointerDownCallback, onKeyUp: onKeyUpCallback } = state.root;

  const { dir } = useFluent();
  const inputRef = useMergedRefs(state.input.ref);
  const railRef = React.useRef<HTMLDivElement>(null);
  const internalState = React.useRef<SwitchInternalState>({
    internalValue: checked ? checked : defaultChecked,
    thumbIsDragging: false,
    disposables: [],
  });

  const [currentValue, setCurrentValue] = useControllableState({
    defaultState: defaultChecked,
    state: checked,
    initialState: false,
  });
  const [thumbAnimation, { setTrue: showThumbAnimation, setFalse: hideThumbAnimation }] = useBoolean(true);
  const [renderedPosition, setRenderedPosition] = React.useState<number | undefined>(undefined);

  const setChecked = useEventCallback(
    (ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, incomingValue: boolean) => {
      ev.stopPropagation();
      ev.preventDefault();
      internalState.current.internalValue = incomingValue;
      onChange?.(ev, { checked: incomingValue });
      setCurrentValue(incomingValue);
      setRenderedPosition(undefined);
    },
  );

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

      internalState.current.thumbIsDragging = true;
      hideThumbAnimation();
      setRenderedPosition(incomingPosition);

      // If the Switch reaches a new position of 0% or 100%, update the state and fire change.
      if (incomingPosition === 100 && internalState.current.internalValue !== true) {
        setChecked(ev, true);
      } else if (incomingPosition === 0 && internalState.current.internalValue !== false) {
        setChecked(ev, false);
      }
    },
    [calculatePosition, hideThumbAnimation, setChecked],
  );

  const onPointerUp = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      internalState.current.disposables.forEach(dispose => dispose());
      internalState.current.disposables = [];
      inputRef.current!.focus();

      if (internalState.current.thumbIsDragging) {
        const roundedPosition = Math.round(calculatePosition(ev)! / 100) * 100;

        showThumbAnimation();
        if (roundedPosition === 100) {
          setChecked(ev, true);
        } else if (roundedPosition === 0) {
          setChecked(ev, false);
        }
      } else {
        setChecked(ev, !internalState.current.internalValue);
      }
    },
    [calculatePosition, inputRef, setChecked, showThumbAnimation],
  );

  const onPointerDown = React.useCallback(
    (ev: React.PointerEvent<HTMLDivElement>): void => {
      const { pointerId } = ev;
      const target = ev.target as HTMLElement;

      onPointerDownCallback?.(ev);
      showThumbAnimation();
      target.setPointerCapture?.(pointerId);
      internalState.current.thumbIsDragging = false;

      internalState.current.disposables.push(
        on(target, 'pointermove', onPointerMove),
        on(target, 'pointerup', onPointerUp),
        () => {
          target.releasePointerCapture?.(pointerId);
        },
      );
    },
    [onPointerDownCallback, onPointerMove, onPointerUp, showThumbAnimation],
  );

  const onKeyUp = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>): void => {
      onKeyUpCallback?.(ev);
      if (ev.key === ' ') {
        setChecked(ev, !internalState.current.internalValue);
      }
    },
    [onKeyUpCallback, setChecked],
  );

  const currentPosition = renderedPosition !== undefined ? renderedPosition : currentValue ? 100 : 0;

  const rootStyles = {
    '--switch-checked-opacity': currentPosition / 100,
    '--switch-unchecked-opacity': (100 - currentPosition) / 100,
  } as React.CSSProperties;

  const thumbWrapperStyles = {
    transform: `translate(${dir === 'rtl' ? -currentPosition : currentPosition}%)`,
    transition: thumbAnimation
      ? 'transform .1s cubic-bezier(0.33, 0.0, 0.67, 1), opacity .1s cubic-bezier(0.33, 0.0, 0.67, 1)'
      : 'none',
  };

  // Root Props
  state.root.style = rootStyles;
  if (!disabled) {
    state.root.onPointerDown = onPointerDown;
    state.root.onKeyUp = onKeyUp;
  }

  // Input Props
  state.input.checked = currentValue;
  state.input.disabled = disabled;
  state.input.ref = inputRef;
  state.input.readOnly = true;
  state.input.role = 'switch';

  // Thumb Container Props
  state.thumbWrapper.style = thumbWrapperStyles;

  // Active Rail Props
  state.activeRail.ref = railRef;

  return state;
};
