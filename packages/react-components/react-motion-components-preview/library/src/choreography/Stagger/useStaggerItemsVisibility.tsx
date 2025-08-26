import * as React from 'react';
import { useAnimationFrame } from '@fluentui/react-utilities';
import type { StaggerProps } from './stagger-types';
import { staggerItemsVisibilityAtTime, type StaggerItemsVisibilityAtTimeParams } from './utils/stagger-calculations';
import { DEFAULT_ITEM_DURATION } from './utils/constants';

export interface UseStaggerItemsVisibilityParams
  extends Pick<StaggerProps, 'onMotionFinish'>,
    Omit<StaggerItemsVisibilityAtTimeParams, 'elapsed'> {
  hideMode: StaggerProps['hideMode'];
}

/**
 * Hook that tracks the visibility of a staggered sequence of items as time progresses.
 *
 * **Behavior:**
 * - All modes start in final state: visible for 'enter', hidden for 'exit'
 * - All modes: No animation on first render (items already in final state)
 * - On subsequent renders: Items animate from start state to final state over time
 *
 * **States:**
 * - Enter direction: Items start visible (final state)
 * - Exit direction: Items start hidden (final state)
 *
 * @param itemCount - Total number of items to stagger
 * @param itemDelay - Milliseconds between the start of each item's animation
 * @param itemDuration - Milliseconds each item's animation lasts
 * @param direction - 'enter' (show items) or 'exit' (hide items)
 * @param reversed - Whether to reverse the stagger order (last item first)
 * @param onMotionFinish - Callback fired when the full stagger sequence completes
 * @param hideMode - How children's visibility is managed: 'visibleProp', 'visibilityStyle', or 'unmount'
 *
 * @returns An `itemsVisibility` array of booleans indicating which items are currently visible
 */
export function useStaggerItemsVisibility({
  itemCount,
  itemDelay,
  itemDuration = DEFAULT_ITEM_DURATION,
  direction,
  reversed = false,
  onMotionFinish,
  hideMode = 'visibleProp',
}: UseStaggerItemsVisibilityParams): { itemsVisibility: boolean[] } {
  const [requestAnimationFrame, cancelAnimationFrame] = useAnimationFrame();

  // Track animation state independently of item count
  const [animationKey, setAnimationKey] = React.useState(0);
  const prevDirection = React.useRef(direction);

  // Only trigger new animation when direction actually changes, not when itemCount changes
  React.useEffect(() => {
    if (prevDirection.current !== direction) {
      setAnimationKey(prev => prev + 1);
      prevDirection.current = direction;
    }
  }, [direction]);

  // State: visibility array for all items
  const [itemsVisibility, setItemsVisibility] = React.useState<boolean[]>(() => {
    // For unmount mode, items should start hidden and appear by being added to the DOM
    // For visibleProp and visibilityStyle modes, items start in target state: visible for 'enter', hidden for 'exit'
    if (hideMode === 'unmount') {
      return Array(itemCount).fill(direction === 'exit');
    } else {
      return Array(itemCount).fill(direction === 'enter');
    }
  });

  // Update array size when itemCount changes without triggering animation
  React.useEffect(() => {
    setItemsVisibility(prev => {
      if (itemCount === prev.length) {
        return prev; // No change needed
      }

      if (itemCount > prev.length) {
        // Add new items in their target state
        const targetState = direction === 'enter';
        return [...prev, ...Array(itemCount - prev.length).fill(targetState)];
      } else {
        // Remove items from the end
        return prev.slice(0, itemCount);
      }
    });
  }, [itemCount, direction]);

  // Refs: animation timing and control
  const startTimeRef = React.useRef<number | null>(null);
  const frameRef = React.useRef<number | null>(null);
  const finishedRef = React.useRef(false);
  const isFirstRender = React.useRef(true);

  // Use ref to avoid re-running the animation when item count changes
  const itemCountRef = React.useRef(itemCount);

  // Update itemCount ref whenever it changes
  React.useEffect(() => {
    itemCountRef.current = itemCount;
  }, [itemCount]);

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
      // Use itemCountRef.current to avoid adding itemCount to dependencies
      setItemsVisibility(Array(itemCountRef.current).fill(startState));
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

      const result = staggerItemsVisibilityAtTime({
        itemCount: itemCountRef.current,
        elapsed,
        itemDelay,
        itemDuration,
        direction,
        reversed,
      });

      setItemsVisibility(result.itemsVisibility);

      if (elapsed < result.totalDuration) {
        frameRef.current = requestAnimationFrame(tick as () => void);
      } else if (!finishedRef.current) {
        finishedRef.current = true;
        onMotionFinish?.();
      }
    };

    frameRef.current = requestAnimationFrame(tick as () => void);
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
