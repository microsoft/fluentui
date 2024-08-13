import { DirectionalHint } from '../../common/DirectionalHint';
import { getScrollbarWidth, getRTL, getWindow } from '../../Utilities';
import { RectangleEdge } from './positioning.types';
import { Rectangle } from '../../Utilities';
import type { IRectangle, Point } from '../../Utilities';
import type {
  IPositionDirectionalHintData,
  IPositionedData,
  ICalloutPositionedInfo,
  ICalloutBeakPositionedInfo,
  IPositionProps,
  ICalloutPositionProps,
  IWindowWithSegments,
} from './positioning.types';

function _createPositionData(
  targetEdge: RectangleEdge,
  alignmentEdge?: RectangleEdge,
  isAuto?: boolean,
): IPositionDirectionalHintData {
  return {
    targetEdge,
    alignmentEdge,
    isAuto,
  };
}

// Currently the beakPercent is set to 50 for all positions meaning that it should tend to the center of the target
const DirectionalDictionary: { [key: number]: IPositionDirectionalHintData } = {
  [DirectionalHint.topLeftEdge]: _createPositionData(RectangleEdge.top, RectangleEdge.left),
  [DirectionalHint.topCenter]: _createPositionData(RectangleEdge.top),
  [DirectionalHint.topRightEdge]: _createPositionData(RectangleEdge.top, RectangleEdge.right),
  [DirectionalHint.topAutoEdge]: _createPositionData(RectangleEdge.top, undefined, true),
  [DirectionalHint.bottomLeftEdge]: _createPositionData(RectangleEdge.bottom, RectangleEdge.left),
  [DirectionalHint.bottomCenter]: _createPositionData(RectangleEdge.bottom),
  [DirectionalHint.bottomRightEdge]: _createPositionData(RectangleEdge.bottom, RectangleEdge.right),
  [DirectionalHint.bottomAutoEdge]: _createPositionData(RectangleEdge.bottom, undefined, true),
  [DirectionalHint.leftTopEdge]: _createPositionData(RectangleEdge.left, RectangleEdge.top),
  [DirectionalHint.leftCenter]: _createPositionData(RectangleEdge.left),
  [DirectionalHint.leftBottomEdge]: _createPositionData(RectangleEdge.left, RectangleEdge.bottom),
  [DirectionalHint.rightTopEdge]: _createPositionData(RectangleEdge.right, RectangleEdge.top),
  [DirectionalHint.rightCenter]: _createPositionData(RectangleEdge.right),
  [DirectionalHint.rightBottomEdge]: _createPositionData(RectangleEdge.right, RectangleEdge.bottom),
};

/**
 * Do not call methods from this directly, use either positionCallout or positionElement or make another function that
 * utilizes them.
 * START Private functions and interfaces
 */

export interface IElementPosition {
  elementRectangle: Rectangle;
  targetEdge: RectangleEdge;
  alignmentEdge: RectangleEdge | undefined;
  forcedInBounds?: boolean;
}

export interface IElementPositionInfo extends IElementPosition {
  targetRectangle: Rectangle;
}

type PartialIRectangle = Partial<IRectangle>;

interface IPartialIRectangle extends PartialIRectangle {
  [key: string]: number | undefined;
}

function _isRectangleWithinBounds(rect: Rectangle, boundingRect: Rectangle): boolean {
  if (rect.top < boundingRect.top) {
    return false;
  }
  if (rect.bottom > boundingRect.bottom) {
    return false;
  }
  if (rect.left < boundingRect.left) {
    return false;
  }
  if (rect.right > boundingRect.right) {
    return false;
  }

  return true;
}

/**
 * Gets all of the edges of a rectangle that are outside of the given bounds.
 * If there are no out of bounds edges it returns an empty array.
 */
function _getOutOfBoundsEdges(rect: Rectangle, boundingRect: Rectangle): RectangleEdge[] {
  const outOfBounds: RectangleEdge[] = [];

  if (rect.top < boundingRect.top) {
    outOfBounds.push(RectangleEdge.top);
  }
  if (rect.bottom > boundingRect.bottom) {
    outOfBounds.push(RectangleEdge.bottom);
  }
  if (rect.left < boundingRect.left) {
    outOfBounds.push(RectangleEdge.left);
  }
  if (rect.right > boundingRect.right) {
    outOfBounds.push(RectangleEdge.right);
  }

  return outOfBounds;
}

function _getEdgeValue(rect: Rectangle, edge: RectangleEdge): number {
  return (rect as any)[RectangleEdge[edge]] as number;
}

function _setEdgeValue(rect: Rectangle, edge: RectangleEdge, value: number) {
  (rect as any)[RectangleEdge[edge]] = value;
  return rect;
}

/**
 * Returns the middle value of an edge. Only returns 1 value rather than xy coordinates as
 * the itself already contains the other coordinate.
 * For instance, a bottom edge's current value is it's y coordinate, so the number returned is the x.
 */
function _getCenterValue(rect: Rectangle, edge: RectangleEdge): number {
  const edges = _getFlankingEdges(edge);
  return (_getEdgeValue(rect, edges.positiveEdge) + _getEdgeValue(rect, edges.negativeEdge)) / 2;
}

/**
 * Flips the value depending on the edge.
 * If the edge is a "positive" edge, Top or Left, then the value should stay as it is.
 * If the edge is a "negative" edge, Bottom or Right, then the value should be flipped.
 * This is to account for the fact that the coordinates are effectively reserved in certain cases for the
 * "negative" edges.
 *
 * For example, when testing to see if a bottom edge 1 is within the bounds of another bottom edge 2:
 * If edge 1 is greater than edge 2 then it is out of bounds. This is reversed for top edge 1 and top edge 2.
 * If top edge 1 is less than edge 2 then it is out of bounds.
 */
