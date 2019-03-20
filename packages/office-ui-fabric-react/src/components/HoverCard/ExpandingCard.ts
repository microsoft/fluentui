import { styled } from '../../Utilities';
import { IExpandingCardProps, IExpandingCardStyles, IExpandingCardStyleProps } from './ExpandingCard.types';
import { getStyles } from './ExpandingCard.styles';
import { ExpandingCardBase } from './ExpandingCard.base';

export const ExpandingCard: React.StatelessComponent<IExpandingCardProps> = styled<
  IExpandingCardProps,
  IExpandingCardStyleProps,
  IExpandingCardStyles
>(ExpandingCardBase, getStyles, undefined, {
  scope: 'ExpandingCard'
});
