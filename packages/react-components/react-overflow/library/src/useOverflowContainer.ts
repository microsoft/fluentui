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
  ObserveOptions,
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
  options: Omit<ObserveOptions, 'onUpdateOverflow'>,
): UseOverflowContainerReturn<TElement> => {
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

  const containerRef = React.useRef<TElement>(null);

  const managerRef = React.useRef<OverflowManager | null>(null);

  if (managerRef.current === null) {
    managerRef.current = canUseDOM() ? createOverflowManager(observeOptions) : null;
  }

  useIsomorphicLayoutEffect(() => {
    if (managerRef.current && containerRef.current) {
      managerRef.current.observe(containerRef.current);
      /**
       * FIXME: Ideally this measurement guard would live
       * inside the manager (alongside the rest of the overflow logic),
       * and that is most likely where it should eventually move.
       * It lives here, at the call site, only to preserve previous behavior and
       * avoid regressions: `forceUpdate`(and the `update` it backs) is also
       * invoked by addItem / addOverflowMenu / setOptions / ResizeObserver —
       * all pre-existing paths.
       * Gating it inside the manager would change those long-standing behaviors too
       * (e.g. it would suppress the collapsed state some downstream snapshots already encode).
       * Only this first-paint call is new,
       * so for now only this call is conditioned on the container being measured.
       */
      if (containerRef.current.clientWidth > 0 || containerRef.current.clientHeight > 0) {
        managerRef.current.forceUpdate();
      }
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