function _getRelativeEdgeValue(edge: RectangleEdge, value: number): number {
  if (edge > 0) {
    return value;
  } else {
    return value * -1;
  }
}

function _getRelativeRectEdgeValue(edge: RectangleEdge, rect: Rectangle): number {
  return _getRelativeEdgeValue(edge, _getEdgeValue(rect, edge));
}

function _getRelativeEdgeDifference(rect: Rectangle, hostRect: Rectangle, edge: RectangleEdge): number {
  const edgeDifference = _getEdgeValue(rect, edge) - _getEdgeValue(hostRect, edge);
  return _getRelativeEdgeValue(edge, edgeDifference);
}

/**
 * Moves the edge of a rectangle to the value given. It only moves the edge in a linear direction based on that edge.
 * For example, if it's a bottom edge it will only change y coordinates.
 * if maintainSize is set to false, it will only adjust the specified edge value
 */
function _moveEdge(rect: Rectangle, edge: RectangleEdge, newValue: number, maintainSize = true): Rectangle {
  const difference = _getEdgeValue(rect, edge) - newValue;
  let returnRect = _setEdgeValue(rect, edge, newValue);
  if (maintainSize) {
    returnRect = _setEdgeValue(rect, edge * -1, _getEdgeValue(rect, edge * -1) - difference);
  }
  return returnRect;
}

/**
 * Aligns the edge on the passed in rect to the target. If there is a gap then it will have that space between the two.
 */
function _alignEdges(rect: Rectangle, target: Rectangle, edge: RectangleEdge, gap: number = 0): Rectangle {
  return _moveEdge(rect, edge, _getEdgeValue(target, edge) + _getRelativeEdgeValue(edge, gap));
}

/**
 * Aligns the targetEdge on the passed in target to the rects corresponding opposite edge.
 * For instance if targetEdge is bottom, then the rects top will be moved to match it.
 */
function _alignOppositeEdges(
  rect: Rectangle,
  target: Rectangle,
  targetEdge: RectangleEdge,
  gap: number = 0,
): Rectangle {
  const oppositeEdge = targetEdge * -1;
  const adjustedGap = _getRelativeEdgeValue(oppositeEdge, gap);
  return _moveEdge(rect, targetEdge * -1, _getEdgeValue(target, targetEdge) + adjustedGap);
}

/**
 * Tests to see if the given edge is within the bounds of the given rectangle.
 */
function _isEdgeInBounds(rect: Rectangle, bounds: Rectangle, edge: RectangleEdge): boolean {
  const adjustedRectValue = _getRelativeRectEdgeValue(edge, rect);
  return adjustedRectValue > _getRelativeRectEdgeValue(edge, bounds);
}

/**
 * Returns a measure of how much a rectangle is out of bounds for a given alignment;
 * this can be used to compare which rectangle is more or less out of bounds.
 * A value of 0 means the rectangle is entirely in bounds
 */
function _getOutOfBoundsDegree(rect: Rectangle, bounds: Rectangle) {
  const breakingEdges = _getOutOfBoundsEdges(rect, bounds);
  let total = 0;
  for (const edge of breakingEdges) {
    total += _getRelativeEdgeDifference(rect, bounds, edge) ** 2;
  }

  return total;
}

/**
 * Returns true if scroll-resizing will move the target edge within the bounding rectangle,
 * and there is room between the target edge and the bounding edge for scrolled content.
 * Returns false otherwise.
 */
function _canScrollResizeToFitEdge(
  target: Rectangle,
  bounding: Rectangle,
  targetEdge: RectangleEdge,
  minimumScrollResizeHeight = 200,
) {
  // Only scroll vertically to fit - cannot scroll to fit right or left edges
  if (targetEdge !== RectangleEdge.bottom && targetEdge !== RectangleEdge.top) {
    return false;
  }

  return _getRelativeEdgeDifference(target, bounding, targetEdge) >= minimumScrollResizeHeight;
}

/**
 * Attempts to move the rectangle through various sides of the target to find a place to fit.
 * If no fit is found, the least bad option should be returned.
 */
function _flipToFit(
  rect: Rectangle,
  target: Rectangle,
  bounding: Rectangle,
  positionData: IPositionDirectionalHintData,
  shouldScroll = false,
  minimumScrollResizeHeight?: number,
  gap: number = 0,
): IElementPosition {
  const directions: RectangleEdge[] = [
    RectangleEdge.left,
    RectangleEdge.right,
    RectangleEdge.bottom,
    RectangleEdge.top,
  ];
  // In RTL page, RectangleEdge.right has a higher priority than RectangleEdge.left, so the order should be updated.
  if (getRTL()) {
    directions[0] *= -1;
    directions[1] *= -1;
  }
  let currentEstimate = rect;
  let currentEdge = positionData.targetEdge;
  let currentAlignment = positionData.alignmentEdge;

  // keep track of least bad option, in case no sides fit
  let oobDegree;
  let bestEdge = currentEdge;
  let bestAlignment = currentAlignment;

  // Keep switching sides until one is found with enough space.
  // If all sides don't fit then return the unmodified element.
  for (let i = 0; i < 4; i++) {
    if (_isEdgeInBounds(currentEstimate, bounding, currentEdge)) {
      // Edge is in bounds, return current estimate
      return {
        elementRectangle: currentEstimate,
        targetEdge: currentEdge,
        alignmentEdge: currentAlignment,
      };
    } else if (shouldScroll && _canScrollResizeToFitEdge(target, bounding, currentEdge, minimumScrollResizeHeight)) {
      // Scrolling will allow edge to fit, move the estimate currentEdge inside the bounds and return
      switch (currentEdge) {
        case RectangleEdge.bottom:
          currentEstimate.bottom = bounding.bottom;
          break;
        case RectangleEdge.top:
          currentEstimate.top = bounding.top;
          break;
      }

      return {
        elementRectangle: currentEstimate,
        targetEdge: currentEdge,
        alignmentEdge: currentAlignment,
        forcedInBounds: true,
      };
    } else {
      // update least-bad edges
      const currentOOBDegree = _getOutOfBoundsDegree(currentEstimate, bounding);
      if (!oobDegree || currentOOBDegree < oobDegree) {
        oobDegree = currentOOBDegree;
        bestEdge = currentEdge;
        bestAlignment = currentAlignment;
      }

      directions.splice(directions.indexOf(currentEdge), 1);
      if (directions.length > 0) {
        if (directions.indexOf(currentEdge * -1) > -1) {
          currentEdge = currentEdge * -1;
        } else {
          currentAlignment = currentEdge;
          currentEdge = directions.slice(-1)[0];
        }
        currentEstimate = _estimatePosition(
          rect,
          target,
          { targetEdge: currentEdge, alignmentEdge: currentAlignment },
          gap,
        );
      }
    }
  }

  // nothing fits, use least-bad option
  currentEstimate = _estimatePosition(rect, target, { targetEdge: bestEdge, alignmentEdge: bestAlignment }, gap);
  return {
    elementRectangle: currentEstimate,
    targetEdge: bestEdge,
    alignmentEdge: bestAlignment,
  };
}

