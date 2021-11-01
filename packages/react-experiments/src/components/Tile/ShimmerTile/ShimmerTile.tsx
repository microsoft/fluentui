import * as React from 'react';
import { styled } from '../../../Utilities';
import { ShimmerTileBase } from './ShimmerTile.base';
import { getStyles } from './ShimmerTile.styles';
import type { IShimmerTileProps, IShimmerTileStyleProps, IShimmerTileStyles } from './ShimmerTile.types';

export const ShimmerTile: React.FunctionComponent<IShimmerTileProps> = styled<
  IShimmerTileProps,
  IShimmerTileStyleProps,
  IShimmerTileStyles
>(ShimmerTileBase, getStyles);
