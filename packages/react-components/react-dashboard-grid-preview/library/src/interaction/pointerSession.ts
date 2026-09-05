import type { DashboardGridPixelRect, DashboardGridPoint, DashboardGridPointerType } from './types';

export const DASHBOARD_GRID_TOUCH_LEAVE_DELAY = 10;

export const normalizeDashboardGridPointerType = (pointerType: string): DashboardGridPointerType => {
  switch (pointerType) {
    case 'mouse':
    case 'touch':
    case 'pen':
    case 'keyboard':
      return pointerType;
    default:
      return 'unknown';
  }
};

export const getDashboardGridDeepActiveElement = (targetDocument: Document): HTMLElement | null => {
  let activeElement = targetDocument.activeElement;
  while (activeElement && 'shadowRoot' in activeElement && activeElement.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }

  return activeElement && 'focus' in activeElement ? (activeElement as HTMLElement) : null;
};

export const getDashboardGridManhattanDistance = (start: DashboardGridPoint, current: DashboardGridPoint): number =>
  Math.abs(current.clientX - start.clientX) + Math.abs(current.clientY - start.clientY);

export const dashboardGridPixelRectToClientRect = (rect: DashboardGridPixelRect): DOMRectReadOnly => ({
  x: rect.x,
  y: rect.y,
  top: rect.y,
  bottom: rect.y + rect.height,
  left: rect.x,
  right: rect.x + rect.width,
  width: rect.width,
  height: rect.height,
  toJSON: () => ({}),
});

export const releaseDashboardGridPointerCapture = (element: HTMLElement, pointerId: number | undefined): void => {
  if (pointerId === undefined || !element.hasPointerCapture?.(pointerId)) {
    return;
  }

  try {
    element.releasePointerCapture(pointerId);
  } catch {
    // Capture may have ended with pointerup or pointercancel.
  }
};

export const updateDashboardGridPointerCapture = (element: HTMLElement, event: PointerEvent): void => {
  const pointerType = normalizeDashboardGridPointerType(event.pointerType);
  if (pointerType === 'touch' || pointerType === 'pen') {
    releaseDashboardGridPointerCapture(element, event.pointerId);
    return;
  }

  if (pointerType === 'mouse' && element.setPointerCapture) {
    try {
      element.setPointerCapture(event.pointerId);
    } catch {
      // Document listeners retain ownership when pointer capture is unavailable.
    }
  }
};

export type DashboardGridClickSuppressor = {
  suppressNext(point?: DashboardGridPoint): void;
  dispose(): void;
};

export const createDashboardGridClickSuppressor = (targetDocument: Document): DashboardGridClickSuppressor => {
  const targetWindow = targetDocument.defaultView;
  let timer = 0;
  let listener: ((event: MouseEvent) => void) | undefined;

  const removeListener = () => {
    if (listener) {
      targetDocument.removeEventListener('click', listener, true);
      listener = undefined;
    }
  };

  const clear = () => {
    removeListener();
    if (timer && targetWindow) {
      targetWindow.clearTimeout(timer);
      timer = 0;
    }
  };

  return {
    suppressNext: point => {
      if (!targetWindow) {
        return;
      }

      clear();
      listener = event => {
        if (
          point &&
          getDashboardGridManhattanDistance(point, {
            clientX: event.clientX,
            clientY: event.clientY,
          }) > 4
        ) {
          return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        clear();
      };
      targetDocument.addEventListener('click', listener, true);
      timer = targetWindow.setTimeout(clear, 500);
    },
    dispose: clear,
  };
};

export type DashboardGridTouchLeaveController = {
  cancel(): void;
  onPointerOut(event: PointerEvent, pointerId: number | undefined, pointerType: DashboardGridPointerType): void;
  onPointerOver(event: PointerEvent, pointerId: number | undefined, pointerType: DashboardGridPointerType): void;
};

export const createDashboardGridTouchLeaveController = (options: {
  targetDocument: Document;
  onTargetChange?: (inside: boolean) => void;
}): DashboardGridTouchLeaveController => {
  const targetWindow = options.targetDocument.defaultView;
  let timer = 0;

  const cancel = () => {
    if (timer && targetWindow) {
      targetWindow.clearTimeout(timer);
    }
    timer = 0;
  };

  return {
    cancel,
    onPointerOut: (event, pointerId, pointerType) => {
      if (event.pointerId !== pointerId || (pointerType !== 'touch' && pointerType !== 'pen') || !targetWindow) {
        return;
      }

      cancel();
      timer = targetWindow.setTimeout(() => {
        timer = 0;
        options.onTargetChange?.(false);
      }, DASHBOARD_GRID_TOUCH_LEAVE_DELAY);
    },
    onPointerOver: (event, pointerId, pointerType) => {
      if (event.pointerId !== pointerId || (pointerType !== 'touch' && pointerType !== 'pen')) {
        return;
      }

      cancel();
      options.onTargetChange?.(true);
    },
  };
};
