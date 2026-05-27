'use client';

import * as React from 'react';
import { createOverflowManager } from '@fluentui/priority-overflow';

/**
 * @internal
 */
import type {
  OnUpdateItemVisibility,
  OnUpdateOverflow,
  OverflowItemEntry,
  OverflowDividerEntry,
  OverflowManager,
  ObserveOptions,
} from '@fluentui/priority-overflow';
import { canUseDOM, useEventCallback } from '@fluentui/react-utilities';
import type { UseOverflowContainerReturn } from './types';
import { DATA_OVERFLOWING, DATA_OVERFLOW_DIVIDER, DATA_OVERFLOW_ITEM, DATA_OVERFLOW_MENU } from './constants';

const noop = () => null;

/**
 * @internal
 * @param update - Callback when overflow state changes
 * @param options - Options to configure the overflow container
 * @returns - ref to attach to an intrinsic HTML element and imperative functions
 */
export const useOverflowContainer = <TElement extends HTMLElement>(
  update: OnUpdateOverflow,
  options: Omit<ObserveOptions, 'onUpdateOverflow'>,
): UseOverflowContainerReturn<TElement> => {
  'use no memo';

  const {
    overflowAxis = 'horizontal',
    overflowDirection = 'end',
    padding = 10,
    minimumVisible = 0,
    onUpdateItemVisibility = noop,
    hasHiddenItems = false,
  } = options;

  const onUpdateOverflow = useEventCallback(update);
  const onUpdateItemVisibilityCallback = useEventCallback(onUpdateItemVisibility);

  const observeOptions: Required<ObserveOptions> = React.useMemo(
    () => ({
      overflowAxis,
      overflowDirection,
      padding,
      minimumVisible,
      onUpdateItemVisibility: onUpdateItemVisibilityCallback,
      onUpdateOverflow,
      hasHiddenItems,
    }),
    [
      minimumVisible,
      onUpdateItemVisibilityCallback,
      overflowAxis,
      overflowDirection,
      padding,
      onUpdateOverflow,
      hasHiddenItems,
    ],
  );

  const overflowManagerRef = React.useRef<OverflowManager | null>(null);
  const cleanupObservationRef = React.useRef<(() => void) | null>(null);
  const observedContainerRef = React.useRef<TElement | null>(null);

  // eslint-disable-next-line react-hooks/refs
  if (!overflowManagerRef.current && canUseDOM()) {
    overflowManagerRef.current = createOverflowManager(observeOptions);
  }

  const containerRef = React.useCallback<React.RefCallback<TElement>>(node => {
    if (observedContainerRef.current === node) {
      return;
    }

    cleanupObservationRef.current?.();
    cleanupObservationRef.current = null;
    observedContainerRef.current = node;

    if (overflowManagerRef.current && node) {
      cleanupObservationRef.current = overflowManagerRef.current.observe(node);
    }
  }, []);

  React.useEffect(() => {
    overflowManagerRef.current?.setOptions(observeOptions);
  }, [observeOptions]);

  const registerItem = React.useCallback((item: OverflowItemEntry) => {
    const deregisterItem = overflowManagerRef.current?.registerItem(item) ?? noop;
    item.element.setAttribute(DATA_OVERFLOW_ITEM, '');

    return () => {
      item.element.removeAttribute(DATA_OVERFLOWING);
      item.element.removeAttribute(DATA_OVERFLOW_ITEM);
      deregisterItem();
    };
  }, []);

  const registerDivider = React.useCallback((divider: OverflowDividerEntry) => {
    const el = divider.element;
    const deregisterDivider = overflowManagerRef.current?.registerDivider(divider) ?? noop;
    el.setAttribute(DATA_OVERFLOW_DIVIDER, '');

    return () => {
      deregisterDivider();
      el.removeAttribute(DATA_OVERFLOW_DIVIDER);
    };
  }, []);

  const registerOverflowMenu = React.useCallback((el: HTMLElement) => {
    const detachOverflowMenu = overflowManagerRef.current?.attachOverflowMenu(el) ?? noop;
    el.setAttribute(DATA_OVERFLOW_MENU, '');

    return () => {
      detachOverflowMenu();
      el.removeAttribute(DATA_OVERFLOW_MENU);
    };
  }, []);

  const updateOverflow = React.useCallback(() => {
    overflowManagerRef.current?.update();
  }, []);

  return {
    registerItem,
    registerDivider,
    registerOverflowMenu,
    updateOverflow,
    containerRef,
    containerRefObject: observedContainerRef,
    // eslint-disable-next-line react-hooks/refs
    manager: overflowManagerRef.current,
  };
};

export const updateVisibilityAttribute: OnUpdateItemVisibility = ({ item, visible }) => {
  if (visible) {
    item.element.removeAttribute(DATA_OVERFLOWING);
  } else {
    item.element.setAttribute(DATA_OVERFLOWING, '');
  }
};
