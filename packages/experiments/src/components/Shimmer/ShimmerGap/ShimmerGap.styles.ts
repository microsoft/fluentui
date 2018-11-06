import { IShimmerGapStyleProps, IShimmerGapStyles } from './ShimmerGap.types';
import { IStyle, getGlobalClassNames, HighContrastSelector } from '../../../Styling';

const GlobalClassNames = {
  root: 'ms-ShimmerGap-root'
};

export function getStyles(props: IShimmerGapStyleProps): IShimmerGapStyles {
  const { height, widthInPercentage, widthInPixel, borderStyle, theme } = props;

  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const styles: IStyle = !!borderStyle ? borderStyle : {};
  const ACTUAL_WIDTH = widthInPercentage ? widthInPercentage + '%' : widthInPixel ? widthInPixel + 'px' : '10px';

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      styles,
      {
        backgroundColor: palette.white,
        width: ACTUAL_WIDTH,
        minWidth: widthInPixel ? ACTUAL_WIDTH : 'auto', // Fix for IE11 flex items
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
