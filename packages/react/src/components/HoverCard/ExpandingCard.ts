import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './ExpandingCard.styles';
import { ExpandingCardBase } from './ExpandingCard.base';
import type { IExpandingCardProps, IExpandingCardStyles, IExpandingCardStyleProps } from './ExpandingCard.types';

export const ExpandingCard: React.FunctionComponent<IExpandingCardProps> = styled<
  IExpandingCardProps,
  IExpandingCardStyleProps,
  IExpandingCardStyles
>(ExpandingCardBase, getStyles, undefined, {
  scope: 'ExpandingCard',
});
