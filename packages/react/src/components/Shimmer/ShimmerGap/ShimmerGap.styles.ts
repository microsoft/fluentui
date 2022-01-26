import { getGlobalClassNames, HighContrastSelector } from '../../../Styling';
import type { IShimmerGapStyleProps, IShimmerGapStyles } from './ShimmerGap.types';
import type { IRawStyle } from '../../../Styling';

const GlobalClassNames = {
  root: 'ms-ShimmerGap-root',
};

export function getStyles(props: IShimmerGapStyleProps): IShimmerGapStyles {
  // eslint-disable-next-line deprecation/deprecation
  const { height, borderStyle, theme } = props;

  const { semanticColors } = theme;
  const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

  const borderStyles: IRawStyle = borderStyle || {};

  return {
    root: [
      globalClassNames.root,
      theme.fonts.medium,
      {
        backgroundColor: semanticColors.bodyBackground,
        height: `${height}px`,
        boxSizing: 'content-box',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderColor: semanticColors.bodyBackground,
        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'Window',
            borderColor: 'Window',
          },
        },
      },
      borderStyles,
    ],
  };
}
