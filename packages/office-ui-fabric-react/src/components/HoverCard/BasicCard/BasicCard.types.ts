import { ICardProps, ICardStyles, ICardStyleProps } from '../Card.types';
import { IRenderFunction } from '../../../Utilities';

export interface IBasicCard {}

/**
 * BasicCard component props.
 */
export interface IBasicCardProps extends ICardProps<IBasicCard, IBasicCardStyles, IBasicCardStyleProps> {
  /**
   *  Render function to populate compact content area
   */
  onRenderBasicCard?: IRenderFunction<IBasicCardProps>;
}

export interface IBasicCardStyleProps extends ICardStyleProps {}

export interface IBasicCardStyles extends ICardStyles {}
