import { Escape } from '@fluentui/keyboard-keys';
import { createDashboardGridAutoScroll, findNearestDashboardGridScrollAncestor } from './autoScroll';
import type { DashboardGridPointerCancelRule } from './cancelSelectors';
import { shouldCancelDashboardGridPointerStart } from './cancelSelectors';
import {
  dashboardGridPixelRectToRawRect,
  mirrorDashboardGridResizeEdge,
  type DashboardGridDomGeometrySession,
} from './domGeometry';
import {
  dashboardGridPixelRectToClientRect,
  createDashboardGridClickSuppressor,
  createDashboardGridTouchLeaveController,
  getDashboardGridDeepActiveElement,
  getDashboardGridManhattanDistance,
  normalizeDashboardGridPointerType,
  releaseDashboardGridPointerCapture,
  updateDashboardGridPointerCapture,
} from './pointerSession';
import type {
  DashboardGridInteractionCoordinator,
  DashboardGridPixelRect,
  DashboardGridPoint,
  DashboardGridPointerType,
  DashboardGridResizeEdge,
} from './types';

export const DASHBOARD_GRID_RESIZE_THRESHOLD = 2;

export type DashboardGridPointerResizeController = {
  onPointerDown(event: PointerEvent): void;
  cancel(event?: Event): void;
  destroy(): void;
};

const resizePixelRect = (
  origin: DashboardGridPixelRect,
  edge: DashboardGridResizeEdge,
  delta: { x: number; y: number },
  sizeToContent: boolean,
): DashboardGridPixelRect => {
  const horizontalDelta = delta.x;
  const verticalDelta = sizeToContent ? 0 : delta.y;
  const next = { ...origin };

  if (edge.includes('w')) {
    next.x += horizontalDelta;
    next.width -= horizontalDelta;
  } else if (edge.includes('e')) {
    next.width += horizontalDelta;
  }

  if (edge.includes('n')) {
    next.y += verticalDelta;
    next.height -= verticalDelta;
  } else if (edge.includes('s')) {
    next.height += verticalDelta;
  }

  return next;
};

