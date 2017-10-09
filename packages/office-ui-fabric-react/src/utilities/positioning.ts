import { DirectionalHint } from '../common/DirectionalHint';
import {
  getScrollbarWidth,
  getRTL,
  Rectangle as FullRectangle,
  IRectangle
} from '../Utilities';

export enum RectangleEdge {
  top = 1,
  bottom = -1,
  left = 2,
  right = -2
}

export enum Position {
  top = 0,
  bottom = 1,
  start = 2,
  end = 3
}

const SLIDE_ANIMATIONS: { [key: number]: string; } = {
  [RectangleEdge.top]: 'slideUpIn20',
  [RectangleEdge.bottom]: 'slideDownIn20',
  [RectangleEdge.left]: 'slideLeftIn20',
  [RectangleEdge.right]: 'slideRightIn20'
};

export class Rectangle extends FullRectangle {
  [key: string]: number | boolean | any;
}

export interface IPositionProps {
  target?: HTMLElement | MouseEvent;
  /** how the element should be positioned */
  directionalHint?: DirectionalHint;

  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of `directionalHint` will be used instead
   */
  directionalHintForRTL?: DirectionalHint;

  /** The gap between the callout and the target */
  gapSpace?: number;

  /** The width of the beak. */
  beakWidth?: number;

  /**
   * The bounding rectangle for which  the contextual menu can appear in.
   */
  bounds?: IRectangle;

  /** If true then the beak is visible. If false it will not be shown. */
  isBeakVisible?: boolean;

  /**
   * If true the position returned will have the menu element cover the target.
   * If false then it will position next to the target;
   */
  coverTarget?: boolean;

  /**
   * If true the position will not change edges in an attempt to fit the rectangle within bounds.
   * It will still attempt to align it to whatever bounds are given.
   * @default false
   */
  directionalHintFixed?: boolean;
}

export interface IPositionInfo {
  calloutPosition: ICalloutPositon;
  beakPosition: { position: ICalloutPositon, display: string };
  directionalClassName: string;
  submenuDirection: DirectionalHint;
}

export interface ICalloutPositon {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  [key: string]: number | undefined;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IPositionData {
  targetEdge: RectangleEdge;
  alignmentEdge?: RectangleEdge;
  isAuto?: boolean;
}

function _createPositionData(
  targetEdge: RectangleEdge,
  alignmentEdge?: RectangleEdge,
  isAuto?: boolean): IPositionData {
  return {
    targetEdge: targetEdge,
    alignmentEdge: alignmentEdge,
    isAuto: isAuto
  };
}

// Currently the beakPercent is set to 50 for all positions meaning that it should tend to the center of the target
let DirectionalDictionary: { [key: number]: IPositionData } = {
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
  [DirectionalHint.rightBottomEdge]: _createPositionData(RectangleEdge.right, RectangleEdge.bottom)
};

export module positioningFunctions {

  export interface ICallout {
    calloutRectangle: Rectangle;
    targetEdge: RectangleEdge;
    alignmentEdge: RectangleEdge | undefined;
  }

  export type PartialIRectangle = Partial<IRectangle>;

  export interface IPartialIRectangle extends PartialIRectangle {
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
    let outOfBounds: RectangleEdge[] = new Array<RectangleEdge>();

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
    return rect[RectangleEdge[edge]];
  }

  function _setEdgeValue(rect: Rectangle, edge: RectangleEdge, value: number) {
    rect[RectangleEdge[edge]] = value;
    return rect;
  }

  /**
   * Returns the middle value of an edge. Only returns 1 value rather than xy coordinates as
   * the itself already contains the other coordinate.
   * For instance, a bottom edge's current value is it's y coordinate, so the number returned is the x.
   *
   * @param {Rectangle} rect
   * @param {RectangleEdge} edge
   * @returns {number}
   */
  function _getCenterValue(rect: Rectangle, edge: RectangleEdge): number {
    const edges = _getFlankingEdges(edge);
    return (_getEdgeValue(rect, edges.firstEdge) + _getEdgeValue(rect, edges.secondEdge)) / 2;
  }

