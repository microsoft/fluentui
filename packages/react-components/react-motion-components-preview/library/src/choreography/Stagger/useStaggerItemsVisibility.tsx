'use client';

import * as React from 'react';
import { useAnimationFrame } from '@fluentui/react-utilities';
import type { StaggerProps } from './stagger-types';
import {
  staggerItemsVisibilityAtTime,
  type StaggerItemsVisibilityAtTimeParams,
  DEFAULT_ITEM_DURATION,
  type StaggerChildMapping,
} from './utils';

export interface UseStaggerItemsVisibilityParams
  extends Pick<StaggerProps, 'onMotionFinish'>,
    Omit<StaggerItemsVisibilityAtTimeParams, 'elapsed' | 'itemCount'> {
  hideMode: StaggerProps['hideMode'];
  childMapping: StaggerChildMapping;
}

/**
 * Hook that tracks the visibility of a staggered sequence of items as time progresses.
 *
 * Behavior summary:
 * - hideMode 'visibleProp' or 'visibilityStyle':
 *   - On the first render, items are placed in their final state (enter => visible, exit => hidden)
 *     and no animation runs.
 *   - On subsequent renders when direction changes, items animate from the opposite state
 *     to the final state over the stagger timeline.
 * - hideMode 'unmount':
 *   - Items are mounted/unmounted and animations run on first render and on subsequent changes.
 *   - For 'enter', items start hidden and animate to visible; for 'exit', items start visible
 *     and animate to hidden.
 *
 * This hook uses child key mapping instead of item count to track individual items.
 * This allows it to correctly handle:
 * - Items being added and removed simultaneously (when count stays the same)
 * - Items being reordered
 * - Individual item identity across renders
 *
 * @param childMapping - Mapping of child keys to elements and indices
 * @param itemDelay - Milliseconds between the start of each item's animation
 * @param itemDuration - Milliseconds each item's animation lasts
 * @param direction - 'enter' (show items) or 'exit' (hide items)
 * @param reversed - Whether to reverse the stagger order (last item first)
 * @param onMotionFinish - Callback fired when the full stagger sequence completes
 * @param hideMode - How children's visibility is managed: 'visibleProp', 'visibilityStyle', or 'unmount'
 *
 * @returns An object with `itemsVisibility: Record<string, boolean>` indicating which items are currently visible by key
 */
export function useStaggerItemsVisibility({
  childMapping,
  itemDelay,
  itemDuration = DEFAULT_ITEM_DURATION,
  direction,
  reversed = false,
  onMotionFinish,
  hideMode = 'visibleProp',
}: UseStaggerItemsVisibilityParams): { itemsVisibility: Record<string, boolean> } {
  const [requestAnimationFrame, cancelAnimationFrame] = useAnimationFrame();

  // Track animation state independently of child changes
  const [animationKey, setAnimationKey] = React.useState(0);
  const prevDirection = React.useRef(direction);

  // Only trigger new animation when direction actually changes, not when children change
  React.useEffect(() => {
    if (prevDirection.current !== direction) {
      setAnimationKey(prev => prev + 1);
      prevDirection.current = direction;
    }
  }, [direction]);

  // State: visibility mapping for all items by key
  const [itemsVisibility, setItemsVisibility] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    // For unmount mode, items should start hidden and appear by being added to the DOM
    // For visibleProp and visibilityStyle modes, items start in target state: visible for 'enter', hidden for 'exit'
    const initialState = hideMode === 'unmount' ? direction === 'exit' : direction === 'enter';
    Object.keys(childMapping).forEach(key => {
      initial[key] = initialState;
    });
    return initial;
  });

  // Update visibility mapping when childMapping changes
  React.useEffect(() => {
    setItemsVisibility(prev => {
      const next: Record<string, boolean> = {};
      const targetState = direction === 'enter';

      // Add or update items from new mapping
      Object.keys(childMapping).forEach(key => {
        if (key in prev) {
          // Existing item - preserve its visibility state
          next[key] = prev[key];
        } else {
          // New item - set to target state
          next[key] = targetState;
        }
      });

      // Note: Items that were in prev but not in childMapping are automatically removed
      // because we only iterate over keys in childMapping

      return next;
    });
  }, [childMapping, direction]);

  // Refs: animation timing and control
  const startTimeRef = React.useRef<number | null>(null);
  const frameRef = React.useRef<number | null>(null);
  const finishedRef = React.useRef(false);
  const isFirstRender = React.useRef(true);

  // Use ref to avoid re-running the animation when child mapping changes
  const childMappingRef = React.useRef(childMapping);

  // Update childMapping ref whenever it changes
  React.useEffect(() => {
    childMappingRef.current = childMapping;
  }, [childMapping]);

  // ====== ANIMATION EFFECT ======

  React.useEffect(() => {
    let cancelled = false;
    startTimeRef.current = null;
    finishedRef.current = false;

    // Unmount mode should always animate, visibleProp and visibilityStyle modes only animate after first render
    // - Stagger.In (enter + unmount): DOM elements get added and animate from hidden to visible
    // - Stagger.Out (exit + unmount): DOM elements start visible and animate out before removal
    if ((hideMode === 'visibleProp' || hideMode === 'visibilityStyle') && isFirstRender.current) {
      isFirstRender.current = false;
      // Items are already in their final state from useState, no animation needed
      onMotionFinish?.();
      return; // No cleanup needed for first render
    }

    // Mark first render as complete
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    // For unmount mode, we start with the initial state and animate to the final state
    // For visibleProp and visibilityStyle mode animations after first render, we start from the opposite state
    if (hideMode === 'unmount') {
      // Unmount mode: already initialized correctly, start animation
    } else {
      // VisibleProp and visibilityStyle modes: start from the opposite of the final state
      // - Enter animation: start hidden (false), animate to visible (true)
      // - Exit animation: start visible (true), animate to hidden (false)
      const startState = direction === 'exit';
      // Use childMappingRef.current to avoid adding childMapping to dependencies
      const initialVisibility: Record<string, boolean> = {};
      Object.keys(childMappingRef.current).forEach(key => {
        initialVisibility[key] = startState;
      });
      setItemsVisibility(initialVisibility);
    }

    // Animation loop: update visibility on each frame until complete
    const tick = (now: number) => {
      if (cancelled) {
        return;
      }
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }
      const elapsed = now - (startTimeRef.current as number);

      const childKeys = Object.keys(childMappingRef.current);
      const itemCount = childKeys.length;

      const result = staggerItemsVisibilityAtTime({
        itemCount,
        elapsed,
        itemDelay,
        itemDuration,
        direction,
        reversed,
      });

      // Convert boolean array to keyed object
      const nextVisibility: Record<string, boolean> = {};
      childKeys.forEach((key, idx) => {
        nextVisibility[key] = result.itemsVisibility[idx];
      });

      setItemsVisibility(nextVisibility);

      if (elapsed < result.totalDuration) {
        frameRef.current = requestAnimationFrame(tick);
      } else if (!finishedRef.current) {
        finishedRef.current = true;
        onMotionFinish?.();
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (frameRef.current) {
        cancelAnimationFrame();
      }
    };
  }, [
    animationKey,
    itemDelay,
    itemDuration,
    direction,
    reversed,
    onMotionFinish,
    requestAnimationFrame,
    cancelAnimationFrame,
    hideMode,
  ]);

  return { itemsVisibility };
}
