import { styled } from '../../Utilities';
import { IChicletCardStyleProps, IChicletCardStyles } from './ChicletCard.types';
import { IChicletCardProps } from './ChicletCard.types';
import { getStyles } from './ChicletXsmall.styles';
import { ChicletXsmallBase } from './ChicletXsmall.base';

export const ChicletXsmall: React.StatelessComponent<IChicletCardProps> = styled<
  IChicletCardProps,
  IChicletCardStyleProps,
  IChicletCardStyles
>(ChicletXsmallBase, getStyles, undefined, {
  scope: 'ChicletXsmall'
});
