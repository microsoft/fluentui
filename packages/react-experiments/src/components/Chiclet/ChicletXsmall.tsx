import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './ChicletXsmall.styles';
import { ChicletXsmallBase } from './ChicletXsmall.base';
import type { IChicletCardStyleProps, IChicletCardStyles, IChicletCardProps } from './ChicletCard.types';

export const ChicletXsmall: React.FunctionComponent<IChicletCardProps> = styled<
  IChicletCardProps,
  IChicletCardStyleProps,
  IChicletCardStyles
>(ChicletXsmallBase, getStyles, undefined, {
  scope: 'ChicletXsmall',
});