/**
 * Flips only the alignment edge of an element rectangle. This is used instead of nudging the alignment edges
 * into position, when `alignTargetEdge` is specified.
 */
function _flipAlignmentEdge(
  elementEstimate: IElementPosition,
  target: Rectangle,
  gap: number,
  coverTarget?: boolean,
): IElementPosition {
  const { alignmentEdge, targetEdge, elementRectangle } = elementEstimate;
  const oppositeEdge = alignmentEdge! * -1;
  const newEstimate = _estimatePosition(
    elementRectangle,
    target,
    { targetEdge, alignmentEdge: oppositeEdge },
    gap,
    coverTarget,
  );

  return {
    elementRectangle: newEstimate,
    targetEdge,
    alignmentEdge: oppositeEdge,
  };
}

/**
 * Adjusts a element rectangle to fit within the bounds given. If directionalHintFixed or covertarget is passed in
 * then the element will not flip sides on the target. They will, however, be nudged to fit within the bounds given.
 */
function _adjustFitWithinBounds(
  element: Rectangle,
  target: Rectangle,
  bounding: Rectangle,
  positionData: IPositionDirectionalHintData,
  shouldScroll = false,
  minimumScrollResizeHeight?: number,
  gap: number = 0,
  directionalHintFixed?: boolean,
  coverTarget?: boolean,
): IElementPosition {
  const { alignmentEdge, alignTargetEdge } = positionData;
  let elementEstimate: IElementPosition = {
    elementRectangle: element,
    targetEdge: positionData.targetEdge,
    alignmentEdge,
  };

  if (!directionalHintFixed && !coverTarget) {
    elementEstimate = _flipToFit(element, target, bounding, positionData, shouldScroll, minimumScrollResizeHeight, gap);
  }
  const outOfBounds = _getOutOfBoundsEdges(elementEstimate.elementRectangle, bounding);
  // if directionalHintFixed is specified, we need to force the target edge to not change
  // we need *-1 because targetEdge refers to the target's edge; the callout edge is the opposite
  const fixedEdge = directionalHintFixed ? -elementEstimate.targetEdge : undefined;

  if (outOfBounds.length > 0) {
    if (alignTargetEdge) {
      // The edge opposite to the alignment edge might be out of bounds.
      // Flip alignment to see if we can get it within bounds.
      if (elementEstimate.alignmentEdge && outOfBounds.indexOf(elementEstimate.alignmentEdge * -1) > -1) {
        const flippedElementEstimate = _flipAlignmentEdge(elementEstimate, target, gap, coverTarget);
        if (_isRectangleWithinBounds(flippedElementEstimate.elementRectangle, bounding)) {
          return flippedElementEstimate;
        } else {
          // If the flipped elements edges are still out of bounds, try nudging it.
          elementEstimate = _alignOutOfBoundsEdges(
            _getOutOfBoundsEdges(flippedElementEstimate.elementRectangle, bounding),
            elementEstimate,
            bounding,
            fixedEdge,
          );
        }
      } else {
        elementEstimate = _alignOutOfBoundsEdges(outOfBounds, elementEstimate, bounding, fixedEdge);
      }
    } else {
      elementEstimate = _alignOutOfBoundsEdges(outOfBounds, elementEstimate, bounding, fixedEdge);
    }
  }

  return elementEstimate;
}

/**
 * Iterates through a list of out of bounds edges and tries to nudge and align them.
 * @param outOfBoundsEdges - Array of edges that are out of bounds
 * @param elementEstimate - The current element positioning estimate
 * @param bounding - The current bounds
 * @param preserveEdge - Specify an edge that should not be modified
 */
function _alignOutOfBoundsEdges(
  outOfBoundsEdges: RectangleEdge[],
  elementEstimate: IElementPosition,
  bounding: Rectangle,
  preserveEdge?: RectangleEdge,
) {
  for (const direction of outOfBoundsEdges) {
    let edgeAttempt;

    // if preserveEdge is specified, do not call _alignEdges, skip directly to _moveEdge
    // this is because _alignEdges will move the opposite edge
    if (preserveEdge && preserveEdge === direction * -1) {
      edgeAttempt = _moveEdge(elementEstimate.elementRectangle, direction, _getEdgeValue(bounding, direction), false);
      elementEstimate.forcedInBounds = true;
    } else {
      edgeAttempt = _alignEdges(elementEstimate.elementRectangle, bounding, direction);
      const inBounds = _isEdgeInBounds(edgeAttempt, bounding, direction * -1);
      // only update estimate if the attempt didn't break out of the opposite bounding edge
      if (!inBounds) {
        edgeAttempt = _moveEdge(edgeAttempt, direction * -1, _getEdgeValue(bounding, direction * -1), false);
        elementEstimate.forcedInBounds = true;
      }
    }

    elementEstimate.elementRectangle = edgeAttempt;
  }

  return elementEstimate;
}

