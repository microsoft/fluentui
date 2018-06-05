import { IShimmerTileStyleProps, IShimmerTileStyles } from './ShimmerTile.types';

export function getStyles(props: IShimmerTileStyleProps): IShimmerTileStyles {
  const {} = props;

  return {
    root: [
      'ms-ShimmerTile-root',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }
    ]
  };
}
