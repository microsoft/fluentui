import {
  IShimmerLineStyleProps,
  IShimmerLineStyles
} from './ShimmerLine.types';
import { IStyleSet } from '../../../Styling';

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
      },
      styles
    ]
  };
}
