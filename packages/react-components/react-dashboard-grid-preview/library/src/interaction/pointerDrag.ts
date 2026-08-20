import { Escape } from '@fluentui/keyboard-keys';
import { createDashboardGridAutoScroll, findNearestDashboardGridScrollAncestor } from './autoScroll';
import type {
  DashboardGridPointerCancelRule,
  DashboardGridPointerHandle,
} from './cancelSelectors';
import { shouldCancelDashboardGridPointerStart } from './cancelSelectors';
import {
  dashboardGridPixelRectToRawRect,
  type DashboardGridDomGeometrySession,
} from './domGeometry';
import type {
  DashboardGridInteractionCoordinator,
  DashboardGridPixelRect,
  DashboardGridPoint,
} from './types';

export const DASHBOARD_GRID_DRAG_THRESHOLD = 3;
export const DASHBOARD_GRID_TOUCH_LEAVE_DELAY = 10;

export type DashboardGridPointerDragController = {
  onPointerDown(event: PointerEvent): void;
  cancel(event?: Event): void;
  destroy(): void;
};

const getDeepActiveElement = (targetDocument: Document): HTMLElement | null => {
  let activeElement = targetDocument.activeElement;
  while (activeElement && 'shadowRoot' in activeElement && activeElement.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }

  return activeElement && 'focus' in activeElement ? (activeElement as HTMLElement) : null;
};

const getManhattanDistance = (start: DashboardGridPoint, current: DashboardGridPoint): number =>
  Math.abs(current.clientX - start.clientX) + Math.abs(current.clientY - start.clientY);

const toClientRect = (
  rect: DashboardGridPixelRect,
): DOMRectReadOnly => {
  return {
    x: rect.x,
    y: rect.y,
    top: rect.y,
    bottom: rect.y + rect.height,
    left: rect.x,
    right: rect.x + rect.width,
    width: rect.width,
    height: rect.height,
    toJSON: () => ({}),
  };
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
}): DashboardGridPointerDragController => {
  const targetWindow = options.targetDocument.defaultView;
  let pointerId: number | undefined;
  let pointerType = '';
  let startPoint: DashboardGridPoint | undefined;
  let latestEvent: PointerEvent | undefined;
  let active = false;
  let frame = 0;
  let leaveTimer = 0;
  let suppressClickTimer = 0;
  let suppressClickListener: ((event: MouseEvent) => void) | undefined;
  let currentPixelRect: DashboardGridPixelRect | undefined;
  let latestPixelRect: DashboardGridPixelRect | undefined;
  let autoScroll: ReturnType<typeof createDashboardGridAutoScroll> | undefined;
  let destroyed = false;
  let disposeRequested = false;

  const clearLeaveTimer = () => {
    if (leaveTimer && targetWindow) {
      targetWindow.clearTimeout(leaveTimer);
    }
    leaveTimer = 0;
  };

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
    clearLeaveTimer();
    autoScroll?.destroy();
    autoScroll = undefined;
    removeDocumentListeners();
    if (pointerId !== undefined && options.itemElement.hasPointerCapture?.(pointerId)) {
      try {
        options.itemElement.releasePointerCapture(pointerId);
      } catch {
        // Capture may have ended with pointerup or pointercancel.
      }
    }
    pointerId = undefined;
    pointerType = '';
    startPoint = undefined;
    latestEvent = undefined;
    currentPixelRect = undefined;
    latestPixelRect = undefined;
    active = false;
  };

  const suppressNextClick = () => {
    if (!targetWindow) {
      return;
    }

    if (suppressClickListener) {
      options.targetDocument.removeEventListener('click', suppressClickListener, true);
    }
    suppressClickListener = (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (suppressClickListener) {
        options.targetDocument.removeEventListener('click', suppressClickListener, true);
        suppressClickListener = undefined;
      }
      if (suppressClickTimer) {
        targetWindow.clearTimeout(suppressClickTimer);
        suppressClickTimer = 0;
      }
    };

    options.targetDocument.addEventListener('click', suppressClickListener, true);
    suppressClickTimer = targetWindow.setTimeout(() => {
      if (suppressClickListener) {
        options.targetDocument.removeEventListener('click', suppressClickListener, true);
        suppressClickListener = undefined;
      }
      suppressClickTimer = 0;
    }, 500);
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
    if (suppressClickTimer && targetWindow) {
      targetWindow.clearTimeout(suppressClickTimer);
    }
    if (suppressClickListener) {
      options.targetDocument.removeEventListener('click', suppressClickListener, true);
      suppressClickListener = undefined;
    }
  };

  const processPointerMove = (event: PointerEvent) => {
    frame = 0;
    if (
      destroyed ||
      pointerId === undefined ||
      event.pointerId !== pointerId ||
      !startPoint ||
      !currentPixelRect
    ) {
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
      if (getManhattanDistance(startPoint, point) <= DASHBOARD_GRID_DRAG_THRESHOLD) {
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
            toClientRect(options.geometry.localRectToClientRect(latestPixelRect ?? nextPixelRect)),
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

    clearLeaveTimer();
    if (frame && targetWindow) {
      targetWindow.cancelAnimationFrame(frame);
      frame = 0;
    }
    latestEvent = event;
    processPointerMove(event);

    if (active) {
      suppressNextClick();
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
    if (
      event.pointerId !== pointerId ||
      (pointerType !== 'touch' && pointerType !== 'pen') ||
      !targetWindow
    ) {
      return;
    }

    clearLeaveTimer();
    leaveTimer = targetWindow.setTimeout(() => {
      leaveTimer = 0;
      options.onTouchTargetChange?.(false);
    }, DASHBOARD_GRID_TOUCH_LEAVE_DELAY);
  }

  function onPointerOver(event: PointerEvent) {
    if (event.pointerId !== pointerId || (pointerType !== 'touch' && pointerType !== 'pen')) {
      return;
    }

    clearLeaveTimer();
    options.onTouchTargetChange?.(true);
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
        pointerType: event.pointerType,
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
        element: getDeepActiveElement(options.targetDocument),
        gridId: options.gridId,
        itemId: options.itemId,
      },
      nativeEvent: event,
    });
    if (!armed) {
      return;
    }

    pointerId = event.pointerId;
    pointerType = event.pointerType;
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

    if (
      (event.pointerType === 'touch' || event.pointerType === 'pen') &&
      options.itemElement.hasPointerCapture?.(event.pointerId)
    ) {
      try {
        options.itemElement.releasePointerCapture(event.pointerId);
      } catch {
        // Implicit capture may already have been released by the browser.
      }
    } else if (event.pointerType === 'mouse' && options.itemElement.setPointerCapture) {
      try {
        options.itemElement.setPointerCapture(event.pointerId);
      } catch {
        // Document listeners still retain ownership when capture is unavailable.
      }
    }
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
