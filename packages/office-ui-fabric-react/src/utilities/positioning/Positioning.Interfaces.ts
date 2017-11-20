import { RectangleEdge } from './Positioning.Enums';
import { DirectionalHint } from '../../common/DirectionalHint';

export interface IPositionInfo {
  elementPosition: IPosition;
  targetEdge: RectangleEdge;
}

export interface ICalloutPositionInfo extends IPositionInfo {
  beakPosition: { position: IPosition, beakClosestEdge: RectangleEdge };
  submenuDirection: DirectionalHint;
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

/**
 * @deprecated use IPosition instead.
 */
export interface ICalloutPositon extends IPosition {

}

export interface IPoint {
  x: number;
  y: number;
}

export interface IPositionDirectionalHintData {
  targetEdge: RectangleEdge;
  alignmentEdge?: RectangleEdge;
  isAuto?: boolean;
}