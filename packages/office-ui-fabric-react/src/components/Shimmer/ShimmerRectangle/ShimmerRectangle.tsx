import {
  styled
} from '../../../Utilities';
import { getStyles, IShimmerRectangleProps } from './ShimmerRectangle.styles';
import { ShimmerRectangleBase } from './ShimmerRectangle.base';

export const ShimmerRectangle = styled(
  ShimmerRectangleBase,
  getStyles
);
