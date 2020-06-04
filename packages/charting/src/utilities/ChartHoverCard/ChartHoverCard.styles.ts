import { getTheme, ITheme } from 'office-ui-fabric-react';
import { IChartHoverCardStyles, IChartHoverCardProps } from './ChartHoverCard.types';

const theme: ITheme = getTheme();
const { fonts } = theme;
export const getChartHoverCardStyles = (props: IChartHoverCardProps): IChartHoverCardStyles => {
  const { color, XValue } = props;
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
      {
        ...fonts.small,
        lineHeight: '16px',
        opacity: '0.8',
        color: theme.semanticColors.bodySubtext,
      },
    ],
    calloutBlockContainer: {
      ...fonts.xxLarge,
      marginTop: XValue ? '13px' : 'unset',
      paddingLeft: '8px',
      lineHeight: '22px',
      color: theme.semanticColors.bodyText,
      borderLeft: `4px solid ${color}`,
    },
    calloutlegendText: {
      ...fonts.small,
      lineHeight: '16px',
      color: theme.semanticColors.bodyText,
    },
    calloutContentY: [
      {
        ...fonts.xxLarge,
        color: color ? color : theme.semanticColors.bodyText,
        fontWeight: 'bold',
        lineHeight: '36px',
      },
    ],
  };
};
