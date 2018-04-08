import {
  IShimmerGapStyleProps,
  IShimmerGapStyles
} from './ShimmerGap.types';
import { IStyleSet, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export function getStyles(props: IShimmerGapStyleProps): IShimmerGapStyles {
  const {
    height,
    widthInPercentage,
    widthInPixel,
    borderStyle
  } = props;

  const styles: IStyleSet = !!borderStyle ? borderStyle : {};
  const ACTUAL_WIDTH = widthInPercentage ? widthInPercentage + '%' : widthInPixel ? widthInPixel + 'px' : '10px';

  return {
    root: [
      'ms-ShimmerGap-line',
      {
        backgroundColor: `${DefaultPalette.white}`,
        width: ACTUAL_WIDTH,
        height: `${height}px`,
        boxSizing: 'content-box',
      },
      styles
    ]
  };
}
