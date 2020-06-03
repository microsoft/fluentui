import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { IHorizontalBarChartStyleProps, IHorizontalBarChartStyles } from './HorizontalBarChart.types';

export const getHorizontalBarChartStyles = (props: IHorizontalBarChartStyleProps): IHorizontalBarChartStyles => {
  const { className, theme, width, color } = props;
  const { palette, fonts } = theme!;

  return {
    root: [
      {
        display: 'flex',
        flexDirection: 'column',
        width: width ? width : '100%',
      },
      className,
    ],
    items: {
      height: '32px',
      marginTop: '5px',
    },
    chart: {
      width: '100%',
      height: '8px',
      marginBottom: '11px',
    },
    barWrapper: {
      stroke: theme.palette.white,
      strokeWidth: 2,
    },
    chartTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      fontSize: '12px',
    },
    chartDataText: {
      fontWeight: FontWeights.bold,
    },
    chartDataTextDenominator: {
      fontWeight: FontWeights.semibold,
    },
    calloutContentRoot: [
      {
        display: 'grid',
        overflow: 'hidden',
        padding: '11px 16px 10px 16px',
        backgroundColor: theme.semanticColors.bodyBackground,
        backgroundBlendMode: 'normal, luminosity',
      },
    ],
    calloutContentX: [
      {
        ...fonts.small,
        lineHeight: '16px',
        opacity: '0.8',
        color: theme.semanticColors.bodySubtext,
      },
    ],
    calloutBlockContainer: {
      paddingLeft: '8px',
      lineHeight: '22px',
      color: theme.semanticColors.bodyText,
      borderLeft: `4px solid ${color}`,
    },
    calloutlegendText: {
      ...fonts.small,
      lineHeight: '16px',
      color: theme.semanticColors.bodySubtext,
    },
    calloutContentY: [
      {
        ...fonts.xxLarge,
        color: color ? color : theme.semanticColors.bodySubtext,
        fontWeight: 'bold',
        lineHeight: '36px',
      },
    ],
    triangle: {
      width: '0',
      height: '0',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: '8px solid',
      borderTopColor: palette.blue,
      marginBottom: '4px',
    },
  };
};
