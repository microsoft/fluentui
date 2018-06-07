import { IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles } from './ShimmerElementsGroup.types';
import { getGlobalClassNames } from '../../../Styling';

const GlobalClassNames = {
  root: 'ms-ShimmerElementsGroup-root'
};

export function getStyles(props: IShimmerElementsGroupStyleProps): IShimmerElementsGroupStyles {
  const { width, flexWrap, theme } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        display: 'flex',
        alignItems: 'center',
        flexWrap: flexWrap ? 'wrap' : 'nowrap',
        width: width ? width : 'auto'
      }
    ]
  };
}