  /**
   * Flips the value depending on the edge.
   * If the edge is a "positive" edge, Top or Left, then the value should stay as it is.
   * If the edge is a "negative" edge, Bottom or Right, then the value should be flipped.
   * This is to account for the fact that the coordinates are effectively reveserved in certain cases for the "negative" edges.
   * For example, when testing to see if a bottom edge 1 is within the bounds of another bottom edge 2.
   * If edge 1 is greater than edge 2 then it is out of bounds. This is reversed for top edge 1 and top edge 2.
   * If top edge 1 is less than edge 2 then it is out of bounds.
   *
   *
   * @param {RectangleEdge} edge
   * @param {number} value
   * @returns {number}
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
   *
   * @param {Rectangle} rect
   * @param {RectangleEdge} edge
   * @param {number} newValue
   * @returns {Rectangle}
   */
  function _moveEdge(rect: Rectangle, edge: RectangleEdge, newValue: number): Rectangle {
    const difference = _getEdgeValue(rect, edge) - newValue;
    rect = _setEdgeValue(rect, edge, newValue);
    rect = _setEdgeValue(rect, edge * -1, _getEdgeValue(rect, edge * -1) - difference);
    return rect;
  }

  /**
   * Aligns the edge on the passed in rect to the target. If there is a gap then it will have that space between the two.
   *
   * @param {Rectangle} rect
   * @param {Rectangle} target
   * @param {RectangleEdge} edge
   * @param {number} [gap=0]
   * @returns {Rectangle}
   */
  function _alignEdges(rect: Rectangle, target: Rectangle, edge: RectangleEdge, gap: number = 0): Rectangle {
    return _moveEdge(rect, edge, _getEdgeValue(target, edge) + _getRelativeEdgeValue(edge, gap));
  }

  /**
   * Aligns the targetEdge on the passed in target to the rects corresponding opposite edge.
   * For instance if targetEdge is bottom, then the rects top will be moved to match it.
   *
   * @param {Rectangle} rect
   * @param {Rectangle} target
   * @param {RectangleEdge} targetEdge
   * @param {number} [gap=0]
   * @returns {Rectangle}
   */
  function _alignOppositeEdges(rect: Rectangle, target: Rectangle, targetEdge: RectangleEdge, gap: number = 0): Rectangle {
    const oppositeEdge = targetEdge * -1;
    const adjustedGap = _getRelativeEdgeValue(oppositeEdge, gap);
    return _moveEdge(rect, targetEdge * -1, _getEdgeValue(target, targetEdge) + adjustedGap);
  }

  /**
   * Tests to see if the given edge is within the bounds of the given rectangle.
   *
   * @param {Rectangle} rect
   * @param {Rectangle} bounds
   * @param {RectangleEdge} edge
   * @returns {boolean}
   */
  function _isEdgeInBounds(rect: Rectangle, bounds: Rectangle, edge: RectangleEdge): boolean {
    const adjustedRectValue = _getRelativeRectEdgeValue(edge, rect);
    // The adjusted value must be reversed to determine if it is within the bounds.
    // Take these two examples:
    // Top is out of bounds with -4 as value. Top is not reversed in _getRelativeRectEdgeValue. -4 * -1 = 4
    // 4 is not less than the bounds of 0, so it must be out of bounds.
    // Bottom is out of bounds with 5 as value, bounds bottom is 4. Bottom is reversed in _getRelaitveRectEdgeValue.
    // Bottom is now -5. Bottom * -1 is now 5. 5 is greater than bounds bottom of 4, so it must be out of bounds.
    return adjustedRectValue * -1 < _getEdgeValue(bounds, edge);
  }

  /**
   * Attempts to move the rectangle through various sides of the target to find a place to fit.
   * If no fit is found, the original position should be returned.
   *
   * @param {Rectangle} rect
   * @param {Rectangle} target
   * @param {Rectangle} bounding
   * @param {IPositionData} positionData
   * @param {number} [gap=0]
   * @returns {ICallout}
   */
  function _flipToFit(rect: Rectangle, target: Rectangle, bounding: Rectangle, positionData: IPositionData, gap: number = 0, ): ICallout {
    let directions: RectangleEdge[] = [RectangleEdge.left, RectangleEdge.right, RectangleEdge.bottom, RectangleEdge.top];
    let currentEstimate = rect;
    let currentEdge = positionData.targetEdge;
    let currentAlignment = positionData.alignmentEdge;
    // Keep switching sides until one is found with enough space. If all sides don't fit then return the unmodified callout.
    for (let i = 0; i < 4; i++) {
      if (!_isEdgeInBounds(currentEstimate, bounding, currentEdge)) {
        directions.splice(directions.indexOf(currentEdge), 1);
        if (directions.indexOf(currentEdge * -1) > -1) {
          currentEdge = currentEdge * -1;
        } else {
          currentAlignment = currentEdge;
          currentEdge = directions.slice(-1)[0];
        }
        currentEstimate = _estimatePosition(rect, target, { targetEdge: currentEdge, alignmentEdge: currentAlignment }, gap);
      } else {
        return {
          calloutRectangle: currentEstimate,
          targetEdge: currentEdge,
          alignmentEdge: currentAlignment
        };
      }
    }
    return {
      calloutRectangle: rect,
      targetEdge: positionData.targetEdge,
      alignmentEdge: currentAlignment
    };
  }

