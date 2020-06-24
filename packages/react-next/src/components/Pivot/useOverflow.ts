import * as React from 'react';
import { getWindow } from '../../Utilities';
import { observeResize } from './observeResize';

/**
 * Callback to notify the user that the items in the overflow have changed. This should ensure that the overflow menu
 * is visible, and contains all of the overflowing items.
 *
 * @param overflowIndex The index of the first item in the overflow, or items.length if nothing is overflowing.
 * @param items The list of all items in the container, and whether that particular item is in the overflow
 */
export type OverflowItemsChangedCallback = (
  overflowIndex: number,
  items: { ele: HTMLElement; isOverflowing: boolean }[],
) => void;

/**
 * Track whether any items don't fit within their container, and move them to the overflow menu.
 *
 * The overflow menu button must be the last sibling of all of the items that can be put into the overflow:
 *
 * <Container>
 *  <Item /> // Index 0
 *  <Item /> // Index 1
 *  ...
 *  <OverflowMenuButton />
 * </Container>
 *
 * Items will be moved into the overflow menu from back to front, excluding pinned items.
 *
 * @param overflowMenuButtonRef - The button that will show the overflow menu. All items that will go into the overflow
 * menu should be direct siblings and come before this menu button.
 *
 * @param onOverflowItemsChanged - Callback to notify the user that the items in the overflow have changed.
 *
 * @param rtl - True if the element containing overflowMenuButtonRef is in right-to-left order
 *
 * @param pinnedIndexes - Optional: List of item indexes that should never go into the overflow menu.
 */
export const useOverflow = (
  overflowMenuButtonRef: React.RefObject<HTMLElement | undefined> | null | undefined,
  onOverflowItemsChanged: OverflowItemsChangedCallback,
  rtl: boolean,
  pinnedIndexes?: readonly number[],
) => {
  React.useLayoutEffect(() => {
    const menuButton = overflowMenuButtonRef?.current;
    const container = menuButton?.parentElement;
    const win = container && getWindow(container);
    if (!container || !menuButton || !win) {
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

    const updateOverflow = (containerWidth: number) => {
      // Iterate the items in reverse order until we find one that fits within the bounds of the container
      for (let i = items.length - 1; i >= 0; i--) {
        // Calculate the min container width for this item if we haven't done so yet
        if (minContainerWidth[i] === undefined) {
          const itemOffsetEnd = rtl ? containerWidth - items[i].offsetLeft : items[i].offsetLeft + items[i].offsetWidth;

          // If the item after this one is pinned, reserve space for it
          if (i + 1 < items.length && pinnedIndexes?.includes(i + 1)) {
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
            isOverflowing: index >= overflowIndex && !pinnedIndexes?.includes(index),
          })),
        );
      }
    };

    const disposeObserver = observeResize(container, entries => {
      updateOverflow(entries ? entries[0].contentRect.width : container.clientWidth);
    });

    return () => {
      disposeObserver();

      // On cleanup, need to remove all items from the overflow
      // so they don't have stale properties on the next render
      setOverflowIndex(items.length);
    };
  });
};
