import {
  IShimmerCircleStyleProps,
  IShimmerCircleStyles
} from './ShimmerCircle.types';
import {
  IStyleSet,
  DefaultPalette
} from 'office-ui-fabric-react';

export function getStyles(props: IShimmerCircleStyleProps): IShimmerCircleStyles {
  const {
    height,
    borderAlignStyle
  } = props;

  const styles: IStyleSet = !!borderAlignStyle ? borderAlignStyle : {};

  return {
    root: [
      'ms-ShimmerCircle-wrapper',
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