/**
 * Moves the middle point on an edge to the point given.
 * Only moves in one direction. For instance if a bottom edge is passed in, then
 * the bottom edge will be moved in the x axis to match the point.
 */
function _centerEdgeToPoint(rect: Rectangle, edge: RectangleEdge, point: number): Rectangle {
  const { positiveEdge } = _getFlankingEdges(edge);
  const elementMiddle = _getCenterValue(rect, edge);
  const distanceToMiddle = elementMiddle - _getEdgeValue(rect, positiveEdge);
  return _moveEdge(rect, positiveEdge, point - distanceToMiddle);
}

/**
 * Moves the element rectangle to be appropriately positioned relative to a given target.
 * Does not flip or adjust the element.
 */
function _estimatePosition(
  elementToPosition: Rectangle,
  target: Rectangle,
  positionData: IPositionDirectionalHintData,
  gap: number = 0,
  coverTarget?: boolean,
): Rectangle {
  let estimatedElementPosition = new Rectangle(
    elementToPosition.left,
    elementToPosition.right,
    elementToPosition.top,
    elementToPosition.bottom,
  );
  const { alignmentEdge, targetEdge } = positionData;
  const elementEdge = coverTarget ? targetEdge : targetEdge * -1;
  estimatedElementPosition = coverTarget
    ? _alignEdges(estimatedElementPosition, target, targetEdge, gap)
    : _alignOppositeEdges(estimatedElementPosition, target, targetEdge, gap);
  // if no alignment edge is provided it's supposed to be centered.
  if (!alignmentEdge) {
    const targetMiddlePoint = _getCenterValue(target, targetEdge);
    estimatedElementPosition = _centerEdgeToPoint(estimatedElementPosition, elementEdge, targetMiddlePoint);
  } else {
    estimatedElementPosition = _alignEdges(estimatedElementPosition, target, alignmentEdge);
  }

  return estimatedElementPosition;
}

/**
 * Returns the non-opposite edges of the target edge.
 * For instance if bottom is passed in then left and right will be returned.
 */
function _getFlankingEdges(edge: RectangleEdge): { positiveEdge: RectangleEdge; negativeEdge: RectangleEdge } {
  if (edge === RectangleEdge.top || edge === RectangleEdge.bottom) {
    return {
      positiveEdge: RectangleEdge.left,
      negativeEdge: RectangleEdge.right,
    };
  } else {
    return {
      positiveEdge: RectangleEdge.top,
      negativeEdge: RectangleEdge.bottom,
    };
  }
}

/**
 * Retrieve the final value for the return edge of `elementRectangle`. If the `elementRectangle` is closer to one side
 * of the bounds versus the other, the return edge is flipped to grow inward.
 */
function _finalizeReturnEdge(
  elementRectangle: Rectangle,
  returnEdge: RectangleEdge,
  bounds?: Rectangle,
): RectangleEdge {
  if (
    bounds &&
    Math.abs(_getRelativeEdgeDifference(elementRectangle, bounds, returnEdge)) >
      Math.abs(_getRelativeEdgeDifference(elementRectangle, bounds, returnEdge * -1))
  ) {
    return returnEdge * -1;
  }

  return returnEdge;
}

/**
 * Whether or not the considered edge of the elementRectangle is lying on the edge of the bounds
 * @param elementRectangle The rectangle whose edge we are considering
 * @param bounds The rectangle marking the bounds
 * @param edge The target edge we're considering
 * @returns If the target edge of the elementRectangle is in the same location as that edge of the bounds
 */
function _isEdgeOnBounds(elementRectangle: Rectangle, edge: RectangleEdge, bounds?: Rectangle): boolean {
  return bounds !== undefined && _getEdgeValue(elementRectangle, edge) === _getEdgeValue(bounds, edge);
}

/**
 * Finalizes the element position based on the hostElement. Only returns the
 * rectangle values to position such that they are anchored to the target.
 * This helps prevent resizing from looking very strange.
 * For instance, if the target edge is top and aligned with the left side then
 * the bottom and left values are returned so as the Callout shrinks it shrinks towards that corner.
 */
function _finalizeElementPosition(
  elementRectangle: Rectangle,
  hostElement: HTMLElement,
  targetEdge: RectangleEdge,
  bounds?: Rectangle,
  alignmentEdge?: RectangleEdge,
  coverTarget?: boolean,
  doNotFinalizeReturnEdge?: boolean,
  forceWithinBounds?: boolean,
): IPartialIRectangle {
  const returnValue: IPartialIRectangle = {};

  const hostRect: Rectangle = _getRectangleFromElement(hostElement);
  const elementEdge = coverTarget ? targetEdge : targetEdge * -1;
  let returnEdge = alignmentEdge ? alignmentEdge : _getFlankingEdges(targetEdge).positiveEdge;

  // If we are finalizing the return edge, choose the edge such that we grow away from the bounds
  // If we are not finalizing the return edge but the opposite edge is flush against the bounds,
  // choose that as the anchor edge so the element rect can grow away from the bounds' edge
  // In this case there will not be a visual difference because there is no more room for the elementRectangle to grow
  // in the usual direction
  if (!doNotFinalizeReturnEdge || _isEdgeOnBounds(elementRectangle, getOppositeEdge(returnEdge), bounds)) {
    returnEdge = _finalizeReturnEdge(elementRectangle, returnEdge, bounds);
  }

  returnValue[RectangleEdge[elementEdge]] = _getRelativeEdgeDifference(elementRectangle, hostRect, elementEdge);
  returnValue[RectangleEdge[returnEdge]] = _getRelativeEdgeDifference(elementRectangle, hostRect, returnEdge);

  // if the positioned element will still overflow, return all four edges with in-bounds values
  if (forceWithinBounds) {
    returnValue[RectangleEdge[elementEdge * -1]] = _getRelativeEdgeDifference(
      elementRectangle,
      hostRect,
      elementEdge * -1,
    );
    returnValue[RectangleEdge[returnEdge * -1]] = _getRelativeEdgeDifference(
      elementRectangle,
      hostRect,
      returnEdge * -1,
    );
  }

  return returnValue;
}

