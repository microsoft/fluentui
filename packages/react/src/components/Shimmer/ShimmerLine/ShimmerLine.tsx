import * as React from 'react';
import { styled } from '../../../Utilities';
import { ShimmerLineBase } from './ShimmerLine.base';
import { getStyles } from './ShimmerLine.styles';
import type { IShimmerLineProps, IShimmerLineStyleProps, IShimmerLineStyles } from './ShimmerLine.types';

export const ShimmerLine: React.FunctionComponent<IShimmerLineProps> = styled<
  IShimmerLineProps,
  IShimmerLineStyleProps,
  IShimmerLineStyles
>(ShimmerLineBase, getStyles, undefined, {
  scope: 'ShimmerLine',
});
