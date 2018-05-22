import {
  IShimmerElementsGroupStyleProps,
  IShimmerElementsGroupStyles
} from './ShimmerElementsGroup.types';

export function getStyles(props: IShimmerElementsGroupStyleProps): IShimmerElementsGroupStyles {
  const {
    width,
    flexWrap
  } = props;

  return {
    root: [
      'ms-ShimmerElementsGroup-root',
      {
        display: 'flex',
        alignItems: 'center',
        flexWrap: flexWrap ? 'wrap' : 'nowrap',
        width: width ? width : 'auto'
      }
    ]
  };
}
