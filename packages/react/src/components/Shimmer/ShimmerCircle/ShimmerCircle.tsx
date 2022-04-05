import * as React from 'react';
import { styled } from '../../../Utilities';
import { getStyles } from './ShimmerCircle.styles';
import { ShimmerCircleBase } from './ShimmerCircle.base';
import type { IShimmerCircleProps, IShimmerCircleStyleProps, IShimmerCircleStyles } from './ShimmerCircle.types';

export const ShimmerCircle: React.FunctionComponent<IShimmerCircleProps> = styled<
  IShimmerCircleProps,
  IShimmerCircleStyleProps,
  IShimmerCircleStyles
>(ShimmerCircleBase, getStyles, undefined, { scope: 'ShimmerCircle' });
