import { useAnimationFrame, useEventCallback, useMergedRefs, useTimeout } from '@fluentui/react-utilities';
import * as React from 'react';

import { createSafeZoneAreaStateStore } from './createSafeZoneAreaStateStore';
import { type SafeZoneAreaImperativeHandle, SafeZoneArea } from './SafeZoneArea';

export type UseSafeZoneOptions = {
  /** Enables debug mode: makes drawn shapes visible. */
  debug?: boolean;

  /** Disables the safe zone area. */
  disabled?: boolean;

  /** The time in milliseconds to wait before clearing the safe zone. */
  timeout?: number;

  /** Called when the mouse enters the safe zone. */
  onSafeZoneEnter?: (e: React.MouseEvent) => void;

  /** Called when the mouse moves within the safe zone. */
  onSafeZoneMove?: (e: React.MouseEvent) => void;

  /** Called when the mouse leaves the safe zone. */
  onSafeZoneLeave?: (e: React.MouseEvent) => void;

  /** Called when the safe zone times out, even if a cursor is still over a safe zone. */
  onSafeZoneTimeout?: () => void;
};

/**
 * Time in milliseconds after which the safe zone area will be cleared if no mouse movement is detected.
 *
 * Only affects the target element, not the safe zone area itself.
 */
const MOUSE_MOVE_TARGET_POLLING_TIMEOUT = 2000;

// ---

export function useSafeZoneArea({
  debug = false,
  disabled = false,

  onSafeZoneEnter,
  onSafeZoneMove,
  onSafeZoneLeave,
  onSafeZoneTimeout,

  timeout = 1500,
}: UseSafeZoneOptions = {}) {
  const [stateStore] = React.useState(createSafeZoneAreaStateStore);

  const safeZoneAreaRef = React.useRef<SafeZoneAreaImperativeHandle>(null);
  const containerRef = React.useRef<HTMLElement>(null);
  const targetRef = React.useRef<HTMLElement>(null);

  const [setSafeZoneTimeout, clearSafeZoneTimeout] = useTimeout();
  const [setTargetTimeout, clearTargetTimeout] = useTimeout();
  const [requestMouseMoveFrame, clearMouseMoveFrame] = useAnimationFrame();

  const mouseCoordinatesRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerListenerRef = React.useMemo(() => {
    if (disabled) {
      return () => {
        // do nothing
      };
    }

    let containerEl: HTMLElement | null = null;

    function onContainerMouseEnter() {
      clearSafeZoneTimeout();
      clearTargetTimeout();

      stateStore.toggleActive(false);
    }

    return (el: HTMLElement | null) => {
      if (el === null) {
        containerEl?.removeEventListener('mouseenter', onContainerMouseEnter);
      }

      containerEl = el;
      el?.addEventListener('mouseenter', onContainerMouseEnter);
    };
  }, [clearSafeZoneTimeout, clearTargetTimeout, disabled, stateStore]);

  const targetListenerRef = React.useMemo(() => {
    if (disabled) {
      return () => {
        // do nothing
      };
    }

    let targetEl: HTMLElement | null = null;

    function onTargetMouseMove(e: MouseEvent) {
      mouseCoordinatesRef.current = { x: e.clientX, y: e.clientY };

      if (!stateStore.isActive()) {
        stateStore.toggleActive(true);
      }

      clearSafeZoneTimeout();
      clearTargetTimeout();

      setTargetTimeout(() => {
        stateStore.toggleActive(false);
      }, MOUSE_MOVE_TARGET_POLLING_TIMEOUT);
    }

    return (el: HTMLElement | null) => {
      if (el === null) {
        clearMouseMoveFrame();
        clearSafeZoneTimeout();
        clearTargetTimeout();

        targetEl?.removeEventListener('mousemove', onTargetMouseMove);
      }

      targetEl = el;
      el?.addEventListener('mousemove', onTargetMouseMove);
    };
  }, [clearMouseMoveFrame, clearSafeZoneTimeout, clearTargetTimeout, disabled, stateStore, setTargetTimeout]);

  const onSvgMouseEnter = useEventCallback((e: React.MouseEvent) => {
    onSafeZoneEnter?.(e);

    clearSafeZoneTimeout();
    clearTargetTimeout();

    setSafeZoneTimeout(() => {
      stateStore.toggleActive(false);
      onSafeZoneTimeout?.();
    }, timeout);
  });

  const onSvgMouseMove = useEventCallback((e: React.MouseEvent) => {
    onSafeZoneMove?.(e);
  });

  const onSvgMouseLeave = useEventCallback((e: React.MouseEvent) => {
    onSafeZoneLeave?.(e);
  });

  React.useEffect(() => {
    return stateStore.subscribe(isActive => {
      if (isActive) {
        function updateSVGs() {
          const containerEl = containerRef.current;
          const targetEl = targetRef.current;

          if (containerEl && targetEl) {
            safeZoneAreaRef.current?.updateSVG({
              containerRect: containerEl.getBoundingClientRect(),
              mouseCoordinates: [mouseCoordinatesRef.current.x, mouseCoordinatesRef.current.y],
              targetRect: targetEl.getBoundingClientRect(),
            });
          }

          requestMouseMoveFrame(updateSVGs);
        }

        updateSVGs();
        return;
      }

      clearMouseMoveFrame();
    });
  }, [clearMouseMoveFrame, requestMouseMoveFrame, stateStore]);

  return {
    containerRef: useMergedRefs(containerRef, containerListenerRef),
    targetRef: useMergedRefs(targetRef, targetListenerRef),

    elementToRender: React.useMemo(
      () =>
        disabled ? null : (
          <SafeZoneArea
            debug={debug}
            onMouseEnter={onSvgMouseEnter}
            onMouseMove={onSvgMouseMove}
            onMouseLeave={onSvgMouseLeave}
            imperativeRef={safeZoneAreaRef}
            stateStore={stateStore}
          />
        ),
      [disabled, debug, onSvgMouseEnter, onSvgMouseMove, onSvgMouseLeave, stateStore],
    ),
  };
}