  /**
   * Adjusts a callout rectangle to fit within the bounds given. If directionalHintFixed or covertarget is passed in
   * then the callout will not flip sides on the target. They will, however, be nudged to fit within the bounds given.
   *
   * @param {Rectangle} callout
   * @param {Rectangle} target
   * @param {Rectangle} bounding
   * @param {IPositionData} positionData
   * @param {number} [gap=0]
   * @param {boolean} [directionalHintFixed]
   * @param {boolean} [coverTarget]
   * @returns {ICallout}
   */
  function _adjustFitWithinBounds(
    callout: Rectangle,
    target: Rectangle,
    bounding: Rectangle,
    positionData: IPositionData,
    gap: number = 0,
    directionalHintFixed?: boolean,
    coverTarget?: boolean): ICallout {

    let {
      alignmentEdge
    } = positionData;
    let calloutEstimate: ICallout = {
      calloutRectangle: callout,
      targetEdge: positionData.targetEdge,
      alignmentEdge: alignmentEdge
    };

    if (!directionalHintFixed && !coverTarget) {
      calloutEstimate = _flipToFit(callout, target, bounding, positionData, gap);
    }

    let outOfBounds = _getOutOfBoundsEdges(callout, bounding);

    for (const direction of outOfBounds) {
      calloutEstimate.calloutRectangle = _alignEdges(calloutEstimate.calloutRectangle, bounding, direction);
    }

    return calloutEstimate;
  }

  /**
   * Moves the middle point on an edge to the point given.
   * Only moves in one direction. For instance if a bottom edge is passed in, then
   * the bottom edge will be moved in the x axis to match the point.
   *
   * @param {Rectangle} rect
   * @param {RectangleEdge} edge
   * @param {number} point
   * @returns
   */
  function centerEdgeToPoint(rect: Rectangle, edge: RectangleEdge, point: number) {
    const { firstEdge } = _getFlankingEdges(edge);
    const calloutMiddle = _getCenterValue(rect, edge);
    const distanceToMiddle = calloutMiddle - _getEdgeValue(rect, firstEdge);
    return _moveEdge(rect, firstEdge, point - distanceToMiddle);
  }

  /**
   * Moves the callout rectangle to be appropriately positioned relative to a given target.
   * Does not flip or adjust the callout.
   *
   * @param {Rectangle} callout
   * @param {Rectangle} target
   * @param {IPositionData} positionData
   * @param {number} [gap=0]
   * @param {boolean} [coverTarget]
   * @returns {Rectangle}
   */
  function _estimatePosition(
    callout: Rectangle,
    target: Rectangle,
    positionData: IPositionData,
    gap: number = 0,
    coverTarget?: boolean
  ): Rectangle {
    let estimatedCalloutPosition: Rectangle;
    let {
      alignmentEdge,
      targetEdge
    } = positionData;
    const calloutEdge = coverTarget ? targetEdge : targetEdge * -1;
    estimatedCalloutPosition = coverTarget ? _alignEdges(callout, target, targetEdge, gap) :
      _alignOppositeEdges(callout, target, targetEdge, gap);
    // if no alignment edge is provided it's supposed to be centered.
    if (!alignmentEdge) {
      const targetMiddlePoint = _getCenterValue(target, targetEdge);
      estimatedCalloutPosition = centerEdgeToPoint(estimatedCalloutPosition, calloutEdge, targetMiddlePoint);

    } else {
      estimatedCalloutPosition = _alignEdges(estimatedCalloutPosition, target, alignmentEdge);
    }

    return estimatedCalloutPosition;
  }

