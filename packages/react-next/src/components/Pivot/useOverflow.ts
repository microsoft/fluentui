import * as React from 'react';
import { useAsync } from '@uifabric/react-hooks';
import { getWindow } from '@uifabric/utilities';

export type OverflowCallbacks = {
  setItemDisplayed: (item: HTMLElement, displayed: boolean) => void;
  setOverflowMenuButtonVisible: (menuButton: HTMLElement, visible: boolean) => void;
  isPinned?: (item: HTMLElement) => boolean;
};

export const useOverflow = (
  overflowMenuButtonRef: React.RefObject<HTMLElement | undefined>,
  callbacks: OverflowCallbacks,
) => {
  const [overflowIndex, setOverflowIndex] = React.useState<number | undefined>(undefined);

  // Cache the computed styles from this render
  type CachedStyle = {
    rtl: boolean;
    containerPadding: number;
    menuMargin: number;
  };
  let cachedStyle: CachedStyle | undefined = undefined;

  const hideOverflowItems = (menuButton: HTMLElement, win: Window) => {
    const container = menuButton.parentElement;
    if (!container) {
      return;
    }
    const items = container.children;

    // Reset the layout to show all items and hide the overflow menuButton
    if (overflowIndex !== undefined) {
      callbacks.setOverflowMenuButtonVisible(menuButton, false);
      for (let i = overflowIndex; i < items.length; i++) {
        const item = items[i];
        if (item instanceof HTMLElement && item !== menuButton) {
          callbacks.setItemDisplayed(item, true);
        }
      }
    }

    let newOverflowIndex: number | undefined = undefined;

    if (cachedStyle === undefined) {
      const containerStyle = win.getComputedStyle(container);
      const menuStyle = win.getComputedStyle(menuButton);
      const _rtl = containerStyle.direction === 'rtl';

      cachedStyle = {
        rtl: _rtl,
        containerPadding: parseFloat(_rtl ? containerStyle.paddingLeft : containerStyle.paddingRight),
        menuMargin: parseFloat(_rtl ? menuStyle.marginLeft : menuStyle.marginRight),
      };
    }

    const { rtl, containerPadding, menuMargin } = cachedStyle;

    const containerRect = container.getBoundingClientRect();
    const containerEnd = (rtl ? -containerRect.left : containerRect.right) - containerPadding;

    let lastVisibleElement: HTMLElement | undefined = undefined;
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (!(item instanceof HTMLElement) || item === menuButton) {
        continue;
      }

      const isPinned = callbacks.isPinned && callbacks.isPinned(item);

      // Keep track of the last visible element, even if it's pinned
      if (lastVisibleElement === undefined) {
        lastVisibleElement = item;
      }

      // Don't attempt to hide pinned items
      if (!isPinned) {
        const lastElementRect = lastVisibleElement.getBoundingClientRect();
        const lastElementEnd = (rtl ? -lastElementRect.left : lastElementRect.right) + menuMargin;

        if (lastElementEnd <= containerEnd) {
          break; // Everything fits; we're done
        }

        // Show the overflow menu button if it's not visible yet
        if (lastVisibleElement !== menuButton) {
          callbacks.setOverflowMenuButtonVisible(menuButton, true);
          lastVisibleElement = menuButton;
        }

        // Hide the item
        callbacks.setItemDisplayed(item, false);
        newOverflowIndex = i;
      }
    }

    if (overflowIndex !== newOverflowIndex) {
      setOverflowIndex(newOverflowIndex);
    }
  };

  const async = useAsync();

  React.useLayoutEffect(() => {
    const menuButton = overflowMenuButtonRef.current;
    const win = getWindow(menuButton);

    if (menuButton && win) {
      const updateOverflow = async.debounce(() => hideOverflowItems(menuButton, win));
      const requestId = win.requestAnimationFrame(updateOverflow);
      win.addEventListener('resize', updateOverflow, false);

      return () => {
        win.removeEventListener('resize', updateOverflow, false);
        win.cancelAnimationFrame(requestId);
      };
    }
  });

  return overflowIndex;
};
