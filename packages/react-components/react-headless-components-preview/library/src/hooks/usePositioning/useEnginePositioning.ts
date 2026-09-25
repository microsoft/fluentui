'use client';

import * as React from 'react';
import { canUseDOM, useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type {
  OnPositioningEndEvent,
  PositioningEngine,
  PositioningOptions,
  PositioningVirtualElement,
  PositionManager,
} from '@fluentui/react-positioning';
import type { PositioningProps } from './types';
import { ALIGNMENTS, POSITIONS } from './constants';
import { getPlacementString, toHeadlessPlacement } from './utils';

type TargetElement = HTMLElement | PositioningVirtualElement;

export type UseEnginePositioningOptions = Omit<PositioningProps, 'engine' | 'positioningRef'> & {
  /** `undefined` disables the hook: it keeps its state but never creates a manager. */
  engine: PositioningEngine | undefined;
};

export type UseEnginePositioningReturn = {
  targetRef: React.RefCallback<HTMLElement>;
  containerRef: React.RefCallback<HTMLElement>;
  arrowRef: React.RefCallback<HTMLElement>;
  setTarget: (target: TargetElement | null) => void;
  updatePosition: () => void;
};

/**
 * Memoizes positioning options field-by-field, so a fresh options object with equal values does not
 * recreate the engine's position manager. Mirrors `usePositioningOptions` in react-positioning.
 */
function useStablePositioningOptions(options: UseEnginePositioningOptions): PositioningOptions {
  const {
    align,
    arrowPadding,
    autoSize,
    coverTarget,
    disableUpdateOnResize,
    fallbackPositions,
    flipBoundary,
    matchTargetSize,
    offset,
    overflowBoundary,
    overflowBoundaryPadding,
    pinned,
    position,
    shiftToCoverTarget,
    strategy,
    useTransform,
  } = options;

  return React.useMemo(
    () => ({
      align,
      arrowPadding,
      autoSize,
      coverTarget,
      disableUpdateOnResize,
      fallbackPositions,
      flipBoundary,
      matchTargetSize,
      offset,
      overflowBoundary,
      overflowBoundaryPadding,
      pinned,
      position,
      shiftToCoverTarget,
      strategy,
      useTransform,
    }),
    [
      align,
      arrowPadding,
      autoSize,
      coverTarget,
      disableUpdateOnResize,
      fallbackPositions,
      flipBoundary,
      matchTargetSize,
      offset,
      overflowBoundary,
      overflowBoundaryPadding,
      pinned,
      position,
      shiftToCoverTarget,
      strategy,
      useTransform,
    ],
  );
}

/**
 * Positions a surface with an injected {@link PositioningEngine}.
 *
 * The engine is plain data: it is only ever invoked inside a layout effect, so it can come from props
 * or context and change identity freely without affecting hook order.
 *
 * Two concerns stay here regardless of engine because they belong to the surface, not the positioner:
 * the top-layer reset (the UA `[popover]:popover-open` stylesheet applies `inset: 0; margin: auto`,
 * which would stretch a surface that only receives `left`/`top` from a JS positioner), and reporting
 * the resolved placement through `data-placement` in the headless vocabulary.
 */
export function useEnginePositioning(options: UseEnginePositioningOptions): UseEnginePositioningReturn {
  const { engine, target: customTarget = null, onPositioningEnd } = options;
  const enabled = engine !== undefined;

  const { dir, targetDocument } = useFluent();
  const isRtl = dir === 'rtl';

  const [triggerEl, setTriggerEl] = React.useState<HTMLElement | null>(null);
  const [containerEl, setContainerEl] = React.useState<HTMLElement | null>(null);
  const [arrowEl, setArrowEl] = React.useState<HTMLElement | null>(null);
  const [imperativeTarget, setImperativeTarget] = React.useState<TargetElement | null>(null);
  const managerRef = React.useRef<PositionManager | null>(null);

  const effectiveTarget = enabled ? imperativeTarget ?? customTarget ?? triggerEl : null;
  const initialPlacement = getPlacementString(options.position ?? POSITIONS.above, options.align ?? ALIGNMENTS.center);

  const stableOptions = useStablePositioningOptions(options);

  const handlePositioningEnd = useEventCallback((event: OnPositioningEndEvent) => {
    const container = event.currentTarget as HTMLElement | null;
    if (container) {
      container.setAttribute('data-placement', toHeadlessPlacement(event.detail.placement, isRtl));
    }
    onPositioningEnd?.(event);
  });

  useIsomorphicLayoutEffect(() => {
    if (!engine || !containerEl || !effectiveTarget || !canUseDOM()) {
      return;
    }

    const manager = engine.create({
      container: containerEl,
      target: effectiveTarget,
      arrow: arrowEl,
      options: { ...stableOptions, onPositioningEnd: handlePositioningEnd },
      dir,
      targetDocument,
    });
    managerRef.current = manager;

    return () => {
      manager.dispose();
      managerRef.current = null;
    };
  }, [engine, containerEl, effectiveTarget, arrowEl, stableOptions, handlePositioningEnd, dir, targetDocument]);

  const targetRef: React.RefCallback<HTMLElement> = React.useCallback(node => {
    setTriggerEl(node);
  }, []);

  const arrowRef: React.RefCallback<HTMLElement> = React.useCallback(node => {
    setArrowEl(node);
  }, []);

  const containerRef: React.RefCallback<HTMLElement> = React.useCallback(
    node => {
      setContainerEl(node);

      if (!node || !enabled) {
        return;
      }

      // Top-layer reset, applied synchronously before the engine's first write.
      node.style.setProperty('inset', 'auto');
      node.style.setProperty('margin', '0');
      node.setAttribute('data-placement', initialPlacement);
    },
    [enabled, initialPlacement],
  );

  const setTarget = React.useCallback((el: TargetElement | null) => {
    setImperativeTarget(el);
  }, []);

  const updatePosition = React.useCallback(() => {
    managerRef.current?.updatePosition();
  }, []);

  return React.useMemo(
    () => ({ targetRef, containerRef, arrowRef, setTarget, updatePosition }),
    [targetRef, containerRef, arrowRef, setTarget, updatePosition],
  );
}