// Since the beak is rotated 45 degrees the actual height/width is the length of the diagonal.
// We still want to position the beak based on it's midpoint which does not change. It will
// be at (beakwidth / 2, beakwidth / 2)
function _calculateActualBeakWidthInPixels(beakWidth: number): number {
  return Math.sqrt(beakWidth * beakWidth * 2);
}

/**
 * Returns the appropriate IPositionData based on the props altered for RTL.
 * If directionalHintForRTL is passed in that is used if the page is RTL.
 * If directionalHint is specified, no directionalHintForRTL is available, and the page is RTL, the hint will be
 * flipped (e.g. bottomLeftEdge would become bottomRightEdge).
 *
 * If there is no directionalHint passed in, bottomAutoEdge is chosen automatically.
 */
function _getPositionData(
  directionalHint: DirectionalHint = DirectionalHint.bottomAutoEdge,
  directionalHintForRTL?: DirectionalHint,
  previousPositions?: IPositionDirectionalHintData,
): IPositionDirectionalHintData {
  if (previousPositions) {
    return {
      alignmentEdge: previousPositions.alignmentEdge,
      isAuto: previousPositions.isAuto,
      targetEdge: previousPositions.targetEdge,
    };
  }
  const positionInformation: IPositionDirectionalHintData = { ...DirectionalDictionary[directionalHint] };
  if (getRTL()) {
    // If alignment edge exists and that alignment edge is -2 or 2, right or left, then flip it.
    if (positionInformation.alignmentEdge && positionInformation.alignmentEdge % 2 === 0) {
      positionInformation.alignmentEdge = positionInformation.alignmentEdge * -1;
    }

    return directionalHintForRTL !== undefined ? DirectionalDictionary[directionalHintForRTL] : positionInformation;
  }
  return positionInformation;
}

/**
 * Gets the alignment data for the given information. This only really matters if the positioning is Auto.
 * If it is auto then the alignmentEdge should be chosen based on the target edge's position relative to
 * the center of the page.
 */
function _getAlignmentData(
  positionData: IPositionDirectionalHintData,
  target: Rectangle,
  boundingRect: Rectangle,
  coverTarget?: boolean,
  alignTargetEdge?: boolean,
): IPositionDirectionalHintData {
  if (positionData.isAuto) {
    positionData.alignmentEdge = getClosestEdge(positionData.targetEdge, target, boundingRect);
  }

  positionData.alignTargetEdge = alignTargetEdge;
  return positionData;
}

function getClosestEdge(targetEdge: RectangleEdge, target: Rectangle, boundingRect: Rectangle): RectangleEdge {
  const targetCenter: number = _getCenterValue(target, targetEdge);
  const boundingCenter: number = _getCenterValue(boundingRect, targetEdge);
  const { positiveEdge, negativeEdge } = _getFlankingEdges(targetEdge);
  if (targetCenter <= boundingCenter) {
    return positiveEdge;
  } else {
    return negativeEdge;
  }
}

function _positionElementWithinBounds(
  elementToPosition: Rectangle,
  target: Rectangle,
  bounding: Rectangle,
  positionData: IPositionDirectionalHintData,
  gap: number,
  shouldScroll = false,
  minimumScrollResizeHeight?: number,
  directionalHintFixed?: boolean,
  coverTarget?: boolean,
): IElementPosition {
  const estimatedElementPosition: Rectangle = _estimatePosition(
    elementToPosition,
    target,
    positionData,
    gap,
    coverTarget,
  );
  if (_isRectangleWithinBounds(estimatedElementPosition, bounding)) {
    return {
      elementRectangle: estimatedElementPosition,
      targetEdge: positionData.targetEdge,
      alignmentEdge: positionData.alignmentEdge,
    };
  } else {
    return _adjustFitWithinBounds(
      estimatedElementPosition,
      target,
      bounding,
      positionData,
      shouldScroll,
      minimumScrollResizeHeight,
      gap,
      directionalHintFixed,
      coverTarget,
    );
  }
}

function _finalizeBeakPosition(
  elementPosition: IElementPositionInfo,
  positionedBeak: Rectangle,
  bounds?: Rectangle,
): ICalloutBeakPositionedInfo {
  const targetEdge = elementPosition.targetEdge * -1;
  // The "host" element that we will use to help position the beak.
  const actualElement = new Rectangle(
    0,
    elementPosition.elementRectangle.width,
    0,
    elementPosition.elementRectangle.height,
  );
  const returnValue: IPartialIRectangle = {};
  const returnEdge = _finalizeReturnEdge(
    elementPosition.elementRectangle,
    elementPosition.alignmentEdge ? elementPosition.alignmentEdge : _getFlankingEdges(targetEdge).positiveEdge,
    bounds,
  );

  // only show the beak if the callout is not fully covering the target
  const beakEdgeDifference = _getRelativeEdgeDifference(
    elementPosition.elementRectangle,
    elementPosition.targetRectangle,
    targetEdge,
  );
  const showBeak = beakEdgeDifference > Math.abs(_getEdgeValue(positionedBeak, targetEdge));

  returnValue[RectangleEdge[targetEdge]] = _getEdgeValue(positionedBeak, targetEdge);
  returnValue[RectangleEdge[returnEdge]] = _getRelativeEdgeDifference(positionedBeak, actualElement, returnEdge);

  return {
    elementPosition: { ...returnValue },
    closestEdge: getClosestEdge(elementPosition.targetEdge, positionedBeak, actualElement),
    targetEdge,
    hideBeak: !showBeak,
  };
}

