import { IPieStyleProps, IPieStyles } from './Pie.types';
import { FontSizes, FontWeights, HighContrastSelector } from '@fluentui/react/lib/Styling';

export const getStyles = (props: IPieStyleProps): IPieStyles => {
  const { theme } = props;
  return {
    root: {},
    insideDonutString: {
      fontSize: FontSizes.xLargePlus,
      fontWeight: FontWeights.semibold,
      fill: theme.semanticColors.bodyText,
      selectors: {
        [HighContrastSelector]: {
          fill: 'CanvasText',
        },
      },
    },
  };
};
