import * as React from 'react';
import { useEventListener } from '@fluentui/react-component-event-listener';
import { useAsync } from '@uifabric/react-hooks';
import { getWindow } from '@uifabric/utilities';

export type OverflowCallbacks = {
  onOverflowIndexChanged: (overflowIndex: number | undefined) => void;

  isPinned?: (item: HTMLElement) => boolean;
  setItemDisplayed?: (item: HTMLElement, displayed: boolean) => void;
  setOverflowMenuVisible?: (menu: HTMLElement, visible: boolean) => void;
};

const defaultCallbacks = {
  isPinned: () => false,
  setItemDisplayed: (item: HTMLElement, displayed: boolean) => (item.style.display = displayed ? '' : 'none'),
  setOverflowMenuVisible: (menu: HTMLElement, visible: boolean) =>
    (menu.style.visibility = visible ? 'visible' : 'hidden'),
};

export const useOverflow = (
  overflowContainerRef: React.RefObject<HTMLElement | undefined>,
  overflowMenuRef: React.RefObject<HTMLElement | undefined>,
  callbacks: OverflowCallbacks,
) => {
  // Keep track of the index of the first item in the overflow between renders
  const overflowIndexRef = React.useRef<number | undefined>(undefined);

  // Cache the computed styles from this render
  type CachedStyle = {
    rtl: boolean;
    containerPadding: number;
    menuMargin: number;
  };
  let cachedStyle: CachedStyle | undefined = undefined;

  const hideOverflowItems = useAsync().debounce(() => {
    const container = overflowContainerRef.current;
    const menu = overflowMenuRef.current;
    const win = windowRef.current;
    if (!container || !menu || !win) {
      return;
    }

    const isPinned = callbacks.isPinned || defaultCallbacks.isPinned;
    const setItemDisplayed = callbacks.setItemDisplayed || defaultCallbacks.setItemDisplayed;
    const setOverflowMenuVisible = callbacks.setOverflowMenuVisible || defaultCallbacks.setOverflowMenuVisible;

    const originalOverflowIndex = overflowIndexRef.current;
    const items = container.children;

    // Reset the layout to show all items and hide the overflow menu
    if (overflowIndexRef.current !== undefined) {
      setOverflowMenuVisible(menu, false);
      for (let i = overflowIndexRef.current; i < items.length; i++) {
        const item = items[i];
        if (item instanceof HTMLElement && item !== menu) {
          setItemDisplayed(item, true);
        }
      }

      overflowIndexRef.current = undefined;
    }

    if (cachedStyle === undefined) {
      const containerStyle = win.getComputedStyle(container);
      const menuStyle = win.getComputedStyle(menu);
      const cachedRtl = containerStyle.direction === 'rtl';

      cachedStyle = {
        rtl: cachedRtl,
        containerPadding: parseFloat(cachedRtl ? containerStyle.paddingLeft : containerStyle.paddingRight),
        menuMargin: parseFloat(cachedRtl ? menuStyle.marginLeft : menuStyle.marginRight),
      };
    }

    const { rtl, containerPadding, menuMargin } = cachedStyle;

    const containerRect = container.getBoundingClientRect();
    const containerEnd = (rtl ? -containerRect.left : containerRect.right) - containerPadding;

    let lastVisibleElement: HTMLElement | undefined = undefined;
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (!(item instanceof HTMLElement) || item === menu) {
        continue;
      }

      // Keep track of the last visible element, even if it's pinned
      if (lastVisibleElement === undefined) {
        lastVisibleElement = item;
      }

      if (isPinned(item)) {
        continue;
      }

      const lastElementRect = lastVisibleElement.getBoundingClientRect();
      const lastElementEnd = (rtl ? -lastElementRect.left : lastElementRect.right) + menuMargin;

      if (lastElementEnd <= containerEnd) {
        break; // Everything fits; we're done
      }

      // Show the menu if it's not visible yet
      if (lastVisibleElement !== menu) {
        setOverflowMenuVisible(menu, true);
        lastVisibleElement = menu;
      }

      // Hide the item
      setItemDisplayed(item, false);
      overflowIndexRef.current = i;
    }

    if (originalOverflowIndex !== overflowIndexRef.current) {
      callbacks.onOverflowIndexChanged(overflowIndexRef.current);
    }
  });

  const windowRef = React.useRef<Window | null>(getWindow() || null);
  React.useLayoutEffect(() => {
    const win = getWindow(overflowContainerRef.current) || null;
    windowRef.current = win;
    if (win) {
      const requestId = win.requestAnimationFrame(hideOverflowItems);
      return () => win.cancelAnimationFrame(requestId);
    }
  });

  useEventListener({
    listener: hideOverflowItems,
    targetRef: windowRef,
    type: 'resize',
  });
};