function _positionBeak(beakWidth: number, elementPosition: IElementPositionInfo): Rectangle {
  const target = elementPosition.targetRectangle;
  /**
   * Note about beak positioning: The actual beak width only matters for getting the gap between the callout and
   * target, it does not impact the beak placement within the callout. For example example, if the beakWidth is 8,
   * then the actual beakWidth is sqrroot(8^2 + 8^2) = 11.31x11.31. So the callout will need to be an extra 3 pixels
   * away from its target. While the beak is being positioned in the callout it still acts as though it were 8x8.
   */
  const { positiveEdge, negativeEdge } = _getFlankingEdges(elementPosition.targetEdge);
  const beakTargetPoint = _getCenterValue(target, elementPosition.targetEdge);
  const elementBounds = new Rectangle(
    beakWidth / 2,
    elementPosition.elementRectangle.width - beakWidth / 2,
    beakWidth / 2,
    elementPosition.elementRectangle.height - beakWidth / 2,
  );

  let beakPosition: Rectangle = new Rectangle(0, beakWidth, 0, beakWidth);

  beakPosition = _moveEdge(beakPosition, elementPosition.targetEdge * -1, -beakWidth / 2);

  beakPosition = _centerEdgeToPoint(
    beakPosition,
    elementPosition.targetEdge * -1,
    beakTargetPoint - _getRelativeRectEdgeValue(positiveEdge, elementPosition.elementRectangle),
  );

  if (!_isEdgeInBounds(beakPosition, elementBounds, positiveEdge)) {
    beakPosition = _alignEdges(beakPosition, elementBounds, positiveEdge);
  } else if (!_isEdgeInBounds(beakPosition, elementBounds, negativeEdge)) {
    beakPosition = _alignEdges(beakPosition, elementBounds, negativeEdge);
  }
  return beakPosition;
}

function _getRectangleFromElement(element: Element): Rectangle {
  // eslint-disable-next-line deprecation/deprecation
  const clientRect: ClientRect = element.getBoundingClientRect();

  return new Rectangle(clientRect.left, clientRect.right, clientRect.top, clientRect.bottom);
}

function _getRectangleFromIRect(rect: IRectangle): Rectangle {
  return new Rectangle(rect.left, rect.right, rect.top, rect.bottom);
}

function _getTargetRect(bounds: Rectangle, target: Element | MouseEvent | Point | Rectangle | undefined): Rectangle {
  let targetRectangle: Rectangle;
  if (target) {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!(target as MouseEvent).preventDefault) {
      const ev = target as MouseEvent;
      targetRectangle = new Rectangle(ev.clientX, ev.clientX, ev.clientY, ev.clientY);
      // eslint-disable-next-line no-extra-boolean-cast
    } else if (!!(target as Element).getBoundingClientRect) {
      targetRectangle = _getRectangleFromElement(target as Element);
      // HTMLImgElements can have x and y values. The check for it being a point must go last.
    } else {
      const rectOrPoint: Point & Rectangle = target as Point & Rectangle;
      // eslint-disable-next-line deprecation/deprecation
      const left = rectOrPoint.left || rectOrPoint.x;
      // eslint-disable-next-line deprecation/deprecation
      const top = rectOrPoint.top || rectOrPoint.y;
      const right = rectOrPoint.right || left;
      const bottom = rectOrPoint.bottom || top;
      targetRectangle = new Rectangle(left, right, top, bottom);
    }

    if (!_isRectangleWithinBounds(targetRectangle, bounds)) {
      const outOfBounds: RectangleEdge[] = _getOutOfBoundsEdges(targetRectangle, bounds);

      for (const direction of outOfBounds) {
        (targetRectangle as any)[RectangleEdge[direction]] = (bounds as any)[RectangleEdge[direction]];
      }
    }
  } else {
    targetRectangle = new Rectangle(0, 0, 0, 0);
  }

  return targetRectangle;
}

/**
 * If max height is less than zero it returns the bounds height instead.
 */
function _getMaxHeightFromTargetRectangle(
  targetRectangle: Rectangle,
  targetEdge: DirectionalHint,
  gapSpace: number,
  bounds: Rectangle,
  coverTarget?: boolean,
) {
  let maxHeight = 0;
  const directionalHint = DirectionalDictionary[targetEdge];

  // If cover target is set, then the max height should be calculated using the opposite of the target edge since
  // that's the direction that the callout will expand in.
  // For instance, if the directionalhint is bottomLeftEdge then the callout will position so it's bottom edge
  // is aligned with the bottom of the target and expand up towards the top of the screen and the calculated max height
  // is (bottom of target) - (top of screen) - gapSpace.
  const target = coverTarget ? directionalHint.targetEdge * -1 : directionalHint.targetEdge;

  if (target === RectangleEdge.top) {
    maxHeight = _getEdgeValue(targetRectangle, directionalHint.targetEdge) - bounds.top - gapSpace;
  } else if (target === RectangleEdge.bottom) {
    maxHeight = bounds.bottom - _getEdgeValue(targetRectangle, directionalHint.targetEdge) - gapSpace;
  } else {
    maxHeight = bounds.bottom - targetRectangle.top - gapSpace;
  }

  return maxHeight > 0 ? maxHeight : bounds.height;
}

