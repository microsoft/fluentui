import * as React from 'react';
import { styled } from '../../../Utilities';
import { IShimmerTileProps, IShimmerTileStyleProps, IShimmerTileStyles } from './ShimmerTile.types';
import { ShimmerTileBase } from './ShimmerTile.base';
import { getStyles } from './ShimmerTile.styles';

export const ShimmerTile: React.FunctionComponent<IShimmerTileProps> = styled<
  IShimmerTileProps,
  IShimmerTileStyleProps,
  IShimmerTileStyles
>(ShimmerTileBase, getStyles);
