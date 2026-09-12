import { Enter, Escape, F2, Space } from '@fluentui/keyboard-keys';
import { createDashboardGridAutoScroll, findNearestDashboardGridScrollAncestor } from './autoScroll';
import { shouldCancelDashboardGridPointerStart } from './cancelSelectors';
import { sanitizeDashboardGridDragPreview } from './dragPreview';
import { DASHBOARD_GRID_DRAG_THRESHOLD } from './pointerDrag';
import {
  createDashboardGridClickSuppressor,
  createDashboardGridTouchLeaveController,
  getDashboardGridDeepActiveElement,
  normalizeDashboardGridPointerType,
  releaseDashboardGridPointerCapture,
  updateDashboardGridPointerCapture,
} from './pointerSession';
import type {
  DashboardGridDragSourceRegistration,
  DashboardGridInteractionCoordinator,
  DashboardGridPixelRect,
  DashboardGridPointerType,
} from './types';

export type DashboardGridExternalSourceController = {
  onPointerDown(event: PointerEvent): void;
  onKeyDown(event: KeyboardEvent): void;
  cancel(event?: Event): void;
  destroy(): void;
};

const getElementPixelRect = (element: HTMLElement): DashboardGridPixelRect => {
  const rect = element.getBoundingClientRect();
  return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
};