function _positionElementRelative(
  props: IPositionProps,
  elementToPosition: HTMLElement,
  boundingRect: Rectangle,
  previousPositions?: IPositionedData,
  shouldScroll = false,
  minimumScrollResizeHeight?: number,
): IElementPositionInfo {
  const gap: number = props.gapSpace ? props.gapSpace : 0;
  const targetRect: Rectangle = _getTargetRect(boundingRect, props.target);
  const positionData: IPositionDirectionalHintData = _getAlignmentData(
    _getPositionData(props.directionalHint, props.directionalHintForRTL, previousPositions)!,
    targetRect,
    boundingRect,
    props.coverTarget,
    props.alignTargetEdge,
  );
  const positionedElement: IElementPosition = _positionElementWithinBounds(
    _getRectangleFromElement(elementToPosition),
    targetRect,
    boundingRect,
    positionData,
    gap,
    shouldScroll,
    minimumScrollResizeHeight,
    props.directionalHintFixed,
    props.coverTarget,
  );
  return { ...positionedElement, targetRectangle: targetRect };
}

function _finalizePositionData(
  positionedElement: IElementPosition,
  hostElement: HTMLElement,
  bounds?: Rectangle,
  coverTarget?: boolean,
  doNotFinalizeReturnEdge?: boolean,
): IPositionedData {
  const finalizedElement: IPartialIRectangle = _finalizeElementPosition(
    positionedElement.elementRectangle,
    hostElement,
    positionedElement.targetEdge,
    bounds,
    positionedElement.alignmentEdge,
    coverTarget,
    doNotFinalizeReturnEdge,
    positionedElement.forcedInBounds,
  );
  return {
    elementPosition: finalizedElement,
    targetEdge: positionedElement.targetEdge,
    alignmentEdge: positionedElement.alignmentEdge,
  };
}

function _positionElement(
  props: IPositionProps,
  hostElement: HTMLElement,
  elementToPosition: HTMLElement,
  previousPositions?: IPositionedData,
  win?: Window,
): IPositionedData {
  const theWin = win ?? getWindow()!;
  const boundingRect: Rectangle = props.bounds
    ? _getRectangleFromIRect(props.bounds)
    : new Rectangle(0, theWin.innerWidth - getScrollbarWidth(), 0, theWin.innerHeight);
  const positionedElement: IElementPosition = _positionElementRelative(
    props,
    elementToPosition,
    boundingRect,
    previousPositions,
  );
  return _finalizePositionData(positionedElement, hostElement, boundingRect, props.coverTarget);
}

function _calculateGapSpace(isBeakVisible: boolean | undefined, beakWidth = 0, gapSpace = 0): number {
  return _calculateActualBeakWidthInPixels(isBeakVisible ? beakWidth : 0) / 2 + gapSpace;
}

function _positionCallout(
  props: ICalloutPositionProps,
  hostElement: HTMLElement,
  callout: HTMLElement,
  previousPositions?: ICalloutPositionedInfo,
  shouldScroll = false,
  minimumScrollResizeHeight?: number,
  doNotFinalizeReturnEdge?: boolean,
  win?: Window,
): ICalloutPositionedInfo {
  const theWin = win ?? getWindow()!;
  const beakWidth: number = props.isBeakVisible ? props.beakWidth || 0 : 0;
  const gap = _calculateGapSpace(props.isBeakVisible, props.beakWidth, props.gapSpace);
  const positionProps: IPositionProps = props;
  positionProps.gapSpace = gap;
  const boundingRect: Rectangle = props.bounds
    ? _getRectangleFromIRect(props.bounds)
    : new Rectangle(0, theWin.innerWidth - getScrollbarWidth(), 0, theWin.innerHeight);

  const positionedElement: IElementPositionInfo = _positionElementRelative(
    positionProps,
    callout,
    boundingRect,
    previousPositions,
    shouldScroll,
    minimumScrollResizeHeight,
  );

  const beakPositioned: Rectangle = _positionBeak(beakWidth, positionedElement);
  const finalizedBeakPosition: ICalloutBeakPositionedInfo = _finalizeBeakPosition(
    positionedElement,
    beakPositioned,
    boundingRect,
  );

  return {
    ..._finalizePositionData(positionedElement, hostElement, boundingRect, props.coverTarget, doNotFinalizeReturnEdge),
    beakPosition: finalizedBeakPosition,
  };
}

function _positionCard(
  props: ICalloutPositionProps,
  hostElement: HTMLElement,
  callout: HTMLElement,
  previousPositions?: ICalloutPositionedInfo,
  win?: Window,
): ICalloutPositionedInfo {
  const theWin = win ?? getWindow()!;
  return _positionCallout(props, hostElement, callout, previousPositions, false, undefined, true, theWin);
}

function _getRectangleFromTarget(target: Element | MouseEvent | Point | Rectangle): Rectangle {
  const mouseTarget: MouseEvent = target as MouseEvent;
  const elementTarget: Element = target as Element;
  const rectOrPointTarget: Point & Rectangle = target as Point & Rectangle;
  let targetRect: Rectangle;

  // eslint-disable-next-line deprecation/deprecation
  const left = rectOrPointTarget.left ?? rectOrPointTarget.x;
  // eslint-disable-next-line deprecation/deprecation
  const top = rectOrPointTarget.top ?? rectOrPointTarget.y;
  const right = rectOrPointTarget.right ?? left;
  const bottom = rectOrPointTarget.bottom ?? top;

  // eslint-disable-next-line no-extra-boolean-cast -- may not actually be a MouseEvent
  if (!!mouseTarget.stopPropagation) {
    targetRect = new Rectangle(mouseTarget.clientX, mouseTarget.clientX, mouseTarget.clientY, mouseTarget.clientY);
  } else if (left !== undefined && top !== undefined) {
    targetRect = new Rectangle(left, right, top, bottom);
  } else {
    targetRect = _getRectangleFromElement(elementTarget);
  }

  return targetRect;
}
// END PRIVATE FUNCTIONS

