import { Escape } from '@fluentui/keyboard-keys';
import { createDashboardGridAutoScroll, findNearestDashboardGridScrollAncestor } from './autoScroll';
import type { DashboardGridPointerCancelRule, DashboardGridPointerHandle } from './cancelSelectors';
import { shouldCancelDashboardGridPointerStart } from './cancelSelectors';
import { dashboardGridPixelRectToRawRect, type DashboardGridDomGeometrySession } from './domGeometry';
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
} from './types';

export const DASHBOARD_GRID_DRAG_THRESHOLD = 3;
export { DASHBOARD_GRID_TOUCH_LEAVE_DELAY } from './pointerSession';

export type DashboardGridPointerDragController = {
  onPointerDown(event: PointerEvent): void;
  cancel(event?: Event): void;
  destroy(): void;
};

export const createDashboardGridPointerDrag = (options: {
  targetDocument: Document;
  coordinator: DashboardGridInteractionCoordinator;
  gridId: string;
  itemId: string;
  itemElement: HTMLElement;
  geometry: DashboardGridDomGeometrySession;
  handle?: DashboardGridPointerHandle | null;
  cancel?: DashboardGridPointerCancelRule | readonly DashboardGridPointerCancelRule[];
  getOriginPixelRect?: () => DashboardGridPixelRect;
  onTouchTargetChange?: (inside: boolean) => void;
  onDragStart?: (rect: DashboardGridPixelRect) => void;
  onDragMove?: (rect: DashboardGridPixelRect) => void;
  onDragEnd?: () => void;
}): DashboardGridPointerDragController => {
  const targetWindow = options.targetDocument.defaultView;
  const clickSuppressor = createDashboardGridClickSuppressor(options.targetDocument);
  const touchLeave = createDashboardGridTouchLeaveController({
    targetDocument: options.targetDocument,
    onTargetChange: options.onTouchTargetChange,
  });
  let pointerId: number | undefined;
  let pointerType: DashboardGridPointerType = 'unknown';
  let startPoint: DashboardGridPoint | undefined;
  let latestEvent: PointerEvent | undefined;
  let active = false;
  let frame = 0;
  let currentPixelRect: DashboardGridPixelRect | undefined;
  let latestPixelRect: DashboardGridPixelRect | undefined;
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
    if (active) {
      options.onDragEnd?.();
    }
    if (frame && targetWindow) {
      targetWindow.cancelAnimationFrame(frame);
    }
    frame = 0;
    touchLeave.cancel();
    autoScroll?.destroy();
    autoScroll = undefined;
    removeDocumentListeners();
    releaseDashboardGridPointerCapture(options.itemElement, pointerId);
    pointerId = undefined;
    pointerType = 'unknown';
    startPoint = undefined;
    latestEvent = undefined;
    currentPixelRect = undefined;
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
    if (destroyed || pointerId === undefined || event.pointerId !== pointerId || !startPoint || !currentPixelRect) {
      return;
    }

    const point = { clientX: event.clientX, clientY: event.clientY };
    const startLocal = options.geometry.clientToLocal(startPoint);
    const currentLocal = options.geometry.clientToLocal(point);
    const delta = {
      x: currentLocal.clientX - startLocal.clientX,
      y: currentLocal.clientY - startLocal.clientY,
    };
    const nextPixelRect = {
      ...currentPixelRect,
      x: currentPixelRect.x + delta.x,
      y: currentPixelRect.y + delta.y,
    };
    latestPixelRect = nextPixelRect;
    const clientPixelRect = options.geometry.localRectToClientRect(nextPixelRect);

    if (!active) {
      if (getDashboardGridManhattanDistance(startPoint, point) <= DASHBOARD_GRID_DRAG_THRESHOLD) {
        return;
      }

      active = true;
      options.coordinator.activatePointer({ pixelRect: nextPixelRect, nativeEvent: event });
      options.onDragStart?.(clientPixelRect);
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
            options.coordinator.invalidateGeometry(options.coordinator.getSession()?.targetGridId);
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
        input: 'pointer',
        column: rawRect.column,
        row: rawRect.row,
        pixelRect: nextPixelRect,
      },
      nativeEvent: event,
    });
    options.onDragMove?.(clientPixelRect);
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
      clickSuppressor.suppressNext();
      void options.coordinator.commit(event);
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
    options.coordinator.invalidateGeometry(options.coordinator.getSession()?.targetGridId);
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
        handle: options.handle,
        cancel: options.cancel,
      })
    ) {
      return;
    }

    options.geometry.invalidate();
    const originPixelRect = options.getOriginPixelRect?.() ?? options.geometry.elementToLocalRect(options.itemElement);
    const point = { clientX: event.clientX, clientY: event.clientY };
    const armed = options.coordinator.beginPointer({
      operation: 'drag',
      pointer: {
        pointerId: event.pointerId,
        pointerType: normalizeDashboardGridPointerType(event.pointerType),
        isPrimary: event.isPrimary,
        button: event.button,
      },
      timeStamp: event.timeStamp,
      point,
      originPixelRect,
      sourceGridId: options.gridId,
      itemId: options.itemId,
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
    currentPixelRect = originPixelRect;
    latestPixelRect = originPixelRect;
    options.targetDocument.addEventListener('pointermove', onPointerMove, { capture: true, passive: false });
    options.targetDocument.addEventListener('pointerup', onPointerUp, true);
    options.targetDocument.addEventListener('pointercancel', onPointerCancel, true);
    options.targetDocument.addEventListener('pointerout', onPointerOut, true);
    options.targetDocument.addEventListener('pointerover', onPointerOver, true);
    options.targetDocument.addEventListener('keydown', onKeyDown, true);
    options.targetDocument.addEventListener('scroll', onGeometryInvalidated, true);
    targetWindow?.addEventListener('resize', onGeometryInvalidated);

    updateDashboardGridPointerCapture(options.itemElement, event);
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
      if (pointerId !== undefined && options.itemElement.isConnected) {
        disposeRequested = true;
        Promise.resolve().then(() => {
          if (!options.itemElement.isConnected) {
            finalizeDestroy();
          }
        });
        return;
      }
      finalizeDestroy();
    },
  };
};
