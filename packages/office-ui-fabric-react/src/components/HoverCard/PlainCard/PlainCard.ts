import * as React from 'react';
import { styled } from '../../../Utilities';
import { IPlainCardProps, IPlainCardStyles, IPlainCardStyleProps } from './PlainCard.types';
import { getStyles } from './PlainCard.styles';
import { PlainCardBase } from './PlainCard.base';

export const PlainCard: React.FunctionComponent<IPlainCardProps> = styled<
  IPlainCardProps,
  IPlainCardStyleProps,
  IPlainCardStyles
>(PlainCardBase, getStyles, undefined, {
  scope: 'PlainCard',
});
