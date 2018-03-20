import {
  IShimmerLineStyleProps,
  IShimmerLineStyles
} from './ShimmerLine.types';
import { IStyleSet } from 'office-ui-fabric-react';

export function getStyles(props: IShimmerLineStyleProps): IShimmerLineStyles {
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
      'ms-ShimmerLine-line',
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
