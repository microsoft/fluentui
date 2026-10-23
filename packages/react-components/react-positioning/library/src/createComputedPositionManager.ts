import { isHTMLElement } from '@fluentui/react-utilities';
import type { PositionManagerOptions } from './createPositionManager';
import type { OnPositioningEndEventDetail, PositionManager } from './types';
import { computePosition } from './engine/computePosition';
import { getScrollAncestors } from './engine/geometry';
import { debounce, writeContainerUpdates } from './utils';
import { writeArrowUpdates } from './utils/writeArrowUpdates';
import { POSITIONING_END_EVENT } from './constants';
import { createResizeObserver } from './utils/createResizeObserver';

function isLayoutViewportUnavailable(container: HTMLElement): boolean {
  const { clientWidth, clientHeight } = container.ownerDocument.documentElement;
  return clientWidth === 0 && clientHeight === 0;
}

export function createComputedPositionManager(options: PositionManagerOptions): PositionManager {
  let isDestroyed = false;
  const { container, target, arrow, strategy, useTransform = true, disableUpdateOnResize = false } = options;
  const targetWindow = container.ownerDocument.defaultView;
  if (!target || !container || !targetWindow) {
    return {
      updatePosition: () => undefined,
      dispose: () => undefined,
    };
  }

  const resizeObserver = disableUpdateOnResize
    ? null
    : createResizeObserver(targetWindow, entries => {
        if (entries.every(entry => entry.contentRect.width > 0 && entry.contentRect.height > 0)) {
          updatePosition();
        }
      });

  let isFirstUpdate = true;
  const scrollParents = new Set<HTMLElement>();
  Object.assign(container.style, { position: 'fixed', left: 0, top: 0, margin: 0 });

  const forceUpdate = () => {
    if (isDestroyed) {
      return;
    }

    if (isFirstUpdate) {
      getScrollAncestors(container).forEach(scrollParent => scrollParents.add(scrollParent));
      if (isHTMLElement(target)) {
        getScrollAncestors(target).forEach(scrollParent => scrollParents.add(scrollParent));
      }
      scrollParents.forEach(scrollParent => scrollParent.addEventListener('scroll', updatePosition, { passive: true }));
      resizeObserver?.observe(container);
      if (isHTMLElement(target)) {
        resizeObserver?.observe(target);
      }
      isFirstUpdate = false;
    }

    container.style.position = strategy;
    const positioningOptions = options.positioningOptions ?? options;
    const rtl = options.isRtl ?? targetWindow.getComputedStyle(container).direction === 'rtl';
    computePosition(target, container, {
      placement: options.placement,
      strategy,
      positioningOptions,
      isRtl: rtl,
      arrow,
    })
      .then(({ x, y, middlewareData, placement }) => {
        if (isDestroyed) {
          return;
        }

        const resolvedMiddlewareData = isLayoutViewportUnavailable(container)
          ? { ...middlewareData, hide: { escaped: false, referenceHidden: false } }
          : middlewareData;
        const { escaped = false, referenceHidden = false } = resolvedMiddlewareData.hide || {};
        writeArrowUpdates({ arrow, middlewareData: resolvedMiddlewareData });
        writeContainerUpdates({
          container,
          middlewareData: resolvedMiddlewareData,
          placement,
          coordinates: { x, y },
          lowPPI: (targetWindow.devicePixelRatio || 1) <= 1,
          useTransform,
        });
        container.dispatchEvent(
          new CustomEvent<OnPositioningEndEventDetail>(POSITIONING_END_EVENT, {
            detail: { placement, escaped, referenceHidden },
          }),
        );
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[usePositioning]: Failed to calculate position', err);
        }
      });
  };

  const updatePosition = debounce(forceUpdate);
  const dispose = () => {
    isDestroyed = true;
    targetWindow.removeEventListener('scroll', updatePosition);
    targetWindow.removeEventListener('resize', updatePosition);
    scrollParents.forEach(scrollParent => scrollParent.removeEventListener('scroll', updatePosition));
    scrollParents.clear();
    resizeObserver?.disconnect();
  };

  targetWindow.addEventListener('scroll', updatePosition, { passive: true });
  targetWindow.addEventListener('resize', updatePosition);
  updatePosition();

  return { updatePosition, dispose };
}
