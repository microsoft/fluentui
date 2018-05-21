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
        position: 'absolute',
        top: '0',
        left: '0',
        fill: `${DefaultPalette.white}`
      }
    ],
    topRightCorner: [
      'ms-ShimmerLine-topRightCorner',
      {
        position: 'absolute',
        top: '0',
        right: '0',
        fill: `${DefaultPalette.white}`
      }
    ],
    bottomRightCorner: [
      'ms-ShimmerLine-bottomRightCorner',
      {
        position: 'absolute',
        bottom: '0',
        right: '0',
        fill: `${DefaultPalette.white}`
      }
    ],
    bottomLeftCorner: [
      'ms-ShimmerLine-bottomLeftCorner',
      {
        position: 'absolute',
        bottom: '0',
        left: '0',
        fill: `${DefaultPalette.white}`
      }
    ]
  };
}
