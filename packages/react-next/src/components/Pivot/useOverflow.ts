import * as React from 'react';
import { useAsync } from '@uifabric/react-hooks';
import { getWindow } from '@uifabric/utilities';

export type OverflowCallbacks = {
  /**
   * Change whether the item is in the overflow.
   * This should alter the style of the element to be 'display: none' if it's in the overflow
   */
  setItemIsOverflowing: (item: HTMLElement, isOverflowing: boolean) => void;

  /**
   * Optional: return true if the item is "pinned" and should not be moved to the overflow
   */
  isPinned?: (item: HTMLElement) => boolean;

  /**
   * Notify that the items in the overflow have changed.
   * This should ensure that the overflow menu is visible, and contains all of the overflowing items.
   *
   * @param overflowIndex The index of the first item in the overflow; undefined if there are no items in the overflow
   */
  onOverflowItemsChanged?: (overflowIndex: number | undefined) => void;
};

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
 * Items will be moved into the overflow from back to front. Any item that is "pinned" (the isPinned callback returns
 * true) will not be put into the overflow.
 *
 * @param overflowMenuButtonRef The DOM element of the overflow menu button
 * @param callbacks Callback functions to the overflow user, to determine behavior of the overflow
 */
export const useOverflow = (
  overflowMenuButtonRef: React.RefObject<HTMLElement | undefined>,
  callbacks: OverflowCallbacks,
) => {
  let overflowIndex: number | undefined = undefined;

  // Cache the computed styles from this render
  let cachedStyle: { rtl: boolean; containerPadding: number; menuMargin: number } | undefined = undefined;
  const getCachedStyle = (container: HTMLElement, menuButton: HTMLElement, win: Window) => {
    if (cachedStyle === undefined) {
      const containerStyle = win.getComputedStyle(container);
      const menuStyle = win.getComputedStyle(menuButton);
      const rtl = containerStyle.direction === 'rtl';

      cachedStyle = {
        rtl,
        containerPadding: parseFloat(rtl ? containerStyle.paddingLeft : containerStyle.paddingRight),
        menuMargin: parseFloat(rtl ? menuStyle.marginLeft : menuStyle.marginRight),
      };
    }
    return cachedStyle;
  };

  // Resets the layout to show all items and hide the overflow menuButton
  const resetOverflowItems = (menuButton: HTMLElement) => {
    const container = menuButton.parentElement;
    if (!container || overflowIndex === undefined) {
      return;
    }

    const items = container.children;
    for (let i = overflowIndex; i < items.length; i++) {
      const item = items[i];
      if (item instanceof HTMLElement && item !== menuButton) {
        callbacks.setItemIsOverflowing(item, false);
      }
    }

    overflowIndex = undefined;
  };

  // Hides any items that overflow the container, and shows the overflow menu if applicable
  const hideOverflowItems = (menuButton: HTMLElement, win: Window) => {
    const container = menuButton.parentElement;
    if (!container) {
      return;
    }

    const previousOverflowIndex = overflowIndex;

    resetOverflowItems(menuButton);

    const { rtl, containerPadding, menuMargin } = getCachedStyle(container, menuButton, win);
    const containerRect = container.getBoundingClientRect();
    const containerEnd = (rtl ? -containerRect.left : containerRect.right) - containerPadding;
    const items = container.children;
    let lastVisibleElement: HTMLElement | undefined = undefined;

    // Iterate over the items in reverse order, hiding them as necessary until everything fits within the container
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (!(item instanceof HTMLElement) || item === menuButton) {
        continue;
      }

      // Keep track of the last visible element, even if it's pinned
      if (lastVisibleElement === undefined) {
        lastVisibleElement = item;
      }

      // Don't attempt to hide pinned items
      if (callbacks.isPinned && callbacks.isPinned(item)) {
        continue;
      }

      const lastElementRect = lastVisibleElement.getBoundingClientRect();
      const lastElementEnd = (rtl ? -lastElementRect.left : lastElementRect.right) + menuMargin;

      if (lastElementEnd <= containerEnd) {
        break; // Everything fits; we're done
      }

      // Move the item to the overflow
      callbacks.setItemIsOverflowing(item, true);
      lastVisibleElement = menuButton;
      overflowIndex = i;
    }

    if (overflowIndex !== previousOverflowIndex && callbacks.onOverflowItemsChanged) {
      callbacks.onOverflowItemsChanged(overflowIndex);
    }
  };

  const async = useAsync();

  // Call hideOverflowItems on the first animation frame, and then every time the window resizes
  React.useLayoutEffect(() => {
    const menuButton = overflowMenuButtonRef.current;
    const win = getWindow(menuButton);

    if (menuButton && win) {
      const updateOverflow = async.debounce(() => hideOverflowItems(menuButton, win));

      const requestId = win.requestAnimationFrame(updateOverflow);
      win.addEventListener('resize', updateOverflow, false);

      return () => {
        win.cancelAnimationFrame(requestId);
        win.removeEventListener('resize', updateOverflow, false);
        resetOverflowItems(menuButton);
      };
    }
  });
};
