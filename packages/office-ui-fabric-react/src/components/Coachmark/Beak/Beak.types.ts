import { RectangleEdge } from '../../../utilities/positioning';
import { IBaseProps, IRefObject } from '../../../Utilities';

export interface IBeak {}

export interface IBeakProps extends IBaseProps<IBeak> {
  /**
   * All props for your component are to be defined here.
   */
  componentRef?: IRefObject<IBeak>;

  /**
   * Beak width.
   * @defaultvalue 18
   * @deprecated Do not use.
   */
  width?: number;

  /**
   * Beak height.
   * @defaultvalue 18
   * @deprecated Do not use.
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
