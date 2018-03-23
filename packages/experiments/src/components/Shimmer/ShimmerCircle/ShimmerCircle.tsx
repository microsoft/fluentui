import {
  styled
} from '../../../Utilities';
import { getStyles } from './ShimmerCircle.styles';
import {
  IShimmerCircleProps,
  IShimmerCircleStyleProps,
  IShimmerCircleStyles
} from './ShimmerCircle.types';
import { ShimmerCircleBase } from './ShimmerCircle.base';

export const ShimmerCircle = styled<IShimmerCircleProps, IShimmerCircleStyleProps, IShimmerCircleStyles>(
  ShimmerCircleBase,
  getStyles
);
