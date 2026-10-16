import { detectOverflow } from './detectOverflow';
import type { DetectOverflowOptions } from './detectOverflow';
import { getOffsetParent, getDimensions } from './platform';
import { isElement } from './domUtils';
import type { Coords, Middleware, MiddlewareState, Padding, Placement, Rect, SideObject } from './types';
import {
  clamp,
  evaluate,
  getAlignment,
  getAlignmentAxis,
  getAlignmentSides,
  getAxisLength,
  getExpandedPlacements,
  getOppositeAxis,
  getOppositePlacement,
  getPaddingObject,
  getSide,
  getSideAxis,
  max,
  min,
  sides,
} from './utils';

type OffsetValue =
  | number
  | {
      /**
       * The axis that runs along the side of the floating element.
       * @default 0
       */
      mainAxis?: number;
      /**
       * The axis that runs along the alignment of the floating element.
       * @default 0
       */
      crossAxis?: number;
      /**
       * When set to a number, overrides the `crossAxis` value for aligned (non-centered/base) placements and works
       * logically. A positive number will move the floating element in the direction of the opposite edge to the one
       * that is aligned, while a negative number the reverse.
       * @default null
       */
      alignmentAxis?: number | null;
    };

export type OffsetOptions = OffsetValue | ((state: MiddlewareState) => OffsetValue);

/**
 * Modifies the placement by translating the floating element along the specified axes.
 */
export function offset(options: OffsetOptions = 0): Middleware {
  return {
    name: 'offset',
    fn(state) {
      const { x, y, placement, middlewareData, rtl } = state;

      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isVertical = getSideAxis(placement) === 'y';
      const mainAxisMulti = side === 'left' || side === 'top' ? -1 : 1;
      const crossAxisMulti = rtl && isVertical ? -1 : 1;
      const rawValue = evaluate(options, state);

      const normalizedValue =
        typeof rawValue === 'number'
          ? { mainAxis: rawValue, crossAxis: 0, alignmentAxis: null }
          : {
              mainAxis: rawValue.mainAxis || 0,
              crossAxis: rawValue.crossAxis || 0,
              alignmentAxis: rawValue.alignmentAxis,
            };
      const { mainAxis, alignmentAxis } = normalizedValue;
      let { crossAxis } = normalizedValue;

      if (alignment && typeof alignmentAxis === 'number') {
        crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
      }

      const diffCoords: Coords = isVertical
        ? { x: crossAxis * crossAxisMulti, y: mainAxis * mainAxisMulti }
        : { x: mainAxis * mainAxisMulti, y: crossAxis * crossAxisMulti };

      // If the placement is the same and the arrow caused an alignment offset then we don't need to change the
      // positioning coordinates.
      if (placement === middlewareData.offset?.placement && middlewareData.arrow?.alignmentOffset) {
        return {};
      }

      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: { ...diffCoords, placement },
      };
    },
  };
}

export interface FlipOptions extends DetectOverflowOptions {
  /**
   * Placements to try sequentially if the preferred `placement` does not fit. When omitted, the opposite side
   * and the opposite alignments are tried. If none fit, the placement with the least overflow is used.
   */
  fallbackPlacements?: Placement[];
}

/**
 * Changes the placement of the floating element to keep it in view, with the ability to flip to other placements.
 */
