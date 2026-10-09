import { getElementRects, isRTL } from './platform';
import type {
  ComputePositionConfig,
  ComputePositionReturn,
  Coords,
  ElementRects,
  Middleware,
  MiddlewareData,
  Placement,
  ReferenceElement,
} from './types';
import { getAlignment, getAlignmentAxis, getAxisLength, getSide, getSideAxis } from './utils';

function computeCoordsFromPlacement({ reference, floating }: ElementRects, placement: Placement, rtl: boolean): Coords {
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';

  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;

  let coords: Coords;
  switch (side) {
    case 'top':
      coords = { x: commonX, y: reference.y - floating.height };
      break;
    case 'bottom':
      coords = { x: commonX, y: reference.y + reference.height };
      break;
    case 'right':
      coords = { x: reference.x + reference.width, y: commonY };
      break;
    default:
      coords = { x: reference.x - floating.width, y: commonY };
  }

  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }

  return coords;
}

/**
 * Computes the coordinates of the `floating` element relative to the `reference`,
 * running every middleware in order. A middleware can restart the pipeline by returning `reset`.
 */
export function computePosition(
  reference: ReferenceElement,
  floating: HTMLElement,
  config: ComputePositionConfig = {},
): ComputePositionReturn {
  const { placement = 'bottom', strategy = 'absolute', middleware = [] } = config;

  const validMiddleware = middleware.filter(Boolean) as Middleware[];
  const rtl = isRTL(floating);
  const clippingCache = new Map<ReferenceElement, Element[]>();

  let rects = getElementRects(reference, floating, strategy);
  let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData: MiddlewareData = {};
  let resetCount = 0;

  for (let i = 0; i < validMiddleware.length; i++) {
    const { name, fn } = validMiddleware[i];

    const {
      x: nextX,
      y: nextY,
      data,
      reset,
    } = fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      rtl,
      clippingCache,
      elements: { reference, floating },
    });

    x = nextX ?? x;
    y = nextY ?? y;

    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data,
      },
    };

    if (reset && resetCount <= 50) {
      resetCount++;

      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }

        if (reset.rects) {
          rects = reset.rects === true ? getElementRects(reference, floating, strategy) : reset.rects;
        }

        ({ x, y } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }

      i = -1;
    }
  }

  return { x, y, placement: statefulPlacement, strategy, middlewareData };
}
