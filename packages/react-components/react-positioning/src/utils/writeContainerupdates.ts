import type { Placement, MiddlewareData, Strategy, Coords } from '@floating-ui/dom';
import {
  DATA_POSITIONING_ESCAPED,
  DATA_POSITIONING_HIDDEN,
  DATA_POSITIONING_INTERSECTING,
  DATA_POSITIONING_PLACEMENT,
} from '../constants';

/**
 * Writes all container element position updates after the position is computed
 */
export function writeContainerUpdates(options: {
  container: HTMLElement | null;
  placement: Placement;
  middlewareData: MiddlewareData;
  /**
   * Layer acceleration can disable subpixel rendering which causes slightly
   * blurry text on low PPI displays, so we want to use 2D transforms
   * instead
   */
  lowPPI: boolean;
  strategy: Strategy;
  coordinates: Coords;
  useTransform?: boolean;
}) {
  const { container, placement, middlewareData, strategy, lowPPI, coordinates, useTransform = true } = options;
  if (!container) {
    return;
  }
  container.setAttribute(DATA_POSITIONING_PLACEMENT, placement);
  container.removeAttribute(DATA_POSITIONING_INTERSECTING);
  if (middlewareData.intersectionObserver.intersecting) {
    container.setAttribute(DATA_POSITIONING_INTERSECTING, '');
  }

  container.removeAttribute(DATA_POSITIONING_ESCAPED);
  if (middlewareData.hide?.escaped) {
    container.setAttribute(DATA_POSITIONING_ESCAPED, '');
  }

  container.removeAttribute(DATA_POSITIONING_HIDDEN);
  if (middlewareData.hide?.referenceHidden) {
    container.setAttribute(DATA_POSITIONING_HIDDEN, '');
  }

  // Round so that the coordinates land on device pixels.
  // This prevents blurriness in cases where the browser doesn't apply pixel snapping, such as when other effects like
  // `backdrop-filter: blur()` are applied to the container, and the browser is zoomed in.
  // See https://github.com/microsoft/fluentui/issues/26764 for more info.
  const devicePixelRatio = container.ownerDocument.defaultView?.devicePixelRatio || 1;
  const x = Math.round(coordinates.x * devicePixelRatio) / devicePixelRatio;
  const y = Math.round(coordinates.y * devicePixelRatio) / devicePixelRatio;

  Object.assign(container.style, {
    position: strategy,
  });

  if (useTransform) {
    Object.assign(container.style, {
      transform: lowPPI ? `translate(${x}px, ${y}px)` : `translate3d(${x}px, ${y}px, 0)`,
    });
    return;
  }

  Object.assign(container.style, {
    left: `${x}px`,
    top: `${y}px`,
  });
}