export const __positioningTestPackage = {
  _finalizePositionData,
  _finalizeBeakPosition,
  _calculateActualBeakWidthInPixels,
  _positionElementWithinBounds,
  _positionBeak,
  _getPositionData,
  _getMaxHeightFromTargetRectangle,
};

/**
 * Used to position an element relative to the given positioning props.
 * If positioning has been completed before, previousPositions can be passed to ensure that the positioning element
 * repositions based on its previous targets rather than starting with directionalhint.
 */
export function positionElement(
  props: IPositionProps,
  hostElement: HTMLElement,
  elementToPosition: HTMLElement,
  previousPositions?: IPositionedData,
  win?: Window,
): IPositionedData {
  return _positionElement(props, hostElement, elementToPosition, previousPositions, win);
}

export function positionCallout(
  props: IPositionProps,
  hostElement: HTMLElement,
  elementToPosition: HTMLElement,
  previousPositions?: ICalloutPositionedInfo,
  shouldScroll?: boolean,
  minimumScrollResizeHeight?: number,
  win?: Window,
): ICalloutPositionedInfo {
  return _positionCallout(
    props,
    hostElement,
    elementToPosition,
    previousPositions,
    shouldScroll,
    minimumScrollResizeHeight,
    undefined,
    win,
  );
}

export function positionCard(
  props: IPositionProps,
  hostElement: HTMLElement,
  elementToPosition: HTMLElement,
  previousPositions?: ICalloutPositionedInfo,
  win?: Window,
): ICalloutPositionedInfo {
  return _positionCard(props, hostElement, elementToPosition, previousPositions, win);
}

/**
 * Gets the maximum height that a rectangle can have in order to fit below or above a target.
 * If the directional hint specifies a left or right edge (i.e. leftCenter) it will limit the height to the topBorder
 * of the target given.
 * If no bounds are provided then the window is treated as the bounds.
 */
export function getMaxHeight(
  target: Element | MouseEvent | Point | Rectangle,
  targetEdge: DirectionalHint,
  gapSpace: number = 0,
  bounds?: IRectangle,
  coverTarget?: boolean,
  win?: Window,
): number {
  const theWin = win ?? getWindow()!;
  const targetRect = _getRectangleFromTarget(target);
  const boundingRectangle = bounds
    ? _getRectangleFromIRect(bounds)
    : new Rectangle(0, theWin.innerWidth - getScrollbarWidth(), 0, theWin.innerHeight);

  return _getMaxHeightFromTargetRectangle(targetRect, targetEdge, gapSpace, boundingRectangle, coverTarget);
}

/**
 * Returns the opposite edge of the given RectangleEdge.
 */
export function getOppositeEdge(edge: RectangleEdge): RectangleEdge {
  return edge * -1;
}

function _getBoundsFromTargetWindow(
  target: Element | MouseEvent | Point | Rectangle | null,
  targetWindow: IWindowWithSegments,
): IRectangle {
  let segments = undefined;
  if (targetWindow.getWindowSegments) {
    segments = targetWindow.getWindowSegments();
  }

  // Identify if we're dealing with single screen scenarios.
  if (segments === undefined || segments.length <= 1) {
    return {
      top: 0,
      left: 0,
      right: targetWindow.innerWidth,
      bottom: targetWindow.innerHeight,
      width: targetWindow.innerWidth,
      height: targetWindow.innerHeight,
    };
  }

  // Logic for determining dual screen scenarios.
  let x: number | undefined = 0;
  let y: number | undefined = 0;

  // If the target is an Element get coordinates for its center.
  if (target !== null && !!(target as Element).getBoundingClientRect) {
    const clientRect = (target as Element).getBoundingClientRect();
    x = (clientRect.left + clientRect.right) / 2;
    y = (clientRect.top + clientRect.bottom) / 2;
  }
  // If the target is not null get x-axis and y-axis coordinates directly.
  else if (target !== null) {
    // eslint-disable-next-line deprecation/deprecation
    x = (target as Point).left || (target as MouseEvent | Point).x;
    // eslint-disable-next-line deprecation/deprecation
    y = (target as Point).top || (target as MouseEvent | Point).y;
  }

  let bounds = { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };

  // Define which window segment are the coordinates in and calculate bounds based on that.
  for (const segment of segments) {
    if (x && segment.left <= x && segment.right >= x && y && segment.top <= y && segment.bottom >= y) {
      bounds = {
        top: segment.top,
        left: segment.left,
        right: segment.right,
        bottom: segment.bottom,
        width: segment.width,
        height: segment.height,
      };
    }
  }

  return bounds;
}

export function getBoundsFromTargetWindow(
  target: Element | MouseEvent | Point | Rectangle | null,
  targetWindow: IWindowWithSegments,
): IRectangle {
  return _getBoundsFromTargetWindow(target, targetWindow);
}

export function calculateGapSpace(
  isBeakVisible: boolean | undefined,
  beakWidth: number | undefined,
  gapSpace: number | undefined,
): number {
  return _calculateGapSpace(isBeakVisible, beakWidth, gapSpace);
}

export function getRectangleFromTarget(target: Element | MouseEvent | Point | Rectangle): Rectangle {
  return _getRectangleFromTarget(target);
}
