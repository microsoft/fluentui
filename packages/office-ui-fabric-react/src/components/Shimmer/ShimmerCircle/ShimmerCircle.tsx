import {
  styled
} from '../../../Utilities';
import { getStyles, IShimmerCircleProps } from './ShimmerCircle.styles';
import { ShimmerCircleBase } from './ShimmerCircle.base';

export const ShimmerCircle = styled(
  ShimmerCircleBase,
  getStyles
);