  /**
   * Returns the non-opposite edges of the target edge.
   * For instance if bottom is passed in then left and right will be returned.
   *
   * @param {RectangleEdge} edge
   * @returns {{ firstEdge: RectangleEdge, secondEdge: RectangleEdge }}
   */
  function _getFlankingEdges(edge: RectangleEdge): { firstEdge: RectangleEdge, secondEdge: RectangleEdge } {
    if (edge === RectangleEdge.top || edge === RectangleEdge.bottom) {
      return {
        firstEdge: RectangleEdge.left,
        secondEdge: RectangleEdge.right
      };
    } else {
      return {
        firstEdge: RectangleEdge.top,
        secondEdge: RectangleEdge.bottom
      };
    }
  }

  /**
   * Finalizes the callout positon based on the hostElement. Only returns the
   * rectangle values to position such that they are anchored to the target.
   * This helps prevent resizing from looking very strange.
   * For instance, if the target edge is top and aligned with the left side then
   * the bottom and left values are returned so as the callou shrinks it shrinks towards that corner.
   *
   * @param {Rectangle} calloutRectangle
   * @param {HTMLElement} hostElement
   * @param {RectangleEdge} targetEdge
   * @param {RectangleEdge} [alignmentEdge]
   * @returns {IPartialIRectangle}
   */
  function _finalizeCalloutPosition(
    calloutRectangle: Rectangle,
    hostElement: HTMLElement,
    targetEdge: RectangleEdge,
    alignmentEdge?: RectangleEdge
  ): IPartialIRectangle {
    let returnValue: IPartialIRectangle = {};

    const hostRect: Rectangle = _getRectangleFromHTMLElement(hostElement);
    const calloutEdge = targetEdge * -1;
    const calloutEdgeString = RectangleEdge[calloutEdge];
    const returnEdge = alignmentEdge ? alignmentEdge : _getFlankingEdges(targetEdge).firstEdge;

    returnValue[calloutEdgeString] = _getRelativeEdgeDifference(calloutRectangle, hostRect, calloutEdge);
    returnValue[RectangleEdge[returnEdge]] = _getRelativeEdgeDifference(calloutRectangle, hostRect, returnEdge);

    return returnValue;
  }

  // Since the beak is rotated 45 degrees the actual height/width is the length of the diagonal.
  // We still want to position the beak based on it's midpoint which does not change. It will
  // be at (beakwidth / 2, beakwidth / 2)
  export function _calculateActualBeakWidthInPixels(beakWidth: number): number {
    return Math.sqrt(beakWidth * beakWidth * 2);
  }

  /**
   * Returns the appropriate IPositionData based on the props altered for RTL.
   * If directionalHintForRTL is passed in that is used if the page is RTL.
   * If a directionalHint is specified and no directionalHintForRTL is available and the page is RTL the hint will be flipped.
   * For instance bottomLeftEdge would become bottomRightEdge.
   * If there is no directionalHint passed in bottomAutoEdge is chosen automatically.
   *
   * @param {IPositionProps} props
   * @returns {IPositionData}
   */
  export function _getPositionData(
    directionalHint: DirectionalHint = DirectionalHint.bottomAutoEdge,
    directionalHintForRTL?: DirectionalHint
  ): IPositionData {
    let positionInformation: IPositionData = { ...DirectionalDictionary[directionalHint] };
    if (getRTL()) {
      // If alignment edge exists and that alignment edge is -2 or 2, right or left, then flip it.
      positionInformation.alignmentEdge = positionInformation.alignmentEdge && positionInformation.alignmentEdge % 2 === 0
        ? positionInformation.alignmentEdge * -1 : undefined;
      return directionalHintForRTL !== undefined ?
        DirectionalDictionary[directionalHintForRTL] :
        positionInformation;
    }
    return positionInformation;
  }

  /**
   * Get's the alignment data for the given information. This only really matters if the positioning is Auto.
   * If it is auto then the alignmentEdge should be chosen based on the target edge's position relative to
   * the center of the page.
   *
   * @param {IPositionData} positionData
   * @param {Rectangle} target
   * @param {Rectangle} boundingRect
   * @param {boolean} [coverTarget]
   * @returns {IPositionData}
   */
  function _getAlignmentData(positionData: IPositionData, target: Rectangle, boundingRect: Rectangle, coverTarget?: boolean): IPositionData {
    if (positionData.isAuto) {
      let center: number = _getCenterValue(target, positionData.targetEdge);

      if (center <= boundingRect.width / 2) {
        positionData.alignmentEdge = RectangleEdge.left;
      } else {
        positionData.alignmentEdge = RectangleEdge.right;
      }
    }

    return positionData;
  }

