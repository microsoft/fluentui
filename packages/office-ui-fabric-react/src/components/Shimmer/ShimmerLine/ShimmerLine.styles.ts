import { IShimmerLineStyleProps, IShimmerLineStyles } from './ShimmerLine.types';
import { IStyleSet, getGlobalClassNames, HighContrastSelector } from '../../../Styling';

const GlobalClassNames = {
  root: 'ms-ShimmerLine-root',
  topLeftCorner: 'ms-ShimmerLine-topLeftCorner',
  topRightCorner: 'ms-ShimmerLine-topRightCorner',
  bottomLeftCorner: 'ms-ShimmerLine-bottomLeftCorner',
  bottomRightCorner: 'ms-ShimmerLine-bottomRightCorner'
};

export function getStyles(props: IShimmerLineStyleProps): IShimmerLineStyles {
  const { height, borderStyle, theme } = props;

  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const styles: IStyleSet = !!borderStyle ? borderStyle : { borderWidth: '0px' };

  const sharedCornerStyles: IStyleSet = {
    position: 'absolute',
    fill: palette.white
  };

  return {
    root: [
      classNames.root,
      styles,
      {
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
