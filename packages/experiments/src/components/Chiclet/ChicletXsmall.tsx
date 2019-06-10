import { styled } from '../../Utilities';
import { IChicletXsmallStyleProps, IChicletXsmallStyles } from './ChicletXsmall.types';
import { IChicletCardProps } from './ChicletCard.types';
import { getStyles } from './ChicletXsmall.styles';
import { ChicletXsmallBase } from './ChicletXsmall.base';

export const ChicletXsmall: React.StatelessComponent<IChicletCardProps> = styled<
  IChicletCardProps,
  IChicletXsmallStyleProps,
  IChicletXsmallStyles
>(ChicletXsmallBase, getStyles, undefined, {
  scope: 'ChicletXsmall'
});
