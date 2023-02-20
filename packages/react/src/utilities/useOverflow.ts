import * as React from 'react';
import { useIsomorphicLayoutEffect, useRefEffect } from '@fluentui/react-hooks';
import { getWindow } from '@fluentui/utilities';
import { observeResize } from './observeResize';
import type { RefCallback } from '@fluentui/react-hooks';

/**
 * Callback to notify the user that the items in the overflow have changed. This should ensure that the overflow menu
 * is visible, and contains all of the overflowing items.
 *
 * @param overflowIndex - The index of the first item in the overflow, or items.length if nothing is overflowing.
 * @param items - The list of all items in the container, and whether that particular item is in the overflow
 */
export type OverflowItemsChangedCallback = (
  overflowIndex: number,
  items: { ele: HTMLElement; isOverflowing: boolean }[],
) => void;

/** Parameters for {@see useOverflow} */
export type OverflowParams = {
  /** Callback to notify the user that the items in the overflow have changed. */
  onOverflowItemsChanged: OverflowItemsChangedCallback;

  /** True if the element containing overflowMenuButtonRef is in right-to-left order */
  rtl: boolean;

  /** Optional: Index of item that should never go into the overflow menu. */
  pinnedIndex?: number;
};

/** Return value for {@see useOverflow} */
export type OverflowRefs = {
  /** Set the overflow menu button's ref to this ref callback */
  menuButtonRef: RefCallback<HTMLElement>;
};

/**
 * Track whether any items don't fit within their container, and move them to the overflow menu.
 * Items are moved into the overflow menu from back to front, excluding pinned items.
 *
 * The overflow menu button must be the last sibling of all of the items that can be put into the overflow, and it
 * must be hooked up to the `setMenuButtonRef` setter function that's returned by `useOverflow`:
 * ```ts
 * const overflow = useOverflow(...);
 * ```
 * ```jsx
 * <Container>
 *  <Item /> // Index 0
 *  <Item /> // Index 1
 *  ...
 *  <Button ref={overflow.setMenuButtonRef} /> // Can be any React.Component or HTMLElement
 * </Container>
 * ```
 */
export const useOverflow = ({ onOverflowItemsChanged, rtl, pinnedIndex }: OverflowParams): OverflowRefs => {
  const updateOverflowRef = React.useRef<() => void>();
  const containerWidthRef = React.useRef<number>();

  // Attach a resize observer to the container
  const containerRef = useRefEffect<HTMLElement>(container => {
    const cleanupObserver = observeResize(container, entries => {
      containerWidthRef.current = entries ? entries[0].contentRect.width : container.clientWidth;
      if (updateOverflowRef.current) {
        updateOverflowRef.current();
      }
    });

    return () => {
      cleanupObserver();
      containerWidthRef.current = undefined;
    };
  });

  const menuButtonRef = useRefEffect<HTMLElement>(menuButton => {
    containerRef(menuButton.parentElement);
    return () => containerRef(null);
  });

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const menuButton = menuButtonRef.current;
    if (!container || !menuButton) {
      return;
    }

    // items contains the container's children, excluding the overflow menu button itself
    const items: HTMLElement[] = [];
    for (let i = 0; i < container.children.length; i++) {
      const item = container.children[i];
      if (item instanceof HTMLElement && item !== menuButton) {
        items.push(item);
      }
    }

    // Keep track of the minimum width of the container to fit each child index.
    // This cache is an integral part of the algorithm and not just a performance optimization: it allows us to
    // recalculate the overflowIndex on subsequent resizes even if some items are already inside the overflow.
    const minContainerWidth: number[] = [];
    let extraWidth = 0; // The accumulated width of items that don't move into the overflow

    updateOverflowRef.current = () => {
      const containerWidth = containerWidthRef.current;
      if (containerWidth === undefined) {
        return;
      }

      // Iterate the items in reverse order until we find one that fits within the bounds of the container
      for (let i = items.length - 1; i >= 0; i--) {
        // Calculate the min container width for this item if we haven't done so yet
        if (minContainerWidth[i] === undefined) {
          const itemOffsetEnd = rtl ? containerWidth - items[i].offsetLeft : items[i].offsetLeft + items[i].offsetWidth;

          // If the item after this one is pinned, reserve space for it
          if (i + 1 < items.length && i + 1 === pinnedIndex) {
            // Use distance between the end of the previous item and this one (rather than the
            // pinned item's offsetWidth), to account for any margin between the items.
            extraWidth = minContainerWidth[i + 1] - itemOffsetEnd;
          }

          // Reserve space for the menu button after the first item was added to the overflow
          if (i === items.length - 2) {
            extraWidth += menuButton.offsetWidth;
          }

          minContainerWidth[i] = itemOffsetEnd + extraWidth;
        }

        if (containerWidth > minContainerWidth[i]) {
          setOverflowIndex(i + 1);
          return;
        }
      }

      // If we got here, nothing fits outside the overflow
      setOverflowIndex(0);
    };

    let prevOverflowIndex = items.length;
    const setOverflowIndex = (overflowIndex: number) => {
      if (prevOverflowIndex !== overflowIndex) {
        prevOverflowIndex = overflowIndex;
        onOverflowItemsChanged(
          overflowIndex,
          items.map((ele, index) => ({
            ele,
            isOverflowing: index >= overflowIndex && index !== pinnedIndex,
          })),
        );
      }
    };

    let cancelAnimationFrame: (() => void) | undefined = undefined;

    // If the container width is already known from a previous render, update the overflow with its width.
    // Do this in an animation frame to avoid forcing layout to happen early.
    if (containerWidthRef.current !== undefined) {
      const win = getWindow(container);
      if (win) {
        const animationFrameId = win.requestAnimationFrame(updateOverflowRef.current);
        cancelAnimationFrame = () => win.cancelAnimationFrame(animationFrameId);
      }
    }

    return () => {
      if (cancelAnimationFrame) {
        cancelAnimationFrame();
      }

      // On cleanup, need to remove all items from the overflow
      // so they don't have stale properties on the next render
      setOverflowIndex(items.length);
      updateOverflowRef.current = undefined;
    };
  });

  return { menuButtonRef };
};