export const createDashboardGridPointerResize = (options: {
  targetDocument: Document;
  coordinator: DashboardGridInteractionCoordinator;
  gridId: string;
  itemId: string;
  itemElement: HTMLElement;
  handleElement: HTMLElement;
  edge: DashboardGridResizeEdge;
  geometry: DashboardGridDomGeometrySession;
  cancel?: DashboardGridPointerCancelRule | readonly DashboardGridPointerCancelRule[];
  getOriginPixelRect?: () => DashboardGridPixelRect;
  sizeToContent?: boolean;
  onTouchTargetChange?: (inside: boolean) => void;
}): DashboardGridPointerResizeController => {
  const targetWindow = options.targetDocument.defaultView;
  const direction = options.coordinator.getGrid(options.gridId)?.direction ?? 'ltr';
  const logicalEdge = mirrorDashboardGridResizeEdge(options.edge, direction);
  const clickSuppressor = createDashboardGridClickSuppressor(options.targetDocument);
  const touchLeave = createDashboardGridTouchLeaveController({
    targetDocument: options.targetDocument,
    onTargetChange: options.onTouchTargetChange,
  });
  let pointerId: number | undefined;
  let pointerType: DashboardGridPointerType = 'unknown';
  let startPoint: DashboardGridPoint | undefined;
  let latestEvent: PointerEvent | undefined;
  let originPixelRect: DashboardGridPixelRect | undefined;
  let latestPixelRect: DashboardGridPixelRect | undefined;
  let active = false;
  let frame = 0;
  let autoScroll: ReturnType<typeof createDashboardGridAutoScroll> | undefined;
  let destroyed = false;
  let disposeRequested = false;

  const removeDocumentListeners = () => {
    options.targetDocument.removeEventListener('pointermove', onPointerMove, true);
    options.targetDocument.removeEventListener('pointerup', onPointerUp, true);
    options.targetDocument.removeEventListener('pointercancel', onPointerCancel, true);
    options.targetDocument.removeEventListener('pointerout', onPointerOut, true);
    options.targetDocument.removeEventListener('pointerover', onPointerOver, true);
    options.targetDocument.removeEventListener('keydown', onKeyDown, true);
    options.targetDocument.removeEventListener('scroll', onGeometryInvalidated, true);
    targetWindow?.removeEventListener('resize', onGeometryInvalidated);
  };

  const reset = () => {
    if (frame && targetWindow) {
      targetWindow.cancelAnimationFrame(frame);
    }
    frame = 0;
    touchLeave.cancel();
    autoScroll?.destroy();
    autoScroll = undefined;
    removeDocumentListeners();
    releaseDashboardGridPointerCapture(options.handleElement, pointerId);
    pointerId = undefined;
    pointerType = 'unknown';
    startPoint = undefined;
    latestEvent = undefined;
    originPixelRect = undefined;
    latestPixelRect = undefined;
    active = false;
  };

  const finalizeDestroy = () => {
    if (destroyed) {
      return;
    }
    destroyed = true;
    if (pointerId !== undefined) {
      options.coordinator.cancel();
    }
    reset();
    clickSuppressor.dispose();
  };

  const processPointerMove = (event: PointerEvent) => {
    frame = 0;
    if (destroyed || pointerId === undefined || event.pointerId !== pointerId || !startPoint || !originPixelRect) {
      return;
    }

    const point = { clientX: event.clientX, clientY: event.clientY };
    const startLocal = options.geometry.clientToLocal(startPoint);
    const currentLocal = options.geometry.clientToLocal(point);
    const delta = {
      x: currentLocal.clientX - startLocal.clientX,
      y: currentLocal.clientY - startLocal.clientY,
    };
    const nextPixelRect = resizePixelRect(originPixelRect, logicalEdge, delta, !!options.sizeToContent);
    latestPixelRect = nextPixelRect;
    const clientPixelRect = options.geometry.localRectToClientRect(nextPixelRect);

    if (!active) {
      if (getDashboardGridManhattanDistance(startPoint, point) <= DASHBOARD_GRID_RESIZE_THRESHOLD) {
        return;
      }

      active = true;
      options.coordinator.activatePointer({ pixelRect: nextPixelRect, nativeEvent: event });
      const gridElement = options.coordinator.getGrid(options.gridId)?.element;
      const scrollElement = gridElement
        ? findNearestDashboardGridScrollAncestor(gridElement, options.targetDocument)
        : null;
      if (scrollElement) {
        autoScroll = createDashboardGridAutoScroll({
          targetDocument: options.targetDocument,
          scrollElement,
          getActiveRect: () =>
            dashboardGridPixelRectToClientRect(
              options.geometry.localRectToClientRect(latestPixelRect ?? nextPixelRect),
            ),
          onScroll: () => {
            options.geometry.invalidate();
            options.coordinator.invalidateGeometry(options.gridId);
            if (latestEvent) {
              processPointerMove(latestEvent);
            }
          },
        });
      }
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    const metrics = options.coordinator.getGrid(options.gridId)?.getMetrics();
    if (!metrics) {
      return;
    }

    const rawRect = dashboardGridPixelRectToRawRect(nextPixelRect, metrics, delta);
    options.coordinator.updatePointer({
      point,
      pixelRect: nextPixelRect,
      clientPixelRect,
      proposal: {
        ...rawRect,
        input: 'pointer',
        resizing: true,
        resizeEdge: logicalEdge,
        pixelRect: nextPixelRect,
      },
      nativeEvent: event,
    });
    autoScroll?.update(event.clientY);
  };

  const schedulePointerMove = (event: PointerEvent) => {
    latestEvent = event;
    if (!frame && targetWindow) {
      frame = targetWindow.requestAnimationFrame(() => {
        if (latestEvent) {
          processPointerMove(latestEvent);
        }
      });
    }
  };

  function onPointerMove(event: PointerEvent) {
    if (event.pointerId === pointerId) {
      schedulePointerMove(event);
    }
  }

  function onPointerUp(event: PointerEvent) {
    if (event.pointerId !== pointerId) {
      return;
    }

    touchLeave.cancel();
    if (frame && targetWindow) {
      targetWindow.cancelAnimationFrame(frame);
      frame = 0;
    }
    latestEvent = event;
    processPointerMove(event);

    if (active) {
      clickSuppressor.suppressNext({ clientX: event.clientX, clientY: event.clientY });
      options.coordinator.commit(event);
    } else {
      options.coordinator.cancel(event);
    }
    reset();
    if (disposeRequested) {
      destroyed = true;
    }
  }

  function onPointerCancel(event: PointerEvent) {
    if (event.pointerId !== pointerId) {
      return;
    }
    options.coordinator.cancel(event);
    reset();
    if (disposeRequested) {
      destroyed = true;
    }
  }

  function onPointerOut(event: PointerEvent) {
    touchLeave.onPointerOut(event, pointerId, pointerType);
  }

  function onPointerOver(event: PointerEvent) {
    touchLeave.onPointerOver(event, pointerId, pointerType);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== Escape || pointerId === undefined) {
      return;
    }

    event.preventDefault();
    options.coordinator.cancel(event);
    reset();
    if (disposeRequested) {
      destroyed = true;
    }
  }

  function onGeometryInvalidated() {
    options.geometry.invalidate();
    options.coordinator.invalidateGeometry(options.gridId);
    if (active && latestEvent) {
      processPointerMove(latestEvent);
    }
  }

  const onPointerDown = (event: PointerEvent) => {
    if (
      destroyed ||
      pointerId !== undefined ||
      event.button !== 0 ||
      !event.isPrimary ||
      shouldCancelDashboardGridPointerStart(event, {
        itemElement: options.itemElement,
        handle: options.handleElement,
        cancel: options.cancel,
      })
    ) {
      return;
    }

    options.geometry.invalidate();
    const pixelRect = options.getOriginPixelRect?.() ?? options.geometry.elementToLocalRect(options.itemElement);
    const point = { clientX: event.clientX, clientY: event.clientY };
    const armed = options.coordinator.beginPointer({
      operation: 'resize',
      pointer: {
        pointerId: event.pointerId,
        pointerType: normalizeDashboardGridPointerType(event.pointerType),
        isPrimary: event.isPrimary,
        button: event.button,
      },
      timeStamp: event.timeStamp,
      point,
      originPixelRect: pixelRect,
      sourceGridId: options.gridId,
      itemId: options.itemId,
      resizeEdge: logicalEdge,
      ownerElement: options.itemElement,
      focusReturn: {
        element: getDashboardGridDeepActiveElement(options.targetDocument),
        gridId: options.gridId,
        itemId: options.itemId,
      },
      nativeEvent: event,
    });
    if (!armed) {
      return;
    }

    pointerId = event.pointerId;
    pointerType = normalizeDashboardGridPointerType(event.pointerType);
    startPoint = point;
    originPixelRect = pixelRect;
    latestPixelRect = pixelRect;
    options.targetDocument.addEventListener('pointermove', onPointerMove, { capture: true, passive: false });
    options.targetDocument.addEventListener('pointerup', onPointerUp, true);
    options.targetDocument.addEventListener('pointercancel', onPointerCancel, true);
    options.targetDocument.addEventListener('pointerout', onPointerOut, true);
    options.targetDocument.addEventListener('pointerover', onPointerOver, true);
    options.targetDocument.addEventListener('keydown', onKeyDown, true);
    options.targetDocument.addEventListener('scroll', onGeometryInvalidated, true);
    targetWindow?.addEventListener('resize', onGeometryInvalidated);

    updateDashboardGridPointerCapture(options.handleElement, event);
  };

  return {
    onPointerDown,
    cancel: event => {
      if (pointerId !== undefined) {
        options.coordinator.cancel(event);
      }
      reset();
    },
    destroy: () => {
      if (destroyed) {
        return;
      }
      if (pointerId !== undefined && options.handleElement.isConnected) {
        disposeRequested = true;
        Promise.resolve().then(() => {
          if (!options.handleElement.isConnected) {
            finalizeDestroy();
          }
        });
        return;
      }
      finalizeDestroy();
    },
  };
};
