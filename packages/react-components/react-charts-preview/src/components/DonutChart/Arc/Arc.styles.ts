import { IArcProps, IArcStyles } from './Arc.types';
import { tokens } from '@fluentui/react-theme';

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
      fontSize: tokens.fontSizeBase100,
      fontWeight: tokens.fontWeightSemibold,
      fill: theme.palette.neutralPrimary,
    },
  };
};
