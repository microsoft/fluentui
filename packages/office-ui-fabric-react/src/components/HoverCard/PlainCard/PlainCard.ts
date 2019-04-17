import { styled } from '../../../Utilities';
import { IPlainCardProps, IPlainCardStyles, IPlainCardStyleProps } from './PlainCard.types';
import { getStyles } from './PlainCard.styles';
import { PlainCardBase } from './PlainCard.base';

export const PlainCard: React.StatelessComponent<IPlainCardProps> = styled<IPlainCardProps, IPlainCardStyleProps, IPlainCardStyles>(
  PlainCardBase,
  getStyles,
  undefined,
  {
    scope: 'PlainCard'
  }
);
