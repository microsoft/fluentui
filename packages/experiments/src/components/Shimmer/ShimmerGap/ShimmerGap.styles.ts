import {
  IShimmerGapStyleProps,
  IShimmerGapStyles
} from './ShimmerGap.types';
import {
  IStyleSet,
  getGlobalClassNames,
  HighContrastSelector
} from '../../../Styling';

const GlobalClassNames = {
  root: 'ms-ShimmerGap-root'
};

export function getStyles(props: IShimmerGapStyleProps): IShimmerGapStyles {
  const {
    height,
    widthInPercentage,
    widthInPixel,
    borderStyle,
    theme
  } = props;

  const { palette, semanticColors } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const styles: IStyleSet = !!borderStyle ? borderStyle : {};
  const ACTUAL_WIDTH = widthInPercentage ? widthInPercentage + '%' : widthInPixel ? widthInPixel + 'px' : '10px';

  return {
    root: [
      classNames.root,
      styles,
      {
        backgroundColor: palette.white,
        width: ACTUAL_WIDTH,
        height: `${height}px`,
        boxSizing: 'content-box',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderColor: palette.white,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: semanticColors.bodyBackground,
            borderColor: semanticColors.bodyBackground
          }
        }
      }
    ]
  };
}
