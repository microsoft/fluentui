import { IShimmerLineStyleProps, IShimmerLineStyles } from './ShimmerLine.types';
import { IStyle, getGlobalClassNames, HighContrastSelector } from '../../../Styling';

const GlobalClassNames = {
  root: 'ms-ShimmerLine-root',
  topLeftCorner: 'ms-ShimmerLine-topLeftCorner',
  topRightCorner: 'ms-ShimmerLine-topRightCorner',
  bottomLeftCorner: 'ms-ShimmerLine-bottomLeftCorner',
  bottomRightCorner: 'ms-ShimmerLine-bottomRightCorner'
};

export function getStyles(props: IShimmerLineStyleProps): IShimmerLineStyles {
  const { height, widthInPercentage, widthInPixel, borderStyle, theme } = props;

  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const styles: IStyle = !!borderStyle ? borderStyle : { borderWidth: '0px' };
  const ACTUAL_WIDTH = widthInPercentage ? widthInPercentage + '%' : widthInPixel ? widthInPixel + 'px' : '100%';

  const sharedCornerStyles: IStyle = {
    position: 'absolute',
    fill: palette.white
  };

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      styles,
      {
        width: ACTUAL_WIDTH,
        minWidth: widthInPixel ? ACTUAL_WIDTH : 'auto', // Fix for IE11 flex items
        height: `${height}px`,
        boxSizing: 'content-box',
        position: 'relative',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderColor: palette.white,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Window',
            selectors: {
              '> *': {
                fill: 'Window'
              }
            }
          }
        }
      }
    ],
    topLeftCorner: [
      classNames.topLeftCorner,
      {
        top: '0',
        left: '0'
      },
      sharedCornerStyles
    ],
    topRightCorner: [
      classNames.topRightCorner,
      {
        top: '0',
        right: '0'
      },
      sharedCornerStyles
    ],
    bottomRightCorner: [
      classNames.bottomRightCorner,
      {
        bottom: '0',
        right: '0'
      },
      sharedCornerStyles
    ],
    bottomLeftCorner: [
      classNames.bottomLeftCorner,
      {
        bottom: '0',
        left: '0'
      },
      sharedCornerStyles
    ]
  };
}
