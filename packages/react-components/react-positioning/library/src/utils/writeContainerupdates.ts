import type { PositioningPlacement } from '../types';
import {
  DATA_POSITIONING_ESCAPED,
  DATA_POSITIONING_HIDDEN,
  DATA_POSITIONING_INTERSECTING,
  DATA_POSITIONING_PLACEMENT,
} from '../constants';
import type { Visibility } from '../engine';

/**
 * Writes all container element position updates after the position is computed
 */
export function writeContainerUpdates(options: {
  container: HTMLElement | null;
  placement: PositioningPlacement;
  /**
   * Layer acceleration can disable subpixel rendering which causes slightly
   * blurry text on low PPI displays, so we want to use 2D transforms
   * instead
   */
  lowPPI: boolean;
  strategy: 'absolute' | 'fixed';
  /**
   * Coordinates relative to the containing block of the container
   */
  coordinates: { x: number; y: number };
  useTransform?: boolean;
  /** Name of the attribute for the placement, an empty string skips it */
  placementAttribute?: string;
}): void {
  const { container, placement, strategy, lowPPI, coordinates, useTransform = true, placementAttribute } = options;
  if (!container) {
    return;
  }
  if (placementAttribute !== '') {
    container.setAttribute(placementAttribute ?? DATA_POSITIONING_PLACEMENT, placement);
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

/**
 * Writes the attributes that tell if the container or the target are visible
 */
export function writeVisibilityUpdates(options: {
  container: HTMLElement;
  visibility: Visibility;
  /** Names of the attributes, an empty string skips an attribute */
  attributes?: Partial<Record<'hidden' | 'escaped' | 'intersecting', string>>;
}): void {
  const { container, visibility, attributes } = options;
  const toggle = (name: string | undefined, fallback: string, value: boolean) => {
    if (name !== '') {
      container.toggleAttribute(name ?? fallback, value);
    }
  };

  toggle(attributes?.intersecting, DATA_POSITIONING_INTERSECTING, visibility.intersecting);
  toggle(attributes?.escaped, DATA_POSITIONING_ESCAPED, visibility.escaped);
  toggle(attributes?.hidden, DATA_POSITIONING_HIDDEN, visibility.referenceHidden);
}
