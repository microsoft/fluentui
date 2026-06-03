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

  // Whether the container's observe effect has run. Item/menu hooks request first-paint correctness
  // via `forceUpdateOverflow`; before the container observes there is nothing to compute yet, so the
  // request is recorded here and honored when the observe effect runs.
  const hasObservedRef = React.useRef(false);
  // Set when a descendant requests first-paint correctness before the container observes. The default
  // item/menu hooks make this request; a hook that omits it opts the container out of the synchronous
  // first-paint pass (the hot path), letting the ResizeObserver drive the first overflow pass instead.
  const pendingForceUpdateRef = React.useRef(false);

  if (managerRef.current === null) {
    managerRef.current = canUseDOM() ? createOverflowManager(observeOptions) : null;
  }

  useIsomorphicLayoutEffect(() => {
    if (managerRef.current && containerRef.current) {
      // Child item/menu effects already ran (child-before-parent), so `pendingForceUpdateRef`
      // reflects whether any descendant requested first-paint correctness. When requested, resolve
      // overflow synchronously so the first paint is correct; the manager guards the force on the
      // container being measured.
      managerRef.current.observe(containerRef.current, { forceUpdate: pendingForceUpdateRef.current });
      hasObservedRef.current = true;
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
    // Before the container observes, a force can't compute anything (it isn't observing yet), so
    // record the request and let the observe effect honor it (first-paint correctness). After
    // observing, force directly.
    if (hasObservedRef.current) {
      managerRef.current?.forceUpdate();
    } else {
      pendingForceUpdateRef.current = true;
    }
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
