import {
  IShimmerTileStyleProps,
  IShimmerTileStyles
} from './ShimmerTile.types';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';

export function getStyles(props: IShimmerTileStyleProps): IShimmerTileStyles {
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
      'ms-ShimmerTile-line',
      {
        width: ACTUAL_WIDTH,
        height: `${height}px`,
        boxSizing: 'content-box',
      },
      styles
    ]
  };
}
