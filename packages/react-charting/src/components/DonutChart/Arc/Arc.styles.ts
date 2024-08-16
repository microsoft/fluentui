import { IArcStyleProps, IArcStyles } from './Arc.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';

export const getStyles = (props: IArcStyleProps): IArcStyles => {
  const { fill, href, theme, enableGradient, opacity } = props;
  return {
    root: {
      fill: enableGradient ? 'transparent' : fill,
      cursor: href ? 'pointer' : 'default',
      stroke: theme.semanticColors.bodyBackground,
      outline: 'transparent',
      selectors: {
        '::-moz-focus-inner': {
          border: '0',
        },
      },
      opacity,
    },
    gradientArc: {
      width: '100%',
      height: '100%',
      background: fill,
      opacity,
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
