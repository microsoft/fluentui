'use client';

import * as React from 'react';
import { createOverflowManager, EMPTY_SNAPSHOT } from '@fluentui/priority-overflow';

/**
 * @internal
 */
import type {
  OnUpdateItemVisibility,
  OnUpdateOverflow,
  OverflowItemEntry,
  OverflowDividerEntry,
  OverflowManager,
  OverflowOptions,
} from '@fluentui/priority-overflow';
import { canUseDOM, useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { UseOverflowContainerReturn } from './types';
import { DATA_OVERFLOWING, DATA_OVERFLOW_DIVIDER, DATA_OVERFLOW_ITEM, DATA_OVERFLOW_MENU } from './constants';

/**
 * @internal
 * @param update - Callback when overflow state changes
 * @param options - Options to configure the overflow container
 * @returns - ref to attach to an intrinsic HTML element and imperative functions
 */
export const useOverflowContainer = <TElement extends HTMLElement>(
  update: OnUpdateOverflow,
  options: Omit<OverflowOptions, 'onUpdateOverflow'>,
): UseOverflowContainerReturn<TElement> => {
  const {
    overflowAxis = 'horizontal',
    overflowDirection = 'end',
    padding = 10,
    minimumVisible = 0,
    onUpdateItemVisibility = noop,
    hasHiddenItems = false,
  } = options;

  const onUpdateItemVisibilityCallback = useEventCallback(onUpdateItemVisibility);

  const observeOptions: Required<OverflowOptions> = React.useMemo(
    () => ({
      overflowAxis,
      overflowDirection,
      padding,
      minimumVisible,
      onUpdateItemVisibility: onUpdateItemVisibilityCallback,
      onUpdateOverflow: update,
      hasHiddenItems,
    }),
    [minimumVisible, onUpdateItemVisibilityCallback, overflowAxis, overflowDirection, padding, update, hasHiddenItems],
  );

  const containerRef = React.useRef<TElement>(null);

  const managerRef = React.useRef<OverflowManager | null>(null);

  if (managerRef.current === null) {
    managerRef.current = canUseDOM() ? createOverflowManager(observeOptions) : null;
  }

  useIsomorphicLayoutEffect(() => {
    if (managerRef.current && containerRef.current) {
      // forceUpdate resolves overflow synchronously for a correct first paint; the manager guards it
      // on the container being measured.
      managerRef.current.observe(containerRef.current, { forceUpdate: true });
      return () => managerRef.current?.disconnect();
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    managerRef.current?.setOptions(observeOptions);
  }, [observeOptions]);

  const registerItem = React.useCallback((item: OverflowItemEntry) => {
    managerRef.current?.addItem(item);
    item.element.setAttribute(DATA_OVERFLOW_ITEM, '');

    return () => {
      item.element.removeAttribute(DATA_OVERFLOWING);
      item.element.removeAttribute(DATA_OVERFLOW_ITEM);
      managerRef.current?.removeItem(item.id);
    };
  }, []);

  const registerDivider = React.useCallback((divider: OverflowDividerEntry) => {
    const el = divider.element;
    managerRef.current?.addDivider(divider);
    el.setAttribute(DATA_OVERFLOW_DIVIDER, '');

    return () => {
      managerRef.current?.removeDivider(divider.groupId);
      el.removeAttribute(DATA_OVERFLOW_DIVIDER);
    };
  }, []);

  const registerOverflowMenu = React.useCallback((el: HTMLElement) => {
    managerRef.current?.addOverflowMenu(el);
    el.setAttribute(DATA_OVERFLOW_MENU, '');

    return () => {
      managerRef.current?.removeOverflowMenu();
      el.removeAttribute(DATA_OVERFLOW_MENU);
    };
  }, []);

  const updateOverflow = React.useCallback(() => {
    managerRef.current?.update();
  }, []);

  const getSnapshot = React.useCallback<OverflowManager['getSnapshot']>(
    () => managerRef.current?.getSnapshot() ?? EMPTY_SNAPSHOT,
    [],
  );

  const subscribe = React.useCallback<OverflowManager['subscribe']>(
    listener => managerRef.current?.subscribe(listener) ?? noop,
    [],
  );

  const forceUpdateOverflow = React.useCallback(() => {
    managerRef.current?.forceUpdate();
  }, []);

  return {
    registerItem,
    registerDivider,
    registerOverflowMenu,
    updateOverflow,
    forceUpdateOverflow,
    containerRef,
    getSnapshot,
    subscribe,
  };
};

const noop = () => {
  /* noop */
};

export const updateVisibilityAttribute: OnUpdateItemVisibility = ({ item, visible }) => {
  if (visible) {
    item.element.removeAttribute(DATA_OVERFLOWING);
  } else {
    item.element.setAttribute(DATA_OVERFLOWING, '');
  }
};
