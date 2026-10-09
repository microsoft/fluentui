import { arrow as arrowMiddleware, hide as hideMiddleware } from '../floating';
import {
  coverTarget as coverTargetMiddleware,
  flip as flipMiddleware,
  intersecting as intersectingMiddleware,
  matchTargetSize as matchTargetSizeMiddleware,
  maxSize as maxSizeMiddleware,
  offset as offsetMiddleware,
  resetMaxSize as resetMaxSizeMiddleware,
  shift as shiftMiddleware,
} from '../middleware';
import { hasScrollParent, normalizeAutoSize } from '../utils';
import type { PositioningPlugin } from './types';

/**
 * Slots used by the built-in plugins, ordering matters when custom plugins are mixed in.
 *
 * Built-in plugins use the literal values, as they can't be inlined by minifiers (verified by tests).
 */
export const POSITIONING_PLUGIN_ORDER = {
  resetAutoSize: 100,
  matchTargetSize: 200,
  offset: 300,
  coverTarget: 400,
  flip: 500,
  shift: 600,
  autoSize: 700,
  intersecting: 800,
  arrow: 900,
  hide: 1000,
} as const;

/**
 * Handles the `offset` option.
 */
export const offsetPlugin: PositioningPlugin = ({ options: { offset } }) =>
  !!offset && { order: 300, middleware: offsetMiddleware(offset) };

/**
 * Handles the `coverTarget` option.
 */
export const coverTargetPlugin: PositioningPlugin = ({ options: { coverTarget } }) =>
  !!coverTarget && { order: 400, middleware: coverTargetMiddleware() };

/**
 * Handles the `matchTargetSize` option.
 */
export const matchTargetSizePlugin: PositioningPlugin = ({ options: { matchTargetSize } }) =>
  !!matchTargetSize && { order: 200, middleware: matchTargetSizeMiddleware() };

/**
 * Handles the `pinned`, `fallbackPositions` and `flipBoundary` options.
 */
export const flipPlugin: PositioningPlugin = ({
  container,
  isRtl,
  options: { pinned, flipBoundary, fallbackPositions },
}) =>
  !pinned && {
    order: 500,
    middleware: flipMiddleware({
      container,
      flipBoundary,
      hasScrollableElement: hasScrollParent(container),
      isRtl,
      fallbackPositions,
    }),
  };

/**
 * Handles the `overflowBoundary`, `overflowBoundaryPadding`, `shiftToCoverTarget` and `unstable_disableTether` options.
 */
export const shiftPlugin: PositioningPlugin = ({
  container,
  isRtl,
  options: {
    overflowBoundary,
    overflowBoundaryPadding,
    shiftToCoverTarget,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_disableTether,
  },
}) => ({
  order: 600,
  middleware: shiftMiddleware({
    container,
    hasScrollableElement: hasScrollParent(container),
    overflowBoundary,
    disableTether: unstable_disableTether,
    overflowBoundaryPadding,
    isRtl,
    shiftToCoverTarget,
  }),
});

/**
 * Handles the `autoSize` option.
 */
export const autoSizePlugin: PositioningPlugin = ({
  container,
  isRtl,
  options: { autoSize, overflowBoundary, overflowBoundaryPadding },
}) => {
  const normalizedAutoSize = normalizeAutoSize(autoSize);

  return (
    !!normalizedAutoSize && [
      { order: 100, middleware: resetMaxSizeMiddleware(normalizedAutoSize) },
      {
        order: 700,
        middleware: maxSizeMiddleware(normalizedAutoSize, {
          container,
          overflowBoundary,
          overflowBoundaryPadding,
          isRtl,
        }),
      },
    ]
  );
};

/**
 * Sets the `data-positioning-intersecting` attribute.
 */
export const intersectingPlugin: PositioningPlugin = () => ({
  order: 800,
  middleware: intersectingMiddleware(),
});

/**
 * Handles the `arrowPadding` option and positions the arrow element.
 */
export const arrowPlugin: PositioningPlugin = ({ arrow, options: { arrowPadding } }) =>
  !!arrow && { order: 900, middleware: arrowMiddleware({ element: arrow, padding: arrowPadding }) };

/**
 * Sets the `data-positioning-hidden` and `data-positioning-escaped` attributes.
 */
export const hidePlugin: PositioningPlugin = () => [
  { order: 1000, middleware: hideMiddleware({ strategy: 'referenceHidden' }) },
  { order: 1000, middleware: hideMiddleware({ strategy: 'escaped' }) },
];

/**
 * Every built-in plugin, this is what `usePositioning()` uses.
 */
export const defaultPositioningPlugins: readonly PositioningPlugin[] = [
  autoSizePlugin,
  matchTargetSizePlugin,
  offsetPlugin,
  coverTargetPlugin,
  flipPlugin,
  shiftPlugin,
  intersectingPlugin,
  arrowPlugin,
  hidePlugin,
];
