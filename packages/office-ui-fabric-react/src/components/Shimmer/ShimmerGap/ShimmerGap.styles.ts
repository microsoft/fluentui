import { IShimmerGapStyleProps, IShimmerGapStyles } from './ShimmerGap.types';
import { IStyleSet, getGlobalClassNames, HighContrastSelector } from '../../../Styling';

const GlobalClassNames = {
  root: 'ms-ShimmerGap-root'
};

export function getStyles(props: IShimmerGapStyleProps): IShimmerGapStyles {
  const { height, borderStyle, theme } = props;

  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const styles: IStyleSet = !!borderStyle ? borderStyle : {};

  return {
    root: [
      classNames.root,
      styles,
      {
        backgroundColor: palette.white,
        height: `${height}px`,
        boxSizing: 'content-box',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderColor: palette.white,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'Window',
            borderColor: 'Window'
          }
        }
      }
    ]
  };
}
