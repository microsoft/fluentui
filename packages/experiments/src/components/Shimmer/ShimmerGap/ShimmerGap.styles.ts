import {
  IShimmerGapStyleProps,
  IShimmerGapStyles
} from './ShimmerGap.types';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';

export function getStyles(props: IShimmerGapStyleProps): IShimmerGapStyles {
  const {
    height,
    widthInPercentage,
    widthInPixel,
    borderAlignStyle
  } = props;

  const styles: IStyleSet = !!borderAlignStyle ? borderAlignStyle : {};
  const ACTUAL_WIDTH = widthInPercentage ? widthInPercentage + '%' : widthInPixel ? widthInPixel + 'px' : '100%';

  return {
    root: [
      'ms-ShimmerGap-line',
      {
        color: 'transparent',
        width: ACTUAL_WIDTH,
        height: `${height}px`,
        boxSizing: 'content-box',
      },
      styles
    ]
  };
}
