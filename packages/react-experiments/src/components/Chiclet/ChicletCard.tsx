import * as React from 'react';
import { styled } from '../../Utilities';
import { getStyles } from './ChicletCard.styles';
import { ChicletCardBase } from './ChicletCard.base';
import type { IChicletCardProps, IChicletCardStyleProps, IChicletCardStyles } from './ChicletCard.types';

export const ChicletCard: React.FunctionComponent<IChicletCardProps> = styled<
  IChicletCardProps,
  IChicletCardStyleProps,
  IChicletCardStyles
>(ChicletCardBase, getStyles, undefined, {
  scope: 'ChicletCard',
});
