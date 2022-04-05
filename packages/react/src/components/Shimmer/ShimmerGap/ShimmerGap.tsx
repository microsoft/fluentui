import * as React from 'react';
import { styled } from '../../../Utilities';
import { ShimmerGapBase } from './ShimmerGap.base';
import { getStyles } from './ShimmerGap.styles';
import type { IShimmerGapProps, IShimmerGapStyleProps, IShimmerGapStyles } from './ShimmerGap.types';

export const ShimmerGap: React.FunctionComponent<IShimmerGapProps> = styled<
  IShimmerGapProps,
  IShimmerGapStyleProps,
  IShimmerGapStyles
>(ShimmerGapBase, getStyles, undefined, {
  scope: 'ShimmerGap',
});
