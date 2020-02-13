import { IBaseCardProps, IBaseCardStyles, IBaseCardStyleProps } from '../BaseCard.types';
import { IRenderFunction, IRefObject } from '../../../Utilities';

/**
 * {@docCategory HoverCard}
 */
export interface IPlainCard {}

/**
 * PlainCard component props.
 * {@docCategory HoverCard}
 */
export interface IPlainCardProps extends IBaseCardProps<IPlainCard, IPlainCardStyles, IPlainCardStyleProps> {
  /**
   *  Render function to populate compact content area
   */
  onRenderPlainCard?: IRenderFunction<any>;

  /**
   * Provides a React reference to the underlying DOM element
   */
  domRef?: IRefObject<HTMLDivElement>;
}

/**
 * {@docCategory HoverCard}
 */
export interface IPlainCardStyleProps extends IBaseCardStyleProps {}

/**
 * {@docCategory HoverCard}
 */
export interface IPlainCardStyles extends IBaseCardStyles {}
