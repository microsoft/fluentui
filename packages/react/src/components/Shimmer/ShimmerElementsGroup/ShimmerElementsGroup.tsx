import * as React from 'react';
import { styled } from '../../../Utilities';
import { ShimmerElementsGroupBase } from './ShimmerElementsGroup.base';
import { getStyles } from './ShimmerElementsGroup.styles';
import type {
  IShimmerElementsGroupProps,
  IShimmerElementsGroupStyleProps,
  IShimmerElementsGroupStyles,
} from './ShimmerElementsGroup.types';

export const ShimmerElementsGroup: React.FunctionComponent<IShimmerElementsGroupProps> = styled<
  IShimmerElementsGroupProps,
  IShimmerElementsGroupStyleProps,
  IShimmerElementsGroupStyles
>(ShimmerElementsGroupBase, getStyles, undefined, { scope: 'ShimmerElementsGroup' });
