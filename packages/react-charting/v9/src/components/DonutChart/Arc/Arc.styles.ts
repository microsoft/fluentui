import { IArcProps, IArcStyles } from './Arc.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';

export const getStyles = (props: IArcProps): IArcStyles => {
  const { color, href, theme } = props;
  return {
    root: {
      fill: color,
      cursor: href ? 'pointer' : 'default',
      stroke: theme.semanticColors.bodyBackground,
      outline: 'transparent',
      selectors: {
        '::-moz-focus-inner': {
          border: '0',
        },
      },
    },
    focusRing: {
      stroke: theme.semanticColors.focusBorder,
      strokeWidth: 4,
      fill: 'transparent',
    },
    arcLabel: {
      fontSize: FontSizes.small,
      fontWeight: FontWeights.semibold,
      fill: theme.palette.neutralPrimary,
    },
  };
};
