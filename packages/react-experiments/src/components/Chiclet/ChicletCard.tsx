import * as React from 'react';
import { styled } from '../../Utilities';
import { IChicletCardProps, IChicletCardStyleProps, IChicletCardStyles } from './ChicletCard.types';
import { getStyles } from './ChicletCard.styles';
import { ChicletCardBase } from './ChicletCard.base';

export const ChicletCard: React.FunctionComponent<IChicletCardProps> = styled<
  IChicletCardProps,
  IChicletCardStyleProps,
  IChicletCardStyles
>(ChicletCardBase, getStyles, undefined, {
  scope: 'ChicletCard',
});
