import { DirectionalHint } from '../../common/DirectionalHint';
import { IPoint } from './Positioning.Interfaces';
import { IRectangle } from '../../Utilities';
export interface IPositionProps {
  target?: HTMLElement | MouseEvent | IPoint;
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