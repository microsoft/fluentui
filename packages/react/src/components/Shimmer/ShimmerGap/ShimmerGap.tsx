import * as React from 'react';
import { styled } from '../../../Utilities';
import { IShimmerGapProps, IShimmerGapStyleProps, IShimmerGapStyles } from './ShimmerGap.types';
import { ShimmerGapBase } from './ShimmerGap.base';
import { getStyles } from './ShimmerGap.styles';

export const ShimmerGap: React.FunctionComponent<IShimmerGapProps> = styled<
  IShimmerGapProps,
  IShimmerGapStyleProps,
  IShimmerGapStyles
>(ShimmerGapBase, getStyles, undefined, {
  scope: 'ShimmerGap',
});