export function flip(options: FlipOptions = {}): Middleware {
  return {
    name: 'flip',
    fn(state) {
      const { placement, middlewareData, rects, initialPlacement, rtl } = state;
      const { fallbackPlacements: specifiedFallbackPlacements, ...detectOverflowOptions } = options;

      // The arrow is sending the floating element a signal, so we can't flip.
      if (middlewareData.arrow?.alignmentOffset) {
        return {};
      }

      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const fallbackPlacements =
        specifiedFallbackPlacements ||
        (isBasePlacement ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const placements = [initialPlacement, ...fallbackPlacements];

      const overflow = detectOverflow(state, detectOverflowOptions);
      const alignmentSides = getAlignmentSides(placement, rects, rtl);
      const overflows = [overflow[side], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const overflowsData = [...(middlewareData.flip?.overflows || []), { placement, overflows }];

      // One or more sides is overflowing.
      if (!overflows.every(overflowSide => overflowSide <= 0)) {
        const nextIndex = (middlewareData.flip?.index || 0) + 1;
        const nextPlacement = placements[nextIndex];

        if (nextPlacement) {
          return {
            data: { index: nextIndex, overflows: overflowsData },
            reset: { placement: nextPlacement },
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow, then find the placement that fits
        // the best on the main crossAxis side. Otherwise, pick the placement with the least overall overflow.
        const resetPlacement =
          overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]
            ?.placement ??
          overflowsData
            .map(d => [d.placement, d.overflows.filter(o => o > 0).reduce((acc, o) => acc + o, 0)] as const)
            .sort((a, b) => a[1] - b[1])[0]?.[0];

        if (placement !== resetPlacement) {
          return { reset: { placement: resetPlacement } };
        }
      }

      return {};
    },
  };
}

export interface ShiftOptions extends DetectOverflowOptions {
  /**
   * The axis that runs along the alignment of the floating element.
   * @default true
   */
  mainAxis?: boolean;
  /**
   * The axis that runs along the side of the floating element.
   * @default false
   */
  crossAxis?: boolean;
  /**
   * Accepts a function that limits the shifting done, in order to prevent detachment.
   */
  limiter?: (state: MiddlewareState) => Coords;
}

/**
 * Shifts the floating element in order to keep it in view when it will overflow a clipping boundary.
 */
export function shift(options: ShiftOptions = {}): Middleware {
  return {
    name: 'shift',
    fn(state) {
      const { x, y, placement } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = ({ x: limiterX, y: limiterY }: Coords) => ({ x: limiterX, y: limiterY }),
        ...detectOverflowOptions
      } = options;

      const coords = { x, y };
      const overflow = detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);

      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];

      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        mainAxisCoord = clamp(mainAxisCoord + overflow[minSide], mainAxisCoord, mainAxisCoord - overflow[maxSide]);
      }

      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        crossAxisCoord = clamp(crossAxisCoord + overflow[minSide], crossAxisCoord, crossAxisCoord - overflow[maxSide]);
      }

      const limitedCoords = limiter({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord,
      });

      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis,
          },
        },
      };
    },
  };
}

export interface LimitShiftOptions {
  /**
   * Whether to limit the alignment axis shifting.
   * @default true
   */
  mainAxis?: boolean;
  /**
   * Whether to limit the side axis shifting.
   * @default true
   */
  crossAxis?: boolean;
}

// Unlike `clamp`, prefers the lower limit when it exceeds the upper one
function limitCoord(limitMin: number, coord: number, limitMax: number): number {
  if (coord < limitMin) {
    return limitMin;
  }
  return coord > limitMax ? limitMax : coord;
}

/**
 * Built-in `limiter` that will stop `shift()` at a certain point, keeping the floating element attached to the
 * reference element.
 */
export function limitShift(options: LimitShiftOptions = {}): (state: MiddlewareState) => Coords {
  return state => {
    const { x, y, placement, rects, middlewareData } = state;
    const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = options;

    const coords = { x, y };
    const crossAxis = getSideAxis(placement);
    const mainAxis = getOppositeAxis(crossAxis);

    let mainAxisCoord = coords[mainAxis];
    let crossAxisCoord = coords[crossAxis];

    if (checkMainAxis) {
      const len = getAxisLength(mainAxis);
      const limitMin = rects.reference[mainAxis] - rects.floating[len];
      const limitMax = rects.reference[mainAxis] + rects.reference[len];

      mainAxisCoord = limitCoord(limitMin, mainAxisCoord, limitMax);
    }

    if (checkCrossAxis) {
      const len = mainAxis === 'y' ? 'width' : 'height';
      const isOriginSide = ['top', 'left'].includes(getSide(placement));
      const limitMin =
        rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? middlewareData.offset?.[crossAxis] || 0 : 0);
      const limitMax =
        rects.reference[crossAxis] +
        rects.reference[len] +
        (isOriginSide ? 0 : middlewareData.offset?.[crossAxis] || 0);

      crossAxisCoord = limitCoord(limitMin, crossAxisCoord, limitMax);
    }

    return { [mainAxis]: mainAxisCoord, [crossAxis]: crossAxisCoord } as unknown as Coords;
  };
}

export interface SizeOptions extends DetectOverflowOptions {
  /**
   * Function that is called to perform style mutations to the floating element to change its size.
   * When it changes the size of the floating element, the position is recomputed.
   */
  apply?(args: MiddlewareState & { availableWidth: number; availableHeight: number }): void;
}

/**
 * Provides data that allows you to change the size of the floating element, for instance to prevent it from
 * overflowing the clipping boundary or match the width of the reference element.
 */
