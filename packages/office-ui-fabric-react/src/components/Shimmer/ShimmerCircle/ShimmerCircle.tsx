import {
  styled
} from '../../../Utilities';
import { getStyles, IShimmerCircleProps, IShimmerCircleStyleProps, IShimmerCircleStyles } from './ShimmerCircle.styles';
import { ShimmerCircleBase } from './ShimmerCircle.base';

export const ShimmerCircle = styled<IShimmerCircleProps, IShimmerCircleStyleProps, IShimmerCircleStyles>(
  ShimmerCircleBase,
  getStyles
);
