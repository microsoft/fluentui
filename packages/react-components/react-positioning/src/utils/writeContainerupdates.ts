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
}) {
  const {
    container,
    placement,
    middlewareData,
    strategy,
    lowPPI,
    coordinates: { x, y },
  } = options;
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

  // decmial translate values can cause blurriness
  const floorX = Math.floor(x);
  const floorY = Math.floor(y);
  Object.assign(container.style, {
    transform: lowPPI ? `translate(${floorX}px, ${floorY}px)` : `translate3d(${floorX}px, ${floorY}px, 0)`,
    position: strategy,
  });
}
