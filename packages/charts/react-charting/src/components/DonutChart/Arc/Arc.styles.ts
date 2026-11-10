import { IArcStyleProps, IArcStyles } from './Arc.types';
import { FontSizes, FontWeights, HighContrastSelector } from '@fluentui/react/lib/Styling';

export const getStyles = (props: IArcStyleProps): IArcStyles => {
  const { solidFill, gradientFill, href, theme, opacity } = props;
  return {
    root: {
      fill: solidFill,
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
      background: gradientFill,
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
      selectors: {
        [HighContrastSelector]: {
          fill: 'CanvasText',
        },
      },
    },
  };
};
