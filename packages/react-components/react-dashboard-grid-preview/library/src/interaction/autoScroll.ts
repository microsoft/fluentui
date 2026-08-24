import { getComposedParent } from './domGeometry';

const scrollableOverflow = /^(auto|scroll|overlay)$/;

const isHTMLElementLike = (value: Element | null | undefined): value is HTMLElement =>
  value !== null && value !== undefined && 'scrollHeight' in value && 'clientHeight' in value;

export const findNearestDashboardGridScrollAncestor = (
  element: HTMLElement,
  targetDocument: Document,
): HTMLElement | null => {
  const targetWindow = targetDocument.defaultView;
  if (!targetWindow) {
    return null;
  }

  let current = getComposedParent(element);
  while (current) {
    const style = targetWindow.getComputedStyle(current);
    if (
      scrollableOverflow.test(style.overflowY) &&
      current.scrollHeight > current.clientHeight &&
      current.clientHeight > 0
    ) {
      return current;
    }
    current = getComposedParent(current);
  }

  const scrollingElement = targetDocument.scrollingElement;
  return isHTMLElementLike(scrollingElement) ? scrollingElement : null;
};

export const getDashboardGridAutoScrollSpeed = (clipping: number, viewportHeight: number): number =>
  Math.min(Math.abs(clipping) * 0.5, Math.max(viewportHeight / 150, 4));

export const getDashboardGridAutoScrollDelta = (
  activeRect: Pick<DOMRectReadOnly, 'top' | 'bottom'>,
  viewportRect: Pick<DOMRectReadOnly, 'top' | 'bottom' | 'height'>,
  pointerY?: number,
): number => {
  if (activeRect.bottom <= viewportRect.top || activeRect.top >= viewportRect.bottom) {
    return 0;
  }

  const topClipping = viewportRect.top - activeRect.top;
  const bottomClipping = activeRect.bottom - viewportRect.bottom;
  if (topClipping <= 0 && bottomClipping <= 0) {
    return 0;
  }

  if (topClipping > 0 && bottomClipping > 0) {
    const direction =
      pointerY === undefined
        ? bottomClipping >= topClipping
          ? 1
          : -1
        : pointerY >= viewportRect.top + viewportRect.height / 2
          ? 1
          : -1;
    const clipping = direction > 0 ? bottomClipping : topClipping;
    return direction * getDashboardGridAutoScrollSpeed(clipping, viewportRect.height);
  }

  if (topClipping > 0) {
    return -getDashboardGridAutoScrollSpeed(topClipping, viewportRect.height);
  }

  return getDashboardGridAutoScrollSpeed(bottomClipping, viewportRect.height);
};

export type DashboardGridAutoScrollController = {
  update(pointerY?: number): void;
  stop(): void;
  destroy(): void;
};

export const createDashboardGridAutoScroll = (options: {
  targetDocument: Document;
  scrollElement: HTMLElement;
  getActiveRect: () => DOMRectReadOnly;
  onScroll: () => void;
}): DashboardGridAutoScrollController => {
  const targetWindow = options.targetDocument.defaultView;
  let frame = 0;
  let pointerY: number | undefined;
  let destroyed = false;

  const stop = () => {
    if (frame && targetWindow) {
      targetWindow.cancelAnimationFrame(frame);
    }
    frame = 0;
  };

  const tick = () => {
    frame = 0;
    if (destroyed || !targetWindow) {
      return;
    }

    const viewportRect = options.scrollElement.getBoundingClientRect();
    const delta = getDashboardGridAutoScrollDelta(options.getActiveRect(), viewportRect, pointerY);
    if (delta === 0) {
      return;
    }

    const previousScrollTop = options.scrollElement.scrollTop;
    const maxScrollTop = Math.max(0, options.scrollElement.scrollHeight - options.scrollElement.clientHeight);
    const nextScrollTop = Math.min(maxScrollTop, Math.max(0, previousScrollTop + delta));
    if (nextScrollTop === previousScrollTop) {
      return;
    }
    options.scrollElement.scrollTop = nextScrollTop;
    options.onScroll();
    if (!frame) {
      frame = targetWindow.requestAnimationFrame(tick);
    }
  };

  const update = (nextPointerY?: number) => {
    pointerY = nextPointerY;
    if (!frame && !destroyed && targetWindow) {
      frame = targetWindow.requestAnimationFrame(tick);
    }
  };

  return {
    update,
    stop,
    destroy: () => {
      destroyed = true;
      stop();
    },
  };
};