export function size(options: SizeOptions = {}): Middleware {
  return {
    name: 'size',
    fn(state) {
      const { placement, rects, elements, rtl } = state;
      const { apply = () => undefined, ...detectOverflowOptions } = options;

      const overflow = detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === 'y';
      const { width, height } = rects.floating;

      let heightSide: 'top' | 'bottom';
      let widthSide: 'left' | 'right';

      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === (rtl ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }

      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;

      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);

      const noShift = !state.middlewareData.shift;

      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;

      if (state.middlewareData.shift?.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if (state.middlewareData.shift?.enabled.y) {
        availableHeight = maximumClippingHeight;
      }

      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);

        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }

      apply({ ...state, availableWidth, availableHeight });

      const nextDimensions = getDimensions(elements.floating);

      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return { reset: { rects: true } };
      }

      return {};
    },
  };
}

export interface ArrowOptions {
  /**
   * The arrow element to be positioned.
   */
  element: HTMLElement;
  /**
   * The padding between the arrow element and the floating element edges. Useful when the floating element has
   * rounded corners.
   * @default 0
   */
  padding?: Padding;
}

/**
 * Provides data to position an inner element of the floating element so that it appears centered to the reference
 * element.
 */
export function arrow(options: ArrowOptions): Middleware {
  return {
    name: 'arrow',
    fn(state) {
      const { x, y, placement, rects, elements, middlewareData } = state;
      const { element, padding = 0 } = options || {};

      if (!element) {
        return {};
      }

      const paddingObject = getPaddingObject(padding);
      const coords = { x, y };
      const axis = getAlignmentAxis(placement);
      const length = getAxisLength(axis);
      const arrowDimensions = getDimensions(element);
      const isYAxis = axis === 'y';
      const minProp = isYAxis ? 'top' : 'left';
      const maxProp = isYAxis ? 'bottom' : 'right';
      const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';

      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];

      const arrowOffsetParent = getOffsetParent(element);
      let clientSize = isElement(arrowOffsetParent) ? arrowOffsetParent[clientProp] : 0;

      // DOM platform can return `window` as the `offsetParent`.
      if (!clientSize) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }

      const centerToReference = endDiff / 2 - startDiff / 2;

      // If the padding is large enough that it causes the arrow to no longer be centered, modify the padding so that
      // it is centered.
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

      // Make sure the arrow doesn't overflow the floating element if the center point is outside the floating
      // element's bounds.
      const minOffset = minPadding;
      const maxOffset = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const arrowOffset = clamp(minOffset, center, maxOffset);

      // If the reference is small enough that the arrow's padding causes it to to point to nothing for an aligned
      // placement, adjust the offset of the floating element itself. To ensure `shift()` continues to take action,
      // a single reset is performed when this is true.
      const shouldAddOffset =
        !middlewareData.arrow &&
        getAlignment(placement) !== undefined &&
        center !== arrowOffset &&
        rects.reference[length] / 2 - (center < minOffset ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? (center < minOffset ? center - minOffset : center - maxOffset) : 0;

      return {
        [axis]: coords[axis] + alignmentOffset,
        data: {
          [axis]: arrowOffset,
          centerOffset: center - arrowOffset - alignmentOffset,
          ...(shouldAddOffset && { alignmentOffset }),
        },
        reset: shouldAddOffset,
      };
    },
  };
}

export interface HideOptions extends DetectOverflowOptions {
  /**
   * The strategy used to determine when to hide the floating element.
   * @default 'referenceHidden'
   */
  strategy?: 'referenceHidden' | 'escaped';
}

function getSideOffsets(overflow: SideObject, rect: Rect): SideObject {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width,
  };
}

function isAnySideFullyClipped(overflow: SideObject): boolean {
  return sides.some(side => overflow[side] >= 0);
}

/**
 * Provides data to hide the floating element in applicable situations, such as when it is not in the same clipping
 * context as the reference element.
 */
export function hide(options: HideOptions = {}): Middleware {
  return {
    name: 'hide',
    fn(state) {
      const { rects } = state;
      const { strategy = 'referenceHidden', ...detectOverflowOptions } = options;

      if (strategy === 'referenceHidden') {
        const overflow = detectOverflow(state, { ...detectOverflowOptions, elementContext: 'reference' });
        const offsets = getSideOffsets(overflow, rects.reference);

        return {
          data: {
            referenceHiddenOffsets: offsets,
            referenceHidden: isAnySideFullyClipped(offsets),
          },
        };
      }

      const overflow = detectOverflow(state, { ...detectOverflowOptions, altBoundary: true });
      const offsets = getSideOffsets(overflow, rects.floating);

      return {
        data: {
          escapedOffsets: offsets,
          escaped: isAnySideFullyClipped(offsets),
        },
      };
    },
  };
}
