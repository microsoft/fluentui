'use client';

import * as React from 'react';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import type { TabsterDOMAttribute } from '@fluentui/react-tabster';
import { useEventCallback } from '@fluentui/react-utilities';

export type DashboardGridFocusableItem = {
  gridId: string;
  itemId: string;
  element: HTMLElement;
};

export type DashboardGridFocusRecord = {
  element: HTMLElement | null;
  gridId?: string;
  itemId?: string;
};

export type DashboardGridFocusDirection = 'left' | 'right' | 'up' | 'down';

export const getDashboardGridDeepActiveElement = (targetDocument: Document): HTMLElement | null => {
  let activeElement = targetDocument.activeElement;
  while (activeElement && 'shadowRoot' in activeElement && activeElement.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }

  return activeElement && 'focus' in activeElement ? (activeElement as HTMLElement) : null;
};

const getCenter = (rect: DOMRectReadOnly) => ({
  x: rect.left + rect.width / 2,
  y: rect.top + rect.height / 2,
});

export const findDashboardGridGeometricNeighbor = (
  current: HTMLElement,
  candidates: readonly HTMLElement[],
  direction: DashboardGridFocusDirection,
): HTMLElement | undefined => {
  const currentRect = current.getBoundingClientRect();
  const currentCenter = getCenter(currentRect);
  let best: { element: HTMLElement; score: number } | undefined;

  for (const candidate of candidates) {
    if (candidate === current || !candidate.isConnected) {
      continue;
    }

    const candidateRect = candidate.getBoundingClientRect();
    const candidateCenter = getCenter(candidateRect);
    const horizontal = candidateCenter.x - currentCenter.x;
    const vertical = candidateCenter.y - currentCenter.y;
    const inDirection =
      (direction === 'left' && horizontal < 0) ||
      (direction === 'right' && horizontal > 0) ||
      (direction === 'up' && vertical < 0) ||
      (direction === 'down' && vertical > 0);
    if (!inDirection) {
      continue;
    }

    const primaryDistance = direction === 'left' || direction === 'right' ? Math.abs(horizontal) : Math.abs(vertical);
    const crossDistance = direction === 'left' || direction === 'right' ? Math.abs(vertical) : Math.abs(horizontal);
    const overlapsCrossAxis =
      direction === 'left' || direction === 'right'
        ? candidateRect.bottom > currentRect.top && candidateRect.top < currentRect.bottom
        : candidateRect.right > currentRect.left && candidateRect.left < currentRect.right;
    const score = primaryDistance * 1000 + crossDistance + (overlapsCrossAxis ? 0 : 1_000_000);

    if (!best || score < best.score) {
      best = { element: candidate, score };
    }
  }

  return best?.element;
};

const focusWithoutScroll = (element: HTMLElement | null | undefined): boolean => {
  if (!element?.isConnected) {
    return false;
  }

  try {
    element.focus({ preventScroll: true });
  } catch {
    element.focus();
  }
  return true;
};

export const useDashboardGridFocusManager = (options: {
  targetDocument: Document | undefined;
  getGridElement: (gridId: string) => HTMLElement | undefined;
  getItems: () => readonly DashboardGridFocusableItem[];
}): {
  navigationAttributes: TabsterDOMAttribute;
  captureFocus: (gridId?: string, itemId?: string) => DashboardGridFocusRecord;
  restoreFocus: (record: DashboardGridFocusRecord) => boolean;
  focusItem: (gridId: string, itemId: string, preferDescendant?: boolean) => boolean;
  focusGeometric: (gridId: string, itemId: string, direction: DashboardGridFocusDirection) => boolean;
  focusAfterRemoval: (gridId: string, removedRect?: DOMRectReadOnly) => boolean;
  requestPendingFocus: (record: DashboardGridFocusRecord) => void;
  notifyItemRegistered: (item: DashboardGridFocusableItem) => void;
} => {
  const navigationAttributes = useArrowNavigationGroup({ axis: 'grid', memorizeCurrent: true });
  const { findFirstFocusable } = useFocusFinders();
  const pendingFocus = React.useRef<DashboardGridFocusRecord | null>(null);

  const captureFocus = useEventCallback(
    (gridId?: string, itemId?: string): DashboardGridFocusRecord => ({
      element: options.targetDocument ? getDashboardGridDeepActiveElement(options.targetDocument) : null,
      gridId,
      itemId,
    }),
  );

  const focusItem = useEventCallback((gridId: string, itemId: string, preferDescendant = false): boolean => {
    const item = options.getItems().find(candidate => candidate.gridId === gridId && candidate.itemId === itemId);
    if (!item) {
      return false;
    }

    const target = preferDescendant ? findFirstFocusable(item.element) ?? item.element : item.element;
    return focusWithoutScroll(target);
  });

  const restoreFocus = useEventCallback((record: DashboardGridFocusRecord): boolean => {
    if (focusWithoutScroll(record.element)) {
      return true;
    }
    if (record.gridId && record.itemId && focusItem(record.gridId, record.itemId)) {
      return true;
    }
    if (record.gridId) {
      return focusWithoutScroll(options.getGridElement(record.gridId));
    }
    return false;
  });

  const focusGeometric = useEventCallback(
    (gridId: string, itemId: string, direction: DashboardGridFocusDirection): boolean => {
      const items = options.getItems().filter(item => item.gridId === gridId);
      const current = items.find(item => item.itemId === itemId);
      if (!current) {
        return false;
      }

      return focusWithoutScroll(
        findDashboardGridGeometricNeighbor(
          current.element,
          items.map(item => item.element),
          direction,
        ),
      );
    },
  );

  const focusAfterRemoval = useEventCallback((gridId: string, removedRect?: DOMRectReadOnly): boolean => {
    const items = options.getItems().filter(item => item.gridId === gridId && item.element.isConnected);
    if (items.length > 0) {
      if (!removedRect) {
        return focusWithoutScroll(items[0].element);
      }

      const removedCenter = getCenter(removedRect);
      const nearest = [...items].sort((left, right) => {
        const leftCenter = getCenter(left.element.getBoundingClientRect());
        const rightCenter = getCenter(right.element.getBoundingClientRect());
        const leftDistance = Math.hypot(leftCenter.x - removedCenter.x, leftCenter.y - removedCenter.y);
        const rightDistance = Math.hypot(rightCenter.x - removedCenter.x, rightCenter.y - removedCenter.y);
        return leftDistance - rightDistance;
      })[0];
      return focusWithoutScroll(nearest.element);
    }

    return focusWithoutScroll(options.getGridElement(gridId));
  });

  const requestPendingFocus = useEventCallback((record: DashboardGridFocusRecord) => {
    pendingFocus.current = record;
  });

  const notifyItemRegistered = useEventCallback((item: DashboardGridFocusableItem) => {
    const pending = pendingFocus.current;
    if (!pending || pending.gridId !== item.gridId || pending.itemId !== item.itemId) {
      return;
    }

    pendingFocus.current = null;
    if (!restoreFocus(pending)) {
      focusWithoutScroll(item.element);
    }
  });

  return {
    navigationAttributes,
    captureFocus,
    restoreFocus,
    focusItem,
    focusGeometric,
    focusAfterRemoval,
    requestPendingFocus,
    notifyItemRegistered,
  };
};
