import { isHTMLElement } from '@fluentui/react-utilities';
import type {
  OnPositioningEndEventDetail,
  Position,
  PositionManager,
  PositioningOptions,
  PositioningPlacement,
  TargetElement,
} from './types';
import type { PlacementRect } from './engine/computePlacement';
import { applyArrow } from './engine/arrow';
import { applyAutoSize, resetAutoSize } from './engine/autoSize';
import { getScrollAncestors } from './engine/geometry';
import { getClippingRect } from './engine/platform';
import { toPlacement, toPositioningPlacement } from './engine/placement';
import { resolveOffset } from './engine/offset';
import { debounce, normalizeAutoSize, writeVisibilityUpdates } from './utils';
import { POSITIONING_END_EVENT } from './constants';
import { createResizeObserver } from './utils/createResizeObserver';
import { createComputedPositionManager } from './createComputedPositionManager';
import { toFloatingUIPlacement } from './utils/toFloatingUIPlacement';
import { fromFloatingUIPlacement } from './utils/fromFloatingUIPlacement';
import {
  DATA_POSITIONING_ESCAPED,
  DATA_POSITIONING_HIDDEN,
  DATA_POSITIONING_INTERSECTING,
  DATA_POSITIONING_PLACEMENT,
} from './constants';

type HeadlessPlacement = { position: Position; align: 'start' | 'center' | 'end' };

/**
 * @internal
 */
export interface PositionManagerOptions
  extends Pick<
    PositioningOptions,
    | 'align'
    | 'arrowPadding'
    | 'autoSize'
    | 'coverTarget'
    | 'disableUpdateOnResize'
    | 'fallbackPositions'
    | 'flipBoundary'
    | 'matchTargetSize'
    | 'offset'
    | 'overflowBoundary'
    | 'overflowBoundaryPadding'
    | 'pinned'
    | 'position'
    | 'useTransform'
  > {
  container: HTMLElement;
  target: TargetElement;
  arrow: HTMLElement | null;
  strategy: 'absolute' | 'fixed';
  positioningOptions?: PositioningOptions;
  isRtl?: boolean;
  placement?: PositioningPlacement;
  detectPlacement?: (target: TargetElement, container: HTMLElement) => HeadlessPlacement | null;
  onPlacement?: (placement: HeadlessPlacement) => void;
  attributes?: Partial<Record<'placement' | 'hidden' | 'escaped' | 'intersecting', string>>;
}

type Visibility = {
  referenceHidden: boolean;
  escaped: boolean;
  intersecting: boolean;
};

function rectOf(rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>): PlacementRect {
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
}

function isOutside(rect: PlacementRect, bounds: PlacementRect): boolean {
  return (
    rect.left + rect.width <= bounds.left ||
    rect.left >= bounds.left + bounds.width ||
    rect.top + rect.height <= bounds.top ||
    rect.top >= bounds.top + bounds.height
  );
}

function getVisibility(
  container: HTMLElement,
  target: TargetElement,
  anchor: PlacementRect,
  popup: PlacementRect,
): Visibility {
  const element = ('nodeType' in target ? target : target.contextElement) ?? container;
  const clip = getClippingRect(element, 'clippingAncestors');
  const bounds = { left: clip.x, top: clip.y, width: clip.width, height: clip.height };
  const overflowTop = bounds.top - popup.top;
  const overflowBottom = popup.top + popup.height - (bounds.top + bounds.height);

  return {
    referenceHidden: isOutside(anchor, bounds),
    escaped: isOutside(popup, bounds),
    intersecting:
      (overflowTop > 0 && overflowTop < popup.height) || (overflowBottom > 0 && overflowBottom < popup.height),
  };
}

function isLayoutViewportUnavailable(container: HTMLElement): boolean {
  const { clientWidth, clientHeight } = container.ownerDocument.documentElement;
  return clientWidth === 0 && clientHeight === 0;
}

/**
 * @internal
 * @returns manager that handles positioning out of the react lifecycle
 */
