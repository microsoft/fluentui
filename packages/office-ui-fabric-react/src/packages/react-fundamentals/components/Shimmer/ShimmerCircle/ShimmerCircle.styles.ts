import { IShimmerCircleStyleProps, IShimmerCircleStyles } from './ShimmerCircle.types';
import { getGlobalClassNames, HighContrastSelector, IRawStyle } from '../../../Styling';

const GlobalClassNames = {
  root: 'ms-ShimmerCircle-root',
  svg: 'ms-ShimmerCircle-svg'
};

export function getStyles(props: IShimmerCircleStyleProps): IShimmerCircleStyles {
  const { height, borderStyle, theme } = props;

  const { semanticColors } = theme;
  const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

  const borderStyles: IRawStyle = !!borderStyle ? borderStyle : {};

  return {
    root: [
      globalClassNames.root,
      theme.fonts.medium,
      {
        width: `${height}px`,
        height: `${height}px`,
        minWidth: `${height}px`, // Fix for IE11 flex items
        boxSizing: 'content-box',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderColor: semanticColors.bodyBackground,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Window'
          }
        }
      },
      borderStyles
    ],
    svg: [
      globalClassNames.svg,
      {
        display: 'block',
        fill: semanticColors.bodyBackground,
        selectors: {
          [HighContrastSelector]: {
            fill: 'Window'
          }
        }
      }
    ]
  };
}
