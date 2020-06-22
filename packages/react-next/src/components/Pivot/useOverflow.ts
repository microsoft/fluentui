import * as React from 'react';
import { getWindow } from '@uifabric/utilities';

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
 * @param overflowMenuButtonRef The button that will show the overflow menu. All items that will go into the overflow
 * menu should be direct siblings and come before this menu button.
 *
 * @param onOverflowItemsChanged Callback to notify the user that the items in the overflow have changed.
 *
 * @param rtl True if the element containing overflowMenuButtonRef is in right-to-left order
 *
 * @param pinnedIndexes Optional: List of item indexes that should never go into the overflow menu.
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

    if (items.length === 0) {
      return;
    }

    // The position cache is an integral part of the algorithm and not just a performance optimization.
    // Each item has its position calculated and cached before it is hidden and moved into the overflow menu.
    // This allows overflowIndex to be recalculated after some items have already been moved into the overflow.
    const positionCache = new Map<HTMLElement, { readonly offsetEnd: number; readonly width: number }>();

    const updateOverflow = () => {
      const { left: containerLeft, right: containerRight } = container.getBoundingClientRect();

      const getCachedItemPosition = (item: HTMLElement) => {
        let pos = positionCache.get(item);
        if (pos === undefined) {
          let { left, right } = item.getBoundingClientRect();
          const { marginLeft, marginRight } = win.getComputedStyle(item);
          left -= parseFloat(marginLeft);
          right += parseFloat(marginRight);
          pos = {
            // offsetEnd is the distance from the start of the container to the end of the item.
            // This is safe to cache (as opposed to the absolute left/right coordinates of the item) because it is
            // independent of the container moving on the page in the future.
            offsetEnd: rtl ? containerRight - left : right - containerLeft,
            width: right - left,
          };
          positionCache.set(item, pos);
        }
        return pos;
      };

      let availableWidth = containerRight - containerLeft;
      let isOverflowing = false;

      // Iterate the items in reverse order, looking for the first one that fits within the bounds of the container
      for (let i = items.length - 1; i >= 0; i--) {
        const itemPos = getCachedItemPosition(items[i]);

        // This item fits, the overflow starts with the next item after this one
        if (itemPos.offsetEnd <= availableWidth) {
          setOverflowIndex(i + 1);
          return;
        }

        // If at least one item is overflowing, need to leave room for the overflow menu button itself
        if (!isOverflowing) {
          isOverflowing = true;
          availableWidth -= getCachedItemPosition(menuButton).width;
        }

        // Pinned items won't be moved into the overflow, so they reduce the available space
        if (pinnedIndexes?.includes(i)) {
          availableWidth -= itemPos.width;
        }
      }

      // If we got here, nothing fits outside the overflow
      setOverflowIndex(0);
    };

    let prevOverflowIndex: number;
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

    const animationFrameId = win.requestAnimationFrame(updateOverflow);
    win.addEventListener('resize', updateOverflow, false);

    return () => {
      win.cancelAnimationFrame(animationFrameId);
      win.removeEventListener('resize', updateOverflow, false);

      // On cleanup, need to remove all items from the overflow
      // so they don't have stale properties on the next render
      setOverflowIndex(items.length);
    };
  });
};