export function createPositionManager(options: PositionManagerOptions): PositionManager {
  if (!options.detectPlacement) {
    const managerContainer = options.container;
    const attributes = options.attributes;
    const onPlacement = options.onPlacement;
    const positioningOptions = options.positioningOptions ?? options;
    const rtl =
      options.isRtl ??
      managerContainer.ownerDocument.defaultView?.getComputedStyle(managerContainer).direction === 'rtl';
    const manager = createComputedPositionManager({
      ...options,
      placement: options.placement ?? toFloatingUIPlacement(positioningOptions.align, positioningOptions.position, rtl),
      isRtl: rtl,
    });
    if (!options.attributes && !options.onPlacement) {
      return manager;
    }

    const onPositioningEnd = (event: Event) => {
      const { placement } = (event as CustomEvent<OnPositioningEndEventDetail>).detail;
      const syncBooleanAttribute = (name: string | undefined, fallback: string, value: boolean) => {
        if (name === '') {
          managerContainer.removeAttribute(fallback);
        } else {
          managerContainer.toggleAttribute(name ?? fallback, value);
          if (name && name !== fallback) {
            managerContainer.removeAttribute(fallback);
          }
        }
      };
      const placementAttribute = attributes?.placement;
      if (placementAttribute === '') {
        managerContainer.removeAttribute(DATA_POSITIONING_PLACEMENT);
      } else {
        managerContainer.setAttribute(placementAttribute ?? DATA_POSITIONING_PLACEMENT, placement);
        if (placementAttribute && placementAttribute !== DATA_POSITIONING_PLACEMENT) {
          managerContainer.removeAttribute(DATA_POSITIONING_PLACEMENT);
        }
      }
      syncBooleanAttribute(
        attributes?.intersecting,
        DATA_POSITIONING_INTERSECTING,
        managerContainer.hasAttribute(DATA_POSITIONING_INTERSECTING),
      );
      syncBooleanAttribute(
        attributes?.escaped,
        DATA_POSITIONING_ESCAPED,
        managerContainer.hasAttribute(DATA_POSITIONING_ESCAPED),
      );
      syncBooleanAttribute(
        attributes?.hidden,
        DATA_POSITIONING_HIDDEN,
        managerContainer.hasAttribute(DATA_POSITIONING_HIDDEN),
      );
      if (onPlacement) {
        const { position, alignment } = fromFloatingUIPlacement(placement);
        onPlacement(toPlacement(position, alignment));
      }
    };

    managerContainer.addEventListener(POSITIONING_END_EVENT, onPositioningEnd);
    return {
      updatePosition: manager.updatePosition,
      dispose: () => {
        managerContainer.removeEventListener(POSITIONING_END_EVENT, onPositioningEnd);
        manager.dispose();
      },
    };
  }

  let isDestroyed = false;
  const { container, target, arrow, disableUpdateOnResize = false, detectPlacement } = options;
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

    const positioningOptions = options.positioningOptions ?? options;
    const requested = toPlacement(positioningOptions.position, positioningOptions.align);
    const placement = detectPlacement(target, container);
    const resolved = placement ?? requested;
    const autoSize = normalizeAutoSize(positioningOptions.autoSize);
    const targetRect = rectOf(target.getBoundingClientRect());
    const boundsRect = getClippingRect(container, 'clippingAncestors');
    const bounds = { left: boundsRect.x, top: boundsRect.y, width: boundsRect.width, height: boundsRect.height };
    const [mainAxis] = resolveOffset(positioningOptions.offset);
    const isRtl = options.isRtl ?? targetWindow.getComputedStyle(container).direction === 'rtl';

    if (autoSize) {
      resetAutoSize(container, autoSize);
      applyAutoSize(container, autoSize, resolved, targetRect, bounds, isRtl, mainAxis);
    }

    const popup = rectOf(container.getBoundingClientRect());
    const visibility = isLayoutViewportUnavailable(container)
      ? { escaped: false, referenceHidden: false, intersecting: false }
      : getVisibility(container, target, targetRect, popup);

    if (placement) {
      applyArrow(arrow, placement, targetRect, popup, positioningOptions.arrowPadding);
      options.onPlacement?.(placement);
    }
    writeVisibilityUpdates({ container, visibility, attributes: options.attributes });

    if (placement) {
      container.dispatchEvent(
        new CustomEvent<OnPositioningEndEventDetail>(POSITIONING_END_EVENT, {
          detail: {
            placement: toPositioningPlacement(placement, isRtl),
            escaped: visibility.escaped,
            referenceHidden: visibility.referenceHidden,
          },
        }),
      );
    }
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
