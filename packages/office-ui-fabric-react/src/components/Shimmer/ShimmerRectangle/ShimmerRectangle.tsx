import {
  styled
} from '../../../Utilities';
import { getStyles, IShimmerRectangleProps, IShimmerRectangleStyleProps, IShimmerRectangleStyles } from './ShimmerRectangle.styles';
import { ShimmerRectangleBase } from './ShimmerRectangle.base';

export const ShimmerRectangle = styled<IShimmerRectangleProps, IShimmerRectangleStyleProps, IShimmerRectangleStyles>(
  ShimmerRectangleBase,
  getStyles
);
