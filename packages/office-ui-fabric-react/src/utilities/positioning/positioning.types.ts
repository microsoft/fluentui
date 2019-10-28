import { DirectionalHint } from '../../common/DirectionalHint';
import { IRectangle } from '../../Utilities';

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
export interface IPositionProps {
  target?: Element | MouseEvent | IPoint;
  /** how the element should be positioned */
  directionalHint?: DirectionalHint;
  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of `directionalHint` will be used instead
   */
  directionalHintForRTL?: DirectionalHint;
  /** The gap between the callout and the target */
  gapSpace?: number;
  /**
   * The bounding rectangle for which  the contextual menu can appear in.
   */
  bounds?: IRectangle;
  /**
   * If true the position returned will have the menu element cover the target.
   * If false then it will position next to the target;
   */
  coverTarget?: boolean;
  /**
   * If true the position will not change edges in an attempt to fit the rectangle within bounds.
   * It will still attempt to align it to whatever bounds are given.
   * @defaultvalue false
   */
  directionalHintFixed?: boolean;

  /**
   * If true the positioning logic will prefer flipping edges over nudging the rectangle to fit within bounds,
   * thus making sure the the element align perfectly with target.
   */
  alignTargetEdge?: boolean;
}

export interface ICalloutPositionProps extends IPositionProps {
  /**
   * The width of the beak.
   */
  beakWidth?: number;

  /**
   * Whether or not the beak is visible
   */
  isBeakVisible?: boolean;
}

export interface IPositionedData {
  /**
   * The new position of the element.
   */
  elementPosition: IPosition;
  /**
   * The finalized target edge that element is aligning to. For instance RectangleEdge.bottom would mean
   * that the bottom edge of the target is being aligned to by the RectangleEdge.top of the element
   * that is being positioned.
   */
  targetEdge: RectangleEdge;
  /**
   * The finalized alignment edge that the element is aligning too. For instance, RectangleEdge.left means
   * that the left edge of the target should be in line with the left edge of the element being positioned.
   */
  alignmentEdge?: RectangleEdge;
}

export interface ICalloutPositionedInfo extends IPositionedData {
  beakPosition: ICalloutBeakPositionedInfo;
}

export interface ICalloutBeakPositionedInfo extends IPositionedData {
  closestEdge: RectangleEdge;
}

/**
 * Gives the position of some element on the page. Only a pair of vertical and horizontal edges need to be
 * given. So top/left or bottom/left is sufficient.
 * The number given is the distance in pixels from whatever host was given..
 * So bottom: 100 would be 100px up from the bottom of the host while top: 100px from the top.
 */
export interface IPosition {
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

export interface IPositionDirectionalHintData {
  targetEdge: RectangleEdge;
  alignmentEdge?: RectangleEdge;
  isAuto?: boolean;
  alignTargetEdge?: boolean;
}

export interface IRelativePositions {
  calloutPosition: IPosition;
  beakPosition: { position: IPosition | undefined; display: 'block' };
  directionalClassName: string;
  submenuDirection: DirectionalHint;
}
