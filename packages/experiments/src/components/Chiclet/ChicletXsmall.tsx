import { styled } from '../../Utilities';
import { IChicletXsmallProps, IChicletXsmallStyleProps, IChicletXsmallStyles } from './ChicletXsmall.types';
import { getStyles } from './ChicletXsmall.styles';
import { ChicletXsmallBase } from './ChicletXsmall.base';

export const ChicletXsmall: React.StatelessComponent<IChicletXsmallProps> = styled<
  IChicletXsmallProps,
  IChicletXsmallStyleProps,
  IChicletXsmallStyles
>(ChicletXsmallBase, getStyles, undefined, {
  scope: 'ChicletXsmall'
});
