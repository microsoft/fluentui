import {
  styled
} from '../../../Utilities';
import {
  IShimmerRectangleProps,
  IShimmerRectangleStyleProps,
  IShimmerRectangleStyles
} from './ShimmerRectangle.types';
import { ShimmerRectangleBase } from './ShimmerRectangle.base';
import { getStyles } from './ShimmerRectangle.styles';

export const ShimmerRectangle = styled<IShimmerRectangleProps, IShimmerRectangleStyleProps, IShimmerRectangleStyles>(
  ShimmerRectangleBase,
  getStyles
);
