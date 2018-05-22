import {
  IShimmerLineStyleProps,
  IShimmerLineStyles
} from './ShimmerLine.types';
import {
  IStyleSet,
  getGlobalClassNames,
  HighContrastSelector
} from '../../../Styling';

const GlobalClassNames = {
  root: 'ms-ShimmerLine-root',
  topLeftCorner: 'ms-ShimmerLine-topLeftCorner',
  topRightCorner: 'ms-ShimmerLine-topRightCorner',
  bottomLeftCorner: 'ms-ShimmerLine-bottomLeftCorner',
  bottomRightCorner: 'ms-ShimmerLine-bottomRightCorner'
};

export function getStyles(props: IShimmerLineStyleProps): IShimmerLineStyles {
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
  const ACTUAL_WIDTH = widthInPercentage ? widthInPercentage + '%' : widthInPixel ? widthInPixel + 'px' : '100%';

  const sharedCornerStyles: IStyleSet = {
    position: 'absolute',
    fill: palette.white
  };

  return {
    root: [
      classNames.root,
      styles,
      {
        width: ACTUAL_WIDTH,
        height: `${height}px`,
        boxSizing: 'content-box',
        position: 'relative',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderColor: palette.white,
        selectors: {
          [HighContrastSelector]: {
            borderColor: semanticColors.bodyBackground
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
