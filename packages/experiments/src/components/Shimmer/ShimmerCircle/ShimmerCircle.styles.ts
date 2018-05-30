import {
  IShimmerCircleStyleProps,
  IShimmerCircleStyles
} from './ShimmerCircle.types';
import { IStyleSet, DefaultPalette } from '../../../Styling';

export function getStyles(props: IShimmerCircleStyleProps): IShimmerCircleStyles {
  const {
    height,
    borderStyle
  } = props;

  const styles: IStyleSet = !!borderStyle ? borderStyle : {};

  return {
    root: [
      'ms-ShimmerCircle-root',
      {
        width: `${height}px`,
        height: `${height}px`,
      },
      styles
    ],
    svg: [
      'ms-ShimmerCircle-svg',
      {
        fill: `${DefaultPalette.white}`
      }
    ]
  };
}
