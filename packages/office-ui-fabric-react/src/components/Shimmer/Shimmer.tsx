import {
  styled
} from '../../Utilities';
import { IShimmerProps } from './Shimmer.types';
import { getStyles } from './Shimmer.styles';
import { ShimmerBase } from './Shimmer.base';

export const Shimmer = styled(
  ShimmerBase,
  getStyles
);
