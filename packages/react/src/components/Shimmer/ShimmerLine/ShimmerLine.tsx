import * as React from 'react';
import { styled } from '../../../Utilities';
import { IShimmerLineProps, IShimmerLineStyleProps, IShimmerLineStyles } from './ShimmerLine.types';
import { ShimmerLineBase } from './ShimmerLine.base';
import { getStyles } from './ShimmerLine.styles';

export const ShimmerLine: React.FunctionComponent<IShimmerLineProps> = styled<
  IShimmerLineProps,
  IShimmerLineStyleProps,
  IShimmerLineStyles
>(ShimmerLineBase, getStyles, undefined, {
  scope: 'ShimmerLine',
});
