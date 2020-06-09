import * as React from 'react';
import { useEventListener } from '@fluentui/react-component-event-listener';
import { useAsync } from '@uifabric/react-hooks';
import { getWindow } from '@uifabric/utilities';
import { memoizeFunction } from '../../Utilities';

// const isPinnedX = (ele: HTMLElement) => ele.dataset.isPinned;

export type OverflowCallbacks = {
  onOverflowChanged: (overflowIndex: number | undefined) => void;

  isPinned?: (item: HTMLElement) => boolean;
  setItemDisplayed?: (item: HTMLElement, displayed: boolean) => void;
  setOverflowMenuVisible?: (visible: boolean) => void;
};

export const useOverflow = (
  overflowContainerRef: React.RefObject<HTMLElement | undefined>,
  overflowMenuRef: React.RefObject<HTMLElement | undefined>,
  callbacks: OverflowCallbacks,
) => {
  // Make sure we're using the window that contains the overflow container
  const windowRef = React.useRef<Window | null>(getWindow() || null);
  React.useLayoutEffect(() => {
    windowRef.current = getWindow(overflowContainerRef.current) || null;
  }, [overflowContainerRef]);

  // Keep track of the index of the first item in the overflow
  const overflowIndexRef = React.useRef<number | undefined>(undefined);

  const hideOverflowItems = useAsync().debounce(() => {
    const container = overflowContainerRef.current;
    const menu = overflowMenuRef.current;
    const win = windowRef.current;
    if (!container || !menu || !win) {
      return;
    }

    const isPinned = callbacks.isPinned || (item => item.dataset.isPinned);
    const setItemDisplayed = callbacks.setItemDisplayed || ((item, d) => (item.style.display = d ? '' : 'none'));
    const setOverflowMenuVisible =
      callbacks.setOverflowMenuVisible || (v => (menu.style.visibility = v ? 'visible' : 'hidden'));

    const originalOverflowIndex = overflowIndexRef.current;
    const items = container.children;

    // Reset the layout to show all items and hide the overflow menu
    if (overflowIndexRef.current !== undefined) {
      setOverflowMenuVisible(false);
      for (let i = overflowIndexRef.current; i < items.length; i++) {
        const item = items[i];
        if (item instanceof HTMLElement && item !== menu) {
          setItemDisplayed(item, true);
        }
      }

      overflowIndexRef.current = undefined;
    }

    const getStyle = memoizeFunction((ele: HTMLElement) => win.getComputedStyle(ele));

    const containerStyle = getStyle(container);
    const rtl = containerStyle.direction === 'rtl';
    const containerEnd = rtl
      ? -container.getBoundingClientRect().left - parseFloat(containerStyle.paddingLeft)
      : container.getBoundingClientRect().right - parseFloat(containerStyle.paddingRight);

    let isOverflowing = false;
    let menuShown = false;
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (!(item instanceof HTMLElement) || item === menu) {
        continue;
      }

      const itemIsPinned = isPinned(item);
      if (isOverflowing && itemIsPinned) {
        continue;
      }

      const lastElement = isOverflowing ? menu : item;
      const lastElementEnd = rtl
        ? -lastElement.getBoundingClientRect().left + parseFloat(getStyle(lastElement).marginLeft)
        : lastElement.getBoundingClientRect().right + parseFloat(getStyle(lastElement).marginRight);

      if (lastElementEnd <= containerEnd) {
        break; // Everything fits; we're done
      }

      isOverflowing = true;

      // Hide the item if it's not pinned
      if (!itemIsPinned) {
        setItemDisplayed(item, false);
        overflowIndexRef.current = i;
        if (!menuShown) {
          setOverflowMenuVisible(true);
          menuShown = true;
        }
      }
    }

    if (originalOverflowIndex !== overflowIndexRef.current) {
      callbacks.onOverflowChanged(overflowIndexRef.current);
    }
  });

  React.useLayoutEffect(() => {
    let cookie: number | undefined = undefined;

    const win = windowRef.current;
    if (win) {
      win.requestAnimationFrame(() => {
        hideOverflowItems();
        cookie = undefined;
      });
    }
    return () => {
      if (win && cookie !== undefined) {
        win.cancelAnimationFrame(cookie);
      }
    };
  });

  useEventListener({
    listener: hideOverflowItems,
    targetRef: windowRef,
    type: 'resize',
  });
};