  export function _positionCalloutWithinBounds(
    callout: Rectangle,
    target: Rectangle,
    bounding: Rectangle,
    positionData: IPositionData,
    gap: number,
    directionalHintFixed?: boolean,
    coverTarget?: boolean): ICallout {
    let estimatedCalloutPosition: Rectangle = _estimatePosition(callout, target, positionData, gap, coverTarget);
    if (_isRectangleWithinBounds(estimatedCalloutPosition, bounding)) {
      return {
        calloutRectangle: estimatedCalloutPosition,
        targetEdge: positionData.targetEdge,
        alignmentEdge: positionData.alignmentEdge
      };
    } else {
      return _adjustFitWithinBounds(callout, target, bounding, positionData, gap, directionalHintFixed, coverTarget);
    }
  }

  export function _positionBeak(beakWidth: number,
    callout: ICallout,
    target: Rectangle,
    alignmentEdge?: RectangleEdge) {
    /** Note about beak positioning: The actual beak width only matters for getting the gap between the callout and target, it does not impact the beak placement within the callout. For example example, if the beakWidth is 8, then the actual beakWidth is sqrroot(8^2 + 8^2) = 11.31x11.31. So the callout will need to be an extra 3 pixels away from its target. While the beak is being positioned in the callout it still acts as though it were 8x8.*/
    const { firstEdge, secondEdge } = _getFlankingEdges(callout.targetEdge);
    const beakTargetPoint = _getCenterValue(target, callout.targetEdge);
    // The "host" callout that we will use to help position the beak.
    const actualCallout = new Rectangle(0, callout.calloutRectangle.width, 0, callout.calloutRectangle.height);

    const calloutBounds = new Rectangle(
      beakWidth / 2,
      callout.calloutRectangle.width - beakWidth / 2,
      beakWidth / 2,
      callout.calloutRectangle.height - beakWidth / 2
    );

    let beakPositon: Rectangle = new Rectangle(0, beakWidth, 0, beakWidth);

    beakPositon = _moveEdge(beakPositon, (callout.targetEdge * -1), -beakWidth / 2);

    beakPositon = centerEdgeToPoint(beakPositon, callout.targetEdge * -1,
      beakTargetPoint - _getRelativeRectEdgeValue(firstEdge, callout.calloutRectangle));

    if (!_isEdgeInBounds(beakPositon, calloutBounds, firstEdge)) {
      beakPositon = _alignEdges(beakPositon, calloutBounds, firstEdge);
    } else if (!_isEdgeInBounds(beakPositon, calloutBounds, secondEdge)) {
      beakPositon = _alignEdges(beakPositon, calloutBounds, secondEdge);
    }

    const targetEdge = callout.targetEdge * -1;

    const returnEdge = alignmentEdge ? alignmentEdge : _getFlankingEdges(targetEdge).firstEdge;
    let returnValue: IPartialIRectangle = {};

    returnValue[RectangleEdge[targetEdge]] = _getEdgeValue(beakPositon, targetEdge);
    returnValue[RectangleEdge[returnEdge]] = _getRelativeEdgeDifference(beakPositon, actualCallout, returnEdge);

    return returnValue;
  }

  export function _getRectangleFromHTMLElement(element: HTMLElement): Rectangle {
    let clientRect: ClientRect = element.getBoundingClientRect();

    return new Rectangle(clientRect.left, clientRect.right, clientRect.top, clientRect.bottom);
  }

  export function _getRectangleFromIRect(rect: IRectangle): Rectangle {
    return new Rectangle(rect.left, rect.right, rect.top, rect.bottom);
  }

