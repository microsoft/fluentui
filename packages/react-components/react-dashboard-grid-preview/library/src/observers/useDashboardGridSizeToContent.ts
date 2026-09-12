'use client';

import * as React from 'react';
import type { DashboardGridResizeObserverController } from './useDashboardGridResizeObserver';
import type { DashboardGridContentMeasure, DashboardGridStore } from '../state/DashboardGridStore.types';

export type UseDashboardGridSizeToContentOptions = {
  controller: DashboardGridResizeObserverController;
  id: string;
  enabled?: boolean | number;
  store?: DashboardGridStore;
  selector?: string;
  measure?: DashboardGridContentMeasure;
  onTextOnly?: (id: string) => void;
};

export const useDashboardGridSizeToContent = <TElement extends HTMLElement = HTMLDivElement>(
  options: UseDashboardGridSizeToContentOptions,
): React.RefCallback<TElement> => {
  const { controller, id, enabled, measure, onTextOnly, selector, store } = options;
  const cleanupRef = React.useRef<(() => void) | undefined>(undefined);

  React.useEffect(
    () => () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
    },
    [],
  );

  return React.useCallback(
    (element: TElement | null) => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;

      if (!element || !enabled) {
        return;
      }

      cleanupRef.current = controller.registerSizeToContent({
        id,
        element,
        store,
        maximumRowSpan: typeof enabled === 'number' ? enabled : undefined,
        selector,
        measure,
        onTextOnly,
      });
    },
    [controller, enabled, id, measure, onTextOnly, selector, store],
  );
};
