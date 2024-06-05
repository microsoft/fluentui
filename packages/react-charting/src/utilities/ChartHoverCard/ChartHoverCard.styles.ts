import { IChartHoverCardStyles, IChartHoverCardStyleProps } from './ChartHoverCard.types';
import { FontWeights, HighContrastSelector, HighContrastSelectorBlack } from '@fluentui/react/lib/Styling';

export const getChartHoverCardStyles = (props: IChartHoverCardStyleProps): IChartHoverCardStyles => {
  const { color, XValue, theme, isRatioPresent = false } = props;
  return {
    calloutContentRoot: [
      {
        display: 'grid',
        overflow: 'hidden',
        padding: '11px 16px 10px 16px',
        backgroundColor: theme.semanticColors.bodyBackground,
        backgroundBlendMode: 'normal, luminosity',
      },
    ],
    calloutDateTimeContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    calloutContentX: [
      theme.fonts.small,
      {
        lineHeight: '16px',
        opacity: '0.85',
        color: theme.semanticColors.bodySubtext,
      },
    ],
    calloutBlockContainer: [
      theme.fonts.xxLarge,
      {
        marginTop: XValue ? '13px' : 'unset',
        paddingLeft: '8px',
        lineHeight: '22px',
        color: theme.semanticColors.bodyText,
        borderLeft: `4px solid ${color}`,
        selectors: {
          [HighContrastSelector]: {
            forcedColorAdjust: 'none',
          },
        },
      },
    ],
    calloutlegendText: [
      theme.fonts.small,
      {
        lineHeight: '16px',
        color: theme.semanticColors.bodyText,
        selectors: {
          [HighContrastSelectorBlack]: {
            color: 'rgb(255, 255, 255)',
          },
        },
      },
    ],
    calloutContentY: [
      theme.fonts.xxLarge,
      {
        color: color ? color : theme.semanticColors.bodyText,
        fontWeight: 'bold',
        lineHeight: '36px',
        selectors: {
          [HighContrastSelectorBlack]: {
            color: 'rgb(255, 255, 255)',
          },
        },
      },
    ],
    calloutInfoContainer: [
      isRatioPresent && {
        display: 'flex',
        alignItems: 'flex-end',
      },
    ],
    ratio: [
      theme.fonts.small,
      {
        marginLeft: '6px',
        color: theme.semanticColors.bodyText,
      },
    ],
    numerator: {
      fontWeight: FontWeights.bold,
    },
    denominator: {
      fontWeight: FontWeights.semibold,
    },
    descriptionMessage: [
      theme.fonts.small,
      {
        color: theme.semanticColors.bodyText,
        marginTop: '10px',
        paddingTop: '10px',
        borderTop: `1px solid ${theme.semanticColors.menuDivider}`,
      },
    ],
  };
};