  export function _getTargetRect(bounds: Rectangle, target: HTMLElement | MouseEvent | undefined) {
    let targetRectangle: Rectangle;
    if (target) {
      if ((target as MouseEvent).preventDefault) {
        let ev: MouseEvent = target as MouseEvent;
        targetRectangle = new Rectangle(ev.clientX, ev.clientX, ev.clientY, ev.clientY);
      } else {
        targetRectangle = _getRectangleFromHTMLElement(target as HTMLElement);
      }

      if (!_isRectangleWithinBounds(targetRectangle, bounds)) {
        let outOfBounds: RectangleEdge[] = _getOutOfBoundsEdges(targetRectangle, bounds);

        for (let direction of outOfBounds) {
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
  export function _getMaxHeightFromTargetRectangle(targetRectangle: Rectangle, targetEdge: DirectionalHint, gapSpace: number, bounds: Rectangle) {
    let maxHeight = 0;

    switch (targetEdge) {
      case DirectionalHint.bottomAutoEdge:
      case DirectionalHint.bottomCenter:
      case DirectionalHint.bottomLeftEdge:
      case DirectionalHint.bottomRightEdge:
        maxHeight = bounds.bottom - targetRectangle.bottom - gapSpace;
        break;
      case DirectionalHint.topAutoEdge:
      case DirectionalHint.topCenter:
      case DirectionalHint.topLeftEdge:
      case DirectionalHint.topRightEdge:
        maxHeight = targetRectangle.top - bounds.top - gapSpace;
        break;
      default:
        maxHeight = bounds.bottom - targetRectangle.top - gapSpace;
        break;
    }

    return maxHeight > 0 ? maxHeight : bounds.height;
  }

  export function _getRelativePositions(
    props: IPositionProps,
    hostElement: HTMLElement,
    calloutElement: HTMLElement): IPositionInfo {
    const beakWidth: number = !props.isBeakVisible ? 0 : (props.beakWidth || 0);
    const gap: number = _calculateActualBeakWidthInPixels(beakWidth) / 2 + (props.gapSpace ? props.gapSpace : 0);
    const boundingRect: Rectangle = props.bounds ?
      _getRectangleFromIRect(props.bounds) :
      new Rectangle(0, window.innerWidth - getScrollbarWidth(), 0, window.innerHeight);
    const targetRect: Rectangle = _getTargetRect(boundingRect, props.target);
    const positionData: IPositionData = _getAlignmentData(
      _getPositionData(props.directionalHint, props.directionalHintForRTL)!,
      targetRect,
      boundingRect,
      props.coverTarget);
    const positionedCallout: ICallout = _positionCalloutWithinBounds(
      _getRectangleFromHTMLElement(calloutElement),
      targetRect,
      boundingRect,
      positionData,
      gap,
      props.directionalHintFixed,
      props.coverTarget);
    const beakPositioned: IPartialIRectangle = _positionBeak(
      beakWidth,
      positionedCallout,
      targetRect,
      positionedCallout.alignmentEdge);
    const finalizedCallout: IPartialIRectangle = _finalizeCalloutPosition(
      positionedCallout.calloutRectangle,
      hostElement,
      positionedCallout.targetEdge,
      positionedCallout.alignmentEdge);
    return {
      calloutPosition: finalizedCallout,
      beakPosition: { position: { ...beakPositioned }, display: 'block' },
      directionalClassName: SLIDE_ANIMATIONS[positionedCallout.targetEdge],
      submenuDirection: (positionedCallout.targetEdge * -1) === RectangleEdge.right ? DirectionalHint.leftBottomEdge : DirectionalHint.rightBottomEdge
    };
  }
}

export function getRelativePositions(props: IPositionProps,
  hostElement: HTMLElement,
  calloutElement: HTMLElement) {
  return positioningFunctions._getRelativePositions(props, hostElement, calloutElement);
}

/**
 * Get's the maximum height that a rectangle can have in order to fit below or above a target.
 * If the directional hint specifies a left or right edge (i.e. leftCenter) it will limit the height to the topBorder
 * of the target given.
 * If no bounds are provided then the window is treated as the bounds.
 */
export function getMaxHeight(target: HTMLElement | MouseEvent, targetEdge: DirectionalHint, gapSpace: number = 0, bounds?: IRectangle) {
  let mouseTarget: MouseEvent = target as MouseEvent;
  let elementTarget: HTMLElement = target as HTMLElement;
  let targetRect: Rectangle;
  let boundingRectangle = bounds ?
    positioningFunctions._getRectangleFromIRect(bounds) :
    new Rectangle(0, window.innerWidth - getScrollbarWidth(), 0, window.innerHeight);

  if (mouseTarget.stopPropagation) {
    targetRect = new Rectangle(mouseTarget.clientX, mouseTarget.clientX, mouseTarget.clientY, mouseTarget.clientY);
  } else {
    targetRect = positioningFunctions._getRectangleFromHTMLElement(elementTarget);
  }

  return positioningFunctions._getMaxHeightFromTargetRectangle(targetRect, targetEdge, gapSpace, boundingRectangle);
}