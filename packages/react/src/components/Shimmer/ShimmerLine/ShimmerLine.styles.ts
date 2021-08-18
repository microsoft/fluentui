import { getGlobalClassNames, HighContrastSelector } from '../../../Styling';
import type { IShimmerLineStyleProps, IShimmerLineStyles } from './ShimmerLine.types';
import type { IRawStyle } from '../../../Styling';

const GlobalClassNames = {
  root: 'ms-ShimmerLine-root',
  topLeftCorner: 'ms-ShimmerLine-topLeftCorner',
  topRightCorner: 'ms-ShimmerLine-topRightCorner',
  bottomLeftCorner: 'ms-ShimmerLine-bottomLeftCorner',
  bottomRightCorner: 'ms-ShimmerLine-bottomRightCorner',
};

export function getStyles(props: IShimmerLineStyleProps): IShimmerLineStyles {
  // eslint-disable-next-line deprecation/deprecation
  const { height, borderStyle, theme } = props;

  const { semanticColors } = theme;
  const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

  const borderStyles: IRawStyle = borderStyle || {};

  const sharedCornerStyles: IRawStyle = {
    position: 'absolute',
    fill: semanticColors.bodyBackground,
  };

  return {
    root: [
      globalClassNames.root,
      theme.fonts.medium,
      {
        height: `${height}px`,
        boxSizing: 'content-box',
        position: 'relative',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderColor: semanticColors.bodyBackground,
        borderWidth: 0,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Window',
            selectors: {
              '> *': {
                fill: 'Window',
              },
            },
          },
        },
      },
      borderStyles,
    ],
    topLeftCorner: [
      globalClassNames.topLeftCorner,
      {
        top: '0',
        left: '0',
      },
      sharedCornerStyles,
    ],
    topRightCorner: [
      globalClassNames.topRightCorner,
      {
        top: '0',
        right: '0',
      },
      sharedCornerStyles,
    ],
    bottomRightCorner: [
      globalClassNames.bottomRightCorner,
      {
        bottom: '0',
        right: '0',
      },
      sharedCornerStyles,
    ],
    bottomLeftCorner: [
      globalClassNames.bottomLeftCorner,
      {
        bottom: '0',
        left: '0',
      },
      sharedCornerStyles,
    ],
  };
}
