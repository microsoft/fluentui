import * as React from 'react';
import { styled } from '../../../Utilities';
import { getStyles } from './PlainCard.styles';
import { PlainCardBase } from './PlainCard.base';
import type { IPlainCardProps, IPlainCardStyles, IPlainCardStyleProps } from './PlainCard.types';

export const PlainCard: React.FunctionComponent<IPlainCardProps> = styled<
  IPlainCardProps,
  IPlainCardStyleProps,
  IPlainCardStyles
>(PlainCardBase, getStyles, undefined, {
  scope: 'PlainCard',
});
