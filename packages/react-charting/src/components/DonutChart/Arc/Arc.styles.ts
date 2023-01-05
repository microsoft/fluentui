import { IArcProps, IArcStyles } from './Arc.types';
import { DefaultPalette, FontSizes, HighContrastSelectorBlack } from '@fluentui/react/lib/Styling';

export const getStyles = (props: IArcProps): IArcStyles => {
  const { color, href, theme } = props;
  return {
    root: {
      fill: color,
      cursor: href ? 'pointer' : 'default',
      stroke: DefaultPalette.white,
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
    insideDonutString: {
      fontSize: FontSizes.large,
      fill: theme.semanticColors.bodyText,
      selectors: {
        [HighContrastSelectorBlack]: {
          fill: 'rgb(179, 179, 179)',
        },
      },
    },
    tooltip: {
      ...theme.fonts.medium,
      display: 'flex',
      flexDirection: 'column',
      padding: '8px',
      position: 'absolute',
      textAlign: 'center',
      top: '0px',
      background: theme.semanticColors.bodyBackground,
      borderRadius: '2px',
      pointerEvents: 'none',
    },
    nodeTextContainer: {
      selectors: {
        text: {
          selectors: {
            [HighContrastSelectorBlack]: {
              fill: 'rgb(179, 179, 179)',
            },
          },
        },
      },
      marginTop: '4px',
      marginLeft: '8px',
      marginBottom: '4px',
      marginRight: '8px',
    },
  };
};
