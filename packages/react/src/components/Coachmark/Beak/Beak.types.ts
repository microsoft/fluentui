import { RectangleEdge } from '../../../Positioning';
import type { RefAttributes } from '../../../Utilities';

export interface IBeakProps extends RefAttributes<HTMLDivElement> {
  /**
   * @deprecated Not used.
   */
  width?: number;

  /**
   * @deprecated Not used.
   */
  height?: number;

  /**
   * Color of the beak
   */
  color?: string;

  /**
   * Left position of the beak
   */
  left?: string;

  /**
   * Top position of the beak
   */
  top?: string;

  /**
   * Right position of the beak
   */
  right?: string;

  /**
   * Bottom position of the beak
   */
  bottom?: string;

  /**
   * Direction of beak
   */
  direction?: RectangleEdge;
}

export interface IBeakStylesProps {
  left?: string | undefined;
  top?: string | undefined;
  bottom?: string | undefined;
  right?: string | undefined;
  width?: string;
  height?: string;
  transform?: string;
  color?: string;
}
