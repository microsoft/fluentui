'use client';

import * as React from 'react';
import type { DashboardGridCellMetrics, DashboardGridColumnLayout } from '../engine';
import type { DashboardGridStore } from '../state/DashboardGridStore.types';
import { getDashboardGridContentRowSpan, measureDashboardGridContent } from './measureContent';
import { createDashboardGridDelayedGate } from './observerGate';

export type DashboardGridSizeToContentRegistration = {
  id: string;
  element: HTMLElement;
  store?: DashboardGridStore;
  maximumRowSpan?: number;
  onTextOnly?: (id: string) => void;
};

export type DashboardGridResizeObserverController = {
  rootRef(element: HTMLElement | null): void;
  registerSizeToContent(registration: DashboardGridSizeToContentRegistration): () => void;
  getMetrics(): DashboardGridCellMetrics;
  remeasure(): void;
};

export type UseDashboardGridResizeObserverOptions = {
  targetDocument?: Document | null;
  store: DashboardGridStore;
  rowHeight: number;
  gaps?: Partial<Pick<DashboardGridCellMetrics, 'gapTop' | 'gapRight' | 'gapBottom' | 'gapLeft'>>;
  resolveColumns?: (width: number, currentColumns: number) => number;
  columnLayout?: DashboardGridColumnLayout;
  nested?: boolean;
  parentController?: DashboardGridResizeObserverController;
  onResizeContent?: () => void;
  resizeDelay?: number;
};

const emptyMetrics: DashboardGridCellMetrics = {
  columnWidth: 1,
  rowHeight: 1,
  gapTop: 0,
  gapRight: 0,
  gapBottom: 0,
  gapLeft: 0,
};

export const useDashboardGridResizeObserver = (
  options: UseDashboardGridResizeObserverOptions,
): DashboardGridResizeObserverController => {
  const {
    targetDocument,
    store,
    rowHeight,
    resolveColumns,
    columnLayout,
    nested,
    parentController,
    onResizeContent,
  } = options;
  const rootRef = React.useRef<HTMLElement | null>(null);
  const observerRef = React.useRef<ResizeObserver | null>(null);
  const registrationsRef = React.useRef(new Map<string, DashboardGridSizeToContentRegistration>());
  const metricsRef = React.useRef<DashboardGridCellMetrics>({
    ...emptyMetrics,
    rowHeight: Math.max(1, rowHeight),
    ...options.gaps,
  });

  const measureRegistration = React.useCallback(
    (registration: DashboardGridSizeToContentRegistration) => {
      const measurement = measureDashboardGridContent(registration.element);
      if (measurement.status === 'text-only') {
        registration.onTextOnly?.(registration.id);
        return;
      }

      if (measurement.status === 'measured') {
        const itemStore = registration.store ?? store;
        const nextRowSpan = getDashboardGridContentRowSpan(
          measurement.blockSize,
          metricsRef.current.rowHeight,
          registration.maximumRowSpan,
        );
        const item = itemStore.getItem(registration.id);
        if (item && item.rowSpan !== nextRowSpan) {
          itemStore.update(registration.id, { rowSpan: nextRowSpan });
          itemStore.setRuntimeItemState(registration.id, { measuredRowSpan: nextRowSpan });
        }
      }
    },
    [store],
  );

  const remeasure = React.useCallback(() => {
    const root = rootRef.current;
    if (root) {
      const width = root.getBoundingClientRect().width;
      const currentColumns = store.getSnapshot().columns;
      const columns = Math.max(1, resolveColumns?.(width, currentColumns) ?? currentColumns);
      if (columns !== currentColumns) {
        store.setColumns(columns, columnLayout);
      }

      metricsRef.current = {
        ...metricsRef.current,
        columnWidth: width > 0 ? width / columns : 1,
        rowHeight: Math.max(1, rowHeight),
      };
    }

    for (const registration of registrationsRef.current.values()) {
      measureRegistration(registration);
    }
    onResizeContent?.();
  }, [columnLayout, measureRegistration, onResizeContent, resolveColumns, rowHeight, store]);

  React.useEffect(() => {
    if (nested && parentController) {
      return;
    }

    const targetWindow = targetDocument?.defaultView;
    const ResizeObserverConstructor = targetWindow?.ResizeObserver;
    if (!ResizeObserverConstructor || !targetWindow) {
      remeasure();
      return;
    }

    const gate = createDashboardGridDelayedGate(remeasure, options.resizeDelay ?? 100, targetWindow);
    const observer = new ResizeObserverConstructor(() => gate.invoke());
    observerRef.current = observer;
    if (rootRef.current) {
      observer.observe(rootRef.current);
    }
    for (const registration of registrationsRef.current.values()) {
      observer.observe(registration.element);
    }

    return () => {
      gate.cancel();
      observer.disconnect();
      observerRef.current = null;
    };
  }, [nested, options.resizeDelay, parentController, remeasure, targetDocument]);

  return React.useMemo<DashboardGridResizeObserverController>(() => {
    if (nested && parentController) {
      return parentController;
    }

    return {
      rootRef(element) {
        if (rootRef.current === element) {
          return;
        }

        if (rootRef.current) {
          observerRef.current?.unobserve(rootRef.current);
        }
        rootRef.current = element;
        if (element) {
          observerRef.current?.observe(element);
          remeasure();
        }
      },

      registerSizeToContent(registration) {
        registrationsRef.current.set(registration.id, registration);
        observerRef.current?.observe(registration.element);
        measureRegistration(registration);

        return () => {
          const current = registrationsRef.current.get(registration.id);
          if (current === registration) {
            registrationsRef.current.delete(registration.id);
            observerRef.current?.unobserve(registration.element);
          }
        };
      },

      getMetrics: () => metricsRef.current,
      remeasure,
    };
  }, [measureRegistration, nested, parentController, remeasure]);
};
