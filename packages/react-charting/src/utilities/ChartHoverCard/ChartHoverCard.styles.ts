import { IChartHoverCardStyles, IChartHoverCardStyleProps, ChartHoverCardVariant } from './ChartHoverCard.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';

export const getChartHoverCardStyles = (props: IChartHoverCardStyleProps): IChartHoverCardStyles => {
  const { theme, variant, hasBothMetrics } = props;
  return {
    calloutContentRoot: {
      ...theme.fonts.medium,
      color: theme.semanticColors.bodyText,
      padding: '16px',
      backgroundColor: theme.semanticColors.bodyBackground,
      backgroundBlendMode: 'normal, luminosity',
    },

    calloutDateTimeContainer: {},

    calloutContentX: {
      fontWeight: FontWeights.semibold,
      marginBottom: '8px',
    },

    calloutBlockContainer: {
      display: 'flex',
      alignItems: 'center',
    },

    calloutlegendText: {
      marginRight: variant === ChartHoverCardVariant.LongLegend ? '0px' : '24px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      marginBottom: variant === ChartHoverCardVariant.LongLegend ? '4px' : '0px',
    },

    calloutContentY: {
      fontWeight: FontWeights.semibold,
      flexShrink: 0,
    },

    calloutInfoContainer: {},

    ratio: {
      marginLeft: hasBothMetrics ? '24px' : '0px',
      flexShrink: 0,
    },

    numerator: {
      fontWeight: FontWeights.semibold,
    },

    denominator: {},

    descriptionMessage: {
      fontSize: FontSizes.small,
    },

    calloutLegendIcon: {
      marginRight: '8px',
    },

    divider: {
      height: '1px',
      backgroundColor: '#c8c8c8',
      marginTop: '8px',
      marginBottom: '8px',
    },

    updatedTime: {
      marginTop: '8px',
      fontSize: FontSizes.small,
    },
  };
};
