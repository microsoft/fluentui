import {
  IShimmerLineStyleProps,
  IShimmerLineStyles
} from './ShimmerLine.types';
import { IStyleSet, DefaultPalette } from '../../../Styling';

export function getStyles(props: IShimmerLineStyleProps): IShimmerLineStyles {
  const {
    height,
    widthInPercentage,
    widthInPixel,
    borderStyle
  } = props;

  const styles: IStyleSet = !!borderStyle ? borderStyle : {};
  const ACTUAL_WIDTH = widthInPercentage ? widthInPercentage + '%' : widthInPixel ? widthInPixel + 'px' : '100%';

  const sharedCornerStyles: IStyleSet = {
    position: 'absolute',
    fill: DefaultPalette.white
  };

  return {
    root: [
      'ms-ShimmerLine-root',
      {
        width: ACTUAL_WIDTH,
        height: `${height}px`,
        boxSizing: 'content-box',
        position: 'relative'
      },
      styles
    ],
    topLeftCorner: [
      'ms-ShimmerLine-topLeftCorner',
      {
        top: '0',
        left: '0'
      },
      sharedCornerStyles
    ],
    topRightCorner: [
      'ms-ShimmerLine-topRightCorner',
      {
        top: '0',
        right: '0'
      },
      sharedCornerStyles
    ],
    bottomRightCorner: [
      'ms-ShimmerLine-bottomRightCorner',
      {
        bottom: '0',
        right: '0'
      },
      sharedCornerStyles
    ],
    bottomLeftCorner: [
      'ms-ShimmerLine-bottomLeftCorner',
      {
        bottom: '0',
        left: '0'
      },
      sharedCornerStyles
    ]
  };
}
