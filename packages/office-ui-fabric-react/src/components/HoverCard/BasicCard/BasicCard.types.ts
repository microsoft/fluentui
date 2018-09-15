import { ICardProps, ICardStyles, ICardStyleProps } from '../Card.types';
import { IRenderFunction, IStyleFunctionOrObject } from '../../../Utilities';

export interface IBasicCard {}

/**
 * BasicCard component props.
 */
export interface IBasicCardProps extends ICardProps<IBasicCard, IBasicCardStyles, IBasicCardStyleProps> {
  /**
   *  Render function to populate compact content area
   */
  onRenderBasicCard?: IRenderFunction<IBasicCardProps>;

  /**
   * Custom styles for this component
   */
  styles?: IStyleFunctionOrObject<IBasicCardStyleProps, IBasicCardStyles>;
}

export interface IBasicCardStyleProps extends ICardStyleProps {}

export interface IBasicCardStyles extends ICardStyles {}
