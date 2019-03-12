import { styled } from '../../Utilities';
import { IShimmerProps, IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';
import { getStyles } from './Shimmer.styles';
import { ShimmerBase } from './Shimmer.base';

export const Shimmer: React.StatelessComponent<IShimmerProps> = styled<IShimmerProps, IShimmerStyleProps, IShimmerStyles>(
  ShimmerBase,
  getStyles,
  undefined,
  {
    scope: 'Shimmer'
  }
);
