import { IBaseCardProps, IBaseCardStyles, IBaseCardStyleProps } from '../BaseCard.types';
import { IRenderFunction } from '../../../Utilities';

export interface IPlainCard {}

/**
 * PlainCard component props.
 */
export interface IPlainCardProps extends IBaseCardProps<IPlainCard, IPlainCardStyles, IPlainCardStyleProps> {
  /**
   *  Render function to populate compact content area
   */
  onRenderPlainCard?: IRenderFunction<any>;
}

export interface IPlainCardStyleProps extends IBaseCardStyleProps {}

export interface IPlainCardStyles extends IBaseCardStyles {}
