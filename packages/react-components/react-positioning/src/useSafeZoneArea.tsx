import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { Placement } from '@floating-ui/dom';
import * as React from 'react';

import { createSafeZoneAreaStateStore, type SafeZoneAreaImperativeHandle, SafeZoneArea } from './SafeZoneArea';
import { parseFloatingUIPlacement } from './utils';

export type SafeBufferAreaOptions = {
  /** Enables debug mode: makes drawn shapes visible. */
  debug?: boolean;

  /** Disables the safe zone area. */
  disabled?: boolean;

  /** The time in milliseconds to wait before clearing the safe zone. */
  timeout?: number;

  /** Called when the mouse enters the safe zone. */
  onSafeZoneEnter?: (e: React.MouseEvent) => void;

  /** Called when the mouse leaves the safe zone. */
  onSafeZoneLeave?: (e: React.MouseEvent) => void;

  /** Called when the safe zone times out, even if a cursor is still over a safe zone. */
  onSafeZoneTimeout?: () => void;
};

export function useSafeZoneArea({
  debug = false,
  disabled = false,

  onSafeZoneEnter,
  onSafeZoneLeave,
  onSafeZoneTimeout,

  timeout = 1500,
}: SafeBufferAreaOptions = {}) {
  const [stateStore] = React.useState(createSafeZoneAreaStateStore);
  const { targetDocument } = useFluent_unstable();

  const safeZoneAreaRef = React.useRef<SafeZoneAreaImperativeHandle>(null);
  const containerRef = React.useRef<HTMLElement>(null);
  const targetRef = React.useRef<HTMLElement>(null);

  const timeoutIdRef = React.useRef<number | null>(null);
  const mouseMoveIdRef = React.useRef<number | null>(null);

  const containerListenerRef = React.useMemo(() => {
    if (disabled) {
      return () => {
        // do nothing
      };
    }

    let containerEl: HTMLElement | null = null;

    function onContainerMouseEnter() {
      stateStore.toggleActive(false);
    }

    return (el: HTMLElement | null) => {
      if (el === null) {
        containerEl?.removeEventListener('mouseenter', onContainerMouseEnter);
      }

      containerEl = el;
      el?.addEventListener('mouseenter', onContainerMouseEnter);
    };
  }, [disabled, stateStore]);

  const targetListenerRef = React.useMemo(() => {
    if (disabled) {
      return () => {
        // do nothing
      };
    }

    let targetEl: HTMLElement | null = null;

    function onTargetMouseMove(e: MouseEvent) {
      const targetWindow = targetDocument?.defaultView;

      if (!targetWindow) {
        return;
      }

      if (timeoutIdRef.current) {
        targetWindow.clearTimeout(timeoutIdRef.current);
      }

      if (!stateStore.isActive()) {
        stateStore.toggleActive(true);
      }

      mouseMoveIdRef.current = targetWindow.requestAnimationFrame(() => {
        const containerEl = containerRef.current;

        if (!containerEl || !targetEl) {
          return;
        }

        safeZoneAreaRef.current?.updateSVG({
          containerPlacementSide: parseFloatingUIPlacement(containerEl.dataset.popperPlacement as Placement).side,
          containerRect: containerEl.getBoundingClientRect(),
          mouseCoordinates: { x: e.clientX, y: e.clientY },
          targetRect: targetEl.getBoundingClientRect(),
        });
      });
    }

    return (el: HTMLElement | null) => {
      if (el === null) {
        if (mouseMoveIdRef.current) {
          targetDocument?.defaultView?.cancelAnimationFrame(mouseMoveIdRef.current);
        }

        if (timeoutIdRef.current) {
          targetDocument?.defaultView?.clearTimeout(timeoutIdRef.current);
        }

        targetEl?.removeEventListener('mousemove', onTargetMouseMove);
      }

      targetEl = el;
      el?.addEventListener('mousemove', onTargetMouseMove);
    };
  }, [disabled, stateStore, targetDocument]);

  const onSvgMouseEnter = useEventCallback((e: React.MouseEvent) => {
    onSafeZoneEnter?.(e);

    const targetWindow = targetDocument?.defaultView;

    if (!targetWindow) {
      return;
    }

    if (timeoutIdRef.current) {
      targetWindow.clearTimeout(timeoutIdRef.current);
    }

    // React 17 still uses pooled synthetic events
    e.persist();

    timeoutIdRef.current = targetWindow.setTimeout(() => {
      stateStore.toggleActive(false);
      onSafeZoneTimeout?.();
    }, timeout);
  });

  const onSvgMouseLeave = useEventCallback((e: React.MouseEvent) => {
    onSafeZoneLeave?.(e);
  });

  return {
    containerRef: useMergedRefs(containerRef, containerListenerRef),
    targetRef: useMergedRefs(targetRef, targetListenerRef),

    elementToRender: disabled ? null : (
      <SafeZoneArea
        debug={debug}
        onMouseEnter={onSvgMouseEnter}
        onMouseLeave={onSvgMouseLeave}
        imperativeRef={safeZoneAreaRef}
        stateStore={stateStore}
      />
    ),
  };
}