export const createDashboardGridExternalSource = (options: {
  targetDocument: Document;
  coordinator: DashboardGridInteractionCoordinator;
  registration: DashboardGridDragSourceRegistration;
  onKeyboardActivate?: (registration: DashboardGridDragSourceRegistration, event: KeyboardEvent) => void;
  onTouchTargetChange?: (inside: boolean) => void;
}): DashboardGridExternalSourceController => {
  const targetWindow = options.targetDocument.defaultView;
  const unregister = options.coordinator.registerDragSource(options.registration);
  const clickSuppressor = createDashboardGridClickSuppressor(options.targetDocument);
  const touchLeave = createDashboardGridTouchLeaveController({
    targetDocument: options.targetDocument,
    onTargetChange: options.onTouchTargetChange,
  });
  let pointerId: number | undefined;
  let pointerType: DashboardGridPointerType = 'unknown';
  let startX = 0;
  let startY = 0;
  let originRect: DashboardGridPixelRect | undefined;
  let currentRect: DashboardGridPixelRect | undefined;
  let latestEvent: PointerEvent | undefined;
  let active = false;
  let frame = 0;
  let autoScroll: ReturnType<typeof createDashboardGridAutoScroll> | undefined;
  let autoScrollGridId: string | undefined;
  let destroyed = false;
  let disposeRequested = false;

  const previewElement = options.registration.previewElement;
  if (previewElement) {
    sanitizeDashboardGridDragPreview(previewElement);
    previewElement.style.position = 'fixed';
    previewElement.style.insetInlineStart = '0';
    previewElement.style.top = '0';
    previewElement.style.pointerEvents = 'none';
    previewElement.style.visibility = 'hidden';
  }

  const updatePreviewElement = (rect: DashboardGridPixelRect | undefined, visible: boolean) => {
    if (!previewElement) {
      return;
    }
    previewElement.style.visibility = visible ? 'visible' : 'hidden';
    if (rect) {
      previewElement.style.width = `${rect.width}px`;
      previewElement.style.height = `${rect.height}px`;
      previewElement.style.transform = `translate3d(${rect.x}px, ${rect.y}px, 0)`;
    }
  };

  const removeDocumentListeners = () => {
    options.targetDocument.removeEventListener('pointermove', onPointerMove, true);
    options.targetDocument.removeEventListener('pointerup', onPointerUp, true);
    options.targetDocument.removeEventListener('pointercancel', onPointerCancel, true);
    options.targetDocument.removeEventListener('pointerout', onPointerOut, true);
    options.targetDocument.removeEventListener('pointerover', onPointerOver, true);
    options.targetDocument.removeEventListener('keydown', onDocumentKeyDown, true);
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
    autoScrollGridId = undefined;
    removeDocumentListeners();
    releaseDashboardGridPointerCapture(options.registration.element, pointerId);
    pointerId = undefined;
    pointerType = 'unknown';
    originRect = undefined;
    currentRect = undefined;
    latestEvent = undefined;
    active = false;
    updatePreviewElement(undefined, false);
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
    unregister();
    clickSuppressor.dispose();
  };

  const finishDeferredDispose = () => {
    if (disposeRequested && !destroyed) {
      destroyed = true;
      unregister();
    }
  };

  const refreshAutoScroll = () => {
    const targetGridId = options.coordinator.getSession()?.targetGridId;
    if (targetGridId === autoScrollGridId) {
      return;
    }

    autoScroll?.destroy();
    autoScroll = undefined;
    autoScrollGridId = targetGridId;
    if (!targetGridId) {
      return;
    }
    const gridElement = options.coordinator.getGrid(targetGridId)?.element;
    const scrollElement = gridElement
      ? findNearestDashboardGridScrollAncestor(gridElement, options.targetDocument)
      : null;
    if (scrollElement) {
      autoScroll = createDashboardGridAutoScroll({
        targetDocument: options.targetDocument,
        scrollElement,
        getActiveRect: () => {
          const rect = currentRect ?? originRect ?? { x: 0, y: 0, width: 0, height: 0 };
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
        },
        onScroll: () => {
          options.coordinator.invalidateGeometry(targetGridId);
          if (latestEvent) {
            processPointerMove(latestEvent);
          }
        },
      });
    }
  };

  const processPointerMove = (event: PointerEvent) => {
    frame = 0;
    if (destroyed || pointerId === undefined || event.pointerId !== pointerId || !originRect) {
      return;
    }

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    currentRect = {
      ...originRect,
      x: originRect.x + deltaX,
      y: originRect.y + deltaY,
    };
    updatePreviewElement(currentRect, active);

    if (!active) {
      if (Math.abs(deltaX) + Math.abs(deltaY) <= DASHBOARD_GRID_DRAG_THRESHOLD) {
        return;
      }
      active = true;
      options.coordinator.activatePointer({ pixelRect: currentRect, nativeEvent: event });
      updatePreviewElement(currentRect, true);
    }

    if (event.cancelable) {
      event.preventDefault();
    }
    options.coordinator.updatePointer({
      point: { clientX: event.clientX, clientY: event.clientY },
      pixelRect: currentRect,
      clientPixelRect: currentRect,
      nativeEvent: event,
    });
    refreshAutoScroll();
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
    finishDeferredDispose();
  }

  function onPointerCancel(event: PointerEvent) {
    if (event.pointerId !== pointerId) {
      return;
    }
    options.coordinator.cancel(event);
    reset();
    finishDeferredDispose();
  }

  function onPointerOut(event: PointerEvent) {
    touchLeave.onPointerOut(event, pointerId, pointerType);
  }

  function onPointerOver(event: PointerEvent) {
    touchLeave.onPointerOver(event, pointerId, pointerType);
  }

  function onDocumentKeyDown(event: KeyboardEvent) {
    if (event.key !== Escape || pointerId === undefined) {
      return;
    }
    event.preventDefault();
    options.coordinator.cancel(event);
    reset();
    finishDeferredDispose();
  }

  function onGeometryInvalidated() {
    options.coordinator.invalidateGeometry();
    if (active && latestEvent) {
      processPointerMove(latestEvent);
    }
  }

  const onPointerDown = (event: PointerEvent) => {
    if (
      destroyed ||
      options.registration.disabled ||
      pointerId !== undefined ||
      event.button !== 0 ||
      !event.isPrimary ||
      shouldCancelDashboardGridPointerStart(event, {
        itemElement: options.registration.element,
        ignoreItemElement: true,
      })
    ) {
      return;
    }

    const pixelRect = getElementPixelRect(options.registration.element);
    const armed = options.coordinator.beginPointer({
      operation: 'external',
      pointer: {
        pointerId: event.pointerId,
        pointerType: normalizeDashboardGridPointerType(event.pointerType),
        isPrimary: event.isPrimary,
        button: event.button,
      },
      timeStamp: event.timeStamp,
      point: { clientX: event.clientX, clientY: event.clientY },
      originPixelRect: pixelRect,
      sourceId: options.registration.id,
      ownerElement: options.registration.element,
      focusReturn: { element: getDashboardGridDeepActiveElement(options.targetDocument) },
      nativeEvent: event,
    });
    if (!armed) {
      return;
    }

    pointerId = event.pointerId;
    pointerType = normalizeDashboardGridPointerType(event.pointerType);
    startX = event.clientX;
    startY = event.clientY;
    originRect = pixelRect;
    currentRect = pixelRect;
    options.targetDocument.addEventListener('pointermove', onPointerMove, { capture: true, passive: false });
    options.targetDocument.addEventListener('pointerup', onPointerUp, true);
    options.targetDocument.addEventListener('pointercancel', onPointerCancel, true);
    options.targetDocument.addEventListener('pointerout', onPointerOut, true);
    options.targetDocument.addEventListener('pointerover', onPointerOver, true);
    options.targetDocument.addEventListener('keydown', onDocumentKeyDown, true);
    options.targetDocument.addEventListener('scroll', onGeometryInvalidated, true);
    targetWindow?.addEventListener('resize', onGeometryInvalidated);

    updateDashboardGridPointerCapture(options.registration.element, event);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (
      options.registration.disabled ||
      event.target !== options.registration.element ||
      (event.key !== Enter && event.key !== Space && event.key !== F2)
    ) {
      return;
    }

    if (options.onKeyboardActivate) {
      event.preventDefault();
      options.onKeyboardActivate(options.registration, event);
      return;
    }

    const targetGrids = options.coordinator.getGrids().filter(grid => grid.element.isConnected);
    if (targetGrids.length !== 1) {
      return;
    }

    const targetRect = targetGrids[0].element.getBoundingClientRect();
    const sourceRect = getElementPixelRect(options.registration.element);
    const point = {
      clientX: targetRect.left + targetRect.width / 2,
      clientY: targetRect.top + targetRect.height / 2,
    };
    const previewRect = {
      ...sourceRect,
      x: point.clientX - sourceRect.width / 2,
      y: point.clientY - sourceRect.height / 2,
    };
    const armed = options.coordinator.beginPointer({
      operation: 'external',
      pointer: {
        pointerId: 0,
        pointerType: 'keyboard',
        isPrimary: true,
        button: 0,
      },
      timeStamp: event.timeStamp,
      point,
      originPixelRect: sourceRect,
      sourceId: options.registration.id,
      ownerElement: options.registration.element,
      focusReturn: { element: getDashboardGridDeepActiveElement(options.targetDocument) },
      nativeEvent: event,
    });
    if (!armed) {
      return;
    }

    event.preventDefault();
    options.coordinator.activatePointer({ pixelRect: previewRect, nativeEvent: event });
    options.coordinator.updatePointer({
      point,
      pixelRect: previewRect,
      clientPixelRect: previewRect,
      nativeEvent: event,
    });
    options.coordinator.commit(event);
  };

  return {
    onPointerDown,
    onKeyDown,
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
      if (pointerId !== undefined && options.registration.element.isConnected) {
        disposeRequested = true;
        Promise.resolve().then(() => {
          if (!options.registration.element.isConnected) {
            finalizeDestroy();
          }
        });
        return;
      }
      finalizeDestroy();
    },
  };
};
